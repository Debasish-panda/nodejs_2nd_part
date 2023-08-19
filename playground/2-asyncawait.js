// const doWork = async () =>{ //this is the method till line number 12 where we can do async and promiss
//     throw new Error('Something went wrong')
//     return "DEBASISH"
// }

// console.log(doWork())

// doWork().then((res)=>{
//     console.log('result',res);
// }).catch((err)=>{
//     console.log('error' ,err)
// })


//below is the example where we can resolve using async await insted of promise piping. cause it is the easist way (line 16 to 35)
//another de-marit of promise chaining is we can not call scope variable at outside. for that we need to create outside variable
const add = (a, b) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if(a<0 || b< 0){
                rej("numbers must be positive")
            }
            res(a + b)
        }, 2000)
    })
}

const doWork = async () => {
    const sum = await add(1, 4);
    const sum1 = await add(sum, 5);
    const sum2 = await add(sum1, 10);
    return sum2;
}

doWork().then((result) => {
    console.log('result', result);
}).catch((err) => {
    console.log('Error', err);
})