import React, { Component } from "react";
import axios from "axios";

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";

class App extends Component {
  state = {
    users: [],
    loading: false
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

  render() {
    const { loading, users } = this.state;

    return (
      <div>
        <Navbar />
        <div className="container">
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
