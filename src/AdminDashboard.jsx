// src/AdminDashboard.jsx
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db, auth } from "./firebase/config";
import "./styles/AdminDashboard.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    processing: 0,
    completed: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
        return;
      }

      const unsubscribeUsers = onSnapshot(
        collection(db, "users"),
        (snapshot) => {
          const userList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUsers(userList);
        }
      );

      return () => unsubscribeUsers();
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  const changeRole = async (id, newRole) => {
    await updateDoc(doc(db, "users", id), { role: newRole });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "textiles"), (snapshot) => {
      const list = snapshot.docs.map((doc) => doc.data());
      setStats({
        total: list.length,
        processing: list.filter((i) => i.status === "Processing").length,
        completed: list.filter((i) => i.status === "Completed").length,
      });
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">Textile Admin</h2>

        <button onClick={() => navigate("/textiles")}>
          Textile Tracking
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">

        {/* Header */}
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="stats-grid">

          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>{stats.total}</p>
          </div>

          <div className="stat-card">
            <h3>Processing</h3>
            <p>{stats.processing}</p>
          </div>

          <div className="stat-card">
            <h3>Completed</h3>
            <p>{stats.completed}</p>
          </div>

        </div>

        {/* Users */}
        <div className="users-card">

          <h2>Users Management</h2>

          <div className="users-table">

            <div className="table-head">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Action</span>
            </div>

            {users.map((user) => (
              <div key={user.id} className="table-row">

                <span>{user.name || "—"}</span>
                <span>{user.email}</span>

                <span className={user.role === "admin" ? "role-admin" : "role-user"}>
                  {user.role}
                </span>

                {user.role === "user" ? (
                  <button
                    className="promote-btn"
                    onClick={() => changeRole(user.id, "admin")}
                  >
                    Promote
                  </button>
                ) : (
                  <button
                    className="remove-btn"
                    onClick={() => changeRole(user.id, "user")}
                  >
                    Remove
                  </button>
                )}

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;