import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import socketIOClient, { io } from 'socket.io-client';
import ChatList from '../ChatList/ChatList';
import InputText from '../InputText/InputText';
const host = 'http://localhost:3000';

const ChatBot = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const socket = socketIOClient(process.env.REACT_APP_API_URL);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        socket.on('chat', (chats) => {
            setChats(chats);
        });

        socket.on('message', (msg) => {
            setChats((pre) => [...pre, msg]);
        });

        return () => {
            socket.off('chat');
            socket.off('message');
        };
    }, [socket]);

    const addMessage = (chat) => {
        socket.emit('newMessage', { user: user?.data.id, message: chat });
    };

    return (
        <div className='chat-container'>
            <ChatList chats={chats} />
            <InputText addMessage={addMessage} />
        </div>
    );
};

export default ChatBot;
