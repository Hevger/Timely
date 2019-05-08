import React from "react";

class Contact extends React.Component {
  render() {
    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="hvordan display-4 text-left mb-4">Kontakt</h2>

            <form>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  name="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefon</label>
                <input
                  id="phone"
                  type="number"
                  name="phone"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Emne</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Besked</label>
                <textarea
                  rows="10"
                  id="message"
                  name="message"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  value="Send"
                  name="send"
                  id="send"
                  className="fullWidth btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
