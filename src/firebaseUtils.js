// firebaseUtils.js

import { imageDb } from './Config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

export const uploadImageToFirebase = async (imageFile) => {
    if (!imageFile) return null;

    const imgRef = ref(imageDb, `files/${v4()}`);
    await uploadBytes(imgRef, imageFile);
    return await getDownloadURL(imgRef);
};
