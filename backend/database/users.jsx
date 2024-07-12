import React, {useEffect, useState} from "react";
import supabase from "./conection";

const Users = () => {
    const [usernames, setUsers] = useState([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        let { data: usernames, error } = await supabase
          .from('user')
          .select('*');
        if (error) console.error(error);
        else setUsers(usernames);
      };
  
      fetchUsers();
    }, []);
  
    return (
      <div>
        <h1>Users</h1>
        <ul>
          {usernames.map(user => (
            <li key={user.id}>{user.user_name} {user.id}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Users;