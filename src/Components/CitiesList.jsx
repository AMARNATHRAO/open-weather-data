import React, { Component } from "react";
import { get } from "lodash";
import { Link } from "react-router-dom";
import { fetchWhetherDetails } from "../Repository/openweathermapRepository";
import companyLogo from "../Images/mobiquity-logo-white.svg";
import "../App.css";

export default class CitiesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      citiesList: [
        "Berlin, Germany - DE",
        "Copenhagen, Denmark - DK",
        "London, England - UK",
        "Athens, Greece - GR",
        "Amsterdam, The Netherlands - NL",
      ],
    };
  }

  componentDidMount() {
    const { citiesList } = this.state;
    if (citiesList && citiesList.length) {
      for (let i = 0; i < citiesList.length; i += 1) {
        const cityAndCountry = citiesList[i];
        const aCityCountry = cityAndCountry.split("-");
        const city = aCityCountry[0];
        const country = aCityCountry[1];

        fetchWhetherDetails(city, country).then((response) => {
          this.setState({
            [cityAndCountry]: get(response, "data"),
          });
        });
      }
    }
  }

  renderCitiesInformation() {
    const { citiesList } = this.state;

    return (
      <tbody>
        {citiesList.map((city, index) => {
          const aCityCountry = city.split("-");
          const cityName = aCityCountry[0];
          const countryName = aCityCountry[1];

          return (
            <tr key={`${city}-${index}`}>
              <td>
                <Link
                  style={{ textDecoration: "none" }}
                  to={{
                    pathname: "/city-temparature",
                    state: {
                      cityWhetherInfo: get(this.state, `[${city}]`),
                      city: cityName,
                      country: countryName,
                    },
                  }}
                >
                  {city}
                </Link>
              </td>
              <td>{get(this.state, `[${city}].main.temp`)}</td>
              <td>{get(this.state, `[${city}].sys.sunrise`)}</td>
              <td>{get(this.state, `[${city}].sys.sunset`)}</td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return null;
    }
    return (
      <>
        <div className="header">
          <img src={companyLogo} alt="Company Logo" />
        </div>
        <div className="container">
          <div className="parent-table">
            <div className="table-responsive">
              <table className="table">
                <caption className="table-title">Open Weather Data</caption>

                <thead className="table-header">
                  <tr>
                    <th>City Name</th>
                    <th>Temparature</th>
                    <th>Sunrise Time</th>
                    <th>Sunset Time</th>
                  </tr>
                </thead>
                {this.renderCitiesInformation()}
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
