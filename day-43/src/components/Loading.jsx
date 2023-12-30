import React from "react";
import "../assets/css/style.css";
import { Dna } from "react-loader-spinner";
const Loading = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="loading-container">
        <div className="loading-overlay"></div>
        <div className="loading"></div>
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    )
  );
};

export default Loading;
