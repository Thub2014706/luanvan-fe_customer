import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const InputText = ({ addMessage }) => {
    const [message, setMessage] = useState();

    const sendMessage = () => {
        addMessage(message);
        setMessage('');
    };
    return (
        <div className="inputtext_container">
            <textarea
                name="message"
                id="message"
                rows="6"
                placeholder="Nhập tin nhắn..."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            ></textarea>
            <div onClick={sendMessage}>
                <FontAwesomeIcon icon={faPaperPlane} />
            </div>
        </div>
    );
};

export default InputText;
