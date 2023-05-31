import React from "react";
import { Grid, TextField, Button } from "@mui/material";
import regimg from "../assets/regimg.png";
import Heading from "../components/Heading";

const Login = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="regContainer">
            <Heading className="header" tittle="Login to your account!" />

            <div className="reginput">
              <TextField id="outlined-basic" label="Email" variant="outlined" />
            </div>

            <div className="reginput">
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
              />
            </div>
            <Button variant="contained">Sign up</Button>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img className="regisimg" src={regimg} />
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
