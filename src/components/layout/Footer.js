import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

const Footer = ({ icon, name }) => {
  return (
    <footer className="text-center bg-primary footer">
      Copyright © {dayjs().year()} | Feito com <i className={icon} /> | Desenvolvido por {" "}
      <a
        className="text-light"
        style={{ textDecoration: "none" }}
        href="htts://thiagotec.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </a>
    </footer>
  );
};

Footer.defaultProps = {
  name: "Thiago Moura",
  icon: "fas fa-heart"
};

Footer.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Footer;
