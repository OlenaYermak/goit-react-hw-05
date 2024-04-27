import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { reviewsMovies } from "../movieSearch-api"

import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import css from "./MovieReviews.module.css"


export default function MovieReviews() {

const {movieId} = useParams();
    console.log(movieId);



    const [dataReviews, setDataReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getMDetailMovies() {
            try {
                setLoading(true);
                const data = await reviewsMovies(movieId);
            setDataReviews(data.results);
            console.log(data);
                
            } catch (error) {
                setError(true);  
            }
            finally {
                setLoading(false);
            }
            
        }
    
        getMDetailMovies();
    }, [movieId]);

    return (<div>
        {loading && <Loader />}
        {error && <ErrorMessage/>}
       
        {dataReviews.length > 0 && (
        <ul className={css.reviewsList}>
          {dataReviews.map((review) => (
            <li key={review.id}>
              <h3 className={css.authorReview}>{review.author}</h3>
              <p className={css.textReview}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
       

    )
};