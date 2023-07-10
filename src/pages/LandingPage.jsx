import React from "react";
import NavBar from "../components/NavBar";
import Banner from "../assets/landingPageBanner.jpg";

function LandingPage() {
  return (
    <div className=" h-screen">
      <NavBar />
      <div className="flex justify-center">
        <img
          src={Banner}
          alt="noe-keep-banner"
          className="w-screen  h-[90vh] object-cover"
        />
      </div>
    </div>
  );
}

export default LandingPage;
