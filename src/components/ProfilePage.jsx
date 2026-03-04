import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

export default function Profile() {

  const [orderCount,setOrderCount] = useState(0);
  const [photo,setPhoto] = useState(auth.currentUser?.photoURL);
  const navigate = useNavigate();

  useEffect(()=>{

    const fetchOrders = async ()=>{

      if(!auth.currentUser) return;

      const q = query(
        collection(db,"orders"),
        where("userId","==",auth.currentUser.uid)
      );

      const snapshot = await getDocs(q);
      setOrderCount(snapshot.size);
    }

    fetchOrders();

  },[]);

  /* Upload profile image */

  const handleImageUpload = async (e)=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onloadend = async ()=>{

      await updateProfile(auth.currentUser,{
        photoURL:reader.result
      });

      setPhoto(reader.result);
    }

    reader.readAsDataURL(file);
  }

  const handleLogout = async ()=>{
    await signOut(auth);
    navigate("/login");
  }

  return(

    <div className="profile-container">

      <div className="profile-card">

        {/* Profile Header */}

        <div className="profile-header">

          <label className="profile-img-wrapper">

            <img
              src={photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt="profile"
              className="profile-img"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />

          </label>

          <h2>{auth.currentUser?.displayName || "User"}</h2>

        </div>


        <div className="profile-details">

          <div className="detail-box">
            <h4>Email</h4>
            <p>{auth.currentUser?.email}</p>
          </div>

          <div className="detail-box">
            <h4>Location</h4>
            <p>India</p>
          </div>

          <div className="detail-box">
            <h4>Interested Fabrics</h4>
            <p>Silk, Banarasi, Cotton</p>
          </div>

          <div className="detail-box">
            <h4>Total Orders</h4>
            <p>{orderCount}</p>
          </div>

        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>

    </div>

  );

}