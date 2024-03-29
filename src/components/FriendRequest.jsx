import { useEffect, useState } from "react";
import profile from "../assets/profile.png";
import { Button } from "@mui/material";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const FriendRequest = () => {
  const db = getDatabase();
  let [reqList, setReqList] = useState([]);
  let userData = useSelector((state) => state.loggedUser.loginUser);
  const notify = (msg) => toast(msg);

  useEffect(() => {
    const friendRequestRef = ref(db, "friendrequest");
    onValue(friendRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().whoreceiveid == userData.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setReqList(arr);
    });
  }, []);

  let handleReject = (id) => {
    remove(ref(db, "friendrequest/" + id));
  };

  let handleAccept = (item) => {
    set(push(ref(db, "friends/")), {
      ...item,
    }).then(() => {
      remove(ref(db, "friendrequest/" + item.id));
      notify("Friend request accept");
    });
  };

  return (
    <div className="groupBox ">
      <h3>Friend Request</h3>
      {reqList.length > 0 ? (
        reqList.map((item) => (
          <div className="list" key={item.id}>
            <div className="img">
              <img src={profile} className="pic" />
            </div>
            <div className="details">
              <h4 className="">{item.whosendname}</h4>
              <p>Hi, Wassup!</p>
            </div>
            <div className="button">
              <Button
                onClick={() => handleAccept(item)}
                size="small"
                variant="contained"
              >
                Accept
              </Button>
              <Button
                onClick={() => handleReject(item.id)}
                size="small"
                color="error"
                variant="contained"
              >
                Reject
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h2
          style={{
            color: "Black",
            marginTop: "72px",
            marginLeft: "23px",
            opacity: ".3",
            fontSize: "30px",
          }}
        >
          No Friend Request Available
        </h2>
      )}
    </div>
  );
};

export default FriendRequest;
