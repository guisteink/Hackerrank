function getMaxDigit(maxDigit)
{
    if (maxDigit > 9) {
        console.log("maximo digito deve ser menor que 10.")
        return;
    }
    let aux, arr=[];
    for (let i = 1000; i <= 9999; i++) {
        aux = i.toString().split("")
        if (parseInt(aux[0]) + parseInt(aux[1]) + parseInt(aux[2]) + parseInt(aux[3]) === 21 && hasMaxDigit(aux, maxDigit)) arr.push(i)
    }
    return arr;
}

function hasMaxDigit(number, maxDigit)
{
    if (Math.max(number[0], number[1], number[2], number[3],) === maxDigit) return true
    return false
}

console.log(getMaxDigit(6))