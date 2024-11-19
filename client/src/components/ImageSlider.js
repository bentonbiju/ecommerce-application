import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { useState } from 'react';



function ImageSlider( imageUrls= [] ) {
    const [imageIndex,setImageIndex] = useState(0)
    console.log(imageUrls)
    function showNextImage(){
        setImageIndex(index =>{
            if (index === imageUrls.imageUrls.length - 1)
                return 0
            return index + 1
        })
    }
    function showPrevImage(){
        setImageIndex(index =>{
            if (index === 0)
                return imageUrls.imageUrls.length -1
            return index -1 
        })
    }

    return(
        <>
            <div style = {{width:"100%", height:"100%", position:"relative"}}>
                <div style={{width:"100%",height:"100%",border:"5px solid black",borderRadius:"50px",display:"flex", overflow:"hidden"}}>
                    {imageUrls.imageUrls.map(url => (
                        <img key = {url} src = {url} style = {{translate:`${-100*imageIndex}%`}} className='image-slider-img' />
                    ))}
                </div>
                <div id ="left-button-styling" onClick={showPrevImage} style = {{left:"0px"}}><CircleChevronLeft id = "image-switch-button-left" /></div>
                <div id ="left-button-styling" onClick = {showNextImage} style = {{right:"0px", borderTopLeftRadius: "100px", borderBottomLeftRadius:"100px", borderTopRightRadius: "0px",borderBottomRightRadius:"0px"}}><CircleChevronRight id = "image-switch-button-left" /></div>
            </div>

        </>
    )
}
export default ImageSlider