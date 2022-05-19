
import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Movie } from "types/movie";
import { BASE_URL } from "utils/requests";
import { validateEmail } from "utils/validate";
import "./styles.css";

console.log("teste")

type Props = {
  movieId: string;
};
function RegisterCard({ movieId }: Props) {

  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = (event.target as any).title.value;
    const image = (event.target as any).image.value;
    const trailer = (event.target as any).trailer.value;


    const config: AxiosRequestConfig = {
      baseURL: BASE_URL,
      method: 'POST',
      url: '/movies/register',
      data: {
        movieId: movieId,
        title: title,
        image: image,
        trailer: trailer
      }
    }

    axios(config).then(response => {
      navigate("/");
    })
  };

  
 

  return (

    <div className="dsmovie-form-container">

      <div className="dsmovie-card-bottom-container">
        <h3>Cadastro de filmes</h3>
        <form className="dsmovie-form" onSubmit={handleSubmit}>
          <div className="form-group dsmovie-form-group">
            <label htmlFor="title">Informe o título do filme</label>
            <input type="text" className="form-control" id="title" />
          </div>
          <div className="form-group dsmovie-form-group">
            <label htmlFor="image">Informe o endereço da imagem do filme</label>
            <input type="url" className="form-control" id="image" />
          </div>
          <div className="form-group dsmovie-form-group">
            <label htmlFor="trailer">Informe o endereço do trailer do filme</label>
            <input type="url" className="form-control" id="trailer" />
          </div>

          <div className="dsmovie-form-btn-container">
            <button type="submit" className="btn btn-primary dsmovie-btn">
              Salvar
            </button>
          </div>
        </form>
          <button className="btn btn-primary dsmovie-btn mt-3">Cancelar</button>
     
      </div>
    </div>
  );
}

export default RegisterCard;
