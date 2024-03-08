import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

const FormField = (props) => {
  return (
    <div className="login field">
      <label className="login label">{props.label}</label>
      <input
        className="login input"
        placeholder="enter here.."
        value={props.value}
        type={props.type}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};

const Edit = () => {
  const navigate = useNavigate();
  const [birthday, setBirthDate] = useState(null);
  const [username, setUsername] = useState(null);
  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("userId");

  const doUpdate = async () => {
    try {
      const requestBody = JSON.stringify({ username, birthday, token });
      await api.put("/users/" + id, requestBody);

      // Successfully updated and redirect to game
      navigate("/game");
    } catch (error) {
      alert(`Something went wrong during editing: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <FormField
            label="Username"
            value={username}
            onChange={(un: string) => setUsername(un)}
          />
          <FormField
            label="Birthday"
            type="date"
            value={birthday}
            onChange={(birthday) => setBirthDate(birthday)}
          />
          <div className="login button-container">
            <Button width="100%" onClick={() => doUpdate()}>
              Save
            </Button>
          </div>
          <div className="register button-container">
            <Button width="100%" onClick={() => navigate("/profile/" + id)}>
              Discard Changes
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Edit;
