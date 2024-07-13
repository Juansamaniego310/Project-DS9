import React from "react";
import Users from "../../../../backend/database/users";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <p>home page</p>
    </div>
  );
};

export default Home;