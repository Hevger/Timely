import React from "react";

class Company extends React.Component {
  render() {
    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="hvordan display-4 text-left mb-4">Virksomheder</h2>

            <div className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-2">
                  <img
                    src="https://b.domainstatic.com.au/2014650869_1_1_180920_015752-w800-h536"
                    className="companyImage card-img"
                    alt="company profile"
                  />
                </div>
                <div className="col-md-10">
                  <div className="card-body">
                    <h5 className="card-title">Beauty</h5>
                    <p className="card-text">
                      Vi anvender de mest økologiske og biodynamiske produkter
                      som findes på markedet i dag.
                    </p>
                    <p className="card-text">
                      <small className="text-muted">Eva J</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-2">
                  <img
                    src="http://ris.fashion.telegraph.co.uk/RichImageService.svc/imagecontent/1/TMG8298636/m/HAIR-WASH-TESCO-SU_1816932a.jpg"
                    className="companyImage card-img"
                    alt="random"
                  />
                </div>
                <div className="col-md-10">
                  <div className="card-body">
                    <h5 className="card-title">N-Salon</h5>
                    <p className="card-text">
                      Velkommen i Hårlokken Skovbys hyggelige og afslappende
                      atmosfære
                    </p>
                    <p className="card-text">
                      <small className="text-muted">Nina Simone</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-2">
                  <img
                    src="https://224400-683198-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2014/06/hair-drying-800x500-300x200.jpg"
                    className="companyImage card-img"
                    alt="random"
                  />
                </div>
                <div className="col-md-10">
                  <div className="card-body">
                    <h5 className="card-title">Hos Poul</h5>
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <p className="card-text">
                      <small className="text-muted">Poul Hansen</small>
                    </p>
                  </div>
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
