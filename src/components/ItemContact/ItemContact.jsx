import PropTypes from 'prop-types';
import css from 'components/ItemContact/ItemContact.module.css';

export const ItemContact = ({ visibleContact, onDeleteContact }) => {
  return (
    <>
      {visibleContact.map(({ id, name, number }) => (
        <li className={css.item} key={id}>
          <p className={css.text}>
            {name}: {number}
          </p>
          <button
            className={css.btn}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </>
  );
};

ItemContact.propTypes = {
  visibleContact: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
