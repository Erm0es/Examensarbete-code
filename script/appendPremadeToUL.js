import { onValue, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { premadeDishInDB } from "./db.js"
import { savedRandomDishesInDB } from "./db.js"
import { showSavedMenu } from "./saveRandomMenu.js"

export const premadeDishUL = document.getElementById("premade-dish-ul")
const saveRandomMenuBtn = document.getElementById("save-random-menu-btn")

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

export function appendPremadeToUL(premadeItem) {

    let newPremadeEl = document.createElement("li")

    newPremadeEl.addEventListener("click", function () {
        getNewRandomLi(newPremadeEl)
    })
    
    getNewRandomLi()

    let premadeItemValue = premadeItem[1]
    newPremadeEl.innerHTML = premadeItemValue

    premadeDishUL.append(newPremadeEl)
    save(premadeItemValue)
}



//When li in premadeDish is pressed a new random should show
function getNewRandomLi(newPremadeEl) {
    onValue(premadeDishInDB, function (snapshot) {
        let newPremadeDishArr = Object.values(snapshot.val())
        console.log(newPremadeEl)
        let newRandomli = document.createElement("li")

        for (let i = 0; i < 1; i++) {
            let random = newPremadeDishArr[Math.floor(Math.random() * newPremadeDishArr.length)]
            newRandomli.innerHTML= random
            newPremadeEl.replaceWith(newRandomli)
        }

    })
}

function save(pre){
    console.log(pre)
    saveRandomMenuBtn.addEventListener("click", function () {
        push(savedRandomDishesInDB, pre)
        clearPremadeDishList()
        showSavedMenu()
    })
}