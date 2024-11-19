import 'bootstrap/dist/css/bootstrap.css';
import '../../App.css';
import NavbarComponent from '../../components/NavbarComponent'
import { Link } from 'react-router-dom';

function LandingPage() {
  
    return (
      
      <>
        <NavbarComponent />
        <div class = "centering-text">
          <h1 class="display-3">Wanna trade heh? Well you're in the right place.</h1>
          <Link to='/products'><button type="button" class="btn btn-info btn-lg">Start Trading</button></Link>
        </div>
      </>
    )
}
  
  
  
export default LandingPage