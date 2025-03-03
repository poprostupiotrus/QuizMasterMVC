export async function fetchQuizData(id) {
    const url = `/api/quizzes/${id}`;
    const quizData = await fetch(url, { method: 'GET' }
    ).then(response => {
        return response.json();
    }).then(data => {
        return data;
    });
    return quizData;
}
export async function getScore(userAnswers) {
    const url = '/api/quizzes/score';
    const score = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userAnswers)
    }).then(response => {
        return response.json();
    }).then(data => {
        return data.score;
    });
    return score;
}
export async function getQuizArrayBySearchTerm(searchTerm, pageNumber) {
    const url = `/api/quizzes/search/${searchTerm}?pageNumber=${pageNumber}`;
    const quizArray = await fetch(url, { method: 'GET' })
    .then(response => {
        return response.json();
    }).then(data => {
        return data;
    });
    return quizArray;
}
export async function getLatestQuizzes() {
    const url = '/api/quizzes/latest';
    const quizArray = await fetch(url, { method: 'GET' })
        .then(response => {
            return response.json();
        }).then(data => {
            return data;
        });
    return quizArray;
}