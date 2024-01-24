import React from 'react';
import {removeContact} from '../../redux/contacts/contactsSlice';

import {useDispatch} from 'react-redux';
import css from "./contacts.module.css";

export const Contact = ({id, name, number}) => {
const dispatch = useDispatch();
  const handleDeleteBtnClick = () => {
    const action = removeContact(id);
    dispatch(action);
  };
  return (
  <li className={css.contactItem}>
    <p className={css.contactText}>
      <span className={css.contactName}>{name}:</span>
      <span>{number}</span>
    </p>
    <button
      className={css.deleteContactBttn}
      type="button"
      onClick={handleDeleteBtnClick}
    >
      Delete
    </button>
  </li>
  );
}