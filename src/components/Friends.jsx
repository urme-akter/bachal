import { useEffect, useState } from "react";
import profile from "../assets/profile.png";
import { Button } from "@mui/material";
import { getDatabase, ref, onValue } from "firebase/database";
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

  return (
    <div className="groupBox">
      <h3>Friends</h3>
      {friends.map((item) => (
        <div className="list" key={item.id}>
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
            {/* <Button size="small" variant="contained">
              Unfriend
            </Button> */}
            <Button size="small" variant="contained">
              Block
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friends;
