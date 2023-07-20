import React, { useEffect, useState } from "react";
import profile from "../assets/profile.png";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, push, set } from "firebase/database";

const MyGroup = () => {
  let userData = useSelector((state) => state.loggedUser.loginUser);
  const db = getDatabase();
  let [mygroup, setMyGroup] = useState([]);

  useEffect(() => {
    const groupsRef = ref(db, "groups/");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userData.uid == item.val().adminId) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setMyGroup(arr);
    });
  }, []);

  return (
    <div className="groupBox">
      <h3>My Group</h3>
      {mygroup.map((item) => (
        <div className="list">
          <div className="img">
            <img src={profile} className="pic" />
          </div>
          <div className="details">
            <h4 className="">{item.groupname}</h4>
            <p>{item.grouptagline}</p>
          </div>
          <div className="button">
            <Button variant="contained">Info</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyGroup;
