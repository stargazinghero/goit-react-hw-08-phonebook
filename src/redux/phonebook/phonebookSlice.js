import { createSlice } from '@reduxjs/toolkit';

import { useDispatch, useSelector } from 'react-redux';
import { getContacts, addContact, deleteContact } from './phonebookOperations';

// ======= Slice

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: {
      items: [],
      filter: '',
    },
    info: {
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    changeFilter(state, action) {
      state.contacts.filter = action.payload;
    },
  },
  extraReducers: {
    [getContacts.pending]: state => {
      state.info.isLoading = true;
      state.info.error = null;
    },
    [getContacts.fulfilled]: (state, action) => {
      state.contacts.items = action.payload;
      state.info.isLoading = false;
      state.info.error = null;
    },
    [getContacts.rejected]: (state, action) => {
      state.info.isLoading = false;
      state.info.error = action.payload;
    },

    [addContact.pending]: state => {
      state.info.isLoading = true;
      state.info.error = null;
    },
    [addContact.fulfilled]: state => {
      state.info.isLoading = false;
      state.info.error = null;
    },
    [addContact.rejected]: (state, action) => {
      state.info.isLoading = false;
      state.info.error = action.payload;
    },

    [deleteContact.pending]: state => {
      state.info.isLoading = true;
      state.info.error = null;
    },
    [deleteContact.fulfilled]: state => {
      state.info.isLoading = false;
      state.info.error = null;
    },
    [deleteContact.rejected]: (state, action) => {
      state.info.isLoading = false;
      state.info.error = action.payload;
    },
  },
});

const getContactsState = state => state.phonebook.contacts.items;
const getFilterState = state => state.phonebook.contacts.filter;
const getIsLoadingState = state => state.phonebook.info.isLoading;
const { changeFilter } = phonebookSlice.actions;
export const phonebookReducer = phonebookSlice.reducer;

// ======= Custom Hook

export const usePhonebook = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContactsState);
  const filter = useSelector(getFilterState);
  const isLoading = useSelector(getIsLoadingState);
  const handleAddContact = contact => dispatch(addContact(contact));
  const handleDeleteContact = id => dispatch(deleteContact(id));
  const handleChangeFilter = e => dispatch(changeFilter(e.currentTarget.value));
  return {
    isLoading,
    contacts,
    filter,
    addContact: handleAddContact,
    deleteContact: handleDeleteContact,
    changeFilter: handleChangeFilter,
  };
};
