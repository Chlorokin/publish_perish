
function main(){
    gameLoop()
}

function gameLoop(){
    level = document.getElementById('level_generic').attributes.getNamedItem('level').value;
    callLevel(level);
}


