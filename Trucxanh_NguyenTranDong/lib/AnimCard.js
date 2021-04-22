export class AnimCard {

    static flibCard(card) {
        card.pointerEvents = false;
        console.log("1" + card.pointerEvents);
        let timeline = gsap.timeline();
        timeline.to(card, {duration : 0.3, scaleX : 0});
        timeline.to(card, {duration : 0.3, scaleX : 1});
        setTimeout(function() {
            card.children[0].path = "./img/trucxanh" + card.value + ".jpg";
            card.children[1].active = false;
            card.pointerEvents = true;
            console.log("2"+card.pointerEvents)
        },500)
    }

    static flibBack(card) {
        card.pointerEvents = false;
        console.log("3"+card.pointerEvents)
        let timeline = gsap.timeline();
        timeline.to(card, {delay : 0.5, duration : 1, scaleX : 0})
        timeline.to(card, { duration : 1, scaleX : 1})
        setTimeout(function () {
            card.children[0].path = "./img/cardBg.jpg";
            card.children[1].active = true;
            card.pointerEvents = true;
            console.log("4"+card.pointerEvents)
        }, 1500);
    }

}