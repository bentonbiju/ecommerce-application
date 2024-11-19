
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../App.css';
import { useEffect, useState } from 'react';
function NavbarComponent({ onUserChange }){
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUserSession = async () => {
            const response = await fetch('/api/user_management/session', {
                method: 'GET',
                credentials: 'include', // Important for sending cookies with requests
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData); // Set user information to state
                if (onUserChange) {
                    onUserChange(userData); //Send the data to the parent component which is 
                }
            }
            
        };

        fetchUserSession();
    }, []);
    return(
        <Navbar expand="lg" className="bg-orange">
            <Container >
            <Navbar.Brand id = "brand-name" href="/">Trade</Navbar.Brand>
            <Nav className = "me-auto" >
                <Nav.Link href="/products">Products</Nav.Link>
                <Nav.Link href="/create_product">List Product</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="/register">Register</Nav.Link>
                {user ? (
                    <Nav.Link href="/login">{user}</Nav.Link> // Display username if logged in
                ) : (
                    <Nav.Link href="/login">Login</Nav.Link> // Display login link if not logged in
                )}
            </Nav>
            </Container>
        </Navbar>

    )
}

export default NavbarComponent