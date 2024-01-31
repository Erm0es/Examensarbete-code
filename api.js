const express = require("express")
const app = express()
const PORT = 5000;

// routes
app.get("/dishes", (req, res) => {
    const dishes = [{
        id: 1,
        value: "Spaghetti och köttfärsås"
    }]
   
   
   

   
})
https://www.youtube.com/watch?v=N_ZBy7qcmqA

//start
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})