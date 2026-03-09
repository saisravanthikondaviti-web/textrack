// src/Login.jsx
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import "./styles.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const userRef = doc(db, "users", res.user.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const role = snap.data().role;
          window.location.href = role === "admin" ? "/admin" : "/user";
        } else {
          alert("User role not found.");
        }
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", res.user.uid), {
          email,
          role: "user",
          createdAt: new Date(),
        });

        alert("Account created successfully!");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* VIDEO BACKGROUND */}
      <video autoPlay muted loop playsInline className="bg-video">
        <source src="/textile-video.mp4" type="video/mp4" />
      </video>

      <div className="login-container">

        <h1 className="main-heading">
          Welcome to <span className="brand">TextileTrack</span>!!!
        </h1>

        <div className="login-wrapper">

          <h2 className="login-title">
            {isLogin ? "“Threads weave history into beauty.”" : "Create Account 🚀"}
          </h2>

          {/* FORM */}
          <div className="form-group">

            <div className="input-group">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          </div>

          {/* BUTTON */}
          <button className="auth-btn" onClick={handleAuth}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>

          {/* TOGGLE LOGIN SIGNUP */}
          <p className="auth-toggle">
            {isLogin ? "Don't have an account?" : "Already have an account?"}

            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Sign Up" : " Login"}
            </span>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;