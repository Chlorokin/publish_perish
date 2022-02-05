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

async function  console_add_text(txt){
    document.getElementById("publish_paper").style.display = "none";
    await typeWriter(txt);
    document.getElementById("publish_paper").style.display = "inline";
}

