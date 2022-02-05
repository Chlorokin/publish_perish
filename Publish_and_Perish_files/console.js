function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeWriter(txt) {
        for (let i = 0; i < txt.length; i++) {
            document.getElementById("console").innerHTML += txt.charAt(i);
            await sleep(1);
        }
    return 1;
}

function changeDisplayAllClickers(display_type){
    let clickers = document.getElementsByClassName("clicker");
    for (i = 0; i < clickers.length; i++) {
        clickers[i].style.display = display_type;
    }   
}

async function  console_add_text(txt){
    //select all elements with class clicker and hide them
    var x = document.getElementsByClassName("clicker");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }   
    changeDisplayAllClickers("none");
    await typeWriter(txt);
    changeDisplayAllClickers("inline");
}

