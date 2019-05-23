import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import {
  updateCompanyProfile,
  getCompany
} from "../redux/actions/companyActions";
import Loading from "../components/layout/Loading";
import isEmpty from "../validation/is-empty";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      zipcode: "",
      city: "",
      email: "",
      email2: "",
      phone: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCompany();
  }

  // clearCurrentCompany;

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.company.company) {
      const company = nextProps.company.company;

      company.name = !isEmpty(company.name) ? company.name : "";
      company.address = !isEmpty(company.address) ? company.address : "";
      company.zipcode = !isEmpty(company.zipcode) ? company.zipcode : "";
      company.city = !isEmpty(company.city) ? company.city : "";
      company.email = !isEmpty(company.email) ? company.email : "";
      company.email2 = !isEmpty(company.email2) ? company.email2 : "";
      company.phone = !isEmpty(company.phone) ? company.phone : "";

      this.setState({
        companyId: company.company._id,
        name: company.name,
        address: company.address,
        zipcode: company.zipcode,
        city: company.city,
        email2: company.email,
        email: company.company.email,
        phone: company.phone
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const companyProfile = {
      id: this.state.companyId,
      name: this.state.name,
      address: this.state.address,
      zipcode: this.state.zipcode.toString(),
      city: this.state.city,
      email: this.state.email,
      email2: this.state.email2,
      phone: this.state.phone.toString(),
      password: this.state.password
    };

    this.props.updateCompanyProfile(companyProfile, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const { company, loading } = this.props.company;

    let dashboardContent;

    if (company == null || loading) {
      dashboardContent = <Loading />;
    } else {
      dashboardContent = (
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Navn</label>
            <input
              type="text"
              id="name"
              className={classnames("form-control", {
                "is-invalid": errors.name
              })}
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="name">Adresse</label>
            <input
              type="text"
              id="address"
              className={classnames("form-control", {
                "is-invalid": errors.address
              })}
              name="address"
              value={this.state.address}
              onChange={this.onChange}
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="name">Post nr.</label>
            <input
              type="number"
              id="zipcode"
              className={classnames("form-control", {
                "is-invalid": errors.zipcode
              })}
              name="zipcode"
              value={this.state.zipcode}
              onChange={this.onChange}
            />
            {errors.zipcode && (
              <div className="invalid-feedback">{errors.zipcode}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="name">By</label>
            <input
              type="text"
              id="city"
              className={classnames("form-control", {
                "is-invalid": errors.city
              })}
              name="city"
              value={this.state.city}
              onChange={this.onChange}
            />
            {errors.city && (
              <div className="invalid-feedback">{errors.city}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="name">E-mail</label>
            <input
              type="email"
              id="email2"
              className="form-control"
              name="email2"
              value={this.state.email2}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Telefonnummer</label>
            <input
              type="number"
              id="phone"
              className={classnames("form-control", {
                "is-invalid": errors.phone
              })}
              name="phone"
              value={this.state.phone}
              onChange={this.onChange}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>
          <hr />
          <h2 className="hvordan display-4 text-left mb-4">Firma login</h2>

          <div className="form-group">
            <label htmlFor="name">E-mail</label>
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
            <label htmlFor="name">Password</label>
            <input
              type="password"
              id="password"
              className={classnames("form-control", {
                "is-invalid": errors.password
              })}
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
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
        </form>
      );
    }

    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="hvordan display-4 text-left mb-4">Firmaprofil</h2>
            {errors.message && (
              <div className="alert alert-danger">{errors.message}</div>
            )}
            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getCompany: PropTypes.func.isRequired,
  updateCompanyProfile: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  company: state.company,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCompany, updateCompanyProfile }
)(withRouter(Profile));
