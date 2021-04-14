function getFactorial(facNumb) {
    var result = 1;
    if(facNumb === 0 || facNumb === 1){
        return result;
    }else{
        for(var i = facNumb; i >= 1; i--){
            result *= i;
        }
        return result;
    }
    console.log(result);
}

function getRandomInt(max, min){
    // let result = Math.floor((Math.random() * (max - min)) + min);
    var result = Math.floor((min + Math.random() * (max + 1 - min)));
    return result;
    console.log(result);
}

function getRandomArr(list) {
        var result = list[Math.floor((Math.random()*list.length))];
        return result;
        console.log(result);
}

function findMissing(arrA, arrB){
   
    var comparisonArrB = arrB.filter( function(e){
        return arrA.indexOf(e) < 0;
    })
    var comparisonArrA = arrA.filter(function(e){
        return arrB.indexOf(e) < 0;
    })
    var resultArr = comparisonArrA.concat(comparisonArrB);
    return resultArr;
    console.log(resultArr);
}
