import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
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
  const { userId } = useParams();
  const [user, setUsers] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/users/" + userId);
        setUsers(response.data);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the user's data: \n${handleError(
            error
          )}`
        );
      }
    }
    fetchData();
  }, [userId]);

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <FormField label="Username" />

          <FormField label="Birthday" />
          <div className="login button-container">
            <Button width="100%">Save</Button>
          </div>
          <div className="register button-container">
            <Button width="100%" onClick={() => navigate("/profile/" + userId)}>
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
