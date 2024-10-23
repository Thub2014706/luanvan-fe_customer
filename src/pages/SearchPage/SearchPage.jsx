import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilmTitle from '~/components/FilmTitle/FilmTitle';
import { searchFilm } from '~/services/FilmService';

const SearchPage = () => {
    const location = useLocation();
    const { search } = location.state || {};
    const [theaters, setTheaters] = useState([])
    const [films, setFilms] = useState([])
    // console.log('aaaa',search);
    

    useEffect(() => {
        const fetch = async () => {
            const data = await searchFilm(search)
            setTheaters(data.theaters)
            setFilms(data.films)
        }
        fetch()
    }, [search])

    return <div>
        {films.map(item => (
            <FilmTitle film={item} />
        ))}
    </div>;
};

export default SearchPage;
