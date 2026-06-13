import { useNavigate } from 'react-router';

import { Card } from '@core/components/card/card';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const user = {
        username: formData.get('username') as string,
        password: formData.get('password') as string,
    };

    const response = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      console.error('Login failed');
      return;
    }

    const data = await response.json();

    localStorage.setItem('token', data.accessToken);

    navigate('/products');
  };

  return (
    <Card title="Login">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </Card>
  );
};