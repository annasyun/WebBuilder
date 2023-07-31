import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import useAuth from 'hooks/useAuth';

import { setUser } from 'redux/userSlice';

import Admin from 'pages/Admin';
import NotFound from 'pages/NotFound';
import Editor from 'pages/Editor';
import Login from 'components/Login/Login';
import Signup from 'components/Login/Signup';

import Modal from 'components/Modal/Modal';
import Main from 'pages/Main';
import PrivateRoute from './PrivateRoute';

const Router = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) dispatch(setUser(user));
  }, [user, dispatch]);

  return (
    <BrowserRouter>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin' element={
          <PrivateRoute>
            <Admin setIsOpen={setIsOpen} isLoading={isLoading} setIsLoading={setIsLoading} />
          </PrivateRoute>
        } />
        <Route path='/editor/:page_idx' element={<Editor isLoading={isLoading} setIsLoading={setIsLoading} />} />
        <Route path='/main' element={<Main isLoading={isLoading} setIsLoading={setIsLoading} />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;