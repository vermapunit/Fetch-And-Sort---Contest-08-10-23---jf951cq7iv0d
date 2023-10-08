import React, { useState } from 'react'
import '../styles/App.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);  
  useEffect(() => {
    setIsLoading(true);
    fetch('https://content.newtonschool.co/v1/pr/main/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
        setIsLoading(false);
      });
  }, []);

  const sortUsersAscending = () => {
    const sortedUsers = [...users].sort((a, b) => a.name.length - b.name.length);
    setUsers(sortedUsers);
  };

  const sortUsersDescending = () => {
    const sortedUsers = [...users].sort((a, b) => b.name.length - a.name.length);
    setUsers(sortedUsers);
  };

  return (
    <div id="main">
      <h2>User List</h2>
      <button className="fetch-data-btn"  onClick={() => setIsLoading(true)}>>Fetch User Data</button>
      <button className="sort-btn" onClick={() => setSortAscending(!sortAscending)}>
        {sortAscending
        ?"Sort by name length (ascending)"
        :"Sort by name length (descending)"}
      </button>
       {isLoading && <p>Loading...</p>}
      <div className='users-section'>
          <ul>
           {users.map((user) => (
            <li key={user.id}>
            <section className='id-section'>{user.id}</section>
            <section className='name-email-section'>
              <p className='name'>Name:{user.name} </p>
              <p className='email'>Email:{user.email} </p>
            </section>
          </li>
  ))}
    </ul>
      </div>
    </div>
  );
};


export default App;
