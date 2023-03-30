import PropTypes from 'prop-types';

export const List = ({ children }) => {
  return <ul>{children}</ul>;
};

List.propTypes = {
  children: PropTypes.element.isRequired,
};
