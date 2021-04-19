import {GameController} from "./modules/GameController.js";

var gameController = new GameController();
document.body.appendChild(gameController.elm)
gameController.init();
