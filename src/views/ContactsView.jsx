import { ContactForm } from '../components/ContactForm/ContactForm';
import { Filter } from '../components/Filter/Filter';
import { ContactList } from '../components/ContactList/ContactList';
import { MainTitle, SubTitle } from '../components/App.styled';
import { usePhonebook } from 'redux/phonebook/phonebookSlice';
import Container from '@mui/material/Container';

const ContactsView = () => {
  const { contacts } = usePhonebook();

  return (
    <Container>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm />
      <SubTitle>Contacts</SubTitle>
      {contacts.length >= 1 && <Filter />}
      <ContactList />
    </Container>
  );
};

export default ContactsView;
