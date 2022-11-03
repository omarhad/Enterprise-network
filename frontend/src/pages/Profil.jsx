import React from "react";
import PropTypes from "prop-types";
import UploadProfil from "../components/profil/UploadProfil";
import { UploadPicture } from "../components/profil/UploadPicture";

/**
 * Component Profil
 * @param {Object} profil // Response from API with all members
 * @param {Function} onDelete // Function to delete a member
 * @param {Function} onEdit // Function to edit a member
 * @param {Function} uploadPicture // Function to upload picture user
 * @returns div => Component Profil with all information about the user
 */
export default function Profil({ profil, onEdit, uploadPicture }) {
  return (
    <div className="profilContent">
      <div className="profilContent__img">
        <img className="profilImg" src={profil.image} alt="user-pic" />
        <UploadPicture uploadPicture={uploadPicture} profil={profil} />
        <div className="profilContent__img__arrow">
          <img
            className="arrow"
            src="./img/icons/arrow-down-solid.svg"
            alt=""
          />
          <p>Scroll down for more</p>
        </div>
      </div>
      <div className="profilContent__info">
        <div className="profilContent__info__arrow">
          <img className="arrow" src="./img/icons/arrow-up-solid.svg" alt="" />
          <p>Scroll up to go back</p>
        </div>
        <h1>Profile information</h1>
        <div className="uploadInfo">
          <UploadProfil
            profil={profil}
            onEdit={onEdit}
            name="First Name"
            type="text"
          />
          <UploadProfil
            profil={profil}
            onEdit={onEdit}
            name="Last Name"
            type="text"
          />
          <UploadProfil
            profil={profil}
            onEdit={onEdit}
            name="Email"
            type="email"
          />
          <UploadProfil
            profil={profil}
            onEdit={onEdit}
            name="Password"
            type="password"
          />
          <UploadProfil
            profil={profil}
            onEdit={onEdit}
            name="Bio"
            type="text"
          />
          <UploadProfil
            profil={profil}
            onEdit={onEdit}
            name="Birthday"
            type="date"
          />
        </div>
      </div>
    </div>
  );
}

Profil.propTypes = {
  profil: PropTypes.object,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};
