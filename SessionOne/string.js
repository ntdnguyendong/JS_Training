function formatMoney1(money){
    console.log(new Intl.NumberFormat('de-DE').format(money));
}

function formatMoney2(money, decimals){
    const str = ["", "K", "M", "B"];
    const i = 0 === money ? money : Math.floor(Math.log(money) / Math.log(1000));
    let number = parseFloat((money / Math.pow(1000, i)).toFixed(decimals));
    let result = number + str[i]
    console.log(result);
    console.log(Math.log(8));
}

function getExtension() {
    var fileName = document.querySelector('#file').value;
    var extension = fileName.substring(fileName.lastIndexOf(".") + 1);
    console.log(extension);
}