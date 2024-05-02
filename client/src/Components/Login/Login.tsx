import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { loginUser } from '../../store/auth/actionCreators';
import { useAppDispatch } from '../../store';

function Login(): React.ReactElement {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
    navigate('/');
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputLogin">Почта:</label>
          <div className="input-group">
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Пароль:</label>
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Вход
        </button>
      </form>
    </div>
  );
}
export default Login;

