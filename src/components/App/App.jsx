import React from 'react';
import { nanoid } from 'nanoid';

import css from './App.module.css';

import { ContactForm } from '../contactForm/contactForm';
import { Filter } from '../filter/filter';
import { ContactList } from '../contactList/contactList';

import { useDispatch, useSelector } from 'react-redux';
import { addContact,removeContact} from '../../redux/contacts/contactsSlice';
import { setFilter } from '../../redux/filter/filterSlice';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts.contacts);
  const filter = useSelector(store => store.filter.filter);

  const handleAddedContact = formData => {

    const hasDuplicates = contacts.some(
      ({ name, number }) =>
        name.toLowerCase() === formData.name.toLowerCase() || 
        number === formData.number
    );
    if (hasDuplicates) {
      alert(`Contact ${formData.name} is already in contacts.`);
      return;
    }

    const newContact = {
      ...formData,
      id: nanoid(5),
    };
    const action = addContact(newContact);
    dispatch(action);
  };

  const handleFilterChange = event => {
    const value = event.target.value;
    const action = setFilter(value);
    dispatch(action);
  };

  const handleDeleteBtnClick = contactId => {
    const action = removeContact(contactId);
    dispatch(action);
  };
  
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.trim().toLowerCase())
  );

    return (
      <div className={css.container}>
        <h1 className={css.phoneBookTitle}>Phonebook</h1>
        <ContactForm onSubmit={handleAddedContact} />
        <h2 className={css.contactTitle}>Contacts</h2>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          handleDeleteBtnClick={handleDeleteBtnClick}
        />
      </div>
    );
  }


