// Module to generate the QR Code
// Includes the call to the g-drive-api module, to generate file's QR Code
// import { uploadFile as uploadToDrive } from "./g-drive-api.js";
import { uploadFile } from './firebase-storage';

export async function send_input() {
    let input = "";
    let textInput = document.getElementById('text').value;
    let fileInput = document.getElementById('file');
    let loader = document.querySelector('#loader');
    let qrCode = document.querySelector('#qr-code-image');
    let response = "";
    let data = "";
    let errorMsg = "";

    // Gets text if not empty and if there aren't files
    if (textInput != "" && fileInput.files.length == 0) {
        document.querySelector('.content').style.display = "none";
        document.querySelector('.hidden').style.display = "flex";

        loader.style.display = "flex";
        qrCode.style.display = "none";

        input = textInput;

        response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${input}`);
        data = await response.blob();

        loader.style.display = "none";
        qrCode.style.display = "flex";

        qrCode.src = URL.createObjectURL(data);
    }


    // Gets file if not empty
    if (fileInput.files.length != 0 && textInput == "") {
        document.querySelector('.content').style.display = "none";
        document.querySelector('.hidden').style.display = "flex";

        loader.style.display = "flex";
        qrCode.style.display = "none";
        
        input = fileInput.files[0];

        let url = await uploadFile(input);
        if (!url)
            return;
            
        console.log("URL: " + url);

        response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${encodeURIComponent(url)}`);
        data = await response.blob();

        loader.style.display = "none";
        qrCode.style.display = "flex";

        qrCode.src = URL.createObjectURL(data);
    }


    // Error messages
    if (fileInput.files.length == 0 && textInput == "") {
        errorMsg = "<p style = 'color: red; text-align: center; margin: 0 auto;'>Inserisci un input</p>";
    } else if (fileInput.files.length != 0 && textInput != "") {
        errorMsg = "<p style = 'color: red; text-align: center; margin: 0 auto;'>Non puoi inserire 2 input<br> contemporaneamente!</p>";
    } else {
        errorMsg = "";
    }

    document.querySelector('.error-msg').innerHTML = errorMsg;
}