const userButton = document.querySelector('.username-button');
let userInfoContainer = undefined;
const info = [
    {
        link: '/quiz/create',
        img: "/img/icons/pencil.png",
        text: "Utwórz quiz"
    },
    {
        link: '/user/profile',
        img: "/img/icons/user.png",
        text: "Profil"
    },
    {
        link: '/user/logout',
        img: "/img/icons/fire-exit.png",
        text: "Wyloguj się"
    }
]
if (userButton) {
    userButton.addEventListener('click', (event) => {
        if (!userInfoContainer) {
            event.stopPropagation();
            userInfoContainer = document.createElement('div');
            userInfoContainer.addEventListener('click', event => {
                event.stopPropagation();
            })
            userInfoContainer.classList.add('username-info-container');
            info.forEach((singleInfo) => {
                const userInfoButton = document.createElement('div');
                userInfoButton.classList.add('username-info-button');

                const a = document.createElement('a');
                a.href = singleInfo.link;

                const img = document.createElement('img');
                img.classList.add('username-info-icon');
                img.src = singleInfo.img;

                const p = document.createElement('p');
                p.classList.add('username-info-desc');
                p.innerText = singleInfo.text;

                userInfoButton.append(a);
                userInfoButton.append(img);
                userInfoButton.append(p);
                userInfoContainer.append(userInfoButton);
            })
            userButton.append(userInfoContainer);
        }
    })
}
document.addEventListener('click', event => {
    if (userInfoContainer) {
        if (!userInfoContainer.contains(event.target)) {
            userInfoContainer.remove();
            userInfoContainer = undefined;
        }
    }
});