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
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userData } from "../slices/user/userSlice";

let initialvalues = {
  email: "",
  password: "",
  CircularProgress: false,
  error: "",
  eyeTwo: "",
};

const Login = () => {
  let dispatch = useDispatch();
  const notify = (msg) => toast(msg);
  const auth = getAuth();
  let Navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  let [values, setValues] = useState(initialvalues);
  let [error, setError] = useState("");
  let handleValues = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    // console.log(values);
  };

  let handleSubmit = () => {
    let { email, password } = values;

    if (!email) {
      setValues({
        ...values,
        error: "Enter an email Address",
      });
      return;
    }
    // var pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!password) {
      setValues({
        ...values,
        error: "Enter an password",
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
        console.log(user.user.emailVerified);
        if (!user.user.emailVerified) {
          notify("Please verify your email for login");
        } else {
          Navigate("/bachal/home");
          localStorage.setItem("user", JSON.stringify(user.user)),
            dispatch(userData(user.user));
        }
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        notify(errorCode);
        setError(errorCode);

        if (errorCode === "auth/wrong-password") {
          setValues({
            password: "",
          });
        }
        if (errorCode === "auth/user-not-found") {
          setValues({
            email: "",
            password: "",
          });
        }

        setValues({
          ...values,
          // email: "",
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
            </div>
            {error === "auth/user-not-found" && (
              <Alert severity="error"> Invalid Email</Alert>
            )}

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

              <div
                onClick={() => setValues({ ...values, eyeTwo: !values.eyeTwo })}
                className="eyeTwo"
              >
                {values.eyeTwo ? <BsEyeFill /> : <BsEyeSlashFill />}
              </div>
            </div>
            {error === "auth/wrong-password" && (
              <Alert severity="error">Invalid Password</Alert>
            )}

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
                <>
                  <Button onClick={handleSubmit} variant="contained">
                    Login to Continue
                  </Button>
                </>
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
