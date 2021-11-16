// import React from 'react';
import { useState, useEffect } from 'react';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import s from './ContactList.module.css';
import { getFilter } from 'redux/contacts/contacts-selectors';
import { useDeleteContactMutation, useFetchContactsQuery } from 'redux/contacts/contactsSlice';
// import { authSelectors } from 'redux/auth';
import Loader from 'react-loader-spinner';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  const { data, isFetching } = useFetchContactsQuery();

  useEffect(() => {
    (async () => {
      await data;
      if (data) {
        setContacts(data);
      }
    })();
  }, [data]);

  const filter = useSelector(getFilter);

  const getVisibleContacts = (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase().trim();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) || contact.number.includes(filter),
    );
  };
  // const { data: contacts, isFetching } = useFetchContactsQuery();

  const [deleteContact] = useDeleteContactMutation();

  return (
    <ul className="s.list">
      {isFetching && <Loader type="Oval" color="#00BFFF" height={32} width={32} />}
      {contacts &&
        getVisibleContacts(contacts, filter)?.map(({ id, name, number }) => (
          <li key={id} className={s.item}>
            <p className="s.contacts">
              {name}: <span>{number}</span>
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
