
function renderState(game_state){
    let total_papers = game_state.papers_published.list_of_papers.length;
    document.getElementById("num_papers").innerHTML = total_papers;
    let num_cites = game_state.num_cites;
    document.getElementById("num_cites").innerHTML = num_cites;
    //set the inner html of the element with the id num_papers to total_papers


}


function main(){
    let game_state = {};
    game_state.citations = 0;
    game_state.level = 0;
    game_state.num_cites = 0;
    game_state.papers_published = {list_of_papers:[]};
    callLevel(0,game_state);
}


