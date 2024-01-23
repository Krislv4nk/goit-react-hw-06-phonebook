import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact} from '../../redux/contacts/contactsSlice';

import css from "./contactForm.module.css";


export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts.contacts);
  
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleNumberChange = (evt) => {
    setNumber(evt.target.value);
  };

  const handleAddContact = (evt) => {
    evt.preventDefault();

    const formData = { name, number };

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

    setName('');
    setNumber('');
  };

  
    return (
      <form className={css.contactForm} onSubmit={handleAddContact}>
      <label className={css.label}>
        Name
        <input
          className={css.contactInput}
          type="text"
          name="name"
          placeholder="Enter name"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className={css.label}>
        Number
        <input
          className={css.contactInput}
          type="tel"
          name="number"
          placeholder="Enter phone number"
          required
          value={number}
          onChange={handleNumberChange}
        />
      </label>
      <button className={css.addContactBttn} type="submit">
        Add contact
      </button>
    </form>
  );
}



