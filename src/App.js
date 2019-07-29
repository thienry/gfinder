import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users?client_id=${
        process.env.REACT_APP_GFINDER_CLIENT_ID
      }&lient_secret=${process.env.REACT_APP_GFINDER_CLIENT_SECRET}`
    );
    this.setState({ users: res.data, loading: false });
  }

  // Busca pelos usuários do github
  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GFINDER_CLIENT_ID
      }&lient_secret=${process.env.REACT_APP_GFINDER_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  //Pegar um unico usuário do Github
  getUser = async username => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GFINDER_CLIENT_ID
      }&lient_secret=${process.env.REACT_APP_GFINDER_CLIENT_SECRET}`
    );
    this.setState({ user: res.data, loading: false });
  };

  // Limpa o estado dos usuários
  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    });
  };

  // Seta o alerta
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { loading, users, alert, user } = this.state;

    return (
      <Router>
        <div>
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/sobre" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
