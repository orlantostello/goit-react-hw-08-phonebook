import { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import s from './ContactForm.module.css';
// import { connect } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';

// import contactsOperations from 'redux/contacts/contacts-operations';
import { useCreateContactMutation } from 'redux/contacts/contactsSlice';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  // const dispatch = useDispatch();
  // const addContact = (name, number) => dispatch(contactsOperations.addContact(name, number));

  const [createContact] = useCreateContactMutation();

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();

  // const handleSubmit = e => {
  //   e.preventDefault();

  //   const contact = {
  //     id: shortid.generate(),
  //     name: name,
  //     number: number,
  //   };

  //   addContact(contact);

  //   reset();
  // };

  // const reset = () => {
  //   setName('');
  //   setNumber('');
  // };

  const handleSubmit = async e => {
    e.preventDefault();
    const contact = {
      // id: shortid.generate(),
      name: name,
      phone: number,
    };
    // createContact(e.currentTarget.elements.content.value);
    createContact(contact);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}>
        <span className={s.span}>Name</span>

        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          id={nameInputId}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>

      <label htmlFor={numberInputId}>
        <span className={s.span}>Number</span>

        <input
          className={s.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          id={numberInputId}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </label>
      <br />

      <button className={s.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};

export default ContactForm;
