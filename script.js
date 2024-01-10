 const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

 const dropdownS = document.querySelectorAll(".dropdown select");
 const btn = document.querySelector("form button");
 const fromCurr = document.querySelector(".from select");
 const toCurr = document.querySelector(".to select");
 const msg = document.querySelector(".msg");

window.addEventListener("load", ()=>{
updateExchangeRate();
});


  for(let select of dropdownS){
    for(curCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = curCode;
        newOption.value = curCode;
        if(select.name === "from" && curCode === "USD"){
          newOption.selected = "selected"
        }
        else   if(select.name === "to" && curCode === "INR"){
          newOption.selected = "selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
   updateFlag(evt.target);
    });
  }

  const updateFlag = (element)=>{
    let curCode = element.value;
    let countryCode = countryList[curCode];
    console.log(curCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; 
     let img = element.parentElement.querySelector("img");
     img.src = newSrc;
  };
 

  btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
  });

  const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal);
    if(amtVal === "" || amtVal < 1){
      amtVal = 1;
      amount.value = "1";
    }

    //console.log(fromCurr.value, toCurr.value)
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
   
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
  };