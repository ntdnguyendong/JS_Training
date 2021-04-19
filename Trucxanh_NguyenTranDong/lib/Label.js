import {Node} from "./Node.js";

export class Label extends Node {

    constructor(txt) {
        super();
        this._txt = "";
        if (txt) this.txt = txt;
    }

    _initElement(){
        this.elm = document.createElement("label");
        this.elm.style.position = "absolute";
    }

    get txt() {
        return this._txt;
    }
    set txt(value) {
        this._txt = value;
        this.elm.innerText = this._txt;
    }

}