import moment from 'moment';
import React, { useEffect, useRef} from 'react';

const ChatList = ({ chats, user }) => {
    // const user = useSelector((state) => state.auth.login.currentUser);
    const endOfMessages = useRef();

    useEffect(() => {
        scrollToBottom();
    }, [chats]);

    const scrollToBottom = () => {
        endOfMessages.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="chats_list">
            {chats.map(
                (item, index) =>
                    item.user === user.data.id &&
                    (item.senderType === true ? (
                        <div className="chat_sender my-2">
                            <p className="mb-0">
                                {item.message}
                                {((chats[index + 1] && !chats[index + 1].senderType) || !chats[index + 1]) && (
                                    <>
                                        <br />
                                        <span className="text-end mb-0 text-secondary" style={{ fontSize: '12px' }}>
                                            {moment(item.createdAt).format('HH:mm')}
                                        </span>
                                    </>
                                )}
                            </p>
                        </div>
                    ) : (
                        <div className="chat_receiver my-2">
                            {(chats[index - 1] && chats[index - 1].senderType) || !chats[index - 1] ? (
                                <img src={item.avatar} alt="" />
                            ) : (
                                <div style={{ width: '30px' }}></div>
                            )}
                            <p className="mb-0 ms-2">
                                {item.message}
                                {((chats[index + 1] && chats[index + 1].senderType) || !chats[index + 1]) && (
                                    <>
                                        <br />
                                        <span className="text-end mb-0 text-secondary" style={{ fontSize: '11px' }}>
                                            {moment(item.createdAt).format('HH:mm')}
                                        </span>
                                    </>
                                )}
                            </p>
                        </div>
                    )),
            )}
            <div ref={endOfMessages}></div>
        </div>
    );
};

export default ChatList;
