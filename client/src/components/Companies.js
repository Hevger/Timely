import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCompanies } from "../redux/actions/companyActions";
import Loading from "../components/layout/Loading";

class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: {},
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCompanies();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.companies.companies) {
      const currentCompanies = nextProps.companies.companies;
      this.setState({
        companies: currentCompanies
      });
    }
  }

  render() {
    const { errors } = this.state;
    const { loading } = this.props.companies;
    const items = this.props.companies.companies.map((item, key) => (
      <Link
        style={{ textDecoration: "none", color: "#000000" }}
        key={item.company._id}
        to={"/company/" + item.company._id}
      >
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-2">
              <img
                src="https://nacca.ca/wp-content/uploads/2018/10/photo-coming-soon.jpg"
                className="companyImage card-img"
                alt="company profile"
              />
            </div>
            <div className="col-md-10">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <div className="card-text">
                  {item.address} - {item.zipcode} {item.city}
                  {item.company.cvr && <p>CVR: {item.company.cvr}</p>}
                </div>
                <div className="card-text">
                  <small className="text-muted">
                    {item.phone && <div>Tlf: {item.phone}</div>}
                    {item.email && <div>Email: {item.email}</div>}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    ));

    let dashboardContent;

    if (errors.nocompanies) {
      dashboardContent = (
        <div>
          {errors.nocompanies && (
            <div className="alert alert-danger mt-3">{errors.nocompanies}</div>
          )}
        </div>
      );
    } else if (loading) {
      dashboardContent = <Loading />;
    } else {
      dashboardContent = <div>{items}</div>;
    }

    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="hvordan display-4 text-left mb-4">Virksomheder</h2>
            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }
}

Company.propTypes = {
  getCompanies: PropTypes.func.isRequired,
  companies: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  companies: state.companies,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCompanies }
)(withRouter(Company));
