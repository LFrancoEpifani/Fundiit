import React, {useState, useEffect, useContext} from 'react'
import { imageDb } from './Config'
import { getDownloadURL, listAll, ref, uploadBytes} from 'firebase/storage'
import { v4 } from 'uuid'
import { EventContext } from './eventContext'

function Upload() {

    const { setImageUrls } = useContext(EventContext);

    const handleClick = async () => {
        if (!isUpload) {
          return;
        }
      
        const imgRef = ref(imageDb, `files/uploads${v4()}`);
        const snapshot = await uploadBytes(imgRef, isUpload);
        const url = await getDownloadURL(snapshot.ref);
      
        // Actualiza formData con la URL de la imagen
        setFormData(prevData => ({ ...prevData, urlImage: url }));
      };
    
    useEffect(() => {
        listAll(ref(imageDb, 'files')).then(imgs => {
            imgs.items.forEach(val => {
                getDownloadURL(val).then(url => {
                    setImageUrls(prevUrls => { // Aquí debes usar setImageUrls
                        if (!prevUrls.includes(url)) {
                            return [...prevUrls, url];
                        } else {
                            return prevUrls;
                        }
                    });
                });
            });
        });
    }, []);

    const [isUpload, setIsUpload] = useState('');

  
    return (
        <div>
            <input type="file" onChange={(e) => {setIsUpload(e.target.files[0])}}/>
            <button onClick={handleClick}>Upload</button>
            <br />
           
        </div>
    );
}

export default Upload