import * as userProfileData from './shared/userProfileData.js';
import * as loadingScreen from './shared/loadingScreen.js';
init();

async function init() {
	loadingScreen.renderLoadingScreen();
    const userDetails = await userProfileData.getUserDetails();
	renderUserDetailsSection(userDetails);
	renderUserQuizSection(userDetails.quizzes);
	loadingScreen.hideLoadingScreen();
}
function renderUserQuizSection(quizArray) {
	const userProfileContainer = document.querySelector('.user-profile-container');
	const userProfileQuizContainer = document.createElement('div');
	userProfileQuizContainer.classList.add('user-profile-quiz-container');

	const div = document.createElement('div');

	const userProfileHeader = document.createElement('h1');
	userProfileHeader.innerText = 'Stworzone quizy: ';
	userProfileHeader.classList.add('user-profile-header');

	div.append(userProfileHeader);

	userProfileQuizContainer.append(div);

	if (quizArray.length > 0) {
		const userProfileQuizzes = createQuizTiles(quizArray);
		userProfileQuizContainer.append(userProfileQuizzes);
	} else {
		const h2 = document.createElement('h2');
		h2.classList.add('no-result-text');
		h2.innerText = 'Nie masz utworzonych żadnych quizów';
		userProfileQuizContainer.append(h2);
	}

	userProfileContainer.append(userProfileQuizContainer);

}
function renderUserDetailsSection(userDetails) {
	const userProfileContainer = document.querySelector('.user-profile-container');
	const userProfileInfoContainer = document.createElement('div');
	userProfileInfoContainer.classList.add('user-profile-info-container');

	const img = document.createElement('img')
	img.classList.add('user-profile-icon')
	img.src = '/img/icons/usericon.png';

	userProfileInfoContainer.append(img);

	const userDetailsArray = [
		{
			name: 'Nazwa użytkownika: ',
			propertyValue: userDetails.userName 
		},
		{
			name: 'Data rejestracji: ',
			propertyValue: userDetails.timeOfRegistrationString
		},
		{
			name: 'Liczba stworzonych quizów: ',
			propertyValue: userDetails.amountOfCreatedQuizzes
		}
	]
	const div = document.createElement('div');
	userDetailsArray.forEach(userDetail => {
		const p = document.createElement('p');
		p.classList.add('user-profile-detail');

		const span = document.createElement('span');
		span.classList.add('font-bold');
		span.innerText = userDetail.name;

		const paragraphText = document.createTextNode(`${userDetail.propertyValue}`);

		p.append(span);
		p.append(paragraphText);

		div.append(p);
	})
	userProfileInfoContainer.append(div);
	userProfileContainer.append(userProfileInfoContainer);
}

function createQuizTiles(quizArray) {
	const userProfileQuizzes = document.createElement('div');
	userProfileQuizzes.classList.add('user-profile-quizzes');
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

		const actionButtonsContainer = document.createElement('div');
		actionButtonsContainer.classList.add('action-buttons-container');

		const deleteButton = document.createElement('button');
		deleteButton.classList.add('action-button');
		const deleteButtonIcon = document.createElement('img');
		deleteButtonIcon.src = '/img/icons/bin.png';
		deleteButtonIcon.classList.add('action-button-icon');

		deleteButton.append(deleteButtonIcon);

		deleteButton.addEventListener('click', () => {
			const ensureNotificationContainer = document.createElement('div');
			ensureNotificationContainer.classList.add('ensure-notification-container');

			const ensureNotification = document.createElement('div');
			ensureNotification.classList.add('ensure-notification');
			ensureNotification.classList.add('pop-up');

			const ensureNotificationText = document.createElement('h1');
			ensureNotificationText.classList.add('ensure-notification-text');
			ensureNotificationText.innerText = 'Czy na pewno chcesz usunąć ten quiz?';

			const buttonContainer = document.createElement('div');
			buttonContainer.classList.add('ensure-notification-button-container');

			const form = document.createElement('form');
			form.action = `/quiz/delete/${quiz.id}`;
			form.method = 'POST';

			const approveButton = document.createElement('button');
			approveButton.classList.add('ensure-notification-button');
			approveButton.classList.add('approve-button');
			approveButton.innerText = 'Tak';

			form.append(approveButton);

			const denyButton = document.createElement('button');
			denyButton.classList.add('ensure-notification-button');
			denyButton.classList.add('deny-button');
			denyButton.innerText = 'Nie';

			denyButton.addEventListener('click', () => {
				document.body.classList.remove('scroll-bar-hidden');
				ensureNotificationContainer.remove();
			})

			buttonContainer.append(form);
			buttonContainer.append(denyButton);

			ensureNotification.append(ensureNotificationText);
			ensureNotification.append(buttonContainer);


			ensureNotificationContainer.append(ensureNotification);
			document.body.prepend(ensureNotificationContainer);
			document.body.classList.add('scroll-bar-hidden');
		})

		const playButton = document.createElement('button');
		playButton.classList.add('action-button');
		const playButtonIcon = document.createElement('img');
		playButtonIcon.src = '/img/icons/play.png';
		playButtonIcon.classList.add('action-button-icon');

		playButton.append(playButtonIcon);

		playButton.addEventListener('click', () => {
			window.location.href = `/quiz/solve?id=${quiz.id}`
		})

		actionButtonsContainer.append(deleteButton);
		actionButtonsContainer.append(playButton);

		quizTile.append(tileIconContainer);
		quizTile.append(titleElement);
		quizTile.append(numberQuestionsElement);
		quizTile.append(actionButtonsContainer);
		userProfileQuizzes.append(quizTile);
	});
	return userProfileQuizzes;
}