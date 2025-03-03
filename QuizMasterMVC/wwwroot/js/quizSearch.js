import * as data from './shared/quizData.js';
const pageSize = 20;
let pageNumber = 1;
let isLoading = false;
let searchTerm;
const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting && !isLoading) {
			renderPage();
		}
	});
})
const spinnerSearchContainer = document.querySelector('.spinner-search-container');
observer.observe(spinnerSearchContainer);
init();
function init() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	searchTerm = urlParams.get('searchTerm')
	renderPage();
}
function renderQuizTiles(quizArray) {
	const quizTilesContainer = document.querySelector('.quiz-tiles-container');
	quizArray.forEach((quiz) => {
		const quizTile = document.createElement('div');
		quizTile.classList.add('quiz-tile');
		quizTile.classList.add('tile-fade');

		const tileIconContainer = document.createElement('div');
		tileIconContainer.classList.add('tile-icon-container');
		const img = document.createElement('img');
		img.classList.add('tile-icon');
		img.src = '/img//icons/exam.png';

		tileIconContainer.append(img);

		const titleElement = document.createElement('p');
		titleElement.classList.add('quiz-tile-title');
		titleElement.innerText = quiz.title;

		const numberQuestionsElement = document.createElement('p');
		numberQuestionsElement.classList.add('number-questions');
		numberQuestionsElement.innerText = `Ilość pytań: ${quiz.questions.length}`;

		const a = document.createElement('a');
		a.href = `/quiz/solve?id=${quiz.id}`;

		quizTile.append(tileIconContainer);
		quizTile.append(titleElement);
		quizTile.append(numberQuestionsElement);
		quizTile.append(a);
		quizTilesContainer.append(quizTile);
	});
}
async function renderPage() {
	isLoading = true;
	const quizArray = await data.getQuizArrayBySearchTerm(searchTerm, pageNumber);
	if (quizArray.length == 0 && pageNumber == 1) {
		renderResultsNotFound()
	}
	if (quizArray.length < pageSize) {
		spinnerSearchContainer.remove();
	}
	renderQuizTiles(quizArray);
	pageNumber++;
	isLoading = false;
}
function renderResultsNotFound() {
	const mainContainer = document.querySelector('.main-content-container');
	const resultsNotFoundContainer = document.createElement('div');
	resultsNotFoundContainer.classList.add('results-not-found-container');
	const resultsNotFoundText = document.createElement('h1');
	resultsNotFoundText.classList.add('result-not-found-text');
	resultsNotFoundText.innerText = 'Nie znalezino żadnych wyników twojego wyszukiwania.';
	resultsNotFoundContainer.append(resultsNotFoundText);
	mainContainer.append(resultsNotFoundContainer);
}