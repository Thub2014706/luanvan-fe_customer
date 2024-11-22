import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import momentTimezone from 'moment-timezone';
import img1 from '~/assets/images/support.png';

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
            {user && chats.length > 0 ? (
                chats.map(
                    (item, index) =>
                        item.user === user.data.id &&
                        (item.senderType === true ? (
                            <>
                                <p
                                    className="mx-auto px-3 my-3"
                                    style={{
                                        borderRadius: '10px',
                                        backgroundColor: 'rgb(219, 219, 219)',
                                        color: 'gray',
                                        width: 'fit-content',
                                        fontSize: '12px',
                                    }}
                                >
                                    {(!chats[index - 1] ||
                                        momentTimezone
                                            .tz(chats[index - 1].createdAt, 'Asia/Ho_Chi_Minh')
                                            .add(30, 'minutes')
                                            .isBefore(momentTimezone.tz(item.createdAt, 'Asia/Ho_Chi_Minh'))) && (
                                        <p>{moment(item.createdAt).format('HH:mm DD/MM/YYYY')}</p>
                                    )}
                                </p>
                                <div className="chat_sender my-2">
                                    <p className="mb-0">
                                        {item.message}
                                        {((chats[index + 1] &&
                                            (!chats[index + 1].senderType ||
                                                momentTimezone
                                                    .tz(item.createdAt, 'Asia/Ho_Chi_Minh')
                                                    .add(30, 'minutes')
                                                    .isBefore(
                                                        momentTimezone.tz(
                                                            chats[index + 1].createdAt,
                                                            'Asia/Ho_Chi_Minh',
                                                        ),
                                                    ))) ||
                                            !chats[index + 1]) && (
                                            <>
                                                <br />
                                                <span
                                                    className="text-end mb-0 text-secondary"
                                                    style={{ fontSize: '12px' }}
                                                >
                                                    {moment(item.createdAt).format('HH:mm')}
                                                </span>
                                            </>
                                        )}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* thoi gian center */}
                                <p
                                    className="mx-auto px-3 my-3"
                                    style={{
                                        borderRadius: '10px',
                                        backgroundColor: 'rgb(219, 219, 219)',
                                        color: 'gray',
                                        width: 'fit-content',
                                        fontSize: '12px',
                                    }}
                                >
                                    {(!chats[index - 1] ||
                                        momentTimezone
                                            .tz(chats[index - 1].createdAt, 'Asia/Ho_Chi_Minh')
                                            .add(30, 'minutes')
                                            .isBefore(momentTimezone.tz(item.createdAt, 'Asia/Ho_Chi_Minh'))) && (
                                        <p>{moment(item.createdAt).format('HH:mm DD/MM/YYYY')}</p>
                                    )}
                                </p>

                                {/* chat */}
                                <div className="chat_receiver my-2">
                                    {(chats[index - 1] &&
                                        (chats[index - 1].senderType ||
                                            momentTimezone
                                                .tz(chats[index - 1].createdAt, 'Asia/Ho_Chi_Minh')
                                                .add(30, 'minutes')
                                                .isBefore(momentTimezone.tz(item.createdAt, 'Asia/Ho_Chi_Minh')))) ||
                                    !chats[index - 1] ? (
                                        <img src={item.avatar} alt="" />
                                    ) : (
                                        <div style={{ width: '30px' }}></div>
                                    )}
                                    <p className="mb-0 ms-2">
                                        {item.message}
                                        {((chats[index + 1] &&
                                            (chats[index + 1].senderType ||
                                                momentTimezone
                                                    .tz(item.createdAt, 'Asia/Ho_Chi_Minh')
                                                    .add(30, 'minutes')
                                                    .isBefore(
                                                        momentTimezone.tz(
                                                            chats[index + 1].createdAt,
                                                            'Asia/Ho_Chi_Minh',
                                                        ),
                                                    ))) ||
                                            !chats[index + 1]) && (
                                            <>
                                                <br />
                                                <span
                                                    className="text-end mb-0 text-secondary"
                                                    style={{ fontSize: '11px' }}
                                                >
                                                    {moment(item.createdAt).format('HH:mm')}
                                                </span>
                                            </>
                                        )}
                                    </p>
                                </div>
                            </>
                        )),
                )
            ) : (
                <div className="px-4 pt-5">
                    <img src={img1} className="d-block mx-auto mb-1" height={110} alt="" />
                    <p className="text-center">
                        Chào bạn {user.data.username}! Cảm ơn bạn đã quan tâm đến CineThu. Có gì thắc mắc hãy liên hệ
                        với chúng tôi nhé!
                    </p>
                </div>
            )}
            <div ref={endOfMessages}></div>
        </div>
    );
};

export default ChatList;
