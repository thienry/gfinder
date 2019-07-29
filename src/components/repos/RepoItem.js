import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

const RepoItem = ({ repo }) => {
  return (
    <div className="card">
      <h2>
        <a href={repo.html_url} rel="noopener noreferrer" target="_blank">
          {repo.name}
        </a>
      </h2>
      {repo.description ? (
        <p> {repo.description} </p>
      ) : (
        <p>Repositório sem descrição</p>
      )}
      <p>
        <strong className="text-success">Criado em:</strong>{" "}
        {dayjs(repo.created_at).format("DD/MM/YYYY")}
      </p>
      <p>
        <strong className="text-success">Linguagem de Programação:</strong>{" "}
        {repo.language}
      </p>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired
};

export default RepoItem;
