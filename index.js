import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://weeklymenu-9c4d9-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const ownDishInDB = ref(database, "ownDishInDB")
const premadeDishInDB = ref(database, "premadeDishInDB")


const randomMenuBtn = document.getElementById("random-menu-btn")
const inputField = document.getElementById("input-field")
const renderBtn = document.getElementById("render-btn")
const ownDishUl = document.getElementById("own-dish-ul")
const premadeDishUL = document.getElementById("premade-dish-ul")


randomMenuBtn.addEventListener("click", function () {
    makeButtonWork()

})

renderBtn.addEventListener("click", function () {
    let inputValue = inputField.value
    push(ownDishInDB, inputValue)
    clearInputField()

})

function makeButtonWork(randomMenu) {
    onValue(premadeDishInDB, function (snapshot) {
        let premadeDishArr = Object.entries(snapshot.val())
        
        console.log(randomMenu)
        getRandomDishes(premadeDishArr)
       
        for (let i = 0; i <premadeDishArr; i++) {
           
            let premadeDish = premadeDishArr[i]
            appendPremadeToUL(premadeDish)  
           
        }
    })
}

onValue(ownDishInDB, function (snapshot) {
    clearOwnDishList()
    let ownDishArr = Object.entries(snapshot.val())
    for (let i = 0; i < ownDishArr.length; i++) {
        let currentItem = ownDishArr[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        appendItemToUlEl(currentItem)
    }
})

function getRandomDishes(premadeDishArr){
    let numberOfRandom = 7;
    for(let i = 0; i < numberOfRandom; i++){
        let random = Math.floor(Math.random() * premadeDishArr.length)
        let randomMenu = premadeDishArr[random]
        console.log(randomMenu)
        
    }
    return
}
function clearOwnDishList() {
    ownDishUl.innerHTML = ""

}

function clearPremadeMenuList() {
    premadeDishUL.innerHTML = ""
}

function clearInputField() {
    inputField.value = ""

}

function appendPremadeToUL(premadeItem) {
    let premadeItemID = premadeItem[0]
    let premadeItemValue = premadeItem[1]
    let newPremadeEl = document.createElement("li")
    newPremadeEl.textContent = premadeItemValue

    newPremadeEl.addEventListener("click", function () {
        let premadeLocationInDB = ref(database, `premadeDishInDB/${premadeItem}`)
        premadeLocationInDB = newPremadeEl.remove()

    })

    premadeDishUL.append(newPremadeEl)
}

function appendItemToUlEl(ownItem) {
    let ownItemID = ownItem[0]
    let ownItemValue = ownItem[1]

    let newOwnEl = document.createElement("li")
    newOwnEl.textContent = ownItemValue

    newOwnEl.addEventListener("click", function () {
        let exaktLocationOfItemInDB = ref(database, `ownDishInDB/${ownItemID}`)



        remove(exaktLocationOfItemInDB)
    })

    ownDishUl.append(newOwnEl)

}
