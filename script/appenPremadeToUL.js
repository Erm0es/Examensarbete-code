import {push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { premadeDishInDB } from "./randomMenu.js"
import { savedRandomDishesInDB } from "./randomMenu.js"
import { deleteRandomMenu } from "./randomMenu.js"

const premadeDishUL = document.getElementById("premade-dish-ul")
const saveRandomMenu = document.getElementById("save-random-menu")

function clearPremadeDishList() {
    premadeDishUL.innerHTML = ""

}

function showDeleteButton(){
    deleteRandomMenu.style.visibility = "visible"
}

export function appendPremadeToUL(premadeItem) {
    let premadeItemValue = premadeItem[1]
    let newPremadeEl = document.createElement("li")

    for (let i = 0; i < premadeItemValue.length; i++) {
        if (premadeDishUL.childElementCount <= 7) {
            newPremadeEl.textContent = premadeItemValue
            premadeDishUL.append(newPremadeEl)
        } else {
            ownDishUl.innerHTML = "No items yet"
        }
    }

    newPremadeEl.addEventListener("click", function () {
        getNewRandomLi(newPremadeEl)

    })

    saveRandomMenu.addEventListener("click", function () {
        push(savedRandomDishesInDB, premadeItemValue)
        clearPremadeDishList()
        showDeleteButton()
    })

}

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