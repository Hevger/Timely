import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../components/layout/Loading";
import { getEmployees } from "../redux/actions/companyActions";
import { Link } from "react-router-dom";

class Employees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: {},
      errors: {}
    };
  }

  componentDidMount() {
    const company = this.props.company;
    this.props.getEmployees(company.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.employees.employees.length <= 0) {
      const companyEmployees = nextProps.employees.employees;
      this.setState({
        employees: companyEmployees
      });
    }
  }

  render() {
    const { errors } = this.state;
    const { loading } = this.props.employees;

    const items = this.props.employees.employees.map((item, key) => (
      <div
        key={item._id}
        className="card text-center"
        style={{ width: "18rem", margin: "20px" }}
      >
        <img
          src="https://via.placeholder.com/200"
          className="card-img-top"
          alt="Employee img"
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
          <Link
            to={"/dashboard/epmployee/" + item._id}
            className="btn btn-primary"
          >
            Rediger
          </Link>
        </div>
      </div>
    ));

    let dashboardContent;

    if (errors.employees) {
      dashboardContent = (
        <div>
          {errors.employees && (
            <div className="alert alert-danger mt-3">{errors.employees}</div>
          )}
        </div>
      );
    } else if (loading) {
      dashboardContent = <Loading />;
    } else {
      dashboardContent = <div className="d-flex">{items}</div>;
    }

    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="hvordan display-4 text-left mb-4">Medarbejdere</h2>
            <div className="text-right">
              <Link to="/dashboard/addEmployee">
                <button type="button" className="btn btn-success">
                  Tilføj medarbejdere
                </button>
              </Link>
            </div>

            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }
}

Employees.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  employees: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  employees: state.employees,
  company: state.auth.company,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getEmployees }
)(withRouter(Employees));
