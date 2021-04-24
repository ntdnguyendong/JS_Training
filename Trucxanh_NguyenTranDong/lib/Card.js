import { Label } from "./Label.js";
import { Node } from "./Node.js";
import { Sprite } from "./Sprite.js";

export class Card extends Node {
  constructor(index, value, positionX, positionY, zIndex) {
    super();
    this.index = index;
    this.value = "";
    if (value) this.value = value;
    this.x = positionX;
    this.y = positionY;
    this.zIndex = "";
    if(zIndex) this.zIndex = zIndex;
    this._createCard();
    this._initImg();
    this._createLabelImg();
  }

  _initElement() {
    super._initElement();
  }

  _createCard() {
    this.width = 100;
    this.height = 100;
    this.opacity = 1;
  }

  _initImg() {
    let img = new Sprite("./img/cardBg.jpg");
    img.elm.node = this;
    this.addChild(img);
  }

  _createLabelImg() {
    let labelImg = new Label(this.index, {}, true);
    this.addChild(labelImg);
    labelImg.elm.node = this;
  }

  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
  }

  get zIndex(){
    return this._zIndex;
  }
  set zIndex(value){
    this._zIndex = value;
    this.elm.style.zIndex = this._zIndex;
  }
}
