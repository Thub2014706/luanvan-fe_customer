import getYouTubeID from 'get-youtube-id';
import React from 'react';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/scss/modal-video.scss';

const VideoModal = ({ show, handleClose, trailer }) => {
    return (
        <div style={{ zIndex: 1000000000 }}>
            <ModalVideo
                channel="youtube"
                autoplay
                loop="1"
                isOpen={show}
                videoId={getYouTubeID(trailer)}
                onClose={handleClose}
            />
        </div>
    );
};

export default VideoModal;
