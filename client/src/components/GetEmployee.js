import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import Loading from "../components/layout/Loading";
import {
  getEmployee,
  updateEmployee,
  deleteEmployee
} from "../redux/actions/companyActions";

class GetEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      currentEmployee: null,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.currentEmployee = null;
    const employeeId = this.props.match.params.id;
    this.props.getEmployee(employeeId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.currentEmployee) {
      const currentEmployee = nextProps.currentEmployee;
      this.setState({
        name: currentEmployee.name,
        description: currentEmployee.description
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const employeeData = {
      id: this.props.currentEmployee._id,
      name: this.state.name,
      description: this.state.description
    };
    this.props.updateEmployee(employeeData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  deleteItem() {
    const employeeId = this.props.currentEmployee._id;
    this.props.deleteEmployee(employeeId, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { currentEmployee, loading } = this.props;

    let dashboardContent;
    if (errors.message) {
      dashboardContent = (
        <div>
          {errors.message && (
            <div className="alert alert-danger mt-3">{errors.message}</div>
          )}
        </div>
      );
    } else if (errors.employee) {
      dashboardContent = (
        <div>
          {errors.employee && (
            <div className="alert alert-danger mt-3">{errors.employee}</div>
          )}
        </div>
      );
    } else if (currentEmployee == null || loading) {
      dashboardContent = <Loading />;
    } else {
      dashboardContent = (
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
              value="Gem"
              name="gem"
              id="gem"
              className="fullWidth btn btn-success"
            />
          </div>

          <div className="form-group">
            <input
              onClick={this.deleteItem.bind(this)}
              type="submit"
              value="Slet"
              name="slet"
              id="slet"
              className="fullWidth btn btn-danger"
            />
          </div>
        </form>
      );
    }

    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="hvordan display-4 text-left mb-4">
              Rediger Medarbejder
            </h2>
            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }
}

GetEmployee.propTypes = {
  getEmployee: PropTypes.func.isRequired,
  updateEmployee: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentEmployee: state.employees.currentEmployee,
  company: state.auth.company,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getEmployee, deleteEmployee, updateEmployee }
)(withRouter(GetEmployee));
