var time_is_a_global_variable = Math.round(+new Date()/1000);
var pause_time_is_a_global_variable = false

function startTime(){
    pause_time_is_a_global_variable = false;
    }

function stopTime(){
    pause_time_is_a_global_variable = true;
    }

function Singularity(){
    /// replace this with easter egg, unix rollover singularity level
    alert('Unix time overflow. You have reached the singularity. You have been terminated.');
}

function StartTime(){ 
    var myInterval  = setInterval(function(){
        if (pause_time_is_a_global_variable == false)
        if (time_is_a_global_variable >= 2147483647)
            {
            Singularity();
            clearInterval(myInterval)
        }
        time_is_a_global_variable += 60 
        let date_object = new Date(time_is_a_global_variable * 1000);
        //Now we get the month, day, and year from the date_object
        let month = date_object.getUTCMonth() + 1; //months from 1-12
        let day = date_object.getUTCDate();
        let year = date_object.getUTCFullYear();
        //Now we make a nice formatted string for the month, day, and year
        let new_date = month + "/" + day + "/" + year;
        // now we get the hour and minutes from the date_object
        let hour = date_object.getUTCHours();
        if (hour < 10){ hour = "0" + hour;}   
        let minute = date_object.getUTCMinutes();
        if (minute < 10){ minute = "0" + minute;}
        let clock_string = hour + ":" + minute;
        document.getElementById("date_display").innerHTML = new_date + " " + clock_string;
    }, 10);
}

function renderState(game_state){
    document.getElementById("num_papers").innerHTML = game_state.papers_published.list_of_papers.length;
    document.getElementById("num_cites").innerHTML = game_state.num_cites;
    game_state.time_step++;
}


async function main(){
     StartTime()
    let game_state = {};
    game_state.citations = 0;
    game_state.level = 0;
    game_state.num_cites = 0;
    game_state.papers_published = {list_of_papers:[]};
    game_state.console_window_array = [];
    game_state.time_step = 0
    //let papers = await generateNodeList();
    //papers = papers.sort(function(a,b){
    //    return b.degree - a.degree;
    //});
    //game_state.all_papers_in_world = papers; 
    callLevel(0,game_state);
}


