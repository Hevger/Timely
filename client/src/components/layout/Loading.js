import React from "react";
import LoadingGif from "../../img/loading.svg";

class Loading extends React.Component {
  render() {
    return (
      <div style={{ marginTop: "40px" }}>
        <img
          src={LoadingGif}
          alt="Loading..."
          style={{ width: "100px", margin: "auto", display: "block" }}
        />
      </div>
    );
  }
}

export default Loading;
