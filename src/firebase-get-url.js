import {
    getStorage,
    ref,
    getDownloadURL
} from "firebase/storage";

export function getUrl(filename) {
    return new Promise((resolve, reject) => {
        // Create a reference to the file we want to download
        const storage = getStorage();
        const fileRef = ref(storage, filename);

        // Get the download URL
        getDownloadURL(fileRef).then((url) => {
                resolve(url);
            })
            .catch((error) => {
                switch (error.code) {
                    case 'storage/object-not-found':
                        reject("File doesn't exist");
                        break;
                    case 'storage/unauthorized':
                        reject("User doesn't have permission to access the object");
                        break;
                    case 'storage/canceled':
                        reject("User canceled the upload");
                        break;
                    case 'storage/unknown':
                        reject("Unknown error occurred, inspect the server response");
                        break;
                }
                return false;
            });
    })
}