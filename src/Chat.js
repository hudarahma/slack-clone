import React, { useEffect, useState } from 'react'
import './Chat.css';
import Message from './Message'
import { useParams } from 'react-router-dom';
import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons';
import db from './firebase';
import ChatInput from './ChatInput';

function Chat() {
    let { roomId } = useParams();
    const [roomDetails, setRoomDetails] = useState();
    const [roomMessages, setRoomMessages] = useState([]);


    const getMessages = () => {
        db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>{
            console.log(snapshot)
            let messages = snapshot.docs.map(doc => doc.data())
            setRoomMessages(messages)
        })
        
    }

    const getChannel = () => {

        db.collection('rooms')
        .doc(roomId)
        .onSnapshot(snapshot => (
            setRoomDetails(snapshot.data())
            // console.log(snapshot.data())
        ))
    }
    useEffect(() => {
        getMessages();
        getChannel();

    }, [roomId]);

    console.log(roomDetails);
    console.log('messages -->>>', roomMessages);

    return (
        <div className='chat'>
            {/* <h2>You are in the {roomId} room</h2> */}
            <div className='chat__header'>
                <div className='chat__headerLeft'>
                    <h4 className='chat__channelName'>
                        <strong># {roomDetails?.name}</strong>
                        <StarBorderOutlined /> 
                    </h4>
                </div>
                <div className='chat__headerRight'>
                    <p>
                        <InfoOutlined /> Details
                    </p>
                </div>
            </div>

            <div className='chat__messages'>
                {/* message */}

                {roomMessages.map(({ message, timestamp, user, userImage}, index) => (
                    <Message 
                        key={index}
                        message={message}
                        timestamp={timestamp}
                        user={user}
                        userImage={userImage}
                    />
                ))}
            </div>

            <ChatInput channelName={roomDetails?.name} channelId={roomId} key={roomDetails?.id}/>
        </div>
    )
}

export default Chat
