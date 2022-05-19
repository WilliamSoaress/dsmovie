
import RegisterCard from "components/RegisterCard";
import { useParams } from "react-router-dom";

function Register() {
  const params = useParams();

  return ( 
  <RegisterCard movieId={`${params.movieId}`}/>
  );
}

export default Register;
