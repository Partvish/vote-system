import React from 'react';
import { Link } from 'react-router-dom';
import './image-link-button.css';

type ImageLinkButtonPropsType = {
    link: string,
    imgLink: string,
    text: string
}

const ImageLinkButton = ( props : ImageLinkButtonPropsType)=>{
    return <div style={{ maxWidth: 600, maxHeight: 400, margin: 10}} className="grow">
    <Link to={props.link}>
         <div>
             <div style={{position: 'absolute', color: 'white', fontWeight: 'bold', fontSize: 30, opacity: 1, background: 'black'}}>{props.text}</div>
             <picture>
                 <img src={props.imgLink} style={{objectFit: 'fill', width: 400, height: 300}} />
             </picture>
         </div>
     </Link>
 </div>
}


export default ImageLinkButton;
