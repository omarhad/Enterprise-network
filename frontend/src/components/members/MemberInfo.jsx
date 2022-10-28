import React, { useState } from "react";
import { birthdayParser } from "../../utils/Tools";

/**
 * Display a member information
 * @param {Object} member // Object of member
 * @returns li => member information
 */
export function MemberInfo({ member }) {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <li>
      <div className="" onClick={handleShow}>
        <div className="">
          <img src={member.image} alt="memberAvatar" />
        </div>
        <h3>
          {member.firstName} {member.lastName}
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
      </div>
    </li>
  );
}
