import React from "react";
import Logo from "../../img/logo.png";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutCompany } from "../../redux/actions/authActions";
import { clearCurrentCompany } from "../../redux/actions/companyActions";

class Header extends React.Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentCompany();
    this.props.logoutCompany();
  }

  render() {
    const activeStyle = { color: "#006400", fontWeight: "bold" };
    const { isAuthenticated } = this.props.auth;
    const authLinks = (
      <div className="nav navbar-nav ml-auto">
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          onClick={this.onLogoutClick.bind(this)}
        >
          Log ud
        </button>
      </div>
    );

    const notLoggedInLinks = (
      <div className="nav navbar-nav ml-auto">
        <NavLink to="/login">
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Log ind
          </button>
        </NavLink>
        &nbsp;&nbsp;&nbsp;
        <NavLink to="/register">
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Opret virksomhed
          </button>
        </NavLink>
      </div>
    );

    const visitorLinks = (
      <div className="navbar-nav">
        <NavLink
          to="/"
          className="nav-item nav-link"
          activeStyle={activeStyle}
          exact
        >
          Forside
        </NavLink>
        <NavLink
          to="/companies"
          className="nav-item nav-link"
          activeStyle={activeStyle}
        >
          Virksomheder
        </NavLink>
        <NavLink
          to="/about"
          className="nav-item nav-link"
          activeStyle={activeStyle}
        >
          Om
        </NavLink>
        {/* <a className="nav-item nav-link" href="#">
                Kontakt
              </a> */}
        <NavLink
          to="/contact"
          className="nav-item nav-link"
          activeStyle={activeStyle}
        >
          Kontakt
        </NavLink>
      </div>
    );

    const companyLinks = (
      <div className="navbar-nav">
        <NavLink
          to="/dashboard"
          className="nav-item nav-link"
          activeStyle={activeStyle}
          exact
        >
          Booking
        </NavLink>
        <NavLink
          to="/dashboard/profile"
          className="nav-item nav-link"
          activeStyle={activeStyle}
        >
          Firmaprofil
        </NavLink>
        {/* <a className="nav-item nav-link" href="#">
                Kontakt
              </a> */}
        <NavLink
          to="/dashboard/employees"
          className="nav-item nav-link"
          activeStyle={activeStyle}
        >
          Medarbejdere
        </NavLink>

        <NavLink
          to="/dashboard/services"
          className="nav-item nav-link"
          activeStyle={activeStyle}
        >
          Ydelser
        </NavLink>
        <NavLink
          to="/contact"
          className="nav-item nav-link"
          activeStyle={activeStyle}
        >
          Kundeservice
        </NavLink>
      </div>
    );

    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          {/* <a className="navbar-brand" href="/">
            <img src={Logo} className="img-responsive ml-5 maxWidth" />
          </a> */}
          <NavLink to="/" className="navbar-brand" href="/">
            <img
              src={Logo}
              className="img-responsive ml-5 maxWidth"
              alt="company logo"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            {isAuthenticated ? companyLinks : visitorLinks}
            {isAuthenticated ? authLinks : notLoggedInLinks}
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  logoutCompany: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutCompany, clearCurrentCompany }
)(Header);
