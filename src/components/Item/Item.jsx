import PropTypes from 'prop-types';
import css from 'components/Item/Item.module.css';

export const Item = ({ visibleContact, onDeleteContact }) => {
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

Item.propTypes = {
  visibleContact: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
