import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerCompany } from "../redux/actions/authActions";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      cvr: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newCompany = {
      email: this.state.email,
      cvr: this.state.cvr,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerCompany(newCompany, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="hvordan display-4 text-left mb-4">
              Opret virksomhed
            </h2>

            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  className={classnames("form-control", {
                    "is-invalid": errors.email
                  })}
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="cvr">CVR.</label>
                <input
                  id="cvr"
                  type="text"
                  name="cvr"
                  className={classnames("form-control", {
                    "is-invalid": errors.cvr
                  })}
                  value={this.state.cvr}
                  onChange={this.onChange}
                />
                {errors.cvr && (
                  <div className="invalid-feedback">{errors.cvr}</div>
                )}
              </div>

              <div className="form-group mb-4">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className={classnames("form-control", {
                    "is-invalid": errors.password
                  })}
                  value={this.state.password}
                  onChange={this.onChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              <div className="form-group mb-4">
                <label htmlFor="password">Password Confirmation</label>
                <input
                  id="password2"
                  type="password"
                  className={classnames("form-control", {
                    "is-invalid": errors.password2
                  })}
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
                {errors.password2 && (
                  <div className="invalid-feedback">{errors.password2}</div>
                )}
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  value="Opret"
                  name="opret"
                  id="opret"
                  className="fullWidth btn btn-success"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerCompany: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerCompany }
)(withRouter(Register));
