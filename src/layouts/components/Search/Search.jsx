import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Form } from 'react-bootstrap';

const Search = () => {
    return (
        <div>
            <Form.Group className='input-search'>
                <Form.Control className='input' type="text" placeholder="Tìm kiếm phim, rạp" />
                <FontAwesomeIcon className='icon' icon={faMagnifyingGlass} />
            </Form.Group>
        </div>
    );
};

export default Search;
