import React, { useState } from 'react';
import './LoginSignup.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore'; // <-- Make sure setDoc and getDoc are imported here
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

export const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // For signup success message

  const navigate = useNavigate(); // For navigation

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid; // Get the user ID (UID) from Firebase Authentication
  
      console.log("User ID after sign-up:", userId); // Debugging line
  
      // Store user data in Firestore with the UID as the document ID
      await setDoc(doc(db, "users", userId), {
        name: name,
        email: email,
        createdAt: new Date()
      });
  
      console.log("User data saved to Firestore!"); // Debugging line
  
      // Show success message but do not redirect
      setSuccessMessage("Sign up successful! Please log in.");
      setAction("Login"); // Switch to Login mode after successful signup
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  
  
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid; // Get the user ID (UID) from Firebase Authentication
  
      console.log("User ID after login:", userId); // Debugging line
  
      // Fetch user data from Firestore using the UID
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
  
        console.log("User data retrieved from Firestore:", userData); // Debugging line
  
        // Redirect to home page and pass email and name from Firestore
        navigate('/home', { state: { email: userData.email, name: userData.name } });
      } else {
        console.log("No user data found for UID:", userId); // Debugging line
        setErrorMessage("No user data found in Firestore!"); // Error displayed if no document is found
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  
  

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>

      {action === "Sign Up" ? null : (
        <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
      )}

      <div className="submit-container">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>} {/* Show success message after sign up */}

        {action === "Login" ? (
          <div className="submit gray" onClick={handleLogin}>Login</div>
        ) : (
          <div className="submit" onClick={handleSignUp}>Sign Up</div>
        )}

        <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}>
          {action === "Login" ? "Sign Up" : "Login"}
        </div>
      </div>
    </div>
  );
};
