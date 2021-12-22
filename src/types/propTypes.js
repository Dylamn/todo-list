import PropTypes from "prop-types";

export const todoType = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  done: PropTypes.bool,
  editMode: PropTypes.bool,
})
