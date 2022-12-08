require("dotenv").config();
const http = require("http");

const app = require("./app");
 


const PORT  =  process.env.PORT 

//database 

const {connection} = require("./db/mongoose")

const server = http.createServer(app);

server.listen(PORT,async ()=>{ 
    let startTime = performance.now();
   await connection();
   let endTime = performance.now();
   

   const timeTakenToConnectDb = Math.floor(endTime - startTime)

    console.log(`server is listening on port ${PORT} and it took ${timeTakenToConnectDb} seconds to connect to the db`)
})