
function renderState(game_state){
    let total_papers = game_state.papers_published.list_of_papers.length;
    document.getElementById("num_papers").innerHTML = total_papers;
    let num_cites = game_state.num_cites;
    document.getElementById("num_cites").innerHTML = num_cites;

}


async function main(){
    let game_state = {};
    game_state.citations = 0;
    game_state.level = 0;
    game_state.num_cites = 0;
    game_state.papers_published = {list_of_papers:[]};
    let papers = await generateNodeList();
    papers = papers.sort(function(a,b){
        return b.degree - a.degree;
    });
    game_state.all_papers_in_word = papers; 
    callLevel(0,game_state);
    // Now we write some javascript that adds a widget to the top corner
    // that changes the font color betwen white and terminal-emulator green


}


