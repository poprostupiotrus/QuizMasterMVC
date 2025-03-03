const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');

setInputValue();
searchBar.addEventListener('keydown', function (event) {
    sessionStorage.setItem("searchTerm", searchBar.value);
    if ((event.key === 'Enter' || event.keyCode === 13) && searchBar.value) {
        moveToSearchPage();
    }
});
searchButton.addEventListener('click', () => {
    if (searchBar.value) {
        moveToSearchPage();
    }
})
function moveToSearchPage() {
    window.location.href = `/quiz/search?searchTerm=${searchBar.value}`;
}
function setInputValue() {
    const searchTerm = sessionStorage.getItem("searchTerm");
    if (searchTerm) {
        searchBar.value = searchTerm;
    }
}