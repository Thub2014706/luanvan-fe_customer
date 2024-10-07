import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { timePrice, typeSurcharge, typeUserPrice } from '~/constants';
import { detailPrice } from '~/services/PriceService';
import { detailSurcharge } from '~/services/SurchargeService';

const TablePrice = () => {
    let array1 = [];
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            array1.push({ typeUser: typeUserPrice[j], time: timePrice[i], price: '' });
        }
    }

    let array2 = [];
    for (let i = 0; i <= 3; i++) {
        array2.push({ type: typeSurcharge[i], price: '' });
    }

    const [price, setPrice] = useState(array1);
    const [sur, setSur] = useState(array2);

    console.log(price, sur);

    useEffect(() => {
        const fetch = async () => {
            for (let i = 0; i <= 3; i++) {
                for (let j = 0; j <= 3; j++) {
                    const data = await detailPrice(typeUserPrice[j], timePrice[i]);
                    if (data) {
                        setPrice((pre) =>
                            pre.map((item) =>
                                item.typeUser === typeUserPrice[j] && item.time === timePrice[i]
                                    ? { ...item, price: data.price }
                                    : item,
                            ),
                        );
                    }
                }
            }
            for (let i = 0; i <= 3; i++) {
                const data = await detailSurcharge(typeSurcharge[i]);
                if (data) {
                    setSur((pre) =>
                        pre.map((item) => (item.type === typeSurcharge[i] ? { ...item, price: data.price } : item)),
                    );
                }
            }
        };
        fetch();
    }, []);

    return (
        <div className="p-5">
            <h1 className="font-title text-center mb-5">BẢNG GIÁ VÉ</h1>
            <Table bordered>
                <thead>
                    <tr className="text-center">
                        <th
                            colSpan={2}
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                            className="text-white align-middle"
                        >
                            Thời gian
                        </th>
                        <th
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                            className="text-white align-middle"
                        >
                            Học sinh, sinh viên
                        </th>
                        <th
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                            className="text-white align-middle"
                        >
                            Người lớn
                        </th>
                        <th
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                            className="text-white align-middle"
                        >
                            Người già, trẻ em
                        </th>
                        <th
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                            className="text-white align-middle"
                        >
                            Thành viên, vé trực tuyến
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                            rowSpan={2}
                            className="align-middle text-white"
                        >
                            Thứ 2 đến thứ 5
                        </td>
                        <td
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                            className="align-middle text-white"
                        >
                            Trước 17h
                        </td>
                        {price.map(
                            (item, index) =>
                                index < 4 && (
                                    <td
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                                        className="text-white"
                                    >
                                        {item.price.toLocaleString('it-IT')}
                                    </td>
                                ),
                        )}
                    </tr>
                    <tr>
                        <td
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                            className="align-middle text-white"
                        >
                            Sau 17h
                        </td>
                        {price.map(
                            (item, index) =>
                                index >= 4 &&
                                index < 8 && (
                                    <td
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                                        className="text-white"
                                    >
                                        {item.price.toLocaleString('it-IT')}
                                    </td>
                                ),
                        )}
                    </tr>

                    <tr>
                        <td
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                            rowSpan={2}
                            className="align-middle text-white"
                        >
                            Thứ 6 đến chủ nhật
                        </td>
                        <td
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                            className="align-middle text-white"
                        >
                            Trước 17h
                        </td>
                        {price.map(
                            (item, index) =>
                                index >= 8 &&
                                index < 12 && (
                                    <td
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                                        className="text-white"
                                    >
                                        {item.price.toLocaleString('it-IT')}
                                    </td>
                                ),
                        )}
                    </tr>
                    <tr>
                        <td
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                            className="align-middle text-white"
                        >
                            Sau 17h
                        </td>
                        {price.map(
                            (item, index) =>
                                index >= 12 &&
                                index < 16 && (
                                    <td
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                                        className="text-white"
                                    >
                                        {item.price.toLocaleString('it-IT')}
                                    </td>
                                ),
                        )}
                    </tr>
                </tbody>
                <thead>
                    <tr className="text-center">
                        <th className='text-white h5' colSpan={6} style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}>
                            PHỤ THU
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sur.map((item) => (
                        <tr>
                            <td
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                                colSpan={2}
                                className="align-middle text-white"
                            >
                                {item.type}
                            </td>
                            <td
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                                colSpan={4}
                                className="text-white"
                            >
                                {item.price.toLocaleString('it-IT')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TablePrice;
