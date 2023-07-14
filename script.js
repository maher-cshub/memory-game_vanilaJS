const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const game_size = document.getElementById("game_size");

function handle_data(data){
    console.log('data', data)
    console.log(game_size.value)
}
//get images 
async function fetchImages() {
    let random_page = random(1,21)
    let url = `https://picsum.photos/v2/list?page=${random_page}`
    let response = await fetch(url);
    let data = await response.json();
    return data
}

async function main(){
    let data = await fetchImages();
    handle_data(data)

}

main()

