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
    this._initBg();
    this._initButtonStart();
  }

  _initButtonStart() {
    this.buttonStart = new Button("Start", 300, 150);
    this.addChild(this.buttonStart);
    this.buttonStart.on("mousedown", this.onStartButtonClick.bind(this));
  }

  _initOnGameStart() {
    this._initScoreLabel();
    this._initCard();
    this._initDealCard();
  }

  onStartButtonClick(evt) {
    this.buttonStart.active = false;
    this._initOnGameStart();
  }

  get score() {
    return this._score;
  }
  set score(value) {
    this._score = value;
    this.children[2].txt = "score: " + this._score;
  }

  _initScoreLabel() {
    let scoreLable = new Label("score " + this._score);
    scoreLable.elm.style.fontSize = "30px";
    scoreLable.elm.style.right = 0;
    this.addChild(scoreLable);
  }

  _initWinLabel() {
    let winLabel = new Label("You Win");
    winLabel.elm.style.fontSize = "100px";
    winLabel.elm.style.right = 0;
    winLabel.elm.style.top = "150px";
    winLabel.elm.style.left = "210px";
    this.addChild(winLabel);
  }

  _initLoseLabel() {
    let loseLabel = new Label("You Lose");
    loseLabel.elm.style.fontSize = "100px";
    loseLabel.elm.style.right = 0;
    loseLabel.elm.style.top = "150px";
    loseLabel.elm.style.left = "210px";
    this._initRestart();
    this.addChild(loseLabel);
  }

  _initRestart() {
    let restartLabel = new Label("Restart");
    restartLabel.elm.style.fontSize = "50px";
    restartLabel.elm.style.right = 0;
    restartLabel.on("mousedown", this.onClickReStart.bind(this));
    this.addChild(restartLabel);
  }

  _initBg() {
    let bg = new Sprite("./img/trucxanh_bg.jpg");
    this.addChild(bg);
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

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        index++;
        value = arr[index - 1];
        if (value > 10) {
          value -= 10;
        }
        let card = new Card(index, value, positionX, positionY);
        card.pointerEvents = false;
        this.addChild(card);
        this.arrCard.push(card);
        card.on("mousedown", this.onClickCard.bind(this));
      }
    }
  }

  _initDealCard() {
    let positionX = 120;
    let positionY = 25;
    let timeline = gsap.timeline();
    this.arrCard.forEach(card => {
      console.log(card.pointerEvents);
      timeline.to(card, {
        x: positionX,
        y: positionY,
        duration: 0.2,
      });
      positionX += 110;
      if (positionX == 670) {
        positionX = 120;
        positionY += 110;
      }
    });
    this.arrCard.forEach(card => {
      setTimeout(() => {
        card.pointerEvents = true;
        console.log(card.pointerEvents);
      }, 4000);
      // timeline.to(card, { pointerEvents : true, duration: 0.01 })
    });
  }

  onClickCard(evt) {
    this.countClick++;
    let card = evt.target.node;
    console.log(card.pointerEvents);
    if (this.countClick === 1 && card.pointerEvents == true) {
      this.firstCard = card;
      this.firstCard.pointerEvents = false;
      AnimCard.flibCard(this.firstCard);
    } else if (this.countClick === 2 && card.pointerEvents == true) {
      if (this.firstCard === evt.target.node) {
        this.countClick = 1;
      }
      let timeline = gsap.timeline();
      let timeline1 = gsap.timeline();
      this.secondCard = card;
      this.secondCard.pointerEvents = false;
      AnimCard.flibCard(this.secondCard);
      if (this.firstCard.value == this.secondCard.value) {
        this.firstCard.zIndex = 99999;
        this.secondCard.zIndex = 99999;
        setTimeout(() => {
          timeline.to(this.firstCard, { scale: 1.8, duration: 1 });
          timeline1.to(this.secondCard, { scale: 1.8, duration: 1 });
          timeline.to(this.firstCard, { active: false, duration: 0.2 });
          timeline1.to(this.secondCard, { active: false, duration: 0.2 });
          this.firstCard.pointerEvents = false;
          this.secondCard.pointerEvents = false;
          this.countClick = 0;
          this.score += 100;
        }, 1000, this)

      } else {
        setTimeout(() => {
          AnimCard.flibBack(this.firstCard);
          this.firstCard.pointerEvents = false;
          AnimCard.flibBack(this.secondCard);
          this.secondCard.pointerEvents = false;
          this.countClick = 0;
          this.score -= 100;
          if (this.score === 0) {
            this.removeAllCards(this.children);
            this._initLoseLabel();
          }
        }, 500, this)
      }
    }
  }
  
  onClickReStart() {
    location.reload();
  }
  
  removeAllCards(children) {
    while (children.length !== 2) {
      this.removeCard(children[2]);
    }
  }
  removeCard(card) {
    this.elm.removeChild(card.elm);
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i] === card)
        this.children.splice(i, 1);
    }
  }

}
