import React, {useState, useEffect, useContext} from 'react'
import { imageDb } from './Config'
import { getDownloadURL, listAll, ref, uploadBytes} from 'firebase/storage'
import { v4 } from 'uuid'
import { EventContext } from './eventContext'

function Upload() {

    const { setImageUrls } = useContext(EventContext);

    const handleClick = () => {
        const imgRef = ref(imageDb, `files/uploads${v4()}`);
        uploadBytes(imgRef, isUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls(prevUrls => {
                    // Solo agrega la URL si aún no está en el estado
                    if (!prevUrls.includes(url)) {
                        return [...prevUrls, url];
                      } else {
                        return prevUrls;
                    }
                });
            });
        });
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