import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { User } from "types";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUsers] = useState(null);
  localStorage.setItem("id", userId);

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

  let content = <Spinner />;

  if (user) {
    content = (
      <div>
        <h2>Profile of {user.username}</h2>
        <p className="game paragraph">Details:</p>
        <p>Username: {user.username}</p>
        <p>ID: {user.id}</p>
        <p>Creation Date: {user.creationDate}</p>
        <p>Online Status: {user.status}</p>
        <p>Birthday: {user.birthday}</p>

        <Button
          width="100%"
          onClick={() => navigate("/edit")}
          disabled={localStorage.getItem("token") !== user.token}
        >
          Edit
        </Button>
        <Button width="100%" onClick={() => navigate("/game")}>
          Back to Overview
        </Button>
      </div>
    );
  }

  return <BaseContainer className="game container">{content}</BaseContainer>;
};

export default ProfilePage;
