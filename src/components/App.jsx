import React, { useState, useEffect, useRef } from 'react';
import css from 'components/App.module.css';
import { nanoid } from 'nanoid';
import { Form } from 'components/Form/Form';
import { Filter } from 'components/filter/Filter';
import { List } from 'components/List/List';
import { Item } from 'components/Item/Item';

const LS_KEY = 'contacts';
const base = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [base];
  });
  const [filter, setFilter] = useState('');

  const idContact = () => {
    return nanoid(4);
  };

  const firstRender = useRef(true);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const newContact = (name, number) => {
    const data = {
      id: idContact(),
      name,
      number,
    };

    if (contacts.find(obj => obj.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts([data, ...contacts]);
  };

  const deleteContact = idContact => {
    setContacts(() => contacts.filter(contact => contact.id !== idContact));
  };

  const findContact = ({ target: { value } }) => {
    setFilter(value);
  };

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Phonebook</h2>
      <Form onSubmit={newContact} />

      <h2 className={css.title}>Contacts</h2>
      <div className={css.smalContainer}>
        <Filter filter={filter} findContact={findContact} />

        <List>
          <Item
            visibleContact={visibleContacts()}
            onDeleteContact={deleteContact}
          />
        </List>
      </div>
    </div>
  );
};
