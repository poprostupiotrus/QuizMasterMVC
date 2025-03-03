let loadingScreen;
export function renderLoadingScreen()
{
    loadingScreen = document.createElement('div');
    loadingScreen.classList.add('spinner-container');
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    loadingScreen.appendChild(spinner);
    document.body.prepend(loadingScreen);
}
export function hideLoadingScreen()
{
    loadingScreen.classList.add('fade');
}