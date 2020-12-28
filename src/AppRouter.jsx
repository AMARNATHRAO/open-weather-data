import React, { Component } from "react";
import {
  BrowserRouter as Router,
  //   Redirect,
  Route,
  Switch,
} from "react-router-dom";
import CitiesList from "./Components/CitiesList";
import CityTemparature from "./Components/CityTemparature";

export default class AppRouter extends Component {
  render() {
    return (
      // <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/city-temparature" component={CityTemparature} />
          <Route path="/" component={CitiesList} />
        </Switch>
      </Router>
      // </Provider>
    );
  }
}
