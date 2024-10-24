import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChatList from '../ChatList/ChatList';
import InputText from '../InputText/InputText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ChatBot = ({ handleClose, show }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [chats, setChats] = useState([]);
    const [start, setStart] = useState(false);

    useEffect(() => {
        if (show) {
            setStart(true);
        }
    }, [show]);

    const socket = useSelector((state) => state.socket.socketConnect);

    useEffect(() => {
        if (user && socket) {
            socket.emit('join', user.data.id);

            socket.on('chat', (listChat) => {
                setChats(listChat);
            });

            socket.on('message', (msg) => {
                console.log(msg);

                setChats((pre) => [...pre, msg]);
            });

            return () => {
                socket.off('chat');
                socket.off('message');
                socket.emit('leave', user.data.id);
            };
        } else {
            setChats([]);
            handleClose();
        }
    }, [user, handleClose, socket]);

    const addMessage = (chat) => {
        if (chat && chat !== '') {
            const newChat = { user: user?.data.id, message: chat, senderType: true };
            socket.emit('newMessage', newChat);
        }
    };

    return (
        user && (
            <div className={`chat-container ${start ? (show ? 'show' : 'hidden') : 'first'}`}>
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
