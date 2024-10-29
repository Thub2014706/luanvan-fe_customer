import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { detailPopup } from '~/services/PopupService';
import ImageBase from '../ImageBase/ImageBase';

const WindowModal = ({img}) => {
    const test = localStorage.getItem('modal');
    const today = new Date().toLocaleDateString();
    const [on, setOn] = useState(test !== today);
    const [select, setSelect] = useState(false);

    useEffect(() => {
        if (on) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [on]);

    const handleClose = () => {
        setOn(false);
        select && localStorage.setItem('modal', today);
    };

    // console.log(img);
    
    return (
        img && (
            <div
                className="backdrop"
                style={{
                    display: !on && 'none',
                }}
            >
                <ImageBase
                    pathImg={img}
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '20%',
                        transform: 'translate(-50%, 0%)',
                        height: '500px',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        left: '70%',
                        top: '20%',
                        transform: 'translate(-50%, 0%)',
                        zIndex: 10000000,
                        backgroundColor: 'transparent',
                    }}
                >
                    <FontAwesomeIcon
                        icon={faXmark}
                        size="2xl"
                        color="white"
                        onClick={handleClose}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <div
                    style={{
                        color: 'white',
                        display: 'flex',
                        position: 'absolute',
                        left: '50%',
                        bottom: '5%',
                        transform: 'translate(-50%, 0%)',
                        zIndex: 10000000,
                        backgroundColor: 'transparent',
                    }}
                >
                    <Form.Check
                        type="checkbox"
                        id="check"
                        label="Không mở cửa sổ này trong hôm nay"
                        onChange={() => setSelect((pre) => !pre)}
                    />
                </div>
            </div>
        )
    );
};

export default WindowModal;
