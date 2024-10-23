import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSeach = (e) => {
        e.preventDefault()
        navigate('/search', { state: { search } });
    };
    return (
        <div>
            <Form onSubmit={handleSeach}>
                <Form.Group className="input-search">
                    <Form.Control
                        className="input"
                        type="text"
                        placeholder="Tìm kiếm phim, rạp"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} onClick={handleSeach} />
                </Form.Group>
            </Form>
        </div>
    );
};

export default Search;
