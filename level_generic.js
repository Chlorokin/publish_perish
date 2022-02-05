function createButton(name,id, class_name){
    var button = document.createElement("button");
    button.innerHTML = name;
    button.id = id;
    button.className = "clicker";
    return button;
}

function callLevel(level_int){
    let level_array = []
    level_array.push(levelOne);

    level_array[level_int]();
}

function levelOne(){
    alert('starting level one');

}

