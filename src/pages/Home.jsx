import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Group from "../components/Group";
import FriendRequest from "../components/FriendRequest";
import Friends from "../components/Friends";
import UserList from "../components/UserList";
import MyGroup from "../components/MyGroup";
import BlockedUser from "../components/BlockedUser";
import { useSelector } from "react-redux";

const Home = () => {
  let loginUser = useSelector((state) => state.loggedUser.loginUser);
  useEffect(() => {
    if (loginUser == null) {
      navigate("/login");
    }
  });
  const auth = getAuth();
  let navigate = useNavigate();
  let handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Group />
          <FriendRequest />
        </Grid>
        <Grid item xs={4}>
          <Friends />
          <MyGroup />
        </Grid>
        <Grid item xs={4}>
          <UserList />
          <BlockedUser />
        </Grid>
      </Grid>

      <Button onClick={handleLogOut} variant="contained">
        Log out
      </Button>
    </>
  );
};

export default Home;
