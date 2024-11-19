import 'bootstrap/dist/css/bootstrap.css';
import '../../App.css';
import ProductBox from '../../components/ProductBox';
import NavbarComponent from '../../components/NavbarComponent'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
function ProductPage() {

    const [backendData, setBackendData] = useState([{}])
    useEffect(() => {
        fetch("/api/products").then(
            response => response.json()
        ).then(
            data =>{
                setBackendData(data)
            }
        )
    },[])
    return(
        <>
            <NavbarComponent />
            <div id = "product_group_box">
                {backendData.map((product) => (
                    <Link to = {`/products/${product.uuid}`}>
                        <ProductBox product = {product} />
                    </Link>
                    
                ))}
               
            </div>
        </>
    )
}
export default ProductPage