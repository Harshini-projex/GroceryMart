
import React from "react";
import { UserRound, Mail, Phone, X } from "lucide-react";

function Profile({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="profile-card">

        <button className="close-button" onClick={onClose}>
          <X />
        </button>

        <div className="profile-avatar">
          <UserRound size={40} />
        </div>

        <h2>My Profile</h2>
        <p className="profile-subtitle">Your FreshMart account</p>

        <div className="profile-detail">
          <UserRound size={19} />
          <div>
            <small>Full Name</small>
            <h4>{user.name}</h4>
          </div>
        </div>

        <div className="profile-detail">
          <Mail size={19} />
          <div>
            <small>Email Address</small>
            <h4>{user.email}</h4>
          </div>
        </div>

        <div className="profile-detail">
          <Phone size={19} />
          <div>
            <small>Phone Number</small>
            <h4>{user.phone}</h4>
          </div>
        </div>

        <button className="auth-submit" onClick={onClose}>
          Close Profile
        </button>

      </div>
    </div>
  );
}

export default Profile;
