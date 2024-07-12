import React from "react"
import Users from '../../../../backend/database/users'


const Home = () => {
    return (
      <div className="home">
       <p>home page</p>
       <Users />
      </div>
    )
  }
  
  export default Home