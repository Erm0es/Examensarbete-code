
const randomMenuBtn = document.getElementById("random-menu-btn")
const inputField = document.getElementById("input-field")
const renderBtn = document.getElementById("render-btn")



randomMenuBtn.addEventListener("click", function(){
    console.log("Random menu")
})


renderBtn.addEventListener("click", function(){
    let inputValue = inputField.value
    console.log(inputValue)

})
