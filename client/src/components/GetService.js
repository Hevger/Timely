import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import Loading from "../components/layout/Loading";
import {
  getService,
  updateService,
  deleteService
} from "../redux/actions/companyActions";

class GetService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      time: "",
      price: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const serviceId = this.props.match.params.id;
    this.props.getService(serviceId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.currentService) {
      const currentService = nextProps.currentService;
      this.setState({
        id: currentService._id,
        name: currentService.name,
        time: currentService.time,
        price: currentService.price
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const serviceData = {
      id: this.props.currentService._id.toString(),
      name: this.state.name,
      time: this.state.time.toString(),
      price: this.state.price.toString()
    };
    this.props.updateService(serviceData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  deleteItem() {
    const serviceId = this.props.currentService._id;
    this.props.deleteService(serviceId, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { currentService, loading } = this.props;

    let dashboardContent;
    if (errors.service) {
      dashboardContent = (
        <div>
          {errors.service && (
            <div className="alert alert-danger mt-3">{errors.service}</div>
          )}
        </div>
      );
    } else if (currentService == null || loading) {
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
              name="Slet"
              id="Slet"
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
            <h2 className="hvordan display-4 text-left mb-4">Rediger Ydelse</h2>
            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }
}

GetService.propTypes = {
  getService: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentService: state.services.currentService,
  company: state.auth.company,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getService, updateService, deleteService }
)(withRouter(GetService));
