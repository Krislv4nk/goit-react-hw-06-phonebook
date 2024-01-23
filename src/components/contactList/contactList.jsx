import React from 'react';
import { Contact } from "components/contacts/contacts";
import {  useSelector } from "react-redux";
import css from "./contactList.module.css";

export const ContactList = ({handleDeleteBtnClick}) => {
  const contacts = useSelector(store => store.contacts);
  const filter = useSelector(store => store.filter.filter);
  let filteredContacts = contacts;
  if (Array.isArray(contacts)) {
    
    filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.trim().toLowerCase()));
  }
return (
  <ul className={css.contactList}>
    {filteredContacts.map(({ name, number, id }) => (
      <Contact 
        key={id}
        id={id}
        name={name}
        number={number}
        handleDeleteBtnClick={handleDeleteBtnClick}
      />
    ))}
  </ul>)
}