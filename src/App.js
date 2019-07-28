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

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GFINDER_CLIENT_ID}&lient_secret=${process.env.REACT_APP_GFINDER_CLIENT_SECRET}`);
    this.setState({ users: res.data, loading: false });
  }

  render() {
    const { loading, users } = this.state;

    return (
      <div>
        <Navbar />
        <div className="container">
          <Search />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
