import MovieScore from "components/MovieScore";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Movie } from "types/movie";

import "./styles.css";

type Props = {
  movie: Movie;
  deleteMovie: Function;
};

function MovieCard({ movie, deleteMovie }: Props) {
  return (
    <div>
      <img
        className="dsmovie-movie-card-image"
        src={movie.image}
        alt={movie.title}
      />
      <div className="dsmovie-card-bottom-container">
        <h3>{movie.title}</h3>
        <MovieScore count={movie.count} score={movie.score} />

        <Link to={`/form/${movie.id}`}>
          <div className="btn btn-primary dsmovie-btn">Avaliar</div>
        </Link>

        <div>
          <a
            className="btn btn-primary dsmovie-btn"
            href={movie.trailer}
            target="_blank"
            rel="noreferrer"
          >
            Trailer
          </a>
        </div>
        <div>
          <div style={{ color: "var(--color-primary)" }}>
            <Link to={`/edit-movie/${movie.id}`}>
              <FiEdit className="m-1" size={25} />
            </Link>
            <RiDeleteBin6Line
              className="m-1"
              size={25}
              onClick={() => deleteMovie(movie.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
