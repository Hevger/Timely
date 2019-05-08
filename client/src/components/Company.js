import React, { Component } from "react";

class Company extends React.Component {
  render() {
    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="hvordan display-4 text-left mb-4">
              Hårlokken Skovbys
            </h2>
            <p className="text-center">
              Vi vil gerne byde dig indenfor til vores erfarne team, der altid
              vil stå klar til at imødekomme dig i salonens rolige og hyggelige
              omgivelser. Vi vil med vores mange års erfaring i frisørbranchen
              bestræbe os på, at give dig den bedste vejledning og behandling
              til dit hår. Og du vil som kunde hos Cosmo altid være i centrum
              igennem hele behandlingen. Som frisører arbejder vi målrettet på,
              at give dig høj kvalitet og vil derfor dygtiggøre os indenfor
              nutidens frisurer. De bedste hilsner Britt & Annette
            </p>
            <div className="row">
              <div className="eighteenRem card m-3 mx-auto">
                <img
                  src="https://petapixel.com/assets/uploads/2017/11/fake2.jpg"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">Eva J</h5>
                  <p className="card-text">
                    Jeg er den bedste, klip dit hår hos mig ellers kommer jeg
                    efter dig
                  </p>
                  <a href="#" className="btn btn-primary">
                    Se ledige tider
                  </a>
                </div>
              </div>

              <div className="eighteenRem card m-3 mx-auto">
                <img
                  src="https://petapixel.com/assets/uploads/2017/11/fake2.jpg"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">Eva J</h5>
                  <p className="card-text">
                    Jeg er den bedste, klip dit hår hos mig ellers kommer jeg
                    efter dig
                  </p>
                  <a href="#" className="btn btn-primary">
                    Se ledige tider
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Company;
