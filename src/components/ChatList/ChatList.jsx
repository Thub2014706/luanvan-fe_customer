import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const ChatList = ({ chats }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const endOfMessages = useRef();

    useEffect(() => {
        scrollToBottom();
    }, [chats]);

    const scrollToBottom = () => {
        endOfMessages.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="chats_list">
            {chats.map((item) =>
                item.username === user.data.id ? (
                    <div className="chat_sender">
                        <img src={item.avatar} alt="" />
                        <p>
                            <strong>{item.username}</strong> <br />
                            {item.message}
                        </p>
                    </div>
                ) : (
                    <div className="chat_receiver">
                        <img src={item.avatar} alt="" />
                        <p>
                            <strong>{item.username}</strong> <br />
                            {item.message}
                        </p>
                    </div>
                ),
            )}
            <div ref={endOfMessages}></div>
        </div>
    );
};

export default ChatList;
