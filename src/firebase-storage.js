// Import the functions you need from the SDKs you need

import { createApp } from './firebase-config.js';
import { getUrl } from './firebase-get-url.js';
import { generateDate } from './generate-date.js';
import {
    getStorage,
    ref,
    uploadBytesResumable
} from 'firebase/storage';

export function uploadFile(file) {
    return new Promise((resolve, reject) => {
        // Get file's name from the uploaded file
        const file_name = `/dir/[${generateDate()}] - ${file.name}`;

        // Initialise Firebase App and Firebase Storage
        const firebaseApp = createApp();
        const storage = getStorage();
        const storageRef = ref(storage, file_name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed', (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + parseInt(progress) + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                // case 'running':
                //     console.log('Upload is running');
                //     break;
            }
        }, (error) => {
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                    // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, async () => {
            // When upload is successful, it returns the url
            let url = await getUrl(file_name).catch(err => console.log(err));
            if(url)
                resolve(url)
            else 
                reject();
        });
    })
}