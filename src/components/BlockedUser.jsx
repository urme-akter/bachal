import { useEffect, useState } from "react";
import profile from "../assets/profile.png";
import { Button } from "@mui/material";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useSelector } from "react-redux";

const BlockedUser = () => {
  const db = getDatabase();
  let [blockList, setBlockList] = useState([]);
  const userData = useSelector((state) => state.loggedUser.loginUser);

  useEffect(() => {
    const blockRef = ref(db, "block");
    onValue(blockRef, (snapshot) => {
      console.log(snapshot.val());
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setBlockList(arr);
    });
  }, []);

  let handleUnblock = (item) => {
    remove(ref(db, "block/" + item.id));
  };

  return (
    <div className="groupBox">
      <h3>Block User</h3>
      {blockList.map((item) => (
        <div className="list" key={item.id}>
          <div className="img">
            <img src={profile} className="pic" />
          </div>
          <div className="details">
            {item.blockbyid == userData.uid ? (
              <h4 className="">{item.blockedname}</h4>
            ) : (
              <h4 className="">{item.blockbyname}</h4>
            )}

            <p>Hi Guys, Wassup!</p>
          </div>
          <div className="button">
            {item.blockbyid == userData.uid && (
              <Button
                onClick={() => {
                  handleUnblock(item);
                }}
                variant="contained"
              >
                Unblock
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlockedUser;
