import React from 'react'
import '../../App.css';
import NavbarComponent from '../../components/NavbarComponent';
import {useForm} from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.css';
import { v4 as uuidv4 } from 'uuid';
export default function CreateProductPage() {
    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) =>{
        console.log(data);
        const formData = new FormData()
        formData.append('id', uuidv4());
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        if (data.pictures && data.pictures.length > 0) {
            for (let i = 0; i < data.pictures.length; i++) {
                formData.append('pictures', data.pictures[i]);
            }
        }
        console.log(formData)

        try {
            const response = await fetch('/api/products/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                window.alert('Product Created.')
                console.log('Files uploaded successfully!');
            } else {
                switch(response.status){
                    case 401:
                        window.alert('User should be logged in to create a product.')
                    case 500:
                        window.alert('Failed to save the product to the database.')
                }
                console.error('Need the user to be logged in to create a product:', response.statusText);
            }
        } catch (error) {
            console.error('Error during upload:', error);
        }
    }
    return (
        <>
            <NavbarComponent />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='listing-form' style={{display:'flex', justifyContent:'center',flexDirection:'column'}}>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Name of the Product:</label>
                        <input {...register("name")} type="text" class="form-control" id="exampleFormControlInput1"   />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Starting Price:</label>
                        <input {...register("price")} type="text" class="form-control" id="exampleFormControlInput1"   />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description of the Product:</label>
                        <textarea {...register("description")} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <div class="mb-3">
                        <label for="formFileMultiple" class="form-label">Upload the pictures of the product.</label>
                        <input {...register('pictures')} class="form-control" type="file" id="formFileMultiple" multiple />
                    </div>
                    
                </div>
                <button class = "bidding-button" style={{marginLeft:'40px'}}>Submit</button>
            </form>
        </>
    )
}
