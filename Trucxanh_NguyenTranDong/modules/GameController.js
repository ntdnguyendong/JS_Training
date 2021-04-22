import { Button } from "../lib/Button.js";
import { Card } from "../lib/Card.js";
import { Label } from "../lib/Label.js";
import { Node } from "../lib/Node.js";
import { Sprite } from "../lib/Sprite.js";

export class GameController extends Node {
  init() {
    this.score = 1000;
    this.countClick = 0;
    this.firstCard = null;
    this.secondCard = null;
    this.isSkipStep = true;
    this.arrCard = [];
    this.buttonStart = null;
    this.isDealCard = true;
    this._initBg();
    this._initButtonStart();
  }
  
  _initOnGameStart(){
    this._initCard();
    this._initDealCard();
    this._initLabel();
  }
  
  _initButtonStart(){
    this.buttonStart = new Button("Start", 300, 150);
    this.addChild(this.buttonStart);
    this.buttonStart.on("mousedown", this.onStartButtonClick.bind(this));
  }

  _initBg() {
    var bg = new Sprite("./img/trucxanh_bg.jpg");
    this.addChild(bg);
  }

  _initLabel() {
    var scoreLable = new Label("scrore " + this.score);
    scoreLable.elm.style.fontSize = "30px";
    scoreLable.elm.style.right = 0;
    this.addChild(scoreLable);
  }

  _initCard() {
    let col = 4;
    let row = 5;
    let positionX = 0;
    let positionY = 0;
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
        this.addChild(card);
        this.arrCard.push(card);
          card.on("mousedown", this.onClickCard.bind(this));
      }
    }
  }
  
  _initDealCard() {
    let positionX = 120;
    let positionY = 25;
    let delay = 0.1;
    console.log(this.isDealCard);
    console.log(this.arrCard.length);
    this.arrCard.forEach(card => {
      gsap.to(card,{ x : positionX, y : positionY, duration : 0.5, delay : delay, onComplete : function (){
        if(card.index === 20){
          this.isDealCard = false;
          console.log(this.isDealCard);
        }} });
        delay += 0.3;
        positionX += 110;
        if (positionX == 670) {
          positionX = 120;
          positionY += 110;
          this.addChild(card);
        }
    });
  } 

  onStartButtonClick(evt) {
    this.buttonStart.active = false;
    console.log(this.buttonStart);
    this._initOnGameStart();
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
              this.score += 100;
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
              this.score -= 100;
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
