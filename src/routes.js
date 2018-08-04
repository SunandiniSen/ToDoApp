import React from "react";
// import { Route, Router } from "react-router";
import {BrowserRouter as Router, Route} from "react-router-dom";
import App from "./components/app";
import ToDo from "./components/ToDo";

export default (
  <Router>
    <App>
      <Route path="/" component={ToDo} />
    </App>
  </Router>
);
