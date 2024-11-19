import 'bootstrap/dist/css/bootstrap.css';
import '../../App.css';
import React, { useEffect, useRef, useState } from 'react';
import NavbarComponent from '../../components/NavbarComponent'
import ImageSlider from '../../components/ImageSlider';
import { ChevronDown } from 'lucide-react';
import Modal from '../../components/Modal';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function ProductInfoPage() {
    const [sessionData, setSessionData] = useState('');
    const descriptionRef = useRef(null)
    const [openModal,setOpenModel] = useState(false)
    const [descButtonRotate,setDescButtonRotate] = useState(false)
    const navigate = useNavigate();
    const getSessionData = (data) => {                      //Function that sets the current user session data. Session data is received from the navbar component.
      setSessionData(data); // Update the state with data from the child
    };
    const { id } = useParams();
    const [backendData, setBackendData] = useState([{}])
    useEffect(() => {
        fetch(`/api/products/${id}`).then(
            response => response.json()
        ).then(
            data =>{
                setBackendData(data)
            }
        )
    },[])
    //Function to close the auction if the auction is closed by the user who is the owner of the product.
    async function closeAuction(){
      try {
        const response = await fetch(`/api/products/close/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          console.log('Field updated successfully');
        } else {
          console.error('Failed to update field');
        }
      } catch (error) {
        console.error('Error updating field:', error);
      }
      window.location.reload();
    }

    async function deleteAuction() {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          alert('Product deleted successfully');
          navigate('/products')
          
        } else {
          alert('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
    //Function to adjust description height when arrow button is pressed.
    function descHeight(){              
      
      if(descriptionRef.current){
        descriptionRef.current.classList.toggle("show")
        setDescButtonRotate((prev)=> !prev)
      }
    }
    return (
      <>
        <NavbarComponent onUserChange ={getSessionData}/>
        <div style = {{maxWidth:"800px", width : "40%",height:"400px",margin:"0 auto",paddingTop:"10px"}}>
          <ImageSlider imageUrls = {backendData.images || []}/>    
        </div>
        <hr></hr>
        <div style={{display:'flex',flexDirection:'column',paddingLeft:'10px'}}>
          <h3>{backendData.name}</h3>
          <h5>Listed by user:   <span style={{fontSize:'0.8rem', color:'darkgrey'}}>{backendData.user}</span></h5>
          <div className='description-body'>
            <span style={{fontSize:"1.5rem"}}>Description</span><ChevronDown onClick = {descHeight} className = {`description-button ${descButtonRotate ? 'description-button-rotate' : '' }`}/>
            <div ref={descriptionRef} className='description'>{backendData.description}</div>
          </div>
          <p style={{fontSize:'1.5rem'}}>Current price:  <span style={{textAlign:'center',lineHeight:'20px',height:'25px',width:'100px',display:'inline-block',border:'2px solid ', borderRadius:'10px',background:'lightgrey'}}>{backendData.current_price}</span></p>
          {(() => {
            if (sessionData === backendData.user) {
              if(backendData.closed === true){
                return(
                  <>
                    <h5>Auction won by:{backendData.current_bidder}</h5>
                    <button 
                      onClick = {() => deleteAuction()}
                      className="bidding-button"
                      style={{ borderRadius: '10px', backgroundColor: '#ffc107' }}
                    >
                      Take down listing.
                    </button>
                  </>
                )
              }
              else{
                return (
                  <button
                    onClick={() => closeAuction()}
                    className="bidding-button"
                    style={{ borderRadius: '10px', backgroundColor: '#ffc107' }}
                  >
                    Close auction.
                  </button>
                );
              }
            } else {
              if(backendData.closed === true)
              {
                return(
                  <h5>Auction won by:{backendData.current_bidder}</h5>
                );
              }
              else{
                return (  
                  <button
                    onClick={() => setOpenModel(true)}
                    className="bidding-button"
                    style={{ borderRadius: '10px', backgroundColor: '#ffc107' }}
                  >
                    Make a Bid
                  </button>
                );
              }
            }
          })()}
        </div>
        
        <Modal open={openModal} onClose={()=>{setOpenModel(false);window.location.reload();}} productID = {id} />
      </>
    )
}

export default ProductInfoPage