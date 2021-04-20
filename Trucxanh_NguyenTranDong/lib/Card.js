import { Label } from "./Label.js";
import {Node} from "./Node.js";
import { Sprite } from "./Sprite.js";

export class Card extends Node {
    constructor(index, value, positionX, positionY) {
        super();
        this.index = index;
        this.value = "";
        if (value) this.value = value;
        this.x = positionX;
        this.y = positionY;
        this.width = 100;
        this.height = 100;

        this._createCardCover();
        this._createCard();
        this._createLabelImg();
    }
    
    _initElement() {
        super._initElement();
    }

    _createCard(){
        let card = new Sprite("./img/trucxanh" + this._value + ".jpg");
        card.elm.node = this;
        this.addChild(card);
        card.active = false;
    }

    _createCardCover() {
        let cardCover = new Sprite("./img/cardBg.jpg");
        cardCover.elm.node = this;
        this.addChild(cardCover);
        cardCover.active = true;
    }

    _createLabelImg() {
        let labelImg = new Label(this.index,{},true);
        this.addChild(labelImg);
    }

    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
}