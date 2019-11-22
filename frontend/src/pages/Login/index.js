import React, { useState } from 'react';

import api from '../../services/api';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await api.post('/sessions', { email });

    const { _id } = response.data;

    localStorage.setItem('user', _id);

    history.push('/dashboard');
  };

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre{' '}
        <strong>talentos</strong> para a sua empresa
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>E-MAIL *</label>
        <input
          type='email'
          id='email'
          placeholder='Escreva o seu e-mail'
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <button className='btn' type='submit'>
          Entrar
        </button>
      </form>
    </>
  );
};

export default Login;
