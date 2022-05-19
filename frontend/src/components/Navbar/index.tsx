import { ReactComponent as GithubIcon } from "assets/img/Vector.svg";
import { Link } from "react-router-dom";
import "./styles.css";

function Navbar() {
  return (
    <header>
      <nav className="container">
        <div className="dsmovie-nav-content">
          <h1>DSMovie</h1>
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/cadastrar-filme">
              <li>Cadastrar</li>
            </Link>
          </ul>
          <a href="https://github.com/WilliamSoaress/">
            <div className="dsmovie-contact-container">
              <GithubIcon />
              <p className="dsmovie-contact-link">/WilliamSoaress</p>
            </div>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
