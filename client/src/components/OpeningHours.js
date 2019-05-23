import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { getHours, updateHours } from "../redux/actions/companyActions";
import Loading from "../components/layout/Loading";

class OpeningHours extends React.Component {
  constructor() {
    super();
    this.state = {
      mondayStart: "",
      mondayEnd: "",
      mondayClosed: "",
      tuesdayStart: "",
      tuesdayEnd: "",
      tuesdayClosed: "",
      wednesdayStart: "",
      wednesdayEnd: "",
      wednesdayClosed: "",
      thursdayStart: "",
      thursdayEnd: "",
      thursdayClosed: "",
      fridayStart: "",
      fridayEnd: "",
      fridayClosed: "",
      saturdayStart: "",
      saturdayEnd: "",
      saturdayClosed: "",
      sundayStart: "",
      sundayEnd: "",
      sundayClosed: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const company = this.props.company;
    this.props.getHours(company);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.companyHours.hours) {
      const companyHours = nextProps.companyHours.hours.hours[0];
      const monday = companyHours["monday"];
      const tuesday = companyHours["tuesday"];
      const wednesday = companyHours["wednesday"];
      const thursday = companyHours["thursday"];
      const friday = companyHours["friday"];
      const saturday = companyHours["saturday"];
      const sunday = companyHours["sunday"];
      this.setState({
        mondayStart: monday.start,
        mondayEnd: monday.end,
        mondayClosed: monday.closed,
        tuesdayStart: tuesday.start,
        tuesdayEnd: tuesday.end,
        tuesdayClosed: tuesday.closed,
        wednesdayStart: wednesday.start,
        wednesdayEnd: wednesday.end,
        wednesdayClosed: wednesday.closed,
        thursdayStart: thursday.start,
        thursdayEnd: thursday.end,
        thursdayClosed: thursday.closed,
        fridayStart: friday.start,
        fridayEnd: friday.end,
        fridayClosed: friday.closed,
        saturdayStart: saturday.start,
        saturdayEnd: saturday.end,
        saturdayClosed: saturday.closed,
        sundayStart: sunday.start,
        sundayEnd: sunday.end,
        sundayClosed: sunday.closed
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let newHours = {
      id: this.props.auth.company.id,
      mondayStart: this.state.mondayStart,
      mondayEnd: this.state.mondayEnd,
      mondayClosed: this.state.mondayClosed,
      tuesdayStart: this.state.tuesdayStart,
      tuesdayEnd: this.state.tuesdayEnd,
      tuesdayClosed: this.state.tuesdayClosed,
      wednesdayStart: this.state.wednesdayStart,
      wednesdayEnd: this.state.wednesdayEnd,
      wednesdayClosed: this.state.wednesdayClosed,
      thursdayStart: this.state.thursdayStart,
      thursdayEnd: this.state.thursdayEnd,
      thursdayClosed: this.state.thursdayClosed,
      fridayStart: this.state.fridayStart,
      fridayEnd: this.state.fridayEnd,
      fridayClosed: this.state.fridayClosed,
      saturdayStart: this.state.saturdayStart,
      saturdayEnd: this.state.saturdayEnd,
      saturdayClosed: this.state.saturdayClosed,
      sundayStart: this.state.sundayStart,
      sundayEnd: this.state.sundayEnd,
      sundayClosed: this.state.sundayClosed
    };
    this.props.updateHours(newHours, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  render() {
    const { errors } = this.state;
    const { loading } = this.props.companyHours;
    const { hours } = this.props.companyHours;
    let dashboardContent;
    if (hours == null || loading) {
      dashboardContent = <Loading />;
    } else {
      dashboardContent = (
        <div>
          {errors.invalidTime && (
            <div class="alert alert-danger" role="alert">
              {errors.invalidTime}
            </div>
          )}
          <form onSubmit={this.onSubmit}>
            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span style={{ width: "100px" }} className="input-group-text">
                    Mandag
                  </span>
                </div>
                <input
                  type="time"
                  aria-label="Mandag Åbningstid"
                  className={classnames("form-control", {
                    "is-invalid": errors.mondayStart
                  })}
                  name="mondayStart"
                  value={this.state.mondayStart}
                  onChange={this.onChange}
                  disabled={this.state.mondayClosed}
                />
                <input
                  type="time"
                  aria-label="Mandag Lukketid"
                  className={classnames("form-control", {
                    "is-invalid": errors.mondayEnd
                  })}
                  name="mondayEnd"
                  value={this.state.mondayEnd}
                  onChange={this.onChange}
                  disabled={this.state.mondayClosed}
                />
                <input
                  type="checkbox"
                  aria-label="Mandag Lukket"
                  className="form-control"
                  name="mondayClosed"
                  onChange={this.handleChange}
                  checked={this.state.mondayClosed}
                />
              </div>
            </div>

            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span style={{ width: "100px" }} className="input-group-text">
                    Tirsdag
                  </span>
                </div>
                <input
                  type="time"
                  aria-label="Tirsdag Åbningstid"
                  className={classnames("form-control", {
                    "is-invalid": errors.tuesdayStart
                  })}
                  name="tuesdayStart"
                  value={this.state.tuesdayStart}
                  onChange={this.onChange}
                  disabled={this.state.tuesdayClosed}
                />
                <input
                  type="time"
                  aria-label="Tirsdag Lukketid"
                  className={classnames("form-control", {
                    "is-invalid": errors.tuesdayEnd
                  })}
                  name="tuesdayEnd"
                  value={this.state.tuesdayEnd}
                  onChange={this.onChange}
                  disabled={this.state.tuesdayClosed}
                />
                <input
                  type="checkbox"
                  aria-label="Tirsdag Lukket"
                  className="form-control"
                  name="tuesdayClosed"
                  onChange={this.handleChange}
                  checked={this.state.tuesdayClosed}
                />
              </div>
            </div>

            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span style={{ width: "100px" }} className="input-group-text">
                    Onsdag
                  </span>
                </div>
                <input
                  type="time"
                  aria-label="Onsdag Åbningstid"
                  className={classnames("form-control", {
                    "is-invalid": errors.wednesdayStart
                  })}
                  name="wednesdayStart"
                  value={this.state.wednesdayStart}
                  onChange={this.onChange}
                  disabled={this.state.wednesdayClosed}
                />
                <input
                  type="time"
                  aria-label="Onsdag Lukketid"
                  className={classnames("form-control", {
                    "is-invalid": errors.wednesdayEnd
                  })}
                  name="wednesdayEnd"
                  value={this.state.wednesdayEnd}
                  onChange={this.onChange}
                  disabled={this.state.wednesdayClosed}
                />
                <input
                  type="checkbox"
                  aria-label="Onsdag Lukket"
                  className="form-control"
                  name="wednesdayClosed"
                  onChange={this.handleChange}
                  checked={this.state.wednesdayClosed}
                />
              </div>
            </div>

            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span style={{ width: "100px" }} className="input-group-text">
                    Torsdag
                  </span>
                </div>
                <input
                  type="time"
                  aria-label="Torsdag Åbningstid"
                  className={classnames("form-control", {
                    "is-invalid": errors.thursdayStart
                  })}
                  name="thursdayStart"
                  value={this.state.thursdayStart}
                  onChange={this.onChange}
                  disabled={this.state.thursdayClosed}
                />
                <input
                  type="time"
                  aria-label="Torsdag Lukketid"
                  className={classnames("form-control", {
                    "is-invalid": errors.thursdayEnd
                  })}
                  name="thursdayEnd"
                  value={this.state.thursdayEnd}
                  onChange={this.onChange}
                  disabled={this.state.thursdayClosed}
                />
                <input
                  type="checkbox"
                  aria-label="Torsdag Lukket"
                  className="form-control"
                  name="thursdayClosed"
                  onChange={this.handleChange}
                  checked={this.state.thursdayClosed}
                />
              </div>
            </div>

            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span style={{ width: "100px" }} className="input-group-text">
                    Fredag
                  </span>
                </div>
                <input
                  type="time"
                  aria-label="Fredag Åbningstid"
                  className={classnames("form-control", {
                    "is-invalid": errors.fridayStart
                  })}
                  name="fridayStart"
                  value={this.state.fridayStart}
                  onChange={this.onChange}
                  disabled={this.state.fridayClosed}
                />
                <input
                  type="time"
                  aria-label="Fredag Lukketid"
                  className={classnames("form-control", {
                    "is-invalid": errors.fridayEnd
                  })}
                  name="fridayEnd"
                  value={this.state.fridayEnd}
                  onChange={this.onChange}
                  disabled={this.state.fridayClosed}
                />
                <input
                  type="checkbox"
                  aria-label="Fredag Lukket"
                  className="form-control"
                  name="fridayClosed"
                  onChange={this.handleChange}
                  checked={this.state.fridayClosed}
                />
              </div>
            </div>

            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span style={{ width: "100px" }} className="input-group-text">
                    Lørdag
                  </span>
                </div>
                <input
                  type="time"
                  aria-label="Lørdag Åbningstid"
                  className={classnames("form-control", {
                    "is-invalid": errors.saturdayStart
                  })}
                  name="saturdayStart"
                  value={this.state.saturdayStart}
                  onChange={this.onChange}
                  disabled={this.state.saturdayClosed}
                />
                <input
                  type="time"
                  aria-label="Lørdag Lukketid"
                  className={classnames("form-control", {
                    "is-invalid": errors.saturdayEnd
                  })}
                  name="saturdayEnd"
                  value={this.state.saturdayEnd}
                  onChange={this.onChange}
                  disabled={this.state.saturdayClosed}
                />
                <input
                  type="checkbox"
                  aria-label="Lørdag Lukket"
                  className="form-control"
                  name="saturdayClosed"
                  onChange={this.handleChange}
                  checked={this.state.saturdayClosed}
                />
              </div>
            </div>

            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span style={{ width: "100px" }} className="input-group-text">
                    Søndag
                  </span>
                </div>
                <input
                  type="time"
                  aria-label="Søndag Åbningstid"
                  className={classnames("form-control", {
                    "is-invalid": errors.sundayStart
                  })}
                  name="sundayStart"
                  value={this.state.sundayStart}
                  onChange={this.onChange}
                  disabled={this.state.sundayClosed}
                />
                <input
                  type="time"
                  aria-label="Søndag Lukketid"
                  className={classnames("form-control", {
                    "is-invalid": errors.sundayEnd
                  })}
                  name="sundayEnd"
                  value={this.state.sundayEnd}
                  onChange={this.onChange}
                  disabled={this.state.sundayClosed}
                />
                <input
                  type="checkbox"
                  aria-label="Søndag Lukket"
                  className="form-control"
                  name="sundayClosed"
                  onChange={this.handleChange}
                  checked={this.state.sundayClosed}
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Gem"
                name="gem"
                id="gem"
                className="fullWidth btn btn-success mt-3"
              />
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="hvordan display-4 text-left mb-4">Åbningstider</h2>
            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }
}

OpeningHours.propTypes = {
  getHours: PropTypes.func.isRequired,
  updateHours: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  companyHours: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  company: state.auth.company,
  companyHours: state.hours,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getHours, updateHours }
)(OpeningHours);
