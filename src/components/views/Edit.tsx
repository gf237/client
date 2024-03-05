import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import { useNavigate } from "react-router-dom";
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
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
const Edit = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>(null);
  const [birthday, setBirthDate] = useState<Date>(null);

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
            value={birthday}
            onChange={(bd) => setBirthDate(bd)}
          />
          <div className="login button-container">
            <Button width="100%">Save</Button>
          </div>
          <div className="register button-container">
            <Button width="100%">Discard Changes</Button>
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
