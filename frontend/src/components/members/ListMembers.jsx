import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../layouts/Button";
import { MemberInfo } from "./MemberInfo";
import { useEffect } from "react";

/**
 * Display a list of members
 * @param {Array} members // Array of members
 * @param {Function} onDelete // Function to delete a member
 * @returns ul => list of members
 */
export function ListMembers({ members, onDelete }) {
  useEffect(
    function () {
      console.log(members);
    },
    [onDelete, members]
  );
  // const userId = JSON.parse(localStorage.getItem("user"));
  // function checkUser() {
  //   const user = members.find((member) => member._id === userId.userId);
  //   if (user.isAdmin) {
  //     return true;
  //   }
  //   return false;
  // }

  // const isAdmin = checkUser();

  return (
    <ul>
      {members[0].map((member) => (
        <>
          <Member
            key={member._id}
            member={member}
            onDelete={onDelete}
            isAdmin={true}
          />
        </>
      ))}
    </ul>
  );
}

/**
 * Display a member information
 * @param {Object} member // Object of member
 * @param {Function} onDelete // Function to delete a member
 * @param {Boolean} isAdmin // Boolean to check if user is admin
 * @returns li => member information
 */
function Member({ member, onDelete, isAdmin }) {
  // console.log(member);
  const [loading, setLoading] = useState(false);

  const handleDelete = async function (e) {
    e.preventDefault();
    setLoading(true);
    await onDelete(member._id);
    console.log(" id Memeber" + JSON.stringify(member._id));
  };

  return (
    <>
      <MemberInfo member={member} />
      {isAdmin ? (
        <Button loading={loading} onClick={handleDelete}>
          Delete
        </Button>
      ) : null}
    </>
  );
}

ListMembers.propTypes = {
  members: PropTypes.array,
  onDelete: PropTypes.func,
};

Member.propTypes = {
  member: PropTypes.object,
  onDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
};
