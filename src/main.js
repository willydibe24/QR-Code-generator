// Main module called in index.html
import '../style.css';
import { send_input as send } from "./generate.js";
import { regenerate as newQR } from "./regenerate.js";

window.send = send;
window.newQR = newQR;