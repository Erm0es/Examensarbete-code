import { push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { ownDishInDB, ownDishUl } from "./script/appendItemToOwnDishUL.js"
import { makeRandomMenuButtonWork } from "./script/randomMenu.js"


export const inputField = document.getElementById("input-field")
export const saveOwnDishBtn = document.getElementById("save-own-dish-btn")
export const randomMenuBtn = document.getElementById("random-menu-btn")


randomMenuBtn.addEventListener("click", function () {
    makeRandomMenuButtonWork()

})

saveOwnDishBtn.addEventListener("click", function () {
    let inputValue = inputField.value
    if (inputValue === "") {
        ownDishUl.innerHTML = "Write some dishes!"
    } else {
        push(ownDishInDB, inputValue)
    }

    clearInputField()
})

function clearInputField() {
    inputField.value = ""

}
