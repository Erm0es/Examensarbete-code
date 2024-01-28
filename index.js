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

function makeButtonWork() {
        onValue(premadeDishInDB, function (snapshot) {
            let premadeDishArr = Object.entries(snapshot.val())
            for (let i = 0; i < premadeDishArr.length; i++) {
                let premadeDish = premadeDishArr[i]
                let premadeDishID = premadeDish[0]
                let premadeDishValue = premadeDish[1]
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
    let newPremadeItem = document.createElement("li")
    newPremadeItem.textContent = premadeItemValue

    newPremadeItem.addEventListener("click", function () {
        let premadeLocationInDB = ref(database, `premadeDishInDB/${premadeItem}`)
        premadeLocationInDB = newPremadeItem.remove()

    })

    premadeDishUL.append(newPremadeItem)
}

function appendItemToUlEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    console.log(item)
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function () {
        let exaktLocationOfItemInDB = ref(database, `ownDishInDB/${itemID}`)



        remove(exaktLocationOfItemInDB)
    })

    ownDishUl.append(newEl)

}
