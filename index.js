import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://weeklymenu-9c4d9-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)


const ownDishInDB = ref(database, "ownDishInDB")
const premadeDishInDB = ref(database, "premadeDishInDB")
const savedRandomDishesInDB = ref(database, "savedRandomDishesInDB")


const saveRandomMenu = document.getElementById("save-random-menu")
const deleteRandomMenu = document.getElementById("delete-random-menu")
const randomMenuBtn = document.getElementById("random-menu-btn")

const inputField = document.getElementById("input-field")
const renderBtn = document.getElementById("render-btn")
const ownDishUl = document.getElementById("own-dish-ul")

const premadeDishUL = document.getElementById("premade-dish-ul")
const showSavedMenu = document.getElementById("show-saved-menu")


function clearSavedDishList(){
    showSavedMenu.innerHTML = ""
}

function clearOwnDishList() {
    ownDishUl.innerHTML = ""

}

function clearInputField() {
    inputField.value = ""

}

randomMenuBtn.addEventListener("click", function () {
    makeRandomMenuButtonWork()

})


renderBtn.addEventListener("click", function () {
    let inputValue = inputField.value
    push(ownDishInDB, inputValue)
    clearInputField()
})


function makeRandomMenuButtonWork() {
    onValue(premadeDishInDB, function (snapshot) {
        let premadeDishArr = Object.entries(snapshot.val())

        for (let i = 0; i < 7; i++) {
            let random = premadeDishArr[Math.floor(Math.random() * premadeDishArr.length)]
            appendPremadeToUL(random)
        }

    })
}

onValue(ownDishInDB, function (snapshot) {
    clearOwnDishList()
    if (snapshot.exists()) {
        let ownDishArr = Object.entries(snapshot.val())
        for (let i = 0; i < ownDishArr.length; i++) {
            let currentItem = ownDishArr[i]
            appendItemToOwnDishUl(currentItem)
        }

    } else {
        console.log("no items in ownDishDB")
    }
})

//When li in premadeDish is pressed a new random should show
function getNewRandomLi(newPremadeEl) {
    onValue(premadeDishInDB, function (snapshot) {
        let newPremadeDishArr = Object.values(snapshot.val())

        for (let i = 0; i < 1; i++) {
            let random = newPremadeDishArr[Math.floor(Math.random() * newPremadeDishArr.length)]
            newPremadeEl.innerHTML = random
        }
    })

}

    onValue(savedRandomDishesInDB, function (snapshot) {
        clearSavedDishList()

        if (snapshot.exists()) {
            let savedRandomDishArr = Object.entries(snapshot.val())
            console.log(savedRandomDishArr)
            for (let i = 0; i < savedRandomDishArr.length; i++) {
                let thisItem = savedRandomDishArr[i]
                appendSavedRandomMenu(thisItem)
            }

        } else {
            showSavedMenu.innerText = "There is no saved menu yet"
            showSavedMenu.style.color = "white"
        }
    })



function appendPremadeToUL(premadeItem) {

    let premadeItemValue = premadeItem[1]
    let newPremadeEl = document.createElement("li")

    for (let i = 0; i < premadeItemValue.length; i++) {
        if (premadeDishUL.childElementCount <= 7) {
            newPremadeEl.textContent = premadeItemValue
            premadeDishUL.append(newPremadeEl)
        } else {
            premadeDishUL.innerHTML = ""
        }
    }
    
    newPremadeEl.addEventListener("click", function () {
        getNewRandomLi(newPremadeEl)

    })

    saveRandomMenu.addEventListener("click", function () {
        push(savedRandomDishesInDB, premadeItemValue)
    })
    
}

function appendItemToOwnDishUl(ownItem) {
    let ownItemID = ownItem[0]
    let ownItemValue = ownItem[1]

    let newOwnEl = document.createElement("li")
    newOwnEl.textContent = ownItemValue

    newOwnEl.addEventListener("click", function () {
        let exaktLocationOfOwnItemInDB = ref(database, `ownDishInDB/${ownItemID}`)
        remove(exaktLocationOfOwnItemInDB)
    })

    ownDishUl.append(newOwnEl)

}

function appendSavedRandomMenu(savedItem){
    let savedItemValue = savedItem[1]

    let newSavedEl = document.createElement("li")
    newSavedEl.textContent = savedItemValue
    

    deleteRandomMenu.addEventListener("click", function () {
        let exaktLocationOfSavedItemsInDB = ref(database, "savedRandomDishesInDB")
        remove(exaktLocationOfSavedItemsInDB)
        clearSavedDishList()
    })
    showSavedMenu.append(newSavedEl)
}


