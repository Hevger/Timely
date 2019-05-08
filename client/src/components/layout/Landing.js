import React from "react";

class Landing extends React.Component {
  render() {
    return (
      <div>
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-sm-12">
              <h2 className="hvordan display-4 text-left">Book tid</h2>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Post nr. eller By"
                  aria-label="Post nr. eller By"
                  aria-describedby="basic-addon1"
                />
                <select className="custom-select" id="inputGroupSelect01">
                  <option defaultValue="Kategori...">Kategori...</option>
                  <option value="klinik">Klinik</option>
                  <option value="frisor">Frisør</option>
                </select>
                <button className="btn btn-outline-success ml-3" type="submit">
                  <i className="fas fa-search fa-sm" /> Søg
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5 mb-5">
          <h2 className="hvordan display-4 text-center mb-3">
            Hvordan fungerer Timely?
          </h2>
          <div className="row">
            <div className="col-sm-4">
              <div className="card text-center">
                <div className="card-body">
                  <i className="fas fa-search fa-5x mb-3" />
                  <h5 className="card-title">Find virksomhed</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card text-center">
                <div className="card-body">
                  <i className="fas fa-clock fa-5x mb-3" />
                  <h5 className="card-title">Find tid</h5>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="card text-center">
                <div className="card-body">
                  <i className="fas fa-check-circle fa-5x mb-3" />
                  <h5 className="card-title">Book</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
