import { Button } from "../lib/Button.js";
import { Card } from "../lib/Card.js";
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
    this.isCanClick = true;
    this.audio = null;
    this._initSize();
    this._initBg();
    this._initButtonStart();
  }

  get score() {
    return this._score;
  }
  set score(value) {
    this._score = value;
    this.children[2].txt = "score: " + this._score;
  }

  _initSize() {
    this.width = 900;
    this.height = 600;
  }

  _initButtonStart() {
    this.buttonStart = new Button("Start", 0, 0);
    this.buttonStart.x = this.width / 2 - this.buttonStart.width / 2;
    this.buttonStart.y = this.height / 2 - this.buttonStart.height / 2;
    this.addChild(this.buttonStart);
    this.buttonStart.on("mousedown", this.onStartButtonClick.bind(this));
  }

  _initOnGameStart() {
    this._initScoreLabel();
    this._initCard();
    this._initDealCard();
    this._initAudio();
  }

  _initAudio() {
    this.audio = new Audio("./audio/audio.mp3");
    this.audio.play();
  }

  onStartButtonClick(evt) {
    this.buttonStart.active = false;
    this._initOnGameStart();
  }


  _initScoreLabel() {
    let scoreLable = new Label("score " + this._score);
    scoreLable.elm.style.fontSize = "25px";
    scoreLable.elm.style.right = 0;
    this.addChild(scoreLable);
  }

  _initWinLabel() {
    let winLabel = new Label("You Win");
    winLabel.elm.style.fontSize = "100px";
    winLabel.elm.style.right = 0;
    winLabel.elm.style.top = "230px";
    winLabel.elm.style.left = "250px";
    this._initRestart();
    this.addChild(winLabel);
  }

  _initLoseLabel() {
    let loseLabel = new Label("You Lose");
    loseLabel.elm.style.fontSize = "100px";
    loseLabel.elm.style.right = 0;
    loseLabel.elm.style.top = "230px";
    loseLabel.elm.style.left = "250px";
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
    bg.elm.style.minWidth = "800px";
    this.addChild(bg);
  }

  _initCard() {
    let col = 4;
    let row = 5;
    let index = 0;
    let value = [];
    let totalCard = 10;
    var arr = [];
    let zIndex = 40;
    let tl = gsap.timeline();

    while (arr.length < totalCard * 2) {
      var random = Math.floor(Math.random() * (totalCard * 2)) + 1;
      if (arr.indexOf(random) === -1) arr.push(random);
    }
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        index++;
        zIndex--;
        value = arr[index - 1];
        if (value > 10) {
          value -= 10;
        }
        let card = new Card(index, value, 0, 0, zIndex);
        card.x = this.width / 2 - card.width / 2;
        card.y = this.height / 2 - card.height / 2;
        card.elm.style.border = "3px solid black";
        tl.to(card, {
          duration: 0.3,
          onComplete: () => {
            card.zIndex = card.index;
          },
        });
        this.addChild(card);
        this.arrCard.push(card);
        card.on("mousedown", this.onClickCard.bind(this));
      }
    }
  }

  _initDealCard() {
    let positionX = 180;
    let positionY = 80;
    let timeline = gsap.timeline();

    this.arrCard.forEach((card) => {
      timeline.to(card, {
        ease: "back(3)",
        x: positionX,
        y: positionY,
        duration: 0.3
      });
      positionX += 110;
      if (positionX == 730) {
        positionX = 180;
        positionY += 110;
        this.isCanClick = false;
      }
      if (card.index === 20) {
        timeline.call(() => { this.isCanClick = true; }, null);
      }
    });
  }

  onClickCard(evt) {
    let game = this;
    let loseAuio = new Audio("./audio/loseAudio.mp3");
    let clickAudio = new Audio("./audio/Click.mp3");
    let winAudio =　new Audio("./audio/winAudio.mp3");
    let notMatchAudio = new Audio("./audio/notMatch.mp3");
    let matchAudio = new Audio("./audio/matchCard.mp3");
    clickAudio.play();
    if (!game.isCanClick) {
      return;
    }
    game.countClick++;
    let card = evt.target.node;
    if (game.countClick === 1) {
      game.firstCard = card;
      card.flibCard(game.firstCard);
    } else if (game.countClick === 2) {
      if (game.firstCard === card) {
        game.countClick = 1;
        return;
      }
      let timeline = gsap.timeline();
      game.secondCard = card;
      card.flibCard(game.secondCard);
      if (game.firstCard.value == game.secondCard.value) {
        game.firstCard.zIndex = 99999;
        game.secondCard.zIndex = 99999;
        setTimeout(
          () => {
            card.increaseSizeImg(game.firstCard);
            card.increaseSizeImg(game.secondCard);
            game.isCanClick = false;
            game.countClick = 0;
          }, 2000);
          timeline.to(game, {
            duration: 1, onComplete: () => {
            matchAudio.play();
            game.changeScore(100);
          }
        })
        timeline.to(card, {
          duration: 2, onComplete: () => {
            game.isCanClick = true;
          }
        })
        setTimeout(function () {
          game.removeCard(game.firstCard);
          game.removeCard(game.secondCard);
        }, 3000)
      } else {
        card.flibBack(game.firstCard);
        card.flibBack(game.secondCard);
        game.isCanClick = false;
        game.countClick = 0;
        timeline.to(game, {
          duration: 2, onComplete: () => {
            notMatchAudio.play();
            game.changeScore(-100);
            game.isCanClick = true;
          }
        })
      }
      setTimeout(() => {
        if (game.score === 0) {
          game.removeAllCards(game.children);
          game._initLoseLabel();
          loseAuio.play();
        } else if (game.children.length === 21) {
          game.removeAllCards(game.children);
          game._initWinLabel();
          winAudio.play();
        }
      }, 3000);
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
      if (this.children[i] === card) this.children.splice(i, 1);
    }
  }

  changeScore(num) {
    let scoreEachTime = num / 10;
    var timeLine = gsap.timeline({ duration: 0.03, repeat: 9 });
    timeLine.to(this.score, {
      duration: 0.03, onStart: () => {
        this.score += scoreEachTime;
      }
    });
  }
}
