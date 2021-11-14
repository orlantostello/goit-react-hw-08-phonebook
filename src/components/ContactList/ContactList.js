import React from 'react';
import { useSelector } from 'react-redux';
import s from './ContactList.module.css';
import { getFilter } from 'redux/contacts/contacts-selectors';
import { useDeleteContactMutation, useFetchContactsQuery } from 'redux/contacts/contactsSlice';

const ContactList = () => {
  const filter = useSelector(getFilter);

  const getVisibleContacts = (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase().trim();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) || contact.phone.includes(filter),
    );
  };
  const { data: contacts } = useFetchContactsQuery();

  const [deleteContact] = useDeleteContactMutation();

  return (
    <ul className="s.list">
      {contacts &&
        getVisibleContacts(contacts, filter)?.map(({ id, name, phone }) => (
          <li key={id} className={s.item}>
            <p className="s.contacts">
              {name}: <span>{phone}</span>
            </p>
            <button type="button" className={s.btnList} onClick={() => deleteContact(id)}>
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
};

export default ContactList;
