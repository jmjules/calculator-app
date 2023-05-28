let buttonsArray = document.querySelectorAll(".button");
let output = document.querySelector(".display");
let input = []; //vllt reicht auch einfach nen string

buttonsArray.forEach((elem) => {
    if(elem.classList.contains("operator")){
        elem.addEventListener("click", () => operatorPress(elem))
    }
    else if(elem.classList.contains("del")){
        elem.addEventListener("click", () => backPress(elem))
    }
    else if(elem.classList.contains("reset")){
        elem.addEventListener("click", () => reset(elem))
    }
    else if(elem.classList.contains("equals")){
        elem.addEventListener("click", () => equalPress(elem))
    }
    else{
        elem.addEventListener("click", () => numPress(elem))
    }
});

function numPress(button) {
    let value = button.textContent;
    output.textContent += value;

}

function backPress(){
    output.textContent = output.textContent.slice(0, -1);
}

function operatorPress(button){
    if(output.innerText.length > 0){
        input.push(parseFloat(output.textContent));
        if(button.textContent === "x"){
            input.push("*");    //einfach nur regex cleanup am ende? hmm x->*; dann kann man auch das zwischending anzeigen lassen
        }else{
            input.push(button.textContent);
        }

        output.innerText = "";
    
        console.log(input);
    }

    
}

function equalPress() {

    if(output.innerText.length > 0){
        let current = parseFloat(output.textContent);
        input.push(current);
    }else{
        input.slice(0, -1);
    }
    
    //noch regex: x -> *
    let temp = input.toString().replace(/[^-()\d/*+.]/g, ''); //cleanup regex https://stackoverflow.com/questions/6479236/calculate-string-value-in-javascript-not-using-eval
    


    let ans = eval(temp);
    if (ans.toString().length > 10) {
       ans =  ans.toPrecision(7);
    }

    output.textContent = ans;

    input = [];
    

}

function reset(){
    output.textContent = "";
    input = [];
}


//copied from https://stackoverflow.com/questions/17369098/simplest-way-of-getting-the-number-of-decimals-in-a-number-in-javascript
Number.prototype.countDecimals = function () {

    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;

    var str = this.toString();
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
        return str.split("-")[1] || 0;
    } else if (str.indexOf(".") !== -1) {
        return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
}



//--------Theme switching here----------
let togglesList = document.querySelectorAll(".toggles");
let arr = [...togglesList];

arr.forEach((element, index) => {
    element.addEventListener("click", () => {
        if (index == 0) {
            applyTheme("theme-dark");
        } else if (index == 1) {
            applyTheme("theme-light");
        } else {
            applyTheme("theme-contrast");
        }
    });
  });

function applyTheme(theme) {
    let wrapper = document.querySelector(".wrapper");
    let themeList = ["theme-dark", "theme-light", "theme-contrast"];
    let index = themeList.indexOf(theme);

    wrapper.classList.remove(...themeList);
    wrapper.classList.add(theme);

    saveThemePreference(theme);

    togglesList.forEach((elem) => {
        elem.style.opacity = "0";
    });
    togglesList[index].style.opacity = "1";
}

window.onload = function() {
    loadThemePreference();
}

function loadThemePreference() {
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        applyTheme(savedTheme);

    } else {
        applyTheme("theme-dark");
    }
}

function saveThemePreference(theme) {
    localStorage.setItem("theme", theme);
}
