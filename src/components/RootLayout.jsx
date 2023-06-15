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

const RootLayout = () => {
  const Location = useLocation();
  console.log(Location.pathname);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className="navber">
            <div className="navcontainer">
              <img className="profilePic" src={profile} />
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
                  <BiLogOut className="icon" />
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
