
snowStorm.followMouse = false;
snowStorm.freezeOnBlur = false;
snowStorm.targetElement = 'snow-target';

const currentTime = new Date();

setCandle(currentTime);

const testDate = document.getElementById("testDate");

document.querySelector('footer p').addEventListener('dblclick', function(){
    testDate.classList.toggle('hidden');
});

document.querySelector("#testDate button").addEventListener("click", setDate);

function createImgEl(inputClass, inputPath){
    let el = document.createElement('img');
    el.className = inputClass;
    el.src = inputPath;
    return el;
}

function createDivEl(inputClass, inputStyle = ""){
    let el = document.createElement('div');
    el.className = inputClass;
    el.style = inputStyle;
    return el;

}

function setDate() {
    let date = document.querySelector("#testDate input").value;
    setCandle(new Date (date));
}

function setCandle(inputDate) {
    let candleHeight = 520;

    const firstDecember = new Date(inputDate.getFullYear(), 11, 1);
    const chrismasEve = new Date(inputDate.getFullYear(), 11, 24);
    
    // To calculate the time difference of two dates 
    const Difference_In_Time_First = firstDecember.getTime() - inputDate.getTime(); 
    const Difference_In_Time_Christmas = chrismasEve.getTime() - inputDate.getTime(); 
      
    // To calculate the no. of days between two dates 
    const Difference_In_Days_first = Math.ceil(Difference_In_Time_First / (1000 * 3600 * 24)); 
    const Difference_In_Days_chrismas = Math.ceil(Difference_In_Time_Christmas / (1000 * 3600 * 24)); 

    let setFlame = false;

    let infoText = "Der er <block>" + Difference_In_Days_first + "</block> dage til den første december.";
    if(inputDate >= firstDecember && inputDate < chrismasEve){
        infoText = "Der er nu kun <block>" + Difference_In_Days_chrismas + "</block> dage til det er jul!";
        candleHeight = ((candleHeight - 20) / 24) * (Difference_In_Days_chrismas);

        setFlame = true;
    } else if(Difference_In_Days_chrismas == 0){
        infoText = "Der er Jul!";
        candleHeight = 0;

        setFlame = true;
    } else if(inputDate.getMonth() == 11){
        infoText = "Så er julen over får i år, glæd jer til næste gang og ha et godt nytår."
        candleHeight = 0;
    }

    const specialDate = document.getElementById('special-date');
    if(Difference_In_Days_chrismas == 23) {
        specialDate.innerHTML = "Første December: Så tændes kalenderlyset";
    } else if(Difference_In_Days_chrismas == 11){
        specialDate.innerHTML = "Luciadag: Oprindeligt en fest for den katolske helgen Santa Lucia, hvis navn betyder 'lys'.";
    } else if(Difference_In_Days_chrismas == 1){
        specialDate.innerHTML = "Lille Juleaften: Så nærmer dagen sig.";
    } else if(inputDate.getDay() == 6 && inputDate.getMonth() == 11 && Difference_In_Days_chrismas >= 0){
        specialDate.innerHTML = "Advent: Tid til at tænde adventslyset.";
    } else{
        specialDate.innerHTML = "";
    }
    
    document.getElementById("text").innerHTML = infoText;

    
    let candle = createDivEl('candle candle-main', 'height:' + candleHeight + 'px');
    let candleWick = createDivEl('wick');
    
    let candleTop = createImgEl('candle-top', 'img/candle-top.svg');
    let candleBottom = createImgEl('candle-bottom', 'img/candle-bottom.svg');
    let flame = createImgEl('flame', 'img/fire.svg');
    
    
    candle.appendChild(candleWick);
    if(setFlame){candle.appendChild(flame);};
    
    
    const candleContainer = document.getElementById("candle-container");
    candleContainer.innerHTML = '';
    
    candleContainer.appendChild(candleTop);
    candleContainer.appendChild(candle);
    candleContainer.appendChild(candleBottom);
}