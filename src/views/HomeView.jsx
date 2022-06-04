import { Container } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { getIsLoggedIn, getUserName } from 'redux/auth/authSlice';
import { usePhonebook } from 'redux/phonebook/phonebookSlice';

export default function HomeView() {
  const { contacts } = usePhonebook();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const userName = useSelector(getUserName);

  return (
    <Container style={{ textAlign: 'center' }}>
      {!isLoggedIn ? (
        <h1>Welcome to app Phonebook. Please login or registration.</h1>
      ) : (
        <h1>
          Hello {userName}! You have {contacts.length} contacts.
        </h1>
      )}
    </Container>
  );
}
