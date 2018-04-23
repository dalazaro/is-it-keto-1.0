import React, { Component } from "react";
import Results from "./Results";
import "../assets/styles/SearchContainer.css";
import keys from "../config/keys.js";

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let foodSearchQuery = document.getElementById("searchInput").value;
    const key = keys.nutritionixKey;
    const appId = keys.nutritionixAppId;

    fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
      method: "post",
      headers: {
        "x-app-key": `${key}`,
        "x-app-id": `${appId}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: foodSearchQuery
      })
    }).then(response => {
      if (response.status !== 200) {
        console.log("Error: " + response.status);
        return;
      }

      response.json().then(data => {
        const results = data.foods;
        this.setState({ results });
        console.log("new state: ", this.state.results);
      });
    });
  }

  render() {
    return (
      <div className="search-container">

        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              id="searchInput"
              placeholder="Example: 2 large eggs, 3 pieces of bacon"
              type="text"
              required
            />

            <input type="submit" value="Search" id="searchButton" />
          </div>
          
          <div>
            <Results results={this.state.results} />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchContainer;