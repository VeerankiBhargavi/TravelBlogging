import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Profile = () => {
//   const { id } = useParams(); 

  
//   const [user, setUser] = React.useState(null);
//   React.useEffect(() => {
//     axios.get(`http://localhost:3000/api/users/${id}`)
//       .then(response => setUser(response.data))
//       .catch(error => console.error(error));
//   }, [id]);

  return (
    // <div>
    //   <h1>Profile Page</h1>
    //   <p>User ID: {id}</p>
    //   {/* Display user details here */}
    // </div>
    <h1>Profile</h1>
  );
};

export default Profile;
