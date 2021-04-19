import {Node} from "./Node.js";

export class Sprite extends Node {

    constructor(path) {
        super();
        this._path ="";
        if (path) this.path = path;
    }

    _initElement(){
        this.elm = document.createElement("img");
        this.elm.style.width = "100%"; 
        this.elm.style.height = "100%"; 
        this.elm.node = this;
    }

    get path() {
        return this._path;
    }
    set path(value) {
        this._path = value;
        this.elm.src = this._path;
    }

    setImg(path) {
        this.path = path;
    }

}