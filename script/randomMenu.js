import {ref, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { database } from "./db.js"

export const premadeDishInDB = ref(database, "premadeDishInDB")
export const savedRandomDishesInDB = ref(database, "savedRandomDishesInDB")

export const deleteRandomMenu = document.getElementById("delete-random-menu")
export const showSavedMenu = document.getElementById("show-saved-menu")

export function appendSavedRandomMenu(savedItem) {
    let savedItemValue = savedItem[1]

    let newSavedEl = document.createElement("li")
    newSavedEl.textContent = savedItemValue

    deleteRandomMenu.addEventListener("click", function () {
        let exaktLocationOfSavedItemsInDB = ref(database, "savedRandomDishesInDB")
        remove(exaktLocationOfSavedItemsInDB)
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

export function clearSavedDishList() {
    showSavedMenu.innerHTML = ""
}
