import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../layouts/Button";
import { birthdayParser, upperCase } from "../../utils/Tools";

/**
 * Display a list of members
 * @param {Array} members // Array of members
 * @returns ul => list of members
 */
export function ListMembers({ members, onDelete }) {
  return (
    <ul>
      {members.map((member) => (
        <Member key={member._id} member={member} onDelete={onDelete} />
      ))}
    </ul>
  );
}

/**
 * Display a member information
 * @param {Object} member // Object of member
 * @returns li => member information
 */
function Member({ member, onDelete }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const handleDelete = async function (e) {
    e.preventDefault();
    setLoading(true);
    await onDelete(member);
  };

  return (
    <li>
      <div className="" onClick={handleShow}>
        <div className="">
          <img src={member.image} alt="memberAvatar" />
        </div>
        <h3>
          {upperCase(member.firstName)} {upperCase(member.lastName)}
        </h3>
        <p>Post : {member.job}</p>
        {!show && <span>Click to show more</span>}
        {/* info hidden */}
        {show && (
          <>
            <p>Email : {member.email}</p>
            <p>Bio : {member.bio}</p>
            <p>Birthday : {birthdayParser(member.birthday)}</p>
            <p>Registered since : {birthdayParser(member.createdAt)}</p>
          </>
        )}
        <Button loading={loading} onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </li>
  );
}

ListMembers.propTypes = {
  members: PropTypes.array,
  onDelete: PropTypes.func,
};
