import { useState, useEffect } from "react";
import profile from "../assets/profile.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, push, set } from "firebase/database";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

let groupData = {
  groupname: "",
  grouptagline: "",
};

const Group = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userData = useSelector((state) => state.loggedUser.loginUser);
  const db = getDatabase();
  let [groupInfo, setGroupInfo] = useState(groupData);

  let [group, setGroup] = useState([]);

  let handleChange = (e) => {
    setGroupInfo({
      ...groupInfo,
      [e.target.name]: e.target.value,
    });
  };

  let handleSubmit = () => {
    set(push(ref(db, "groups/")), {
      groupname: groupInfo.groupname,
      grouptagline: groupInfo.grouptagline,
      adminId: userData.uid,
      adminname: userData.displayName,
    }).then(() => {
      setOpen(false);
    });
  };

  useEffect(() => {
    const groupsRef = ref(db, "groups/");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userData.uid !== item.val().adminId) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setGroup(arr);
    });
  }, []);

  return (
    <div className="groupBox">
      <h3 className="tittle">
        Group List
        <Button onClick={handleOpen} variant="contained">
          Create Group
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Group
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                onChange={handleChange}
                name="groupname"
                id="outlined-basic"
                label="Group Name"
                variant="outlined"
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                onChange={handleChange}
                name="grouptagline"
                id="outlined-basic"
                label="Group Tagline"
                variant="outlined"
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Button onClick={handleSubmit} variant="contained">
                Submit
              </Button>
            </Typography>
          </Box>
        </Modal>
      </h3>
      {group.map((item) => (
        <div className="list" key={item.id}>
          <div className="img">
            <img src={profile} className="pic" />
          </div>
          <div className="details">
            <h4 className="">{item.groupname}</h4>
            <p>{item.grouptagline}</p>
          </div>
          <div className="button">
            <Button variant="contained">Join</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Group;
