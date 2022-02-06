
function CreateNode(name){
    let node = {};
    node.name = name;
    node.degree = 1;
    node.connections = [];
    return node;
}

function AddNewNode(node_list){
    let new_node = CreateNode(paperNameGen());
    if (node_list.length === 0)
        {
        node_list.push(new_node);
        }

    num_edges = Math.floor(Math.random() * 3) + 1;
    if (num_edges > node_list.length)
        {
        num_edges = node_list.length;
        }

    let degree_sum = 0;
    node_list.forEach(function(node){
        degree_sum += node.degree;
        });

    let cumulative_probability_array = [];
    let probability_to_node_hash = {};
    node_list.forEach(function(node){
        degree_sum += node.degree;
        let probability = (node.degree + 1) / degree_sum;
        node.probablity = probability 
        probability_to_node_hash[node.probablity] = node;
        cumulative_probability_array.push(probability);
        });


    for (let i = 0; i < num_edges; i++){
        let ran_num = Math.random();
        cumulative_probability_array.forEach(function(probability){
        if (ran_num < probability){
            let node_to_add = probability_to_node_hash[probability];
            new_node.connections.push(node_to_add);
            new_node.degree++;
            }
        });
    }
    node_list.push(new_node);
    return node_list;
}

function GenerateNodeList(num_papers){
    let paper_node_list = [];
    for (let i = 0; i < num_papers; i++){
        paper_node_list = AddNewNode(paper_node_list);
    }
    return paper_node_list;
}

async function PaperSiteSimTest(game_state){
    if (game_state.all_papers_in_word === undefined){
        game_state.all_papers_in_word = GenerateNodeList(10000);
        console.log('game_state.all_papers_in_word',game_state.all_papers_in_word);
    }   
    game_state.all_papers_in_word = AddNewNode(game_state.all_papers_in_word);
    test_array = [];
    game_state.all_papers_in_word.forEach(function(node){
        test_array.push(node.connections.length);
    });
    //now we sort test_array highest to lowest
    test_arrray = test_array.sort(function(a,b){return b-a});
    console.log('test',test_array.length, test_array)
}