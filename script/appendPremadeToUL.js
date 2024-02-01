import { push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { premadeDishInDB } from "./randomMenu.js"
import { savedRandomDishesInDB } from "./randomMenu.js"


const premadeDishUL = document.getElementById("premade-dish-ul")
const saveRandomMenu = document.getElementById("save-random-menu")

export function clearPremadeDishList() {
    premadeDishUL.innerHTML = ""
}

export function makeRandomMenuButtonWork() {
    onValue(premadeDishInDB, function (snapshot) {
        clearPremadeDishList()
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

export function appendPremadeToUL(premadeItem) {
    let premadeItemValue = premadeItem[1]

    let newPremadeEl = document.createElement("li")
    newPremadeEl.textContent = premadeItemValue

    newPremadeEl.addEventListener("click", function () {
        getNewRandomLi(newPremadeEl)
    })

    saveRandomMenu.addEventListener("click", function () {
        clearPremadeDishList()
        push(savedRandomDishesInDB, premadeItemValue)
        window.location = window.location;
    })
    premadeDishUL.append(newPremadeEl)
}
