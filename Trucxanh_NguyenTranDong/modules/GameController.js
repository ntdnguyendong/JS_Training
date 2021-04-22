import { Button } from "../lib/Button.js";
import { Card } from "../lib/Card.js";
import { AnimCard } from "../lib/AnimCard.js";
import { Label } from "../lib/Label.js";
import { Node } from "../lib/Node.js";
import { Sprite } from "../lib/Sprite.js";

export class GameController extends Node {
  init() {
    this.countClick = 0;
    this._score = 1000;
    this.firstCard = null;
    this.secondCard = null;
    this.arrCard = [];
    this.buttonStart = null;
    this.isDealCard = true;
    // this._initLabel();
    this._initBg();
    this._initButtonStart();
    // this._initCard();
    // this._initDealCard();
  }

  get score() {
    return this._score;
  }
  set score(value) {
    this._score = value;
    this.children[0].txt = "score: " + this._score;
  } 

  _initOnGameStart() {
    this._initCard();
    this._initDealCard();
    this._initLabel();
  }

  _initButtonStart() {
    this.buttonStart = new Button("Start", 300, 150);
    this.addChild(this.buttonStart);
    this.buttonStart.on("mousedown", this.onStartButtonClick.bind(this));
  }

  _initBg() {
    let bg = new Sprite("./img/trucxanh_bg.jpg");
    this.addChild(bg);
  }

  _initLabel() {
    let scoreLable = new Label("score " + this._score);
    scoreLable.elm.style.fontSize = "30px";
    scoreLable.elm.style.right = 0;
    this.addChild(scoreLable);
  }

  _initCard() {
    let col = 4;
    let row = 5;
    let positionX = 0;
    let positionY = 0;
    let index = 0;
    let value = [];
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
        let card = new Card(index, value, positionX, positionY);
        card.isCanClick = false;
        this.addChild(card);
        this.arrCard.push(card);
        card.on("mousedown", this.onClickCard.bind(this));
      }
    }
  }

  _initDealCard() {
    let positionX = 120;
    let positionY = 25;
    // let delay = 0.1;
    let timeline = gsap.timeline();
    this.arrCard.forEach(card => {
      timeline.to(card, {
        x: positionX,
        y: positionY,
        duration: 0.2,
        // delay: delay,
      });
      // delay += 0.3;
      positionX += 110;
      if (positionX == 670) {
        positionX = 120;
        positionY += 110;
      }
    });
    this.arrCard.forEach(card => {
      timeline.to(card, {isCanClick : true, duration : 0.01})
      console.log(card.isCanClick);
    });

  }

  onStartButtonClick(evt) {
    this.buttonStart.active = false;
    this._initOnGameStart();
  }

  onClickCard(evt) {
    this.countClick++;
    let card = evt.target.node;
    console.log(card.isCanClick);
    if(this.countClick === 1 && card.isCanClick == true){
      this.firstCard = card;
      this.firstCard.isCanClick = false;
      AnimCard.flibCard(this.firstCard);
      console.log(this.firstCard.value);
    } else if(this.countClick === 2 && card.isCanClick == true){
          console.log(this.score);
          let timeline = gsap.timeline();
          let timeline1 = gsap.timeline();
          this.secondCard = card;
          this.secondCard.isCanClick = true;
          AnimCard.flibCard(this.secondCard);
          console.log(this.secondCard.value);
          if(this.firstCard.value == this.secondCard.value){
            this.firstCard.zIndex = 99999;
            this.secondCard.zIndex = 99999;
            setTimeout(()=>{
              timeline.to(this.firstCard, {scale: 1.8, duration: 1});
              timeline1.to(this.secondCard, {scale: 1.8, duration: 1});
              timeline.to(this.firstCard, {active: false, duration: 0.2});
              timeline1.to(this.secondCard, {active: false, duration: 0.2});
              this.countClick = 0;
              this.score += 100;
          
            }, 1000)
          }else {
            setTimeout(()=>{
              AnimCard.flibBack(this.firstCard);
              this.firstCard.isCanClick = true;
              AnimCard.flibBack(this.secondCard);
              this.secondCard.isCanClick = true;
              this.countClick = 0;
            }, 500)
            this.score -= 100;
          }
          
        
    }
  }

}
