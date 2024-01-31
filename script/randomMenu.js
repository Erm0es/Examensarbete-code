import {ref, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { appendPremadeToUL } from "./appenPremadeToUL.js"
import { database } from "./db.js"


export const premadeDishInDB = ref(database, "premadeDishInDB")
export const savedRandomDishesInDB = ref(database, "savedRandomDishesInDB")

export const deleteRandomMenu = document.getElementById("delete-random-menu")
export const showSavedMenu = document.getElementById("show-saved-menu")



export function makeRandomMenuButtonWork() {
    onValue(premadeDishInDB, function (snapshot) {
        if (snapshot.exists()) {
            let premadeDishArr = Object.entries(snapshot.val())
            for (let i = 0; i < 7; i++) {
                let random = premadeDishArr[Math.floor(Math.random() * premadeDishArr.length)]
                appendPremadeToUL(random)
            }

        } else {
            console.error("no items in db")
        }
    })
}

export function appendSavedRandomMenu(savedItem) {
    let savedItemValue = savedItem[1]

    let newSavedEl = document.createElement("li")
    newSavedEl.textContent = savedItemValue


    deleteRandomMenu.addEventListener("click", function () {
        let exaktLocationOfSavedItemsInDB = ref(database, "savedRandomDishesInDB")
        remove(exaktLocationOfSavedItemsInDB)
        hideDeleteButton()
        clearSavedDishList()
        
    })
    showSavedMenu.append(newSavedEl)
}

onValue(savedRandomDishesInDB, function (snapshot) {
    clearSavedDishList()
    if (snapshot.exists()) {
        let savedRandomDishArr = Object.entries(snapshot.val())
        for (let i = 0; i < savedRandomDishArr.length; i++) {
            let thisItem = savedRandomDishArr[i]
            appendSavedRandomMenu(thisItem)
        }

    } else {
        showSavedMenu.innerText = "There is no saved menu yet"
        showSavedMenu.style.color = "white"
    }
})

function clearSavedDishList() {
    showSavedMenu.innerHTML = ""
}

export function hideDeleteButton(){
    deleteRandomMenu.style.visibility = "hidden"
}