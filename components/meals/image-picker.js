'use client';

import { useRef, useState } from 'react';
import styles from './image-picker.module.css';
import Image from 'next/image';

const ImagePicker = ({label, image}) => {
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();

    function handlePickClick(){
        imageInput.current.click();
    }

    function handleImageChange(event){
        const file = event.target.files[0];
        if(!file){
            setPickedImage(null);
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);

    }

    return (
        <div className={styles.picker}>
            <label htmlFor={image}>{label}</label>
            <div className={styles.controls}>
                <div className={styles.preview}>
                    {!pickedImage && <p>No Image picked yet.</p>}
                    {pickedImage && <Image src={pickedImage} alt="Image selected by the user." fill />}

                </div>
                <input 
                    type="file" 
                    id={image} 
                    accept="image/png, image/jpeg" 
                    name={image} 
                    className={styles.input}
                    ref={imageInput}
                    onChange={handleImageChange}
                />
                <button className={styles.button} type='button' onClick={handlePickClick}>Pick in Image</button>
            </div>
        </div>
    );
}
 
export default ImagePicker;