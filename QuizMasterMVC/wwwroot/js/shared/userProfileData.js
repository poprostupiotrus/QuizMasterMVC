export async function getUserDetails() {
    const url = '/api/userprofile/details';
    const userDetails = await fetch(url, { method: 'GET' })
        .then(response => {
            return response.json();
        }).then(data => {
            return data;
        });
    return userDetails;
}