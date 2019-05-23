import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getBookings } from "../redux/actions/companyActions";
import Loading from "../components/layout/Loading";

import FullCalendar from "@fullcalendar/react";
import timeGrid from "@fullcalendar/timegrid";
import daLocale from "@fullcalendar/core/locales/da";
import interaction from "@fullcalendar/interaction";
// import dayGridPlugin from "@fullcalendar/daygrid";

class BookingOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: null,
      errors: {}
    };
  }

  componentDidMount() {
    this.currentEmployee = null;
    const employeeId = this.props.match.params.id;
    this.props.getBookings(employeeId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.bookings.bookings) {
      this.setState({
        bookings: nextProps.bookings.bookings
      });
    }
  }

  render() {
    const { loading, bookings } = this.props.bookings;

    const items = this.props.bookings.bookings.map((item, key) => ({
      title: item.customerName + " - " + item.customerPhone,
      backgroundColor: "#ff9393",
      start: item.startTime,
      end: item.endTime,
      allDay: false
    }));
    console.log(items);

    let dashboardContent;

    if (bookings == null || loading) {
      dashboardContent = <Loading />;
    } else {
      dashboardContent = (
        <div id="calendar-container">
          <FullCalendar
            eventTextColor="black"
            timeZone="local"
            locale={daLocale}
            defaultView="timeGridDay"
            plugins={[interaction, timeGrid]}
            allDaySlot={false}
            contentHeight={600}
            events={items}
            eventOverlap={false}
            slotDuration={"00:05:00"}
            slotLabelInterval={"01:00:00"}
          />
        </div>
      );
    }

    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="hvordan display-4 text-left">Booking</h2>
            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }
}

BookingOverview.propTypes = {
  getBookings: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bookings: state.bookings,
  company: state.auth.company,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getBookings }
)(withRouter(BookingOverview));
