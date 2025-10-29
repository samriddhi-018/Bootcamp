import { useContext, useState } from 'react';
import UserContext from './Context/UserContext';
import UserProfile from './Components/Task2User';

function App() {
  const { users, dispatch } = useContext(UserContext);
  const [newName, setNewName] = useState('');
  const [newBio, setNewBio] = useState('');

  const handleAddUser = () => {
    if (newName.trim() && newBio.trim()) {
      dispatch({
        type: 'ADD_USER',
        payload: {
          id: Date.now(),
          name: newName,
          bio: newBio,
          avatar: null,
        },
      });
      setNewName('');
      setNewBio('');
    }
  };

  return (
    <div className='container'>
      <h1>Task2 User Profile Cards</h1>

      <div className="add-user-form">
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bio"
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
        />
        <button className="add-user-btn" onClick={handleAddUser}>
          Add User
        </button>
      </div>


      <div className='cards-container'>
        {users.map(user => (
          <UserProfile key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default App;
