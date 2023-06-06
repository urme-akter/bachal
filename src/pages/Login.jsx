import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import loginimg from "../assets/loginimg.png";
import Heading from "../components/Heading";
import googleimg from "../assets/googleimg.png";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

let initialvalues = {
  email: "",
  password: "",
  CircularProgress: false,
  error: "",
  eyeTwo: "",
  errorCode: "",
};

const Login = () => {
  const auth = getAuth();
  let Navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  let [values, setValues] = useState(initialvalues);
  let handleValues = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    // console.log(values);
  };

  let handleSubmit = () => {
    let { email, password, errorCode } = values;

    if (!email) {
      setValues({
        ...values,
        error: "Enter an email Address",
      });
      return;
    }
    if (!password) {
      setValues({
        ...values,
        error: "Enter an password",
      });
      return;
    }
    if (!errorCode) {
      setValues({
        ...values,
        email: "",

        error: "Enter an right email",
      });
      return;
    }
    if (!errorCode) {
      setValues({
        ...values,

        password: "",
        error: "Enter an Right Password",
      });
      return;
    }
    setValues({
      ...values,
      CircularProgress: true,
    });

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setValues({
          password: "",
          CircularProgress: false,
        });
        // console.log(user);
        Navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        setValues({
          ...values,
          email: "",
          password: "",
          CircularProgress: false,
        });
      });
  };

  let handlegooglelogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="regContainer">
            <Heading className="header" tittle="Login to your account!" />

            <img
              onClick={handlegooglelogin}
              className="googlepic"
              src={googleimg}
            />

            <div className="loginput">
              <TextField
                value={values.email}
                onChange={handleValues}
                name="email"
                id="standard-basic"
                label="Email Address"
                variant="standard"
              />
              {values.error.includes("email") && (
                <Alert severity="error">{values.error}</Alert>
              )}
              {values.error.includes("errorCode") && (
                <Alert severity="error">{values.error}</Alert>
              )}
            </div>

            <div className="loginput">
              <TextField
                value={values.password}
                onChange={handleValues}
                name="password"
                id="standard-basic"
                label="Password"
                variant="standard"
                type={values.eyeTwo ? "text" : "password"}
              />
              {values.error.includes("password") && (
                <Alert severity="error">{values.error}</Alert>
              )}
              {values.error.includes("errorCode") && (
                <Alert severity="error">{values.error}</Alert>
              )}
              <div
                onClick={() => setValues({ ...values, eyeTwo: !values.eyeTwo })}
                className="eyeTwo"
              >
                {values.eyeTwo ? <BsEyeFill /> : <BsEyeSlashFill />}
              </div>
            </div>

            <Alert severity="info" style={{ marginBottom: "20px" }}>
              Don't Have an Account?
              <strong>
                <Link to="/">Registration</Link>
              </strong>
            </Alert>
            <div className="loginbtn">
              {values.CircularProgress ? (
                <div className="loader">
                  <CircularProgress disableShrink />
                </div>
              ) : (
                <Button onClick={handleSubmit} variant="contained">
                  Login to Continue
                </Button>
              )}
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
