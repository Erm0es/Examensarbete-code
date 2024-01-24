import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://weeklymenu-9c4d9-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const ownDishInDB = ref(database, "ownDishInDB")

const randomMenuBtn = document.getElementById("random-menu-btn")
const inputField = document.getElementById("input-field")
const renderBtn = document.getElementById("render-btn")
const ownDishUl = document.getElementById("own-dish")


randomMenuBtn.addEventListener("click", function () {
    console.log("Random menu")
})


renderBtn.addEventListener("click", function () {
    let inputValue = inputField.value
    push(ownDishInDB, inputValue)
    clearInputField()
})

onValue(ownDishInDB, function(snapshot){
    let ownDishArr = Object.values(snapshot.val())

    clearOwnDishList()

    for(let i = 0; i < ownDishArr.length; i++){
        appendItemToOwnDishUl(ownDishArr[i])
    }
})

function clearOwnDishList(){
    ownDishUl.innerHTML = ""

}
function clearInputField(){
    inputField.value = ""
  
}

function appendItemToOwnDishUl(inputValue){
    ownDishUl.innerHTML += `<li>${inputValue}</li>`
}