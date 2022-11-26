import React from "react";
import PropTypes from "prop-types";
import Button from "../../layouts/Button";
import { SvgDelete } from "../../utils/icons/SvgDelete";
import SvgEdit from "../../utils/icons/SvgEdit";

/**
 * Function to update & delete
 * @param {Object} element - The element to update & delete
 * @returns Buuton => A button to update & delete a comment or a post
 */
export default function CardUpdate({ element, ...props }) {
  return (
    <>
      <Button
        className="button--delete"
        type="danger"
        onClick={props.handleDelete}
      >
        <SvgDelete className={"button--delete"} />
      </Button>
      {props.editor && (
        <Button onClick={props.showEdit}>
          <SvgEdit className={"button--edit"} />
        </Button>
      )}
    </>
  );
}

CardUpdate.propTypes = {
  element: PropTypes.object.isRequired,
};
