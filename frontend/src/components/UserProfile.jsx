/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EditProfile from './EditProfile';
import '../styles/UserProfile.css';
import { Link, Box, Text } from '@chakra-ui/react';

import CreativeSpinner from './CreativeSpinner';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
const LogoutConfirmationModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="logout-confirmation-modal">
      <p className="confirmation-message">Are you sure you want to log out?</p>
      <div className="button-container">
        <button className="logout-button" onClick={onConfirm}>
          Yes, Log Out
        </button>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};
const UserProfile = () => {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [lastVisitedBlog, setLastVisitedBlog] = useState(null);

  useEffect(() => {
    // Retrieve last visited blog from local storage
    const storedLastVisitedBlog = localStorage.getItem('lastVisitedBlog');
    if (storedLastVisitedBlog) {
      setLastVisitedBlog(JSON.parse(storedLastVisitedBlog));
    }
  }, []);
  const handleLinkClick = () => {
    if (lastVisitedBlog) {
      navigate(`/blogs/${lastVisitedBlog.collection}/${encodeURIComponent(lastVisitedBlog.title)}`);
    }
  };

useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin'); // Redirect the user to the login page
        return;
      }

      const response = await fetch('https://edu-back-j3mz.onrender.com/api/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching user profile: ${response.status}`);
      }

      const data = await response.json();
      
      // Set the user profile data in your state here
    setUserProfile(data); // Set the state with fetched user profile data

      setLoading(false);
      setError(null);

      // Only navigate if userProfile is not empty
      if (data && Object.keys(data).length > 0) {
        navigate('/profile');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  fetchUserProfile();
}, [navigate]);
  const handleEditProfile = () => {
    setIsEditing(true);
  };

 const handleUpdateProfile = async (updatedProfileData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://edu-back-j3mz.onrender.com/api/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updatedProfileData,
      });

      if (!response.ok) {
        throw new Error(`Error updating user profile: ${response.status}`);
      }

      const updatedProfile = await response.json();
      setUserProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    // Show the logout confirmation modal
    setShowLogoutModal(true);
  };
  const confirmLogout = async () => {
    try {
      // Send a request to the server to log the user out
      await axios.post('https://edu-back-j3mz.onrender.com/api/logout');
      // Clear the token from local storage
      localStorage.removeItem('token');
      // Redirect the user to the login page using navigate
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Close the modal after logout, whether successful or not
      setShowLogoutModal(false);
    }
  };

  const cancelLogout = () => {
    // Close the logout confirmation modal
    setShowLogoutModal(false);
  };

  

  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>
      {loading && (
        <motion.div
          className="loading-container"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <CreativeSpinner />
          <p className="loading-text">Loading...</p>
        </motion.div>
      )}
      {error && <p className="error-message">Error: {error}</p>}
     {!loading && !error && userProfile && (
  <div className="profile-info">
    <div className="profile-image-container">
      <motion.img
        src={`https://edu-back-j3mz.onrender.com/${userProfile.profileImage}?key=${Date.now()}`}
        alt="Profile"
        className="profile-image"
        whileHover={{ scale: 1.1 }}
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite error loop
          e.target.src = 'https://sanjaybasket.s3.ap-south-1.amazonaws.com/image.webp'; // Display a default image on error
        }}
      />
    </div>
          <p>Username: {userProfile.username}</p>
          <p>Email: {userProfile.email}</p>
          <p>First Name: {userProfile.firstName}</p>
          <p>Last Name: {userProfile.lastName}</p>
          <p>Bio: {userProfile.bio}</p>
          <Text
        fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} // Responsive font size
        fontWeight="bold" // Bold font weight
        color="gray.400" // Text color
        mb={{ base: 2, md: 4 }} // Margin bottom
      >
        Last Visited Blog 👇
      </Text> <p>     
      {/* Clickable link with different styles */}
      {lastVisitedBlog && (
        <Link
          onClick={handleLinkClick}
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }} // Responsive font size
          color="blue.500" // Text color
          _hover={{ textDecoration: 'underline' }} // Hover effect
          cursor="pointer" // Change cursor on hover
        >
          {lastVisitedBlog.title}
        </Link>
      )}</p>
          <button className="edit-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
        

        </div>
      )}
      {isEditing && (
  <EditProfile
    userProfile={userProfile}
    onUpdateProfile={handleUpdateProfile}
    onCancel={() => setIsEditing(false)} // Pass the onCancel function
  />
)}

            {showLogoutModal && (
        <LogoutConfirmationModal
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </div>
  );
};

export default UserProfile;
