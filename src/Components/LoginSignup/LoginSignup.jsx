import React, { useState } from 'react';
import './LoginSignup.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebaseConfig'; // Import Firestore and Auth
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore methods

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

export const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    try {
      // Create user with email and password in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Get the signed-in user ID
      const userId = userCredential.user.uid;

      // Add the user details to Firestore under a 'users' collection
      await setDoc(doc(db, "users", userId), {
        name: name,
        email: email,
        createdAt: new Date() // You can also add other fields like timestamps
      });

      alert("Sign up successful and user data stored in Firestore!");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
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
