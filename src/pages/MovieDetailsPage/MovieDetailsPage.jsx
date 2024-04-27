import { useState, useEffect, useRef, Suspense } from "react";
import { useParams,  NavLink, Outlet,  useLocation, Link } from "react-router-dom";
import { detailsMovies } from "../../components/movieSearch-api";
import { TbSquareArrowLeft } from "react-icons/tb";

import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import css from "./MovieDetailPage.module.css"


const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieDetailsPage() {
    const {movieId} = useParams();
  

    const [dataMovies, setDataMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

    useEffect(() => {
        async function getMDetailMovies() {
            try {
                setLoading(true);
                const movies = await detailsMovies(movieId);
            setDataMovies(movies);
            
                
            } catch (error) {
                setError(true);  
            }
            finally {
                setLoading(false);
            }
            
        }
    
        getMDetailMovies();
    }, []);
    
const genres = dataMovies.genres || [];
    return (<>
        {loading && <Loader />}
        {error ? <ErrorMessage /> : <div className={css.container}>
            <Link className={css.link} to={backLinkRef.current}>
               <TbSquareArrowLeft className={css.icon} />
            </Link>
            <img className={css.img}
                
                 src={dataMovies.poster_path ? `https://image.tmdb.org/t/p/w500${dataMovies.poster_path}` : defaultImg}
                
                alt={`${dataMovies.title} poster`}
                width={400}
                height={650}
            />
            <div className={css.infoWrapper}>
        <div >
            <h2 className={css.movieTitle}>{dataMovies.title}</h2>
                    <ul className={ css.infoList}>
                        <li>
                            <div className={css.textWrapper}>
                                <p className={css.text}>Release:</p>
                                <h3 className={css.accent}>{dataMovies.release_date}</h3>
                                </div>
                        </li>
                        <li >
                            <div className={css.textWrapper}>
                                <p className={css.text}>Genres:</p>
                                    <h3 className={css.accent}><ul className={css.genreList}>
                {genres.map((genre) => (
                  <li  key={genre.id}>
                        {genre.name},
                        
                  </li>
                ))}
                                </ul>
                                </h3>
                            </div>
                        </li>
                        <li>
                            <div className={css.textWrapper}><p className={css.text}>Country:</p>
                            <h3 className={css.accent}>{dataMovies.origin_country}</h3> </div>
                            </li>
                        <li>
                            <div className={css.textWrapper}>
                                <p className={css.text}>Runtime: </p>
                                 <h3 className={css.accent}>{dataMovies.runtime} min</h3>
                            </div>
                           

                        </li>
                        <li>
                            <div className={css.textWrapper}>
                                <p className={css.text}>Audience rating: </p>
                                 <h3 className={css.accent}>{dataMovies.vote_count
}</h3>
                            </div>
                           

</li>
            </ul>
            
                </div>
                
<div>
            <h3 className={css.titleOverview}>Overview</h3>
            <p className={css.textOverview}>{ dataMovies.overview}</p>
</div>
  <div><ul className={css.moreDetailsList}>
        <li className={css.moreDetailsItem}> <NavLink className={css.moreDetailsLink} to="cast">Cast</NavLink></li>
        <li className={css.moreDetailsItem}> <NavLink className={css.moreDetailsLink} to="reviews">Reviews</NavLink></li>
       </ul> </div>
       
       
        </div>
        </div>}
        <Suspense fallback={<Loader/>}>
            <Outlet />
            </Suspense>
        </>
        
    )
}




