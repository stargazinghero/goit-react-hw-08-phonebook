import Layout from '../components/Layout/Layout';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';

import PrivateRoute from 'views/PrivateRoute';
import PublicRoute from 'views/PublicRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getIsGetCurrentUser } from 'redux/auth/authSlice';
import { getCurrentUser } from 'redux/auth/authOperations';
import Loader from './Loader/Loader';

const HomeView = lazy(() => import('../views/HomeView'));
const LoginView = lazy(() => import('../views/LoginView'));
const RegisterView = lazy(() => import('../views/RegisterView'));
const ContactsView = lazy(() => import('../views/ContactsView'));
const NotFoundView = lazy(() => import('../views/NotFoundView'));

export const App = () => {
  const dispatch = useDispatch();
  const isGetCurrentUser = useSelector(getIsGetCurrentUser);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return isGetCurrentUser ? (
    <Loader />
  ) : (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeView />} />
            <Route
              path="contacts"
              element={
                <PrivateRoute>
                  <ContactsView />
                </PrivateRoute>
              }
            />
            <Route
              path="login"
              element={
                <PublicRoute>
                  <LoginView />
                </PublicRoute>
              }
            />
            <Route
              path="register"
              element={
                <PublicRoute>
                  <RegisterView />
                </PublicRoute>
              }
            />
            <Route path="*" element={<NotFoundView />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
};
