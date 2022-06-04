import { ContactListItem } from './ContactListItem/ContactListItem';
import { ContactListContainer } from './ContactList.styled';
import { usePhonebook } from 'redux/phonebook/phonebookSlice';
import { Notification } from 'components/Notification/Notification';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getContacts } from 'redux/phonebook/phonebookOperations';
import Loader from 'components/Loader/Loader';

export const ContactList = () => {
  const { contacts, filter, deleteContact, isLoading } = usePhonebook();
  const dispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(getContacts());
    return () => {
      promise.abort();
    };
  }, [dispatch, filter]);

  const filterContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const visibleContacts = filterContacts();

  return (
    <>
      {isLoading && <Loader />}
      {contacts.length && visibleContacts.length && !isLoading ? (
        <ContactListContainer>
          {visibleContacts.map(({ id, name, number }) => {
            return (
              <ContactListItem
                key={id}
                id={id}
                name={name}
                number={number}
                deleteContact={deleteContact}
              />
            );
          })}
        </ContactListContainer>
      ) : (
        !isLoading && <Notification message="List is empty" />
      )}
    </>
  );
};
