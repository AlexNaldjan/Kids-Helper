import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

interface FormData {
  email: string;
  username: string;
  passwordHash: string;
}

function Register(): React.ReactElement {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    passwordHash: '',
  });

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch(
        'http://192.168.0.2:3000/api/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        },
      );
      if (!response.ok) throw new Error('Registration failed');
      navigate('/login');
    } catch (error) {
      console.error('Registration Error:', error);
    }
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Почта:</label>
          <div className="input-group">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="username">Псевдоним:</label>
          <div className="input-group">
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="passwordHash">Пароль:</label>
          <div className="input-group">
            <input
              type="password"
              name="passwordHash"
              id="passwordHash"
              value={formData.passwordHash}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Register;
