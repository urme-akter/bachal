import React from "react";
import { Grid, TextField, Button } from "@mui/material";
import loginimg from "../assets/loginimg.png";
import Heading from "../components/Heading";
import googleimg from "../assets/googleimg.png";

const Login = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="regContainer">
            <Heading className="header" tittle="Login to your account!" />

            <img className="googlepic" src={googleimg} />

            <div className="loginput">
              <TextField
                id="standard-basic"
                label="Email Address"
                variant="standard"
              />
            </div>

            <div className="loginput">
              <TextField
                id="standard-basic"
                label="Password"
                variant="standard"
                type="password"
              />
            </div>
            <div className="loginbtn">
              <Button variant="contained">Login to Continue</Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img className="loginimg" src={loginimg} />
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
