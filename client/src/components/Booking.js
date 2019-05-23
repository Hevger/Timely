import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getBookings,
  calculateServices,
  createBooking
} from "../redux/actions/companyActions";
import Loading from "../components/layout/Loading";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import timeGrid from "@fullcalendar/timegrid";
import interaction from "@fullcalendar/interaction";
import daLocale from "@fullcalendar/core/locales/da";

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: "",
      customerPhone: "",
      date: "",
      empoloyee: "",
      selectedServices: [],
      startTime: null,
      bookings: null,
      errors: {}
    };

    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const receivedData = this.props.location.state;
    if (receivedData.data) {
      this.setState({
        customerName: receivedData.data.name,
        customerPhone: receivedData.data.phone,
        date: receivedData.data.date,
        empoyee: receivedData.data.employee,
        selectedServices: receivedData.data.selectedServices
      });
    }
    this.props.calculateServices(receivedData.data);
    const employeeId = this.props.match.params.id;
    this.props.getBookings(employeeId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.bookings) {
      this.setState({
        bookings: nextProps.bookings.bookings
      });
    }
    if (nextProps.bookings.totalTime) {
      this.setState({
        totalTime: nextProps.bookings.totalTime.totalTime
      });
    }
  }

  handleClick(newItem) {
    newItem.date = moment(this.state.date).format("DD-MM-YYYY");
    this.props.createBooking(newItem, this.props.history);
  }

  render() {
    const { loading, bookings } = this.props.bookings;
    const items = this.props.bookings.bookings.map((item, key) => ({
      id: item._id,
      title: "Reserveret",
      backgroundColor: "#ff9393",
      start: item.startTime,
      end: item.endTime,
      allDay: false,
      eventStartEditable: false,
      eventDurationEditable: false,
      editable: false
    }));

    const newItem = {
      id: 1,
      title: "Din booking",
      customerName: this.state.customerName,
      customerPhone: this.state.customerPhone,
      startTime: "00:00",
      endTime: "00:40",
      date: this.state.date,
      allDay: false,
      backgroundColor: "#a3ff99",
      startEditable: true,
      eventStartEditable: true,
      selectedServices: this.state.selectedServices.join(","),
      services: this.state.selectedServices.join(","),
      employee: this.props.match.params.id
    };

    function addMinutes(time, minsToAdd) {
      function D(J) {
        return (J < 10 ? "0" : "") + J;
      }
      var piece = time.split(":");
      var mins = piece[0] * 60 + +piece[1] + +minsToAdd;
      return D(((mins % (24 * 60)) / 60) | 0) + ":" + D(mins % 60);
    }

    newItem.endTime = addMinutes(newItem.startTime, this.state.totalTime);

    items.push(newItem);

    let date = new Date(newItem.date);
    let options;
    if (this.state.date) {
      let newDate =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2);
      options = {
        customButtons: {
          confirmBooking: {
            text: "Bekræft booking",
            click: this.handleClick.bind(this, newItem)
          }
        },
        header: {
          left: "title",
          right: "confirmBooking"
        },
        defaultDate: newDate
      };
    }

    let updateEventTime = time => {
      newItem.startTime = time;
      newItem.endTime = addMinutes(newItem.startTime, this.state.totalTime);
    };

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
            eventDrop={function(info) {
              updateEventTime(moment(info.event.start).format("HH:mm"));
            }}
            {...options}
          />
        </div>
      );
    }

    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="hvordan display-4 text-left mb-4">Tids booking</h2>
            <i>
              Placer din booking hvor det passer dig og tryk derefter på bekræft
              booking
            </i>
            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }
}

Booking.propTypes = {
  getBookings: PropTypes.func.isRequired,
  createBooking: PropTypes.func.isRequired,
  calculateServices: PropTypes.func.isRequired,
  employees: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  employees: state.employees,
  bookings: state.bookings,
  services: state.services,
  totalTime: state.bookings.totalTime,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getBookings, calculateServices, createBooking }
)(withRouter(Booking));
