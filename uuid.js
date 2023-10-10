const uuid = require('uuid')
console.log(uuid.v4())

async function async1() {
    console.log('1')
    await async2()
    console.log('aaa')
    // await new Promise((resolve) => {
    //     console.log('3')
    //     resolve()
    //     return new Promise((resolve) => {
    //         resolve()
    //         console.log('4')
    //     })
    // }).then(() => {
    //     console.log('aaa')
    // })
}

async function async2() {
    console.log('3')
    return new Promise((resolve) => {
        resolve()
        console.log('4')
    })
}

console.log('5')

setTimeout(() => {
    console.log('6')
}, 0)

async1()

new Promise((resolve) =>{
    console.log('7')
    resolve()
}).then(() => {
    console.log('8')
}).then(() => {
    console.log('9')
}).then(() => {
    console.log('10')
})

console.log('11')