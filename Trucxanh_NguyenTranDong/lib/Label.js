import { Node } from "./Node.js";

export class Label extends Node {
  constructor(txt, txtStyle, isCenter) {
    super();
    this._txt = "";
    if (txt) this.txt = txt;
    this._txtStyle = {};
    if (txtStyle) {
      this.txtStyle = txtStyle;
    }
    this._isCenter = {};
    if (isCenter) {
      this.isCenter = isCenter;
    }
  }

  _initElement() {
    this.elm = document.createElement("label");
    this.elm.style.fontSize = this._txtStyle;
    this.elm.style.color = this._txtStyle;
    this.elm.style.position = "absolute";
  }

  get txt() {
    return this._txt;
  }
  set txt(value) {
    this._txt = value;
    this.elm.innerText = this._txt;
  }

  get txtStyle() {
    return this._txtStyle;
  }

  set txtStyle(value) {
    this._txtStyle = value;
    this.elm.style.fontSize = this._txtStyle.fontSize;
    this.elm.style.color = this._txtStyle.color;
  }

  get isCenter() {
    return this._isCenter;
  }

  set isCenter(value) {
    this._isCenter = value;
    if (this.active == true) {
      this.elm.style.left = "50%";
      this.elm.style.top = "50%";
      this.elm.style.transform = "translate(-50%, -50%)";
    }
  }
}
