import React from "react";
import PropTypes from "prop-types";

const Footer = ({ icon, name }) => {
  return (
    <footer className="text-center bg-primary footer">
      Feito com <i className={icon} /> |{" "}
      <span className="footer-name">
        {" "}
        Desenvolvido por{" "}
        <a
          className="text-light"
          style={{ textDecoration: "none" }}
          href="htts://thiagotec.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </a>
      </span>
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
