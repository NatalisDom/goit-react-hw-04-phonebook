import PropTypes from 'prop-types';

export const ListContact = ({ children }) => {
  return <ul>{children}</ul>;
};

ListContact.propTypes = {
  children: PropTypes.element.isRequired,
};
