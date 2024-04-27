
import { Link } from "react-router-dom";

import css from "./MovieList.module.css"

export default function MovieList({movies}) {
    return (
        <ul className={css.movieList}>
            {movies.map((movie) => (
                <li className={css.movieListItem} key={movie.id}>
                    <Link className={css.link} to={`/movies/${movie.id}`}>
                    <div>
              <img className={css.img}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                width={300}
                height={450}
                            />
                 <h3 className={css.movieNameTitle}>{movie.title}</h3>           
            </div></Link>
                </li>
            ))}
        </ul>
    )
}