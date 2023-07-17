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

const Friends = () => {
  const db = getDatabase();
  const [friends, setFriends] = useState([]);
  const userData = useSelector((state) => state.loggedUser.loginUser);

  useEffect(() => {
    const friendsRef = ref(db, "friends");
    onValue(friendsRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        const friendData = item.val();
        if (
          friendData.whosendid === userData.uid ||
          friendData.whoreceiveid === userData.uid
        ) {
          arr.push({ ...friendData, id: item.key });
        }
      });

      setFriends(arr);
    });
  }, []);

  let handleUnfriend = (item) => {
    remove(ref(db, "friends/" + item.id));
  };

  let handleBlock = (item) => {
    // console.log(userData.uid == item.whosendid);
    // console.log(userData.uid == item.whoreceiveid);

    if (userData.uid == item.whosendid) {
      set(push(ref(db, "block/")), {
        blockedid: item.whoreceiveid,
        blockname: item.whoreceivename,
        blockbyid: item.whosendid,
        blockbyname: item.whosendname,
      }).then(() => {
        remove(ref(db, "friends/" + item.id));
      });
    } else {
      set(push(ref(db, "block/")), {
        blockedid: item.whosendid,
        blockedname: item.whosendname,
        blockbyid: item.whoreceiveid,
        blockbyname: item.whoreceivename,
      }).then(() => {
        remove(ref(db, "friends/" + item.id));
      });
    }
  };

  return (
    <div className="groupBox groupBox-frnd">
      <h3>Friends</h3>
      {friends.map((item) => (
        <div className="list frnd-list" key={item.id}>
          <div className="img">
            <img src={profile} className="pic" alt="Profile" />
          </div>
          <div className="details">
            {item.whoreceiveid == userData.uid ? (
              <h4 className="">{item.whosendname}</h4>
            ) : (
              <h4 className="">{item.whoreceivename}</h4>
            )}
            <p>Hi Guys, Wassup!</p>
          </div>
          <div className="button">
            <Button
              onClick={() => {
                handleUnfriend(item);
              }}
              size="small"
              variant="contained"
            >
              Unfriend
            </Button>
            <Button
              onClick={() => {
                handleBlock(item);
              }}
              size="small"
              variant="contained"
              color="error"
            >
              Block
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friends;
