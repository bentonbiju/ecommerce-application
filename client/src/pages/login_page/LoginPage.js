import 'bootstrap/dist/css/bootstrap.css';
import '../../App.css';
import NavbarComponent from '../../components/NavbarComponent'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/user_management/login', {
      method: 'POST', // Set method to POST
      headers: {
        'Content-Type': 'application/json', // Set content type to JSON
      },
      body: JSON.stringify({ username, password }), // Send data in the body
    });

    if (response.status === 200) {
      alert('Login Successful')
      navigate('/products')
    }
    else if(response.status === 401)
    {
      alert('Incorrect Password')
    }
    else if(response.status === 404)
    {
        alert('User doesn\'t exist')
    }
  };
  return (
    
    <>
      <NavbarComponent />
      <div class="card">
          <div class="card-body">
          <form onSubmit={handleSubmit}>
              <div class="mb-3">
              <label for="username_form_control" class="form-label">Username</label>
              <input type="text" class="form-control" id="username_form_control" placeholder="Enter you're Username." value={username}
              onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div class="mb-3">
              <label for="password_form_control" class="form-label">Password</label>
              <input type="password" class="form-control" id="password_form_control" placeholder="Enter you're Password." value={password}
      onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <button type = "submit" class="btn btn-primary">Login</button>
          </form>
          </div>
    </div>
    </>
  )
}

export default LoginPage