let value = 'ABC'
let buffervalue = Buffer.from(value)
console.log(buffervalue)


let value1 = 'xyv'
let buffervalue1 = Buffer.from(value1)
console.log(buffervalue1)

console.log(buffervalue,buffervalue1)
let combinedBuffer = Buffer.concat([buffervalue,buffervalue1])
console.log(combinedBuffer)

console.log(combinedBuffer.toString())