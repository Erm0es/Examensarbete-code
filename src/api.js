import  express  from "express"
const app = express()

// routes
app.get("/dishes", async(req, res) => {
    const dishes = [{
        id: 1,
        value: "Spaghetti och köttfärsås",
        shoppingList:[
            "spaghetti",
            "köttfärs",
            "passerad tomat",
            "morot",
            "lök",
            "selleri"
        ] 
    }]
    res.json(dishes)
})

//start
export default app