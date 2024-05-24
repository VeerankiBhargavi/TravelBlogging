import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    console.log("inside try")
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/api/users/search', {
        params: { email: searchTerm }
      });
      console.log("inside try")
      if (response.data.length > 0) {
        setUsers(response.data);
        setError('');
      } else {
        setUsers([]);
        setError('No users found');
      }
    } catch (error) {
        console.log("inside try")
      console.error('Error fetching users:', error);
      setError('Error fetching users');
    }
  };

  return (
    <div className="container">
      <form className="form-container" onSubmit={handleFormSubmit}>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Enter username"
            value={searchTerm}
            onChange={handleInputChange}
            className="input-field"
          />
          <button type="submit" className="search-button"><FontAwesomeIcon icon={faSearch} /></button>
          {/* <p>{searchTerm}</p> */}
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="user-cards-container">
        {users.length > 0 ? (
          users.map(user => (
            <div key={user._id} className="user-card">
              <h3 className="username">{user.username}</h3>
              <p className="email">Email: {user.email}</p>
              <p className="location">Location: {user.location || 'N/A'}</p>
              <p className="bio">Bio: {user.bio || 'N/A'}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
