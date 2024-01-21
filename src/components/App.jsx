import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import css from './App.module.css';

import { ContactForm } from './contactForm/contactForm';
import { Filter } from './filter/filter';
import { ContactList } from './contactList/contactList';

export const App = () => {
  
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState([{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },]);

useEffect(() => {
  const contacts = window.localStorage.getItem('contacts');
  if (contacts) {
    setContacts(JSON.parse(contacts));
  }
}, []);
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  

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
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const handleDeleteBtnClick = contactId => {
    setContacts(prevContacts => prevContacts.filter(({ id }) => id !== contactId));
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


// export  class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//     addedToLocalSt: false,
//   };

// componentDidUpdate(prevProps, prevState) {
//   if (prevState.contacts !== this.state.contacts){
//     window.localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//   }
// }

// componentDidMount() {
//   const contacts = window.localStorage.getItem('contacts');
  
//   if (contacts) {
//     this.setState({ contacts: JSON.parse(contacts) });
//   }
// }
  

//   handleAddedContact = formData => {
//     const { contacts } = this.state;

//     const hasDuplicates = contacts.some(
//       ({ name, number }) =>
//         name.toLowerCase() === formData.name.toLowerCase() || 
//         number === formData.number
//     );
//     if (hasDuplicates) {
//       alert(`Contact ${formData.name} is already in contacts.`);
//       return;
//     }

//     const newContact = {
//       ...formData,
//       id: nanoid(5),
//     };
//     this.setState(({ contacts }) => {
//       return { contacts: [...contacts, newContact] };
//     });
//   };

//   handleFilterChange = e => {
//     const filterValue = e.currentTarget.value;
//     this.setState({ filter: filterValue });
//   };

//   handleDeleteBtnClick = contactId => {
//     this.setState(({ contacts }) => {
//       return {
//         contacts: contacts.filter(({ id }) => id !== contactId),
//       };
//     });
//   };
//   render() {
//     const { contacts, filter } = this.state;
//     const filteredContacts = contacts.filter(({ name }) =>
//       name.toLowerCase().includes(filter.trim().toLowerCase())
//     );

//     return (
//       <div className={css.container}>
//         <h1 className={css.phoneBookTitle}>Phonebook</h1>
//         <ContactForm onSubmit={this.handleAddedContact} />
//         <h2 className={css.contactTitle}>Contacts</h2>
//         <Filter value={filter} onChange={this.handleFilterChange} />
//         <ContactList
//           contacts={filteredContacts}
//           handleDeleteBtnClick={this.handleDeleteBtnClick}
//         />
//       </div>
//     );
//   }
// }