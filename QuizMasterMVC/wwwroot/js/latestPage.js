import * as data from './shared/quizData.js';
init()
async function init() {
	const quizArray = await data.getLatestQuizzes();
	renderQuizTiles(quizArray);
	const spinnerContainer = document.querySelector('.spinner-search-container');
	spinnerContainer.remove();
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