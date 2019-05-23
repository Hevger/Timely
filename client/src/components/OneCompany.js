import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getEmployees, getServices } from "../redux/actions/companyActions";
import Loading from "../components/layout/Loading";
import moment from "moment";

class OneCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: {},
      services: {},
      name: "",
      phone: "",
      date: "",
      employee: "",
      selectedServices: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.handleOptions = this.handleOptions.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const company = {
      id: this.props.match.params.id
    };
    const companyId = this.props.match.params.id;
    this.props.getEmployees(companyId);
    this.props.getServices(company);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.employees.employees) {
      const currentEmployees = nextProps.employees.employees;
      this.setState({
        employees: currentEmployees
      });
    }
    if (nextProps.services.services) {
      const currentServices = nextProps.services.services;
      this.setState({
        services: currentServices
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const data = {
      name: this.state.name,
      phone: this.state.phone,
      date: this.state.date,
      employee: this.state.employee,
      selectedServices: this.state.selectedServices
    };
    const employeeId = data.employee;
    this.props.history.push("/booking/" + employeeId, { data: data });
  }

  handleOptions(e) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ selectedServices: value });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const now = new Date();
    const todaysDate = moment(now).format("YYYY-MM-DD");
    const { errors } = this.state;
    const { loading } = this.props.employees;
    const items = this.props.employees.employees.map((item, key) => (
      <option
        key={item._id}
        value={item._id}
        style={{ textDecoration: "none", color: "#000000" }}
      >
        {item.name}
      </option>
    ));

    const serviceItems = this.props.services.services.map((item, key) => (
      <option key={item._id} value={item._id}>
        {item.name}
      </option>
    ));

    let dashboardContent;

    if (errors.employee) {
      dashboardContent = (
        <div>
          {errors.employee && (
            <div className="alert alert-danger mt-3">{errors.employee}</div>
          )}
        </div>
      );
    } else if (loading) {
      dashboardContent = <Loading />;
    } else {
      dashboardContent = (
        <form onSubmit={this.onSubmit}>
          <div>
            <div className="form-group">
              <label>Navn</label>
              <input
                onChange={this.onChange}
                type="text"
                name="name"
                id="name"
                value={this.state.name}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Tlf.</label>
              <input
                onChange={this.onChange}
                type="number"
                name="phone"
                id="phone"
                value={this.state.phone}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Dato</label>
              <input
                onChange={this.onChange}
                type="date"
                name="date"
                id="dato"
                value={this.state.date}
                min={todaysDate}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Medarbjeder</label>
              <select
                id="employee"
                name="employee"
                onChange={this.onChange}
                className="form-control"
                required
              >
                <option value="">Vælg...</option>
                {items}
              </select>
            </div>

            <div className="form-group">
              <label>Ydelser</label>
              <select
                name="selectedServices"
                multiple
                onChange={this.handleOptions}
                className="form-control"
                required
              >
                {serviceItems}
              </select>
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Find ledig tid"
              name="find"
              id="find"
              className="fullWidth btn btn-success"
            />
          </div>
        </form>
      );
    }

    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="hvordan display-4 text-left mb-4">Tids booking</h2>
            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }
}

OneCompany.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  getServices: PropTypes.func.isRequired,
  employees: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  employees: state.employees,
  services: state.services,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getEmployees, getServices }
)(withRouter(OneCompany));
