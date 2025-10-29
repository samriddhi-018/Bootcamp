import { useState, useContext } from 'react';
import UserContext from '../Context/UserContext';
import './Task2User.css';
import avatar1 from '../assets/avatar1.png';
import avatar2 from '../assets/avatar2.png';
import avatar3 from '../assets/avatar3.png';
import avatar4 from '../assets/avatar4.png';

const avatarOptions = [avatar1, avatar2, avatar3, avatar4];

const UserProfile = ({ user }) => {
  const { dispatch } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar || avatarOptions[0]);
  const [bio, setBio] = useState(user.bio);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_USER',
      payload: {
        id: user.id,
        name,
               avatar,
      },
    });
    setIsEditing(false);
  };

  const handleRemove = () => {
    dispatch({
      type: 'REMOVE_USER',
      payload: user.id,
    });
  };

  return (
    <div className="profile-card">
      <img src={avatar} alt="User Avatar" className="avatar" />
      <h2>{name}</h2>
      <p>{bio}</p>

      {!isEditing ? (
        <>
          <button className="update-btn" onClick={() => setIsEditing(true)}>
            Update Profile
          </button>
          <button className="remove-btn" onClick={handleRemove}>
            Remove Profile
          </button>
        </>
      ) : (
        <div className="edit-section">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Update name"
          />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Update bio"
          />

          <div className="avatar-options">
            {avatarOptions.map((option, index) => (
              <img
                key={index}
                src={option}
                alt={`Avatar ${index + 1}`}
                className={`avatar-choice ${avatar === option ? 'selected' : ''}`}
                onClick={() => setAvatar(option)}
              />
            ))}
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;