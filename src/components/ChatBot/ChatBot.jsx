import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import socketIOClient, { io } from 'socket.io-client';
import ChatList from '../ChatList/ChatList';
import InputText from '../InputText/InputText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ChatBot = ({ handleClose }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const socket = io(process.env.REACT_APP_API_URL);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (user) {
            socket.emit('join', user.data.id);

            socket.on('chat', (listChat) => {
                setChats(listChat);
            });

            socket.on('message', (msg) => {
                setChats((pre) => [...pre, msg]);
            });

            return () => {
                socket.off('chat');
                socket.off('message');
            };
        } else {
            setChats([]);
            handleClose();
        }
    }, []);

    const addMessage = (chat) => {
        if (chat && chat !== '') {
            const newChat = { user: user?.data.id, message: chat, senderType: true };
            socket.emit('newMessage', newChat);
        }
    };

    return (
        user && (
            <div className="chat-container">
                <div className="header-chat d-flex justify-content-between">
                    <h5 className="mb-0">CineThu</h5>
                    <div>
                        <FontAwesomeIcon icon={faXmark} size="lg" onClick={handleClose} style={{ cursor: 'pointer' }} />
                    </div>
                </div>
                <ChatList chats={chats} user={user} />
                <InputText addMessage={addMessage} />
            </div>
        )
    );
};

export default ChatBot;
