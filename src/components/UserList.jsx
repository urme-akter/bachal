import React, { useEffect, useState } from "react";
import profile from "../assets/profile.png";
import { Button } from "@mui/material";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";

const UserList = () => {
  const db = getDatabase();
  const auth = getAuth();
  let [userList, setUserList] = useState([]);
  let [friendRequest, setFriendRequest] = useState([]);
  let userData = useSelector((state) => state.loggedUser.loginUser);
  let [friends, setFriends] = useState([]);
  let [block, setBlock] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "friendrequest/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().whoreceiveid + item.val().whosendid);
      });
      setFriendRequest(arr);
    });
  }, []);

  useEffect(() => {
    const usersRef = ref(db, "friends/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().whoreceiveid + item.val().whosendid);
      });
      setFriends(arr);
    });
  }, []);

  useEffect(() => {
    const usersRef = ref(db, "block/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().blockedid + item.val().blockbyid);
      });
      setBlock(arr);
    });
  }, []);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      // const data = snapshot.val();
      snapshot.forEach((item) => {
        if (userData.uid != item.key) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(arr);
    });
  }, []);

  let handleFriendRequest = (item) => {
    // console.log("who send", auth.currentUser.uid);
    // console.log("who send", item.id);
    set(ref(db, "friendrequest/" + item.id), {
      whosendid: auth.currentUser.uid,
      whosendname: auth.currentUser.displayName,
      whoreceiveid: item.id,
      whoreceivename: item.username,
    });
  };

  let handleCancel = (item) => {
    console.log(item.id);
    remove(ref(db, "friendrequest/" + item.id));
  };

  return (
    <div className="groupBox">
      <h3>User List</h3>

      {userList.map((item) => (
        <div className="list" key={item.id}>
          <div className="img">
            <img src={profile} className="pic" />
          </div>
          <div className="details">
            <h4>{item.username}</h4>
            <p>{item.email}</p>
          </div>
          <div className="button">
            {friendRequest.includes(item.id + auth.currentUser.uid) ? (
              <Button onClick={() => handleCancel(item)} variant="contained">
                cancel
              </Button>
            ) : friendRequest.includes(auth.currentUser.uid + item.id) ? (
              <Button
                // onClick={() => handleFriendRequest(item)}
                variant="contained"
              >
                Pending
              </Button>
            ) : friends.includes(auth.currentUser.uid + item.id) ||
              friends.includes(item.id + auth.currentUser.uid) ? (
              <Button
                // onClick={() => handleFriendRequest(item)}
                variant="contained"
                color="success"
              >
                Friends
              </Button>
            ) : block.includes(auth.currentUser.uid + item.id) ||
              block.includes(item.id + auth.currentUser.uid) ? (
              <Button
                // onClick={() => handleFriendRequest(item)}
                variant="contained"
                color="error"
              >
                block
              </Button>
            ) : (
              <Button
                onClick={() => handleFriendRequest(item)}
                variant="contained"
              >
                +
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
