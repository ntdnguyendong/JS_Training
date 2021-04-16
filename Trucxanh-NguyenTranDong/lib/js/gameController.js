var game = document.createElement("div");
document.body.appendChild(game);

var totalCard = 10;
var lock = null;
var openCard = 0;
var firstDiv;
var secondDiv;
var firstValue;
var secondValue;
var numOpen;
var isSkipStep = true;

var bg = createImage("../lib/img/trucxanh_bg.jpg", 0, 0);

var cardWrap = document.createElement("div");
game.appendChild(cardWrap);
cardWrap.className = "cardWrap";
cardWrap.style.position = "absolute";
cardWrap.style.width = "500px";
cardWrap.style.top = "50%";
cardWrap.style.left = "50%";
cardWrap.style.transform = "translate(-50%, -50%)";

var text = document.createElement("div");
text.innerHTML = "score: 1000";
text.style.transform = "translate(140px, 240px)";
game.appendChild(text);

createCardGrid();

function createCard(src, top, left, width, height, valueNum, indexCard){
    
        let cardH = document.createElement("div");
        cardWrap.appendChild(cardH);
        cardH.style.display = "inline-block"
        cardH.style.verticalAlign = "top";
        cardH.style.position = "relative";
        cardH.setAttribute("value", valueNum);
        cardH.setAttribute("index", indexCard);
        cardH.addEventListener("click", ()=>{
            if(isSkipStep){
                if(openCard === 0){
                    card.style.zIndex = 3; 
                    firstDiv = cardH;
                    firstValue = firstDiv.getAttribute("value");
                    numOpen = firstDiv.getAttribute("index");
                    openCard = 1;
                }else{
                    isSkipStep = false;
                    secondDiv = cardH;
                    secondValue = secondDiv.getAttribute("value");
                    if(numOpen === secondDiv.getAttribute("index")){
                        isSkipStep = true;
                        return false;
                    }else{
                        card.style.zIndex = 3;
                        if(firstValue === secondValue){
                            setTimeout(function(){
                                firstDiv.style.opacity =0;
                                secondDiv.style.opacity =0;
                                isSkipStep = true;
                            }, 500);
                        }else{
                            setTimeout(function(){
                                firstDiv.querySelector('.card').style.zIndex = 1;
                                secondDiv.querySelector('.card').style.zIndex = 1;
                                isSkipStep = true;
                            }, 500);
                        }
                        openCard =0;
                    }
                }
            }
        })

        let cardCover = document.createElement("img");
        cardCover.src = "../lib/img/cardBg.jpg" ;
        cardCover.className = "cardCover";
        cardCover.top = "0px";
        cardCover.left = "0px";
        cardCover.style.zIndex = 2;
        cardCover.style.position = "absolute";
        width && (cardCover.style.width = width + "px");
        height && (cardCover.style.height = height + "px");

        let card = document.createElement("img");
        card.src = src;
        card.className = "card";
        card.top = top + "px";
        card.left = left + "px";
        card.style.position = "relative";
        card.style.zIndex = 1;
        width && (card.style.width = width + "px");
        height && (card.style.height = height + "px");

        cardH.appendChild(cardCover);
        cardH.appendChild(card);
}

function createImage(src, top, left, width, height) {
    var img = document.createElement("img");
    img.src = src;
    img.style.position = "absolute";
    img.top = top + "px";
    img.left = left + "px";
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.transform = "translate(-50%, -50%)";
    width && (img.style.width = width + "px");
    height && (img.style.height = height + "px");
    game.appendChild(img);
}

function createCardGrid(){
    var cardNum = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    var cardNumRadom = randomCard(cardNum,totalCard * 2);

    for (let i = 0; i < totalCard * 2; i++) {
        let valueImg = cardNumRadom[i];
        if(valueImg>10){
            valueImg-=10;
        }
        createCard("../lib/img/trucxanh" + valueImg+ ".jpg", 0, 0, 100, 100, valueImg, i + 1);
    }

    function randomCard(arr, cardNum){
        for (i = arr.length-1; i > 1  ; i--){
        var randomArr = Math.floor(Math.random()*i);
        var tempArr = arr[i];
        arr[i] = arr[randomArr];
        arr[randomArr] = tempArr;
        }
        return arr.slice(0,cardNum);
    }
}


