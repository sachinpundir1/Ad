const imgContainer = document.querySelector(".img--container");
const loading = document.querySelector(".loading");


async function fetchPhotos(page) {    
    loading.innerHTML = '<i class="fa fa-refresh fa-spin"></i>';        // for loading animation

    const url = `https://api.unsplash.com/photos?page=${page}`;
    const key = "PvU0qjDCuwUrPKI_8YXylbq6X6jUukuZr10GgpkrG8s";
    const config_options = {
        headers: {
            Authorization: `Client-ID ${key}`,
        },
    };

    try {
        const response = await fetch(url, config_options);
        const data = await response.json();
        loading.innerHTML = "";                         // when response recieved from the api clear the loading animation

        data.forEach((image) => {
            renderPhotos(image.links.download);
        });

    } catch (e) {
        console.log(e);
        console.log("some error occured while fetching");
    }
}

fetchPhotos(1);

function renderPhotos(src) {
    const imgDiv = document.createElement("div");
    const photo = document.createElement("img");
    photo.src = src;
    imgDiv.appendChild(photo);
    imgContainer.appendChild(imgDiv);
}

window.addEventListener("scroll", reachBottom);

let page = 1;       // for fetching api for different pages so that that can bring different data

function reachBottom() {
    const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    // when hit the bottom
    if (Math.ceil(scrolled) === scrollable) {        
        console.log("reached the bottom");
        fetchPhotos(++page);
    }
}