import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from 'components/formContact/FormContact.module.css';


export const Form = ({ onSubmit }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  
  const changeForm = e => {
    e.preventDefault();
    onSubmit(name, number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const nameChange = e => {
    setName(e.target.value);
  };

  const numberChange = e => {
    setNumber(e.target.value);
  };

     return (
      <form className={css.form} onSubmit={changeForm}>
        <label className={css.text}>
          Name
          <input
            className={css.input}
            value={name}
            onChange={nameChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label className={css.text}>
          Number
          <input
            className={css.input}
            value={number}
            onChange={numberChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button type="submit" disabled={name === '' || number === ''}>
          Add contact
        </button>
      </form>
    );
  }


Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
