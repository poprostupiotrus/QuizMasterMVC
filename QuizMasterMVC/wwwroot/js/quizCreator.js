let questionCount = 1;
const maxInputLength = 512;
const addQuestion = () => {
	const questionsContainer = document.querySelector('.questions-container');

	const questionContainer = document.createElement('div');
	questionContainer.classList.add("question-container");

	const deleteButton = document.createElement('button');
	deleteButton.classList.add('delete-button');
	deleteButton.addEventListener('click', (event) => {
		event.preventDefault();
		questionsContainer.removeChild(questionContainer);
		questionCount--;
		updateQuestionNames();
		updateAnswers();
	})

	const deleteButtonImage = document.createElement('img');
	deleteButtonImage.classList.add('delete-button-image');
	deleteButtonImage.src = '/img/icons/close.png';

	deleteButton.append(deleteButtonImage);

	const questionNameContainer = document.createElement('div');
	questionNameContainer.classList.add('question-name-container');


	const label = document.createElement('label');
	label.htmlFor = `Questions[${questionCount}].Content`;
	label.innerText = `Pytanie ${questionCount + 1}:`;
	label.classList.add('question-label-text');


	const input = document.createElement('input');
	input.name = `Questions[${questionCount}].Content`;
	input.classList.add('quiz-input');
	input.placeholder = 'Wprowadź pytanie';

	const questionAnswersContainer = createAnswers();

	questionContainer.append(questionNameContainer);
	questionContainer.append(deleteButton);
	questionContainer.append(questionAnswersContainer);

	questionNameContainer.append(label);
	questionNameContainer.append(input);


	const children = questionsContainer.children;
	questionsContainer.insertBefore(questionContainer, children[children.length - 1]);
	scrollToElement(questionContainer);
	questionCount++;
}
const updateQuestionNames = () => {
	const questions = document.querySelectorAll('.question-container');
	questions.forEach((question, index) => {
		if (index !== 0) {
			const questionNameContainer = question.querySelector('.question-name-container');
			const label = questionNameContainer.querySelector('label');
			const input = questionNameContainer.querySelector('input');
			label.htmlFor = `Questions[${index}].Content`;
			label.innerText = `Pytanie ${index + 1}:`;
			input.name = `Questions[${index}].Content`;
		}
	})
}
const updateAnswers = () => {
	const anwersContainers = document.querySelectorAll('.answers-container');
	anwersContainers.forEach((answersContainer, index) => {
		if (index !== 0) {
			answers = answersContainer.querySelectorAll('.answer-container');
			answers.forEach((answer, answerIndex) => {
				const label = answer.querySelector('label');
				const input = answer.querySelector('.js-answer-text-input');
				const checkboxInput = answer.querySelector('.js-answer-checbox-input');

				label.htmlFor = `Questions[${index}].Answers[${answerIndex}].AnswerText`;
				input.name = `Questions[${index}].Answers[${answerIndex}].AnswerText`;
				checkboxInput.name = `Questions[${index}].Answers[${answerIndex}].IsCorrect`;
			})
		}
	});
}
const createAnswers = () => {
	const questionAnswersContainer = document.createElement('div');
	questionAnswersContainer.classList.add('question-answers-container');

	const p = document.createElement('p');
	p.innerText = "Odpowiedzi:";
	p.classList.add('question-label-text');

	const answersContainer = document.createElement('div');
	answersContainer.classList.add('answers-container');

	const answers = ['A', 'B', 'C', 'D'];
	answers.forEach((answer, index) => {
		const answerContainer = document.createElement('div');
		answerContainer.classList.add('answer-container');

		const label = document.createElement('label');
		label.htmlFor = `Questions[${questionCount}].Answers[${index}].AnswerText`;
		label.classList.add('label-text');
		label.innerText = `${answer}:`;

		const input = document.createElement('input');
		input.name = `Questions[${questionCount}].Answers[${index}].AnswerText`;
		input.classList.add('quiz-input');
		input.classList.add('js-answer-text-input');
		input.placeholder = 'Wprowadź odpowiedź';

		const checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = `Questions[${questionCount}].Answers[${index}].IsCorrect`;
		checkbox.dataset.questionIndex = `${questionCount}`;
		checkbox.classList.add('answer-check-box');
		checkbox.classList.add('js-answer-checbox-input');
		checkbox.value = false;
		checkbox.addEventListener('change', () => { onCheckBoxChanged(checkbox) });

		answerContainer.append(label);
		answerContainer.append(input);
		answerContainer.append(checkbox);

		answersContainer.append(answerContainer);
	});

	questionAnswersContainer.append(p);
	questionAnswersContainer.append(answersContainer);

	return questionAnswersContainer;
}
const onCheckBoxChanged = (answerCheckBox) => {
	if (answerCheckBox.checked) {
		const checkBoxes = document.querySelectorAll('.answer-check-box');
		const checkBoxArray = Array.from(checkBoxes);
		const questionCheckBoxes = checkBoxArray.filter(checkbox => {
			if (answerCheckBox.dataset.questionIndex === checkbox.dataset.questionIndex) {
				return checkbox;
			}
		});
		questionCheckBoxes.forEach((questionCheckBox) => {
			if (questionCheckBox !== answerCheckBox) {
				questionCheckBox.checked = false;
				questionCheckBox.value = false;
			}
		});
		answerCheckBox.value = true;
	}
	else {
		answerCheckBox.checked = true;
		answerCheckBox.value = true;
	}
}
const scrollToElement = (element) => {
	element.scrollIntoView({ behavior: "smooth", block: 'center' });
}
const isFormValidated = () => {
	if (!isQuizNameValidated()) {
		return false;
	}
	if (!isQuestionsValidated()) {
		return false;
	}
	return true;
};
const isQuizNameValidated = () => {
	const quizNameContainer = document.querySelector('.quiz-name-container');
	const quizNameInput = quizNameContainer.querySelector('input');
	if (quizNameInput.value.trim() === "" || quizNameInput.value.length >= maxInputLength) {
		quizNameContainer.classList.add('red-border');
		scrollToElement(quizNameContainer);
		return false;
	}
	quizNameContainer.classList.remove('red-border');
	return true;
};
const isQuestionsValidated = () => {
	const questionContainerArray = document.querySelectorAll('.question-container');
	for (const questionContainer of questionContainerArray) {
		const questionNameContainer = document.querySelector('.question-name-container');
		const questionNameInput = questionNameContainer.querySelector('input');
		if (questionNameInput.value.trim() === "" || questionNameInput.value.length >= maxInputLength) {
			questionContainer.classList.add('red-border');
			scrollToElement(questionContainer);
			return false;
		}
		const questionAnswersContainer = questionContainer.querySelector('.question-answers-container');
		const answersContainer = questionAnswersContainer.querySelector('.answers-container');
		const answersArray = answersContainer.querySelectorAll('.answer-container');
		let anyCheckBoxChecked = false;
		for (const answer of answersArray) {
			const answerTextInput = answer.querySelector('.js-answer-text-input');
			if (answerTextInput.value.trim() === "" || answerTextInput.value.length >= maxInputLength) {
				questionContainer.classList.add('red-border');
				scrollToElement(questionContainer);
				return false;
			}
			const checkBox = answer.querySelector('.js-answer-checbox-input');
			const isCheckBoxChecked = checkBox.value === "true";
			if (isCheckBoxChecked) {
				anyCheckBoxChecked = true;
			}
		}
		if (!anyCheckBoxChecked) {
			questionContainer.classList.add('red-border');
			scrollToElement(questionContainer);
			return false;
		}
		questionContainer.classList.remove('red-border');
	}
	return true;
}
document.querySelector('.add-question-btn').addEventListener('click', (event) => {
	event.preventDefault();
	addQuestion();
});
document.querySelectorAll('.answer-check-box').forEach((answerCheckBox) => {
	answerCheckBox.addEventListener('change', () => { onCheckBoxChanged(answerCheckBox); });
})
document.querySelector('.save-button').addEventListener('click', (event) => {
	if (!isFormValidated()) {
		event.preventDefault();
	}
})