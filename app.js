
const apiKey = API_KEY;

const baseURL = `https://v6.exchangerate-api.com/v6/${apiKey}`;
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurrency = document.querySelector(".from select");
const toCurrecy = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

}
for (let select of dropdowns) {
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let curencyCode = element.value;
  let countryCode = countryList[curencyCode];
  console.log(countryCode);
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
btn.addEventListener("click", (evt) => {
  //it makes the button to not apply any default changes
  evt.preventDefault();
  let input = document.querySelector("#amountIP");
  let errMsg = document.querySelector("#errMsg");
  amount = input.value;
  if (amount > 0) {
    errMsg.style.display="none";
    // console.log(fromCurrency,toCurrecy);
    const url = `${baseURL}/pair/${fromCurrency.value}/${toCurrecy.value}`;
    fetch(url).then((response) => {
      return response.json();
    })
      .then((data) => {
        let rate = data.conversion_rate;
        let finalAmount = amount * rate;
        msg.innerText = `${amount} ${fromCurrency.value} = ${finalAmount} ${toCurrecy.value}`;
      })
  }
  else{
    errMsg.style.display= "block";
    input.value="";
     msg.innerText="Enter amount to see exchange rate.";
  }
});
