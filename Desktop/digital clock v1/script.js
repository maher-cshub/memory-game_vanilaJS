let html_hours = document.querySelector("#hours__container :nth-child(1)");
let html_minutes = document.querySelector("#minutes__container :nth-child(1)");
let html_seconds = document.querySelector("#seconds__container :nth-child(1)");


function set_time(){
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    if(hours<10){
        html_hours.innerText = `0${hours}`;
    }
    else{
        html_hours.innerText = hours;
    }
    if(minutes<10){
        html_minutes.innerText = `0${minutes}`;
    }
    else{
        html_minutes.innerText = minutes;
    }
    if(seconds<10){
        html_seconds.innerText = `0${seconds}`
    }
    else{
        html_seconds.innerText = seconds;
    }
    
}


function show_time(){
    setInterval(set_time,1000);
}

show_time()