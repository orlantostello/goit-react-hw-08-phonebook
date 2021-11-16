import React from 'react';
import s from './Filter.module.css';
import shortid from 'shortid';

import { useDispatch, useSelector } from 'react-redux';

import { changeFilter, getFilter } from 'redux/contacts';

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
