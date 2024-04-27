import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import  ErrorMessage  from "../../components/ErrorMessage/ErrorMessage";

import { trendingMovies } from "../../components/movieSearch-api";

import css from "./HomePage.module.css"

export default function HomePage() {
    const [dataMovies, setDataMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getMovies() {
            try {
                setLoading(true);
                const movies = await trendingMovies();
            setDataMovies(movies);
            console.log(movies);
                
            } catch (error) {
                setError(true);  
            }
            finally {
                setLoading(false);
            }
            
        }
    
        getMovies();
    }, []);
    
    
    return (<>{error ? <ErrorMessage /> : (
    <h2 className={css.sectionTitle}>
        This week's trends
    </h2>
)}
        
        {loading && <Loader />}
        {dataMovies.length > 0 && <MovieList movies={dataMovies} />}
    </>
       
    )
}