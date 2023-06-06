import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import regimg from "../assets/regimg.png";
import Heading from "../components/Heading";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

let initialvalues = {
  email: "",
  fullName: "",
  password: "",
  CircularProgress: false,
  error: "",
  eye: "",
};

const Registration = () => {
  const auth = getAuth();
  let navigate = useNavigate();

  let [values, setValues] = useState(initialvalues);
  let handleValues = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    // console.log(values);
  };

  let handleSubmit = () => {
    let { email, fullName, password } = values;
    if (!email) {
      setValues({
        ...values,
        error: "Enter an email Address",
      });
      return;
    }

    if (!fullName) {
      setValues({
        ...values,
        error: "Enter an fullName",
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

    setValues({
      ...values,
      CircularProgress: true,
    });

    createUserWithEmailAndPassword(auth, email, password).then((user) => {
      // console.log(user);
      sendEmailVerification(auth.currentUser).then(() => {
        // console.log("email send");
      });
      setValues({
        email: "",
        fullName: "",
        password: "",
        CircularProgress: false,
      });

      navigate("/login");
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="regContainer">
            <Heading
              className="header"
              tittle="Get started with easily register"
            />
            <p className="para">Free register and you can enjoy it</p>
            <div className="reginput">
              <TextField
                value={values.email}
                onChange={handleValues}
                name="email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />
              {values.error.includes("email") && (
                <Alert severity="error">{values.error}</Alert>
              )}
            </div>
            <div className="reginput">
              <TextField
                value={values.fullName}
                onChange={handleValues}
                name="fullName"
                id="outlined-basic"
                label="FullName"
                variant="outlined"
              />
              {values.error.includes("fullName") && (
                <Alert severity="error">{values.error}</Alert>
              )}
            </div>
            <div className="reginput">
              <TextField
                value={values.password}
                onChange={handleValues}
                name="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type={values.eye ? "text" : "password"}
              />
              <div
                onClick={() => setValues({ ...values, eye: !values.eye })}
                className="eye"
              >
                {values.eye ? <BsEyeFill /> : <BsEyeSlashFill />}
              </div>
              {values.error.includes("password") && (
                <Alert severity="error">{values.error}</Alert>
              )}
            </div>
            <Alert severity="info" style={{ marginBottom: "20px" }}>
              Already Have an Account?{" "}
              <strong>
                <Link to="/login">Login</Link>
              </strong>
            </Alert>
            <div className="regibtn">
              {values.CircularProgress ? (
                <div className="loader">
                  <CircularProgress disableShrink />
                </div>
              ) : (
                <Button onClick={handleSubmit} variant="contained">
                  Sign up
                </Button>
              )}
              <Alert severity="error" style={{ marginTop: "40px" }}>
                Forgot Password?{" "}
                <strong>
                  <Link to="/ForgotPassword">Click Here</Link>
                </strong>
              </Alert>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img className="regisimg" src={regimg} />
        </Grid>
      </Grid>
    </>
  );
};

export default Registration;
