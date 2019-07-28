import React, { Component } from "react";
import axios from "axios";

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";

class App extends Component {
  state = {
    users: [],
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
    const { loading, users, alert } = this.state;

    return (
      <div>
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
