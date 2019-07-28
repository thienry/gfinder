import React from "react";
import PropTypes from "prop-types";

function UserItem({ user: { avatar_url, login, html_url } }) {
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt={login}
        className="round-img"
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>

      <div>
        <a href={html_url} className="btn btn-dark btn-sm my-1">
          Mais
        </a>
      </div>
    </div>
  );
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;
