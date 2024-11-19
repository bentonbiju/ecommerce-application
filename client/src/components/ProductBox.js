import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import car1 from '../imgs/car1.jpg'
function ProductBox({product}) {
    return(
        <>
            
            <div id = "product_box">

                <img src = {product.image} style={{borderRadius:'20px',width:'100%', height:'60%'}} alt = "No Image"></img>
                <h6 style={{paddingTop:'10px'}}>{product.name}</h6>
                <h6>{product.description}</h6>
                <h6>{product.price}</h6>
            </div>
            
            
        </>
    )
}

export default ProductBox
