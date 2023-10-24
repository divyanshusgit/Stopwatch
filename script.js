let startBtn = document.getElementById('start');
let restartBtn = document.getElementById('restart');
let pauseBtn = document.getElementById('pause');
let resumeBtn = document.getElementById('resume');
let timeElem = document.getElementById('timeElem');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let milsec = document.getElementById('milsec');
let lapBox = document.getElementById('lapBox')
let lapElem = document.getElementById('lapElem')

startBtn.addEventListener('click',startFunc);
pauseBtn.addEventListener('click',pauseFunc);
resumeBtn.addEventListener('click',resumeFunc);
restartBtn.addEventListener('click',restartFunc);

let updater;
function separator(element){
    let first = element.slice(0,2);
    let second = element.slice(3,5);
    let third = element.slice(6,8);
    return [first,second,third];
}

let start;
let end;
function startStopWatch(){
    start = timeElem.innerText;
    // let minutes = timeElem.innerText.slice(0,2)
    // let seconds = timeElem.innerText.slice(3,5);
    // let milliSeconds = timeElem.innerText.slice(6,8);
    let [minutes,seconds,milliSeconds] = separator(timeElem.innerText);
    updater = setInterval(() => {
        milliSeconds++;
        if(milliSeconds<=9){
            milliSeconds = `0${milliSeconds}`
        }
        if(milliSeconds=='100'){
            milliSeconds = '00';
            seconds++;
            if(seconds<=9){
                seconds = `0${seconds}`;
            }
            if(seconds=='60'){
                seconds = '00';
                minutes++;
                if(minutes<=9){
                    minutes = `0${minutes}`
                }
            }
        };
        min.innerHTML = `${minutes}`;
        sec.innerHTML = `${seconds}`;
        milsec.innerHTML = `${milliSeconds}`;
    }, 10);
}

function startFunc(){
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    startStopWatch();
};

function pauseFunc(){
    end = timeElem.innerText;
    clearInterval(updater);
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'inline-block' 
    restartBtn.style.display = 'inline-block' 
    let [minStart,secStart,milsecStart] = separator(start);
    let [minEnd,secEnd,milsecEnd] = separator(end);
    let minDif;
    let secDif;
    let milsecDif;
    if(minEnd>minStart){
        if(secEnd>secStart){
            minDif = minEnd - minStart;
            if(milsecEnd>milsecStart){
                secDif = secEnd - secStart;
                milsecDif = milsecEnd - milsecStart;
            }
            else if(milsecEnd==milsecStart){
                secDif = secEnd - secStart;
                milsecDif = 0;
            }
            else{
                secDif = secEnd - secStart - 1;
                milsecDif = 100 - (milsecStart-milsecEnd);
            }
        }
        else if (secEnd==secStart){
            if(milsecEnd>milsecStart){
                minDif = minEnd - minStart;
                secDif = 0;
                milsecDif = milsecEnd-milsecStart;
            }
            else if(milsecEnd==milsecStart){
                minDif = minEnd-minStart;
                secDif = 0;
                milsecDif = 0;
            }
            else{
                minDif = minEnd - minStart - 1;
                secDif = 59;
                milsecDif = 100 - (milsecStart-milsecEnd);
            }
        }
        else{
            minDif = minEnd - minStart - 1;
            if(milsecEnd>milsecStart){
                secDif = 60 - (secStart-secEnd);
                milsecDif = milsecEnd - milsecStart;
            }
            else if(milsecEnd==milsecStart){
                secDif = 60 - (secStart-secEnd);
                milsecDif = 0;
            }
            else{
                secDif = 60 - (secStart-secEnd) - 1; 
                milsecDif = 100 - (milsecStart-milsecEnd);
            }
        }
    }
    else{
        minDif = 0;
        if(secEnd>secStart){
            if(milsecEnd>milsecStart){
                secDif = secEnd-secStart;
                milsecDif = milsecEnd-milsecStart;
            }
            else if (milsecEnd==milsecStart){
                secDif = secEnd-secStart;
                milsecDif = 0;
            }
            else{
                secDif = secEnd-secStart-1;
                milsecDif = 100 - (milsecStart - milsecEnd);
            }
        }
        else{
            if(milsecEnd>milsecStart){
                secDif = 0;
                milsecDif = milsecEnd-milsecStart;
            }
            else{
                secDif = 0;
                milsec = 0;
            }
        }
    }
    // console.log(milsecDif);
    // console.log(secDif);
    if(milsecDif<10){
        milsecDif = `0${milsecDif}`;
    }
    if(secDif<10){
        secDif = `0${secDif}`;
    }
    if(minDif<10){
        minDif = `0${minDif}`;
    }
    lapBox.style.opacity = 1;
    lapElem.innerHTML = `${minDif}:${secDif}:${milsecDif}`
}

function resumeFunc(){
    startStopWatch();
    restartBtn.style.display = 'none';
    resumeBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    lapBox.style.opacity = 0;
}

function restartFunc(){
    min.innerHTML = `00`;
    sec.innerHTML = `00`;
    milsec.innerHTML = `00`;
    restartBtn.style.display = 'none';
    lapBox.style.opacity = 0;
    lapElem.innerHTML = `00:00:00`;
}
