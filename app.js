const http =require('http')
const fs = require('fs')
const server = http.createServer((req,res)=>{
    const url = req.url
    const method = req.method
    if (req.url==='/'){
        res.setHeader('Content-Type','text/html')
        res.end(
            `
            <form action="/message" method="POST">
                <label>Name:</label>
                <input type='text' name="username"></input>
                <button type="submit">Add</button>


            </from>
            `
        )
    // }else{
    //     if (req.url =='/message'){
    //         res.setHeader('Content-type','text/html')
    //         let dataChunks=[]
    //         req.on('data',(chunks)=>{
    //             console.log(chunks)
    //             dataChunks.push(chunks)
    //         })
    //         req.on('end',()=>{
    //             let combinedBuffer  = Buffer.concat(dataChunks)
    //             console.log(combinedBuffer.toString())
    //             let value = combinedBuffer.toString().split("=")
    //             console.log(value)
    //         })
    //     }

        }else{
        if (req.url ==='/message'){
            res.setHeader('Content-type','text/html')
            let dataChunks=[]
            req.on('data',(chunks)=>{
                
                dataChunks.push(chunks)
            })
            req.on('end',()=>{
                let buffer  = Buffer.concat(dataChunks)
                console.log(buffer)

                let formdata = buffer.toString()
                console.log(formdata)

                let fromvalue = formdata.split("=")[1]
                // console.log(fromvalue)

                fs.writeFileSync('formvalue.txt',fromvalue,(err)=>{
                    // if (err) throw err;
                    res.statusCode=302 // redirected
                    res.setHeader('Location','/')
                    res.end()
                })
            })
        }
        else{
            if (req.url=='/read'){
                fs.readFile('formvalue.txt',(err,data) =>{
                    console.log(data.toString())
                    res.end(
                        `<h1>${data.toString()}</h1>`
                    )
                })
                    
            }
        }

    }
    
})
server.listen(3000,()=>{
    console.log("server is running")
})