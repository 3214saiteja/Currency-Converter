

let BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button")
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let drop of dropdowns)
{
    for(code in countryList)
    {
        let createoption=document.createElement("option");
        createoption.innerText=code;
        createoption.value=code;
        //console.log(Code);
        if(drop.name==="from" && code==="USD")
        {
            createoption.selected="selected";
        }
        else if(drop.name==="to" && code==="INR")
        {
            createoption.selected="selected";
        }
        drop.append(createoption);
    }   
    drop.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}
let updateFlag=(elm)=>{
    let curr=elm.value;
    let cuntcode=countryList[curr];
    let newsrc=`https://flagsapi.com/${cuntcode}/flat/64.png`;
    let img=elm.parentElement.querySelector("img");
    img.src=newsrc;
}
const currRate=async ()=>{
    const amt=document.querySelector(".amount input");
    let amtval=amt.value;
    if(amtval.value==="" && amtval.value<1)
    {
        amtval=1;
        amt.value="1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
   // console.log(data[toCurr.value.toLowerCase()]);
    // console.log(`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`);
    let finalAmt=rate*amtval;
    msg.innerText=`${amtval} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;

}
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    currRate()
});
window.addEventListener("load",()=>{
    currRate();
});
