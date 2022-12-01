import { useState } from 'react';
import s from './ContactsForm.module.css';
import PropTypes from 'prop-types';

const ContactsForm = ({ catchSubmitInfo }) => {
  // state = {
  //   name: '',
  //   number: '',
  // };
  const [contact, setContact] = useState({ name: '', number: '' });

  const onHandleChange = event => {
    const { name, value } = event.target;
    setContact(prevState => ({ ...prevState, [name]: value }));
  };

  const reset = () => {
    setContact({ name: '', number: '' });
  };

  const onSubmit = event => {
    event.preventDefault();
    catchSubmitInfo(contact);
    reset();
  };

  return (
    <form onSubmit={onSubmit} className={s.form}>
      <label className={s.label}>
        Name
        <input
          className={s.inputName}
          type="text"
          name="name"
          value={contact.name}
          onChange={onHandleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={s.label}>
        Number
        <input
          className={s.inputNumber}
          type="tel"
          name="number"
          value={contact.number}
          onChange={onHandleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactsForm.propTypes = {
  catchSubmitInfo: PropTypes.func.isRequired,
};

export default ContactsForm;
