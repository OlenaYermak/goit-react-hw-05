import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { castMovies } from "../movieSearch-api";

import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieCast.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieCast() {

const {movieId} = useParams();
    console.log(movieId);



    const [dataCast, setDataCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getMDetailMovies() {
            try {
                setLoading(true);
                const data = await castMovies(movieId);
            setDataCast(data.cast);
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
        {dataCast.length > 0 ? (
        <ul className={css.castList}>
          {dataCast.map(({ name, profile_path, character, id }) => {
            return (
              <li className={css.castListItem } key={id}>
                <img
                       
                        src={profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}` : defaultImg}
                  alt={name}
                  height={320}
                  width={200}
                />
                <h3 className={css.castTitle} >{name}</h3>
                <p className={css.castText}>{character}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <h3 className={css.castTitle}>There is no information</h3>
      )}
        
    {error && <ErrorMessage/>}
    
    </div>
        



        
    )
};