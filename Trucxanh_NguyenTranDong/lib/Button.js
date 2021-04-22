import { Node } from "./Node.js";
import { Label } from "./Label.js";

export class Button extends Node {

    constructor(txt, positionX, positionY){
        super();
        this._txt = "";
        if (txt) this.txt = txt;
        this.x = positionX;
        this.y = positionY;
        this.width = 150;
        this.height = 100;
        this.elm.style.fontSize = "50px";
        this.elm.style.color = "#fff"
        this.elm.style.background = "#333"
        this._createLabelButton();
    }

    get txt() {
        return this._txt;
      }
      set txt(value) {
        this._txt = value;
      }
    
    _createLabelButton() {
        let labelButton = new Label(this._txt,{},true);
        this.addChild(labelButton);
    }

}