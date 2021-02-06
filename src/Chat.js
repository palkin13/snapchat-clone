import React from "react";
import "./Chat.css";
import {Avatar} from "@material-ui/core";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import ReactTimeAgo from "react-timeago";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import { selectImage } from "./features/appSlice";
import { db } from "./firebase";

function Chat({profilePic,id,imageUrl,username,timestamp,read}) {

const dispatch = useDispatch();
const history = useHistory();

  const open = () => {
   if (!read) {
     dispatch(selectImage(imageUrl));
     db.collection('posts').doc(id).set(
       {
        read: true,
       },
        
       {merge: true}
       
      ); 
      history.push("/chats/view");
    }
   };


  return(
   <div onClick={open} className="chat">
    <Avatar src = {profilePic} className="chat_avatar" />
    <div className="chat_info">
    <h4>{username}</h4>
    <p>
      {!read && 'Tap to view -'}{" "}
       <ReactTimeAgo date={new Date(timestamp?.toDate()).toUTCString()} /> </p>
    
   
    </div>
    {!read && <StopRoundedIcon className="chat_roundIcon" />}
   </div>
  );

}


export default Chat;