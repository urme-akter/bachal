import React from "react";
import profile from "../assets/profile.png";
import { Button } from "@mui/material";

const FriendRequest = () => {
  return (
    <div className="groupBox">
      <h3>Friend Request</h3>
      <div className="list">
        <div className="img">
          <img src={profile} className="pic" />
        </div>
        <div className="details">
          <h4 className="">Friends Reunion</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        <div className="button">
          <Button variant="contained">Join</Button>
        </div>
      </div>
      <div className="list">
        <div className="img">
          <img src={profile} className="pic" />
        </div>
        <div className="details">
          <h4 className="">Friends Reunion</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        <div className="button">
          <Button variant="contained">Join</Button>
        </div>
      </div>
      <div className="list">
        <div className="img">
          <img src={profile} className="pic" />
        </div>
        <div className="details">
          <h4 className="">Friends Reunion</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        <div className="button">
          <Button variant="contained">Join</Button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
