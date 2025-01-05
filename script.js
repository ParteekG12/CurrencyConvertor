let amt = document.querySelector("#amt");
let submit = document.querySelector("#submit");
let dropdowns = document.querySelectorAll("select"); 
let imgs = document.querySelectorAll("img");
let result = document.querySelector("#result_text");

// for adding countries in dropdown
for(let dropdown of dropdowns)
{
    for(let key in countryList)
    {
        let el = document.createElement("option");
        el.value = key;
        el.innerText = key;
        dropdown.append(el);
    }
}

let selectedCountry0 = dropdowns[0].value;
let selectedCountry1 = dropdowns[1].value;

document.querySelector("#from").value = "INR";
document.querySelector("#to").value = "USD";
selectedCountry0 = "INR";
selectedCountry1 = "USD";


// funtion to change flag when a country is selected
function changeFlag(index, value) {
    imgs[index].src = `https://flagsapi.com/${countryList[value]}/shiny/64.png`
}

dropdowns[0].addEventListener("change", () => {
    selectedCountry0 = dropdowns[0].value;
    changeFlag(0, selectedCountry0);
});

dropdowns[1].addEventListener("change", () => {
    selectedCountry1 = dropdowns[1].value;
    changeFlag(1, selectedCountry1);
});


async function fetchingAPI(amount) {
    let url = `https://open.er-api.com/v6/latest/${selectedCountry0}`
    let response = await fetch(url);

    if(response.ok)
    {
        let info = await response.json();
        let initialAmt = parseFloat(info.rates[selectedCountry1]);
        let finalAmt = initialAmt*amount;
        console.log(info)
        showResult(amount, finalAmt);
    }
    else
    {
        console.error(`error ${response.status} not found`);
        fact.innerText = "some error occured!";
    }
}

function showResult(amount, finalAmt) {
    result.innerText = `${amount} ${selectedCountry0} = ${finalAmt} ${selectedCountry1}`
}

// accessing the entered amount
submit.addEventListener("click", () => {
    let amount = parseFloat(amt.value);
    
    if(isNaN(amount))
    {
        console.log("invalid input!!")
        result.innerText = "Enter a valid number!!";
        result.style.color = "red";
    }
    else
    {
        fetchingAPI(amount);
        result.style.color = "black";
    }

})



