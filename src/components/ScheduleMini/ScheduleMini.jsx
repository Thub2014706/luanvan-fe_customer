import React from 'react';
import { Card } from 'react-bootstrap';

const ScheduleMini = ({ day, date, selectDay, handleSelectDay }) => {
    return (
        <div className="me-4">
            <div onClick={handleSelectDay} className={`card-date ${selectDay ? 'yes' : 'no'}`}>
                <div className={`text-center fw-bold card-head-date ${selectDay ? 'yes' : 'no'}`}>
                    {date}
                </div>
                <p className={`text-center mt-1 card-body-date ${selectDay ? 'yes' : ''}`}>{day}</p>
            </div>
        </div>
    );
};

export default ScheduleMini;
