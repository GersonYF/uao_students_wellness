import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../UserContext';

const Navbar = () => {
  const { user, setShowModal } = useUserContext();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          UAO Salud y Bienestar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className='nav-item'>
            <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                <span className="bi bi-plus"></span>&nbsp;Crear nuevo formulario
              </button>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/notifications">
                <i className="bi bi-bell"></i>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.fullname}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/signup">
                    Ver perfil
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/logout">
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
