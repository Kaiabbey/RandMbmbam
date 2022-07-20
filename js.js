SetRange();

function GoToMaxFun(){
    maxValue = document.getElementById("MaxRange").value;
    minValue = document.getElementById("MinRange").value;
    episode = getRndInteger(minValue, maxValue);
    const settings = localStorage.getItem('saveRange');
    if(settings == 'true'){
        SaveSettings(true);
    }
    else{
        SaveSettings(false);
    }

    if(episode < 38){
        GoToMaxFun();
    }
    else if(episode < 214){
        window.location.replace("https://maximumfun.org/episodes/my-brother-my-brother-and-me/my-brother-my-brother-and-me-"+episode+"/");
        console.log("My brother"+episode);
    }
    else{
        console.log("MBMBAM"+episode);
        window.location.replace("https://maximumfun.org/episodes/my-brother-my-brother-and-me/mbmbam-"+episode+"/");
    }
    

}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

function SetRange(){
    fetch('episode.json')
    .then(response => response.json())
    .then(data => {
        console.log(data.episode);
        const settings = localStorage.getItem('saveRange');
        console.log(settings);
        if(settings == 'true'){
            document.getElementById('storeRange').checked = true;
            console.log(1);
            if(localStorage.getItem('MaxRange') > data.episode && localStorage.getItem('MinRange') < 38){
                console.log(2);
                document.getElementById("MaxRange").value = data.episode;
                document.getElementById("MinRange").value = 38;
            }
            else if(localStorage.getItem('MaxRange') > data.episode){
                console.log(3);
                document.getElementById("MaxRange").value = data.episode;
                document.getElementById("MinRange").value = localStorage.getItem('MinRange');
            }
            else if(localStorage.getItem('MinRange') < 38){
                console.log(4);
                document.getElementById("MaxRange").value = localStorage.getItem('MaxRange');
                document.getElementById("MinRange").value = 38;
            }
            else{
                console.log(5);
                document.getElementById("MaxRange").value = localStorage.getItem('MaxRange');
                document.getElementById("MinRange").value = localStorage.getItem('MinRange');
            }
        }
        else if(settings == false){
            console.log(6);
            document.getElementById("MaxRange").value = data.episode;
            document.getElementById("MinRange").value = 38;
        }
    });
}

function SaveSettings(checked){
    console.log("checked: "+checked);
    if(checked == true){
        console.log(7);
        minRange = document.getElementById("MinRange").value;
        console.log(minRange);
        maxRange = document.getElementById("MaxRange").value;
        console.log(maxRange);
        if(minRange >= maxRange){
            minRange = 38;
            console.log(minRange);
        }
        localStorage.setItem('MinRange', minRange);
        localStorage.setItem('MaxRange', maxRange);
        localStorage.setItem('saveRange', true);
    }
    else if(checked == false){
        console.log(8);
        localStorage.setItem('saveRange', false);
        localStorage.removeItem('MaxRange');
        localStorage.removeItem('MinRange');
    }
}

function PlusMinRange(){
    document.getElementById("MinRange").value ++;
}

function MinusMinRange(){
    document.getElementById("MinRange").value -= 1;
}

function PlusMaxRange(){
    document.getElementById("MaxRange").value ++;
}

function MinusMaxRange(){
    document.getElementById("MaxRange").value -= 1;
}