import { Card } from "../lib/Card.js";
import { Label } from "../lib/Label.js";
import { Node } from "../lib/Node.js";
import { Sprite } from "../lib/Sprite.js";

export class GameController extends Node {
  init() {
    this._initLabel();
    this._initBg();
    this._initCard();
    this.countClick = 0;
    this.firstCard = null;
    this.secondCard = null;
    this.isSkipStep = true;
    this.score = 1000;
  }

  _initBg() {
    var bg = new Sprite("./img/trucxanh_bg.jpg");
    this.addChild(bg);
  }

  _initLabel() {
    console.log(this.score);
    var scoreLable = new Label("scrore " + this.score);
    // this.addChild(score);
    this.addChild(scoreLable);
  }

  _initCard() {
    let col = 4;
    let row = 5;
    let positionX = 100;
    let positionY = 25;
    var index = 0;
    var value = [];
    let totalCard = 10;

    var arr = [];
    while (arr.length < totalCard * 2) {
      var random = Math.floor(Math.random() * (totalCard * 2)) + 1;
      if (arr.indexOf(random) === -1) arr.push(random);
    }
    console.log(arr);

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        index++;
        value = arr[index - 1];
        if (value > 10) {
          value -= 10;
        }
        let card = new Card(index, value, positionX, positionY, true);

        card.on("mousedown", this.onClickCard.bind(this));
        this.addChild(card);
        positionX += 110;
        if (positionX == 650) {
          positionX = 100;
          positionY += 110;
          this.addChild(card);
        }
      }
    }
  }

  onClickCard(evt) {
    let card = evt.target.node;
    if (this.countClick === 0) {
      this.countClick++;
      this.firstCard = card;
      card.children[0].active = false;
      card.children[1].active = true;
      card.children[2].active = false;
    } else if (this.countClick === 1) {
      this.secondCard = card;
      if (this.firstCard.index === this.secondCard.index) {
      } else {
        this.countClick++;
        card.children[0].active = false;
        card.children[1].active = true;
        card.children[2].active = false;
        if (this.firstCard.value === this.secondCard.value) {
          setTimeout(
            function (e) {
              e.firstCard.children[1].active = false;
              e.secondCard.children[1].active = false;
              e.countClick = 0;
            },
            1000,
            this
          );
        } else {
          setTimeout(
            function (e) {
              e.firstCard.children[0].active = true;
              e.firstCard.children[1].active = false;
              e.firstCard.children[2].active = true;
              e.secondCard.children[0].active = true;
              e.secondCard.children[1].active = false;
              e.secondCard.children[2].active = true;
              e.countClick = 0;
            },
            1000,
            this
          );
        }
      }
    }
  }
}
