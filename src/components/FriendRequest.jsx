import { useEffect, useState } from "react";
import profile from "../assets/profile.png";
import { Button } from "@mui/material";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const db = getDatabase();
  let [reqList, setReqList] = useState([]);
  let userData = useSelector((state) => state.loggedUser.loginUser);

  useEffect(() => {
    const friendRequestRef = ref(db, "friendrequest");
    onValue(friendRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().whoreceiveid == userData.uid) {
          arr.push(item.val());
        }
      });
      setReqList(arr);
    });
  }, []);

  return (
    <div className="groupBox ">
      <h3>Friend Request</h3>
      {reqList.map((item) => (
        <div className="list" key={item.id}>
          <div className="img">
            <img src={profile} className="pic" />
          </div>
          <div className="details">
            <h4 className="">{item.whosendname}</h4>
            <p>Hi Guys, Wassup!</p>
          </div>
          <div className="button">
            <Button variant="contained">Join</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequest;
