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
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/dashboard/profile" component={Profile} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
