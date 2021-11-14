// import { createSelector } from '@reduxjs/toolkit';

const getFilter = state => state.contacts.filter;

const getAllContacts = state => state.contacts.items;

// const sortAllContacts = createSelector([getAllContacts], contacts => {
//   return contacts.slice().sort((a, b) => b.id - a.id);
// });
// const getVisibleContacts = createSelector([sortAllContacts, getFilter], (contacts, filter) => {
//   const normalizedFilter = filter.toLowerCase().trim();
//   return contacts.filter(
//     contact =>
//       contact.name.toLowerCase().includes(normalizedFilter) || contact.number.includes(filter),
//   );
// });

const getVisibleContacts = (contacts, filter) => {
  const normalizedFilter = filter.toLowerCase().trim();

  return contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(normalizedFilter) || contact.phone.includes(filter),
  );
};

// export { getFilter, getVisibleContacts, getAllContacts, sortAllContacts };
export { getFilter, getVisibleContacts, getAllContacts };
