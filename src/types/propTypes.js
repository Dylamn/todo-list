import PropTypes from "prop-types";

export const todoType = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  done: PropTypes.bool,
  editMode: PropTypes.bool,
})