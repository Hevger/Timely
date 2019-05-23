import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/layout/PrivateRoute";

import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Companies from "./components/Companies";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Employees from "./components/Employees";
import AddEmployee from "./components/AddEmployee";
import GetEmployee from "./components/GetEmployee";
import GetService from "./components/GetService";
import Services from "./components/Services";
import AddService from "./components/AddService";
import OpeningHours from "./components/OpeningHours";
import BookingOverview from "./components/BookingOverview";
import OneCompany from "./components/OneCompany";
import Booking from "./components/Booking";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/companies" component={Companies} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/company/:id" component={OneCompany} />
        <Route exact path="/booking/:id" component={Booking} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/dashboard/profile" component={Profile} />
        <PrivateRoute
          exact
          path="/dashboard/openingHours"
          component={OpeningHours}
        />
        <PrivateRoute exact path="/dashboard/services" component={Services} />
        <PrivateRoute exact path="/dashboard/employees" component={Employees} />
        <PrivateRoute
          exact
          path="/dashboard/bookingOverview/:id"
          component={BookingOverview}
        />
        <PrivateRoute
          exact
          path="/dashboard/addService"
          component={AddService}
        />
        <PrivateRoute
          exact
          path="/dashboard/addEmployee"
          component={AddEmployee}
        />
        <PrivateRoute
          exact
          path="/dashboard/epmployee/:id"
          component={GetEmployee}
        />
        <PrivateRoute
          exact
          path="/dashboard/service/:id"
          component={GetService}
        />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
