import React, { useEffect, useState } from "react";
import Button from "../../layouts/Button";
import { SvgDelete } from "../../utils/icons/SvgDelete";
import { isEmpty } from "../../utils/Tools";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";

/**
 * Function to display a post
 * @param {Object} post - The post to display
 * @param {Function} onDelete - The function to delete a post
 * @param {Function} profil - The profil of the current user
 * @param {Function} isAdm - The function to check if the current user is an admin
 * @returns
 */
export default function Card({ post, profil, isAdmin, onDelete }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    !isEmpty(profil) && setIsLoading(false);
  }, [profil]);

  const handleDelete = async function (e) {
    // Delete a member
    e.preventDefault();
    setIsLoading(true);
    await onDelete(profil);
  };

  return (
    <>
      <li className="posts__card" key={post._id}>
        {isLoading ? (
          <i className="fa fa-spinner fa-spin"></i>
        ) : (
          <>
            <CardHeader post={post} profil={profil} />
            <CardBody post={post} />
            <CardFooter post={post} profil={profil} />
          </>
        )}
        {
          /* delete button */
          isAdmin && (
            <>
              <Button
                className="button--delete"
                type="danger"
                onClick={handleDelete}
                loading={isLoading}
              >
                <SvgDelete />
              </Button>
            </>
          )
        }
      </li>
      <div className="posts__separator"></div>
    </>
  );
}
