var gobal_papers = [];


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeWriter(txt,speed_ms) {
    txt = "> " + txt;
    if (speed_ms === undefined) {
        speed_ms = 1;
    }
        for (let i = 0; i < txt.length; i++) {
            document.getElementById("console").innerHTML += txt.charAt(i);
            await sleep(speed_ms);
        }
    return 1;
}

function changeDisplayAllClickers(display_type){
    let clickers = document.getElementsByClassName("clicker");
    for (i = 0; i < clickers.length; i++) {
        clickers[i].style.display = display_type;
    }   
}

async function  consoleAddText(txt,speed_ms,game_state){
    //select all elements with class clicker and hide them
    document.getElementById("console").innerHTML = ""; 
    changeDisplayAllClickers("none");
    await typeWriter(txt,speed_ms);
    changeDisplayAllClickers("inline");
}

async function  console_add_text(txt,speed_ms){
    alert("WHO THE FUCK IS RUNNING ME, KILL THEM!")
    //select all elements with class clicker and hide them
    document.getElementById("console").innerHTML = ""; 
    var x = document.getElementsByClassName("clicker");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }   
    changeDisplayAllClickers("none");
    await typeWriter(txt,speed_ms);
    changeDisplayAllClickers("inline");
}

