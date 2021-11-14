// import { useEffect } from 'react';
// import { connect } from 'react-redux';
// import { useDispatch } from 'react-redux';
import './App.css';
import Container from './components/Container/Container';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
// import contactsOperations from 'redux/contacts/contacts-operations';
// import { useFetchContactsQuery } from 'redux/contacts/contactsSlice';

function App() {
  // const dispatch = useDispatch();
  // useEffect(() => dispatch(contactsOperations.fetchContacts()), [dispatch]);

  // const { data: contacts } = useFetchContactsQuery();

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {/* {contacts && <ContactList contacts={contacts} />} */}
      <ContactList />
    </Container>
  );
}

export default App;
