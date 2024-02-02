import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {  getDatabase, ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://weeklymenu-9c4d9-default-rtdb.europe-west1.firebasedatabase.app/"

}

const initApp = initializeApp(appSettings)
export const database = getDatabase(initApp)


export const premadeDishInDB = ref(database, "premadeDishInDB")
export const savedRandomDishesInDB = ref(database, "savedRandomDishesInDB")