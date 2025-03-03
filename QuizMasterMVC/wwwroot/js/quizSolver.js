import * as data from './shared/quizData.js';
import * as loadingScreen from './shared/loadingScreen.js';
const userAnswers = [];
let timeSeconds = 0;
let isQuizSolved = false;
let numberOfQuestions;
let timerIntervalId;
init();
async function init() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const id = Number(urlParams.get('id'));
	loadingScreen.renderLoadingScreen();
	const quizData = await data.fetchQuizData(id);
	numberOfQuestions = quizData.questions.length;
	const pageHeader = document.querySelector('.page-header');
	const pageFooter = document.querySelector('.page-footer');
	pageHeader.classList.remove('hidden-element');
	pageFooter.classList.remove('hidden-element');
	renderQuiz(quizData);
	setTimer();
	timerIntervalId = setInterval(setTimer, 1000);
	initUserAnswers(quizData);
	const submitButton = document.querySelector('.submit-button');
	submitButton.addEventListener('click', () => {
		if (!isQuizSolved) {
			handleSubmitButtonClick()
		}
	})
	loadingScreen.hideLoadingScreen();
}
function renderQuiz(quizData)
{
	const nameContainer = document.querySelector('.name-container');
	nameContainer.innerText = quizData.title;
	const numberQuestions = document.querySelector('.number-questions-container');
	const amountOfQuestions = quizData.questions.length;
	if (amountOfQuestions == 1) {
		numberQuestions.innerText = `${amountOfQuestions} pytanie`;
	}
	else if (amountOfQuestions <= 4) {
		numberQuestions.innerText = `${amountOfQuestions} pytania`;
	}
	else {
		numberQuestions.innerText = `${amountOfQuestions} pytań`;
	}
	const main = document.querySelector('.main-container');
	const questions = quizData.questions;
	questions.forEach((question, index) => {
		const questionContainer = document.createElement('div');
		questionContainer.classList.add('question-container');

		const questionContent = document.createElement('div');
		questionContent.classList.add('question-content');

		const numberContainer = document.createElement('div');
		numberContainer.classList.add('number-container');
		numberContainer.innerText = `${index + 1}`;

		const questionText = document.createElement('div');
		questionText.classList.add('question-text');
		questionText.innerText = question.content;

		questionContent.append(numberContainer);
		questionContent.append(questionText);

		const answersContainer = document.createElement('div');
		answersContainer.classList.add('anwers-container');
		const answers = question.answers;
		const letters = ['A', 'B', 'C', 'D'];
		answers.forEach((answer, index) => {
			const button = document.createElement('button');
			button.classList.add('answer-button');
			button.innerText = `${letters[index]}: ${answer.answerText}`;
			button.dataset.questionId = question.id;
			button.dataset.answerId = answer.id;
			button.addEventListener('click', () => {
				if (!isQuizSolved) {
					markAnswer(button);
				}
			});
			answersContainer.append(button);
		});
		questionContainer.append(questionContent);
		questionContainer.append(answersContainer);
		main.append(questionContainer);
	});
}
function setTimer() {
	const hours = Math.floor(timeSeconds / 3600);
	const minutes = Math.floor(timeSeconds / 60) - hours * 60;
	const seconds = timeSeconds - (minutes * 60 + hours * 3600);
	const time = { hours, minutes, seconds };
	const timeString = formatTimeToString(time);
	const timerElement = document.querySelector('.time-container');
	timerElement.innerText = timeString;
	timeSeconds++;
}
function formatTimeToString(time) {
	let hoursString = String(time.hours);
	let minutesString = String(time.minutes);
	let secondsString = String(time.seconds);
	hoursString = hoursString.length === 1 ? `0${hoursString}` : hoursString;
	minutesString = minutesString.length === 1 ? `0${minutesString}` : minutesString;
	secondsString = secondsString.length === 1 ? `0${secondsString}` : secondsString;
	return `${hoursString}:${minutesString}:${secondsString}`;
}
function initUserAnswers(quizData) {
	const questions = quizData.questions;
	questions.forEach(question => {
		userAnswers.push({questionId : question.id, answerId: null})
	})
}
function markAnswer(button) {
	const questionId = Number(button.dataset.questionId);
	const answerId = Number(button.dataset.answerId);
	let isMarked = false;
	userAnswers.forEach((userAnswer) => {
		if (questionId === userAnswer.questionId && answerId === userAnswer.answerId) {
			isMarked = true;
		}
	});
	if (!isMarked) {
		const answerButtons = document.querySelectorAll('.answer-button');
		answerButtons.forEach(answerButton => {
			const answerButtonQuestionId = Number(answerButton.dataset.questionId);
			if (questionId === answerButtonQuestionId) {
				answerButton.classList.remove('active-answer-button');
			}
		})
		button.classList.add('active-answer-button');
		setUserAnswer(questionId, answerId);
	}
}
function setUserAnswer(questionId, answerId) {
	userAnswers.forEach(userAnswer => {
		if (userAnswer.questionId === questionId) {
			userAnswer.answerId = answerId;
		}
	})
}
async function handleSubmitButtonClick() {
	let canSubmitQuiz = true;
	userAnswers.forEach((userAnswer) => {
		if (userAnswer.answerId === null) {
			canSubmitQuiz = false;
		}
	});
	if (canSubmitQuiz) {
		clearInterval(timerIntervalId);
		const score = await data.getScore(userAnswers);
		renderResult(score);
		isQuizSolved = true;
		const anwerButtonArray = document.querySelectorAll('.answer-button');
		anwerButtonArray.forEach((answerButton) => {
			answerButton.classList.add('cursor-pointer-hidden');
		})
		const submitButton = document.querySelector('.submit-button');
		submitButton.classList.add('cursor-pointer-hidden');
	}
}
function renderResult(score) {
	const resultBackground = document.createElement('div');
	resultBackground.classList.add('result-background');

	const resultContainer = document.createElement('div');
	resultContainer.classList.add('result-container');
	resultContainer.classList.add('pop-up');

	const closeButton = document.createElement('button');
	closeButton.classList.add('close-button');
	closeButton.addEventListener('click', () => {
		resultBackground.remove();
		document.body.classList.remove('scroll-bar-hidden');
	})

	const closeIcon = document.createElement('img');
	closeIcon.src = '/img/icons/close.png';
	closeIcon.classList.add('close-icon');

	closeButton.append(closeIcon);

	resultContainer.append(closeButton);

	const totalScore = document.createElement('h1');
	totalScore.classList.add('total-score');
	totalScore.innerText = `Twój Wynik: ${score}/${numberOfQuestions}`;

	resultContainer.append(totalScore);

	const hours = Math.floor((timeSeconds - 1) / 3600);
	const minutes = Math.floor((timeSeconds - 1) / 60) - hours * 60;
	const seconds = (timeSeconds - 1) - (minutes * 60 + hours * 3600);
	const time = { hours, minutes, seconds };

	const resultInfoArray = [
		{
			imagePath: '/img/icons/correct.png',
			text: `Poprawne odpowiedzi: ${score}`
		},
		{
			imagePath: '/img/icons/incorrect.png',
			text: `Złe odpowiedzi: ${numberOfQuestions - score}`
		},
		{
			imagePath: '/img/icons/timer.png',
			text: `Czas rozwiązywania: ${formatTimeToString(time)}`
		}
	]

	resultInfoArray.forEach((resultInfo) => {
		const resultInfoContainer = document.createElement('div');
		resultInfoContainer.classList.add('result-info-container');

		const img = document.createElement('img');
		img.src = resultInfo.imagePath;
		img.classList.add('result-icon');

		const resultInfoText = document.createElement('p');
		resultInfoText.classList.add('result-info-text');
		resultInfoText.innerText = resultInfo.text;

		resultInfoContainer.append(img);
		resultInfoContainer.append(resultInfoText);

		resultContainer.append(resultInfoContainer);
	});
	const a = document.createElement('a');
	a.href = window.location.href;
	const retryButton = document.createElement('button');
	retryButton.classList.add('retry-button');
	retryButton.innerText = 'Spróbuj jeszcze raz';

	a.append(retryButton);

	resultContainer.append(a);

	resultBackground.append(resultContainer);

	document.body.prepend(resultBackground);
	document.body.classList.add('scroll-bar-hidden');
}