import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer navbar-light bg-light">
        <div className="container footer-copyright text-center py-3">
          © {new Date().getFullYear()} Timely
        </div>
      </footer>
    );
  }
}

export default Footer;
