import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from '../css/Login.module.css';
import logo from '../images/logo.png';
import defaultInstance from '../api/defaultInstance';
import { setUser } from '../store/userSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await defaultInstance.post('/login', { email, password });
      if (!response.data.token) {
        throw new Error('No token received from server');
      }
      localStorage.setItem('authToken', response.data.token);

      const user = response.data.user;
      dispatch(setUser(user)); // localStorage.setItem('user', JSON.stringify(user)); // <-- no longer needed, handled in setUser

      if (user.role === 'admin') {
        navigate('/');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <img src={logo} alt="Logo" />
        </div>
        <div className={styles.rightContainer}>
          <form onSubmit={handleLogin}>
            <b>მეილი</b>
            <input
              type="email"
              name="email"
              placeholder="შეიყვანე მეილი"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <b>პაროლი</b>
            <input
              type="password"
              name="password"
              placeholder="შეიყვანე პაროლი"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit">შესვლა</button>
          </form>
        </div>
      </div>
    </div>
  );
}