import 'bootstrap/dist/css/bootstrap.css';
import '../../App.css';
import NavbarComponent from '../../components/NavbarComponent'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(username,password)
      // Sending form data to the backend
      const response = await fetch('/api/user_management/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 201)
      {
        const data = await response.json();
        alert(data.message)
        navigate('/products')
      }
      else{
        const error = await response.json();
        alert(`Error: ${error.error}`); // Show error message
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
                <input type="text" class="form-control" id="username_form_control" placeholder="Enter the Username that you would like." value={username}
                onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div class="mb-3">
                <label for="password_form_control" class="form-label">Password</label>
                <input type="password" class="form-control" id="password_form_control" placeholder="Enter the Password that you would like." value={password}
        onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type = "submit" class="btn btn-primary">Register</button>
            </form>
            </div>
        </div>
      </>
    )
}

export default RegistrationPage