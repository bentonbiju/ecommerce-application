import React, { useState } from 'react'
import ReactDom from 'react-dom'

export default function Modal({open,children,onClose,productID}) {
    const [bidAmount, setBidAmount] = useState('');
    
    if(!open) return null
    const handleSubmit = async (e) => {
        console.log('hi')
        e.preventDefault(); // Prevent default form submission
        
        try {
            const response = await fetch('/api/products/bid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bid: bidAmount, product:productID }) // Send bidAmount as payload
            });

            if (response.ok) {
                console.log('Bid submitted successfully');
                window.alert('Bid submitted successfully.')
                onClose(); // Close the modal on successful submission
            } else {
                switch(response.status){

                    case 400:
                        window.alert('Bid amount must be provided.')
                        break;
                    case 401:
                        window.alert('Only logged in users can make bids.')
                        break;
                    case 409:
                        window.alert('Bid amount must be higher than current price.')
                        break;
                    case 404:
                        window.alert('Product not found.')
                        break;
                    default:
                        window.alert('An unexpected error occurred.');
                        break;
                }
            }
        } catch (error) {
            console.error('Error submitting bid:', error);
        }
    };
    return ReactDom.createPortal(
    <>
        <div className = 'overlay-style'>
            <div className='pop-up'>
                <form className='pop-up-buttons' onSubmit={handleSubmit}>
                    <h3>How much would you like to bid for this product</h3>
                    <input type="text" autoFocus onChange={(e) => setBidAmount(e.target.value)} style={{textAlign: 'center', lineHeight: '20px',height: '50px', width: '200px', border: '2px solid',borderRadius: '10px',background: 'lightgrey',fontSize: '1.7rem' }}/>
                    <div>
                        <button type='submit' style={{marginRight:'2px'}} >Make Bid</button>
                        <button type = 'button' onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </>,
    document.getElementById('portal')
    )
}
