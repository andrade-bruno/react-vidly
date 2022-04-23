import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import NavBar from "./components/commom/navbar";
import NotFound from "./components/notFound";
import LoginForm from "./components/login/loginForm";
import Home from "./components/home/home";
import Movies from "./components/movies/movies";
import MovieForm from "./components/movies/movieForm";
import Customers from "./components/customers/customers";
import CustomersForm from "./components/customers/customersForm";
import Rentals from "./components/rentals/rentals";
import urlLogo from './logo.png'

class App extends Component {
  render() {
    return (
      <main className="container">
        <img src={urlLogo} alt='Logo' />
        <NavBar />
        <Switch>
          <Route path="/login/" exact component={LoginForm} />
          <Route path="/home/" exact component={Home} />

          <Route path="/movies/" exact component={Movies} />
          <Route path="/movies/:id" exact component={MovieForm} />

          <Route path="/customers/" exact component={Customers} />
          <Route path="/customers/:id" exact component={CustomersForm} />

          <Route path="/rentals/" exact component={Rentals} />

          <Route path="/not-found/" component={NotFound} />
          <Redirect from="/" exact to="/login/" />
          <Redirect to="/not-found/" />
        </Switch>
      </main>
    );
  }
}

export default App;
