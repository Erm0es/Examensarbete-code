import { ref, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { database } from "./db.js"
import { ownDishInDB } from "./db.js"


export const ownDishUl = document.getElementById("own-dish-ul")


function clearOwnDishList() {
    ownDishUl.innerHTML = ""

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
        ownDishUl.innerHTML = ""
    }
})

export function appendItemToOwnDishUl(ownItem) {
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