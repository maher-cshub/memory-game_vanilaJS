const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const start_game_btn = document.getElementById("start_game_btn");
const score = document.getElementById("score");


const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array
  }

function duplicateElements(array, times) {
    return array.reduce((res, current) => {
        return res.concat(Array(times).fill(current));
    }, []);
}

function handle_data(data,game_size){
    let items = []
    let chosen_items = []
    for(let i=0 ;i<game_size;i++){
        let choice = random(0,data.length)
        while (chosen_items.includes(data[choice].id)){
            choice = random(0,data.length)
        }
        items.push(data[choice])
        chosen_items.push(data[choice].id)
    }
    let items1 = duplicateElements(items,2);
    items1 = shuffleArray(items1)
    addToDOM(items1)

}


//get images 
async function fetchImages() {
    let random_page = random(1,21)
    let url = `https://picsum.photos/v2/list?page=${random_page}`
    let response = await fetch(url);
    let data = await response.json();
    return data
}

async function start_game(){
    const game_size = document.getElementById("game_size").value;
    score.innerHTML = "0000"
    let data = await fetchImages();
    handle_data(data,game_size)

    /*start game*/
    let images_data = document.querySelectorAll(".front > img");
    images_data = Array.from(images_data)
    images_data.forEach((element)=>{
        element.onload = () =>{
            console.log("image loaded !!!!")
        }
    })
    play_game()
    

}


function addToDOM(items){
    const game_area = document.getElementById("game_area");
    game_area.innerHTML = ""
    items.forEach((element,index) => {
        let item_container = document.createElement("div");
        let item_dom = document.createElement("div");
        let item_dom_front = document.createElement("div");
        let item_dom_back =document.createElement("div");
        let item_image = document.createElement("img");
        let item_number = document.createElement("span");
        item_number.innerHTML = String(index+1);
        item_image.src = `https://picsum.photos/id/${element.id}/200/200`;
        item_dom_front.setAttribute("class","front");
        item_dom_front.appendChild(item_image);
        item_dom_back.setAttribute("class","back");
        item_dom_back.appendChild(item_number);
        item_dom.setAttribute("class","item");
        item_dom.setAttribute("id",element.id);
        item_dom.appendChild(item_dom_front);
        item_dom.appendChild(item_dom_back);
        item_container.setAttribute("class","container");
        item_container.appendChild(item_dom);
        game_area.appendChild(item_container);
    });

}

function checkMatch(last_selected){
    const firstItemClickedId= parseInt(last_selected[0].children[0].getAttribute('id'));
    const secondItemClickedId= parseInt(last_selected[1].children[0].getAttribute('id'));
    return (firstItemClickedId == secondItemClickedId);
}


function play_game(){
    const game_size = document.getElementById("game_size").value;
    let item_clicked = Array.from(document.getElementsByClassName("container"));
    //show images for first time
    item_clicked.forEach((item_selected)=>{
        item_selected.classList.toggle("active")
        
    })
    setTimeout(function(){
        item_clicked.forEach((item_selected)=>{
        
            item_selected.classList.toggle("active")
        })
    },(game_size / 3) * 1000)

    item_clicked.forEach((item)=>{
        item.onclick = (() =>{

            // Check if finale
            if(!item.classList.contains("final_state")){
                item.classList.toggle("active")
            }
            
            let last_selected = document.getElementsByClassName("active");
            last_selected = Array.from(last_selected)

            // check if a match
            if (last_selected.length == 2){
                if (checkMatch(last_selected)){
                    last_selected.forEach((item_selected)=>{
                        item_selected.classList.toggle("final_state")
                        item_selected.classList.remove("active")
                    })
                    //change score
                    score.innerHTML = parseInt(score.innerHTML) + 2 * parseInt(game_size);
                }
                else{
                    setTimeout(function(){
                        last_selected.forEach((item_selected)=>{
                        
                            item_selected.classList.remove("active")
                        })
                    },1200)
                    score.innerHTML = parseInt(score.innerHTML) - parseInt(game_size);

                }
            }

            //check if no match
            if(last_selected.length > 2){
                last_selected.forEach((item_selected)=>{
                    item_selected.classList.toggle("active")
                })
            }
        })
    })

}


start_game_btn.onclick = (() =>{
    start_game()
})


