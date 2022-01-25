// API KEY = AIzaSyDevbtYtSGmUUhUguDsewKf1YsYK_EX9ME
const videos = document.querySelector(".videos");
const closePlayer = document.querySelector(".close--player");
const videoPlayer = document.querySelector(".play--video--container");

let nextPage = null;

const fetchYouTubeData = async (nextPageToken, parentNode) => {
    try {
        const base_url = "https://youtube.googleapis.com/youtube/v3/";
        if (!nextPageToken) nextPageToken = "";
        const resp = await fetch(
            `${base_url}videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&key=AIzaSyDevbtYtSGmUUhUguDsewKf1YsYK_EX9ME&maxResults=30&pageToken=${nextPageToken}`
            );
        // const resp = await fetch(
        //     "http://127.0.0.1:5500/Jan%2015%20(YT)/data.json"
        // );
        const data = await resp.json();
        console.log(data); 

        nextPage = data.nextPageToken;
        console.log(nextPageToken);

        data.items.forEach((item) => {
            renderHomeData(item, parentNode);
        });
    } catch (e) {
        console.log("some error here : ", e);
        console.log("error occurred while fetching the videos");
    }
};

fetchYouTubeData(nextPage, videos);

const renderHomeData = (data, parentNode) => {
    // let { snippet, id } = data;
    // let { title, thumbnails } = snippet;
    // const { url } = thumbnails.medium;
    // title = "dslk kkkk kkkkkkkkk fjjjjjj jjjjjjjjjj ja;klda dlknvasoi djklasnc alkdnaljd oiasldknladl valdksjfalk asdjjlaksdjoiavsdkljaskd asodjlaskds";
    createVideoCard(data, parentNode);

    // console.log('dest',title, url);
};

const createVideoCard = (data, parentNode) => {
    let { snippet, id } = data;
    let { title, thumbnails } = snippet;
    const { url } = thumbnails.medium;

    const videos = document.querySelector(".videos");
    const div = document.createElement("div");
    const img = document.createElement("img");
    const titleNode = document.createElement("p");

    img.src = url;
    titleNode.innerText = title;

    div.id = id;
    div.setAttribute("class", "video--card");
    titleNode.setAttribute("class", "video--title");

    div.appendChild(img);
    div.appendChild(titleNode);
    parentNode.appendChild(div);

    videoCardEvent(div, data);
};

const categories = document.querySelector(".categories");

function videoCardEvent(ref, data) {
    ref.addEventListener("click", function () {
        const { id } = this;
        renderDataOnPlayer(data, id);
    });
}

function renderDataOnPlayer(data, id) {
    console.log("dtta", data);
    const video = document.querySelector(".video");
    console.log("card clicked", id);
    videos.style.display = "none";
    videoPlayer.style.display = "flex";
    categories.style.display = "none";
    video.src = "https://youtube.com/embed/" + id;

    const titleNode = document.querySelector(".play--title");
    const channelNode = document.querySelector(".channel");
    const descriptionNode = document.querySelector(".description");

    const { title, description, channelTitle } = data.snippet;
    titleNode.innerText = title;
    channelNode.innerText = channelTitle;
    descriptionNode.innerText = description;

    const rightSideVideos = document.querySelector(".right--side--videos");
    rightSideVideos.innerHTML = "";
    fetchYouTubeData(nextPage, rightSideVideos);
}

closePlayer.addEventListener("click", closePlayerfn);

function closePlayerfn() {
    const video = document.querySelector(".video");
    videoPlayer.style.display = "none";
    categories.style.display = "flex";
    videos.style.display = "grid";
    video.src = "";
}

window.addEventListener('scroll', reachBottom);

function reachBottom() {
    const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    // when hit the bottom
    if (Math.ceil(scrolled) === scrollable) {
        console.log("reached the bottom");
        fetchYouTubeData(nextPage, videos);
    }
}
