
import { useState, useEffect, useRef } from 'react';

import 'modern-normalize/modern-normalize.css';
import SectionTitle from './Section/SectionTitle';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import s from './app.module.css';

import { nanoid } from 'nanoid';
import { useSearchParams } from 'react-router-dom';

const App = () => {
  const [contacts, setContacts] = useState([]);
 
  const [searchParams, setSearchParams] = useSearchParams();
  const firstRender = useRef(true);
  const filter = searchParams.get('value') ?? '';

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts')) ?? [];
    if (contacts?.length) {
      setContacts([...contacts]);
    }
  }, []);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
      return;
    }
    firstRender.current = false;
  }, [contacts]);

  const onChangeFilterValue = event => {
    

    const nextParams =
      event.target.value !== '' ? { value: event.target.value } : {};
    setSearchParams(nextParams);
  };

  const compareContacts = () => {
    const normalizeFilter = filter.toLowerCase().trim();
    console.log('filter: ', filter);
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const addContact = data => {
    const { name } = data;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} - this contact already in contact list`);
      return;
    } else {
      const contact = { ...data, id: nanoid() };
      setContacts(prevState => [...prevState, contact]);
    }
  };

  const deleteContacts = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  return (
    <div className={s.wrap}>
      <SectionTitle title="Phonebook">
        {/* в инфо приходит наш стейт с формы после сабмита и записываеться в параметр дата */}
        <ContactsForm catchSubmitInfo={addContact} />
      </SectionTitle>
      <SectionTitle title="Contacts">
        <Filter filterValue={filter} catchFilterInfo={onChangeFilterValue} />
        {contacts.length ? (
          <ContactList
            contacts={compareContacts()}
            contactOnDelete={deleteContacts}
          />
        ) : (
          <p>Your phonebook is empty</p>
        )}
      </SectionTitle>
    </div>
  );
};
export default App;
