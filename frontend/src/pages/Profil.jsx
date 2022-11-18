import PropTypes from "prop-types";
import React from "react";
import { UploadPicture } from "../components/profil/UploadPicture";
import UploadProfil from "../components/profil/UploadProfil";
import { SvgArrowUp } from "../utils/icons/SvgArrowUp";

/**
 * Component Profil
 * @param {Object} profil // Response from API with all members
 * @param {Function} onDelete // Function to delete a member
 * @param {Function} onEdit // Function to edit a member
 * @param {Function} uploadPicture // Function to upload picture user
 * @returns div => Component Profil with all information about the user
 */
export default function Profil({ profil, onEdit, uploadPicture }) {
  const [previewPic, setPreviewPic] = React.useState(profil.image);
  return (
    <div className="profilContent">
      <div className="profilContent__img">
        <img className="profilImg" src={previewPic} alt="user-pic" />
        <UploadPicture
          uploadPicture={uploadPicture}
          profil={profil}
          previewPic={(url) => setPreviewPic(url)}
        />
        <div className="profilContent__img__arrow">
          <SvgArrowUp className="arrow-down" />
          <p>Scroll down for more</p>
        </div>
      </div>
      <div className="profilContent__info">
        <div className="profilContent__info__arrow">
          <SvgArrowUp className="arrow-up" />
          <p>Scroll up to go back</p>
        </div>
        <h1>Profile information</h1>
        <div className="uploadInfo">
          <UploadProfil
            profil={profil}
            onEdit={onEdit}
            name="First Name"
            type="text"
            message="Your first name has been updated"
          />
          <UploadProfil
            profil={profil}
            onEdit={onEdit}
            name="Last Name"
            type="text"
            message="Your last name has been updated"
          />
          <UploadProfil
            profil={profil}
            onEdit={onEdit}
            name="Email"
            type="email"
            message="Your email has been updated"
          />
          <UploadProfil
            profil={profil}
            onEdit={onEdit}
            name="Password"
            type="password"
            message="Your password has been updated"
          />
          <UploadProfil
            profil={profil}
            onEdit={onEdit}
            name="Bio"
            type="text"
            message="Your bio has been updated"
            className="uploadInfo__input-bio"
            textarea="true"
          />
          <UploadProfil
            profil={profil}
            onEdit={onEdit}
            name="Birthday"
            type="date"
            message="Your birthday has been updated"
          />
          <UploadProfil
            profil={profil}
            onEdit={onEdit}
            name="Position"
            type="text"
            message="Your position has been updated"
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
