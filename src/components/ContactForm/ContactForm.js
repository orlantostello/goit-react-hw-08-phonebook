import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import shortid from 'shortid';
import s from './ContactForm.module.css';
import { toast } from 'react-hot-toast';

import { useCreateContactMutation, useFetchContactsQuery } from 'redux/contacts/contactsSlice';
import Loader from 'react-loader-spinner';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [contacts, setContacts] = useState([]);

  const [createContact, { isLoading }] = useCreateContactMutation();
  const { data } = useFetchContactsQuery();

  useEffect(() => {
    (async () => {
      await data;
      if (data) {
        setContacts(data);
      }
    })();
  }, [data]);

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

  const handleSubmit = async e => {
    e.preventDefault();
    const contact = {
      name: name,
      number: number,
    };

    if (name === '') {
      toast.error('The name cannot be empty!', {
        duration: 3000,
        style: {
          color: '#fff',
          backgroundColor: '#c40b0b',
        },
      });
    }

    if (number === '') {
      toast.error('The number cannot be empty!', {
        duration: 3000,
        style: {
          color: '#fff',
          backgroundColor: '#c40b0b',
        },
      });
    }

    if (contacts.find(contact => name.toLowerCase() === contact.name.toLowerCase())) {
      toast.error('Contact is already on the ', {
        duration: 3000,
        style: {
          color: '#fff',
          backgroundColor: '#c40b0b',
        },
      });
      reset();
      return;
    }
    if (name && number) {
      createContact(contact);

      reset();

      toast.success('Contact added', {
        duration: 3000,

        style: {
          color: '#fff',
          backgroundColor: '#23dd23',
        },
      });
    }
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

      <button className={s.btn} type="submit" disabled={isLoading}>
        {isLoading && (
          <Loader className="Loader" type="ThreeDots" color="blue" height={15} width={15} />
        )}
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
