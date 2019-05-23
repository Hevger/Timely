import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { addNewService } from "../redux/actions/companyActions";

class AddService extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      time: "",
      price: "",
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

    const newService = {
      id: this.props.company.id,
      name: this.state.name,
      time: this.state.time,
      price: this.state.price
    };

    this.props.addNewService(newService, this.props.history);
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
            <h2 className="hvordan display-4 text-left mb-4">Tilføj Ydelse</h2>
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
                <label htmlFor="name">Tid</label>
                <input
                  type="number"
                  id="time"
                  name="time"
                  value={this.state.time}
                  onChange={this.onChange}
                  className={classnames("form-control", {
                    "is-invalid": errors.time
                  })}
                />
                {errors.time && (
                  <div className="invalid-feedback">{errors.time}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="name">Pris</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  className={classnames("form-control", {
                    "is-invalid": errors.price
                  })}
                />
                {errors.price && (
                  <div className="invalid-feedback">{errors.price}</div>
                )}
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

AddService.propTypes = {
  addNewService: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  company: state.auth.company,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addNewService }
)(withRouter(AddService));
