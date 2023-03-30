import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import FormContact from 'components/formContact/FormContact';
import { Filter } from 'components/filter/Filter';
import { ListContact } from 'components/ListContact/ListContact';
import { ItemContact } from 'components/ItemContact/ItemContact';
import css from 'components/App.module.css';

const LS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  contactId() {
    return nanoid(3);
  }

  addContact = (name, number) => {
    const { contacts } = this.state;
    const data = {
      id: this.contactId(),
      name,
      number,
    };

    if (contacts.find(obj => obj.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.setState({
      contacts: [data, ...contacts],
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  findContact = evt => {
    const { value } = evt.target;
    this.setState({ filter: value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const contactsLS = JSON.parse(localStorage.getItem(LS_KEY));
    if (contactsLS) {
      this.setState({ contacts: contactsLS });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;

    const visibleContact = this.getVisibleContacts();

    return (
      <div className={css.container}>
        <h2 className={css.title}>Phonebook</h2>
        <FormContact onSubmit={this.addContact} />

        <h2 className={css.title}>Contacts</h2>
        <div className={css.smalContainer}>
          <Filter filter={filter} findContact={this.findContact} />

          <ListContact>
            <ItemContact
              visibleContact={visibleContact}
              onDeleteContact={this.deleteContact}
            />
          </ListContact>
        </div>
      </div>
    );
  }
}
