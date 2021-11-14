import React from 'react';
import s from './Filter.module.css';
import shortid from 'shortid';
// import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
// import { contactsActions } from '../../redux/contacts/contacts-actions';
// import contactsOperations from 'redux/contacts/contacts-operations';
import { changeFilter, getFilter } from 'redux/contacts';
// import { getVisibleContacts } from 'redux/contacts/contacts-selectors';

const filterInputId = shortid.generate();

const Filter = () => {
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();
  const OnChangeFilter = e => dispatch(changeFilter(e.target.value));

  return (
    <label htmlFor={filterInputId}>
      <span className={s.span}>Find contacts by name and number</span>
      <input
        className={s.input}
        type="text"
        value={filter}
        onChange={OnChangeFilter}
        id={filterInputId}
      />
    </label>
  );
};

export default Filter;
