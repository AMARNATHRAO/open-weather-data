import React, { Component } from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";
import companyLogo from "../Images/mobiquity-logo-white.svg";
import "../App.css";

import { fetchFiveDayWhetherForecastDetails } from "../Repository/openweathermapRepository";

export default class CityTemparature extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const city = get(this.props, "location.state.city", "");
    const country = get(this.props, "location.state.country", "");

    fetchFiveDayWhetherForecastDetails(city, country).then((response) => {
      this.setState({
        fiveDaysForecast: get(response, "data"),
      });
    });
  }

  loadFiveDaysForecast() {
    const fiveDaysForecastList = get(this.state, "fiveDaysForecast.list", []);
    if (fiveDaysForecastList && fiveDaysForecastList.length) {
      return (
        <>
          <h4>Next 5 days forecast at 9:00</h4>
          <div className="table-responsive">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th>Date</th>
                  <th>Temparature</th>
                  <th>Sea Level</th>
                </tr>
              </thead>

              <tbody>
                {fiveDaysForecastList.map((listItem) => {
                  const cityId = get(listItem, "city.id");
                  const dt_txt = get(listItem, "dt_txt");
                  const temparature = get(listItem, "main.temp");
                  const seaLevel = get(listItem, "main.sea_level");
                  const dtInHours = new Date(`${dt_txt}`).getHours();
                  if (dtInHours === 9) {
                    return (
                      <tr key={cityId}>
                        <td>{dt_txt}</td>
                        <td>{temparature}</td>
                        <td>{seaLevel}</td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
              </tbody>
            </table>
          </div>
        </>
      );
    }
  }

  render() {
    return (
      <>
        <div className="header">
          <img src={companyLogo} alt="Company Logo" />
        </div>
        <div className="container">
          <div className="parent-table">
            <div className="table-responsive">
              <table className="table">
                <caption className="table-title">
                  City Open Weather Data
                </caption>

                <thead className="table-header">
                  <tr>
                    <th>City Name</th>
                    <th>Temparature</th>
                    <th>Sunrise Time</th>
                    <th>Sunset Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {get(this.props, "location.state.cityWhetherInfo.name")}
                    </td>
                    <td>
                      {get(
                        this.props,
                        `location.state.cityWhetherInfo.main.temp`
                      )}
                    </td>
                    <td>
                      {get(
                        this.props,
                        `location.state.cityWhetherInfo.sys.sunrise`
                      )}
                    </td>
                    <td>
                      {get(
                        this.props,
                        `location.state.cityWhetherInfo.sys.sunset`
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>{this.loadFiveDaysForecast()}</div>

            <div style={{ textAlign: "center" }}>
              <Link to="/" style={{ textDecoration: "none" }}>
                Back to Cities List
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}
