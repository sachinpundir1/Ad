const searchBar = document.getElementById('search-bar');
let allCookies = null;
searchBar.addEventListener('click',function(){
     allCookies = document.cookie;
    console.log('cookies ', allCookies);
    console.log('clicked');
} )

searchBar.addEventListener('keypress', function(event){        
    if(event.key === "Enter"){
        const query = searchBar.value.trim();
        setCookieData(query);
        searchBar.value = '';
    }
})


// set searched data to the cookiesg
const setCookieData = (query) => {
    document.cookie = `${query}=${query}`;

}

// get cookies data for suggestions
const getSuggestions = () => {
    console.log(document.cookie)
}


