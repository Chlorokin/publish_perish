
function main(){
    gameLoop()
    //document.getElementById('publish_paper').addEventListener('click', publishPaper);
}

function gameLoop(){
    level = document.getElementById('level_generic').attributes.getNamedItem('level').value;
    callLevel(level);
}


