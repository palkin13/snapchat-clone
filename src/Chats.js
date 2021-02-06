import React , {useState , useEffect} from "react";
import "./Chats.css";
import {Avatar} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import {auth, db} from "./firebase";
import Chat from "./Chat.js";
import { selectUser } from "./features/appSlice";
import { useDispatch , useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {logout} from "./features/appSlice";
import { resetCameraImage } from "./features/cameraSlice";

function Chats(){

  const [posts, setPosts] = useState([]);
  
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

useEffect( () => {
  db.collection("posts")
  .orderBy("timestamp" , "desc")
  .onSnapshot((snapshot) =>
   setPosts(
   snapshot.docs.map((doc) => ({
   id : doc.id,
   data : doc.data(),
  }))
  )
  );
},[]);

const takeSnap = () => {
dispatch(resetCameraImage);
history.push("/");
}

const signOut = () => {
  auth.signOut().then(() => {
  dispatch(logout())
  });
};


  return(
    <div className="chats">
      <div className="chats_header">
        <Avatar src={user.profilePic} 
        onClick={signOut}
        className="chats_avatar" 
        />
        <div className="chats_search">
         <SearchIcon className="chats_searchIcon"/>
         <input type="text" placeholder="Friends🤗" />
        </div> 
        <ChatBubbleIcon className="chats_chatBubble"/>
      </div>

      <div className="chats_posts">
      {posts.map(({id ,data : {profilePic,username,imageUrl,read,timestamp}}) => (
       <Chat 
       key = {id}
       username = {username}
       imageUrl = {imageUrl}
       profilePic = {profilePic}
       read = {read}
       timestamp = {timestamp}
       />
      ))}

      </div>
<RadioButtonUncheckedIcon className="chats_takePicIcon"
onClick={takeSnap} fontSize="large">
</RadioButtonUncheckedIcon>
      
    </div>
  );
}

export default Chats;