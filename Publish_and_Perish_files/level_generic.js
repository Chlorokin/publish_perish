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
    let func = level_array[level_int - 1];
    func();
}

function levelOne(){
    function publishPaper() {
        document.getElementById("console").innerHTML = "";
        var num_cites_div = document.getElementById('num_cites');
    
        var num_papers_div = document.getElementById('num_papers');
        num_papers_div.attributes.getNamedItem('total_clicks').value++;
    
        let message = "";
        if (Math.random() < 0.4) {
            let ran_cites = Math.floor(Math.random() * 5) + 1;
            let old_val = num_cites_div.attributes.getNamedItem('total_cites').value
            num_cites_div.attributes.getNamedItem('total_cites').value = parseInt(old_val) + parseInt(ran_cites);
            let time_or_times = "times";
            if (ran_cites == 1) {
                time_or_times = "time";
            }
            message = "Your paper (" + paperNameGen() + ") was cited " + ran_cites +  " " + time_or_times + ".";
            }else {
                message = "Your paper (" + paperNameGen() + ") was not cited.";
                }
            
        if (num_cites_div.getAttribute('total_cites') === 0){
            let paper_or_papers = "papers"
            if (num_cites.attributes.getNamedItem('total_clicks').value == 1)
                {
                paper_or_papers = "paper"
                }
            message = "No one cares about your papers yet"
            }
        else if (num_cites_div.getAttribute('total_cites') > 10){
            message = "Game over: DeepMind made AGI without you. Everyone you love is now dead, including you!!";
            document.getElementById("publish_paper").style.display = "none";
             typeWriter(message);
        }else{
            num_cites_div.innerHTML = num_cites_div.getAttribute('total_cites');;
            num_papers_div.innerHTML = num_papers.attributes.getNamedItem('total_clicks').value;
            console_add_text(message)
            }
        }

    let play_area_div = document.getElementById("play_area");
    play_area_div.appendChild(createButton("Publish Paper", "publish_paper", "clicker"));
    document.getElementById("publish_paper").addEventListener('click', publishPaper);
}




function paperNameGen(){
    let noun_array = ['Transformers', 'Parameters']
    return noun_array[Math.floor(Math.random() * noun_array.length)] + ",  All You Need";


}

