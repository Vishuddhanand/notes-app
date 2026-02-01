// server ko start karna and database se connect karnaa

require("dotenv").config()

const app = require("./src/app")

const connectToDB = require("./src/config/database")

connectToDB()

app.listen(3000, ()=>{
    console.log("server is running at 3000 port")
})