import {ref, onValue, remove,push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { database } from "./db.js"
import { savedRandomDishesInDB } from "./db.js"



export const deleteRandomMenuBtn = document.getElementById("delete-random-menu-btn")
export const showSavedMenuUL = document.getElementById("show-saved-menu")

export function showSavedMenu(){

    onValue(savedRandomDishesInDB, function (snapshot) {
        clearSavedDishList()
        if (snapshot.exists()) {
            let savedRandomDishArr = Object.entries(snapshot.val())
            for (let i = 0; i < savedRandomDishArr.length; i++) {
                let thisItem = savedRandomDishArr[i]
                appendSavedRandomMenu(thisItem)
            }
    
        } else {
            showSavedMenu.innerText = "Din sparade meny kommer synas här"
        }
    })
    

}

function appendSavedRandomMenu(savedItem) {
    let savedItemValue = savedItem[1]

    let newSavedEl = document.createElement("li")
    newSavedEl.textContent = savedItemValue

    deleteRandomMenuBtn.addEventListener("click", function () {
        let exaktLocationOfSavedItemsInDB = ref(database, "savedRandomDishesInDB")
        remove(exaktLocationOfSavedItemsInDB)
    })

    showSavedMenuUL.append(newSavedEl)
}


export function clearSavedDishList() {
    showSavedMenuUL.innerHTML = ""
}
