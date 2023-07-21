import React from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import profile from "../assets/profile.png";
import {
  AiOutlineHome,
  AiFillMessage,
  AiOutlineBell,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RootLayout = () => {
  const Location = useLocation();
  const auth = getAuth();
  let navigate = useNavigate();
  const notify = (msg) => toast(msg);

  let handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        navigate("/login");
        notify("User Log out");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  // console.log(Location.pathname);
  let userData = useSelector((state) => state.loggedUser.loginUser);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className="navber">
            <div className="navcontainer">
              <img className="profilePic" src={profile} />
              <h3 className="userName">{userData.displayName}</h3>
              <ul>
                <li>
                  <Link
                    className={
                      Location.pathname == "/bachal/home" ? "active" : "icon"
                    }
                    to="/bachal/home"
                  >
                    <AiOutlineHome />
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      Location.pathname == "/bachal/message" ? "active" : "icon"
                    }
                    to="/bachal/message"
                  >
                    <AiFillMessage />
                  </Link>
                </li>
                <li>
                  <AiOutlineBell className="icon" />
                </li>
                <li>
                  <AiOutlineSetting className="icon" />
                </li>
                <li>
                  <Link
                    className={
                      Location.pathname == "/bachal/logout" ? "active" : "icon"
                    }
                    to="/bachal/logout"
                  >
                    <BiLogOut className="icon" onClick={handleLogOut} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Grid>
        <Grid item xs={11}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default RootLayout;
