


function main(){
    document.getElementById('publish_paper').addEventListener('click', publishPaper);
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

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
        message = "This paper was cited " + ran_cites +  " " + time_or_times + ".";
        }else {
            message = "This paper was not cited.";
            }
        
    if (num_cites_div.getAttribute('total_cites') === 0){
        let paper_or_papers = "papers"
        if (num_cites.attributes.getNamedItem('total_clicks').value == 1)
            {
            paper_or_papers = "paper"
            }
        message = "No one cares about your " + paper_or_papers + " yet"
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

