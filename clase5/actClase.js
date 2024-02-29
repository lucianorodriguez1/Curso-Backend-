function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const obj = {}

const makeObj = (min,max) =>{
    let i=0;
    while(i<10000){
        let num = getRandomInt(min,max);
        if (obj[num] !== undefined) {
            obj[num] += 1;
        } else {
            obj[num] = 1;
        }
        i++;
    }
}

makeObj(1,21);
console.log(obj);