import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { addNewEmployee } from "../redux/actions/companyActions";

class AddEmployee extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newEmployee = {
      id: this.props.company.id,
      name: this.state.name,
      description: this.state.description
    };

    this.props.addNewEmployee(newEmployee, this.props.history);
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
              Tilføj Medarbejder
            </h2>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Navn</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  className={classnames("form-control", {
                    "is-invalid": errors.name
                  })}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="name">Beskrivelse</label>
                <input
                  type="text"
                  id="description"
                  className="form-control"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  value="Tilføj"
                  name="add"
                  id="add"
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

AddEmployee.propTypes = {
  addNewEmployee: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  company: state.auth.company,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addNewEmployee }
)(withRouter(AddEmployee));
