import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

function NavBar(props) {
  const authCtx = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-sm bg-success mb-5">
      <div className="container">
        <a className="navbar-brand" href="#">
          Task App
        </a>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {authCtx.isLogedIn && (
                <div className="d-flex">
                  <Link to="/">
                    <button className="btn btn-light" onClick={props.onLogout}>
                      Log Out
                    </button>
                  </Link>
                </div>
              )}
            </li>
          </ul>
          {!authCtx.isLogedIn && (
            <div className="d-flex m-2">
              <Link to="/login">
                <button className="btn btn-light">Log In</button>
              </Link>
            </div>
          )}
          {authCtx.isLogedIn && (
            <div className="d-flex m-2">
              <button className="btn btn-light" onClick={props.handleFormOpen}>
                Add New Task
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
