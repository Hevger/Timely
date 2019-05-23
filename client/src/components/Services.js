import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../components/layout/Loading";
import { getServices } from "../redux/actions/companyActions";
import { Link } from "react-router-dom";

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: {},
      errors: {}
    };
  }

  componentDidMount() {
    const company = this.props.company;
    this.props.getServices(company);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.services.services) {
      const compamnySerivces = nextProps.services.services;
      this.setState({
        services: compamnySerivces
      });
    }
  }

  render() {
    const { errors } = this.state;
    const { loading } = this.props.services;

    const items = this.props.services.services.map((item, key) => (
      <div
        key={item._id}
        className="card text-center"
        style={{ width: "18rem", margin: "20px" }}
      >
        <img
          src="https://via.placeholder.com/200"
          className="card-img-top"
          alt="Service img"
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.price} DKK</p>
          <Link
            to={"/dashboard/service/" + item._id}
            className="btn btn-primary"
          >
            Rediger
          </Link>
        </div>
      </div>
    ));

    let dashboardContent;

    if (errors.services) {
      dashboardContent = (
        <div>
          {errors.services && (
            <div className="alert alert-danger mt-3">{errors.services}</div>
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
            <h2 className="hvordan display-4 text-left mb-4">Ydelser</h2>
            <div className="text-right">
              <Link to="/dashboard/addService">
                <button type="button" className="btn btn-success">
                  Tilføj Ydelse
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

Services.propTypes = {
  getServices: PropTypes.func.isRequired,
  services: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  services: state.services,
  company: state.auth.company,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getServices }
)(withRouter(Services));
