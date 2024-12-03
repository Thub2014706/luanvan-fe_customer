import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { allPointHistory } from '~/services/PointHistorySevice';

const PointHistory = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [points, setPoints] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await allPointHistory(user.data.id);
            setPoints(data);
        };
        fetch();
    }, [user]);

    return (
        <div>
            {points.map((item) => (
                <div>{item.name}</div>
            ))}
        </div>
    );
};

export default PointHistory;
