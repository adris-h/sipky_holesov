
function showHidePassword(input, btn) {
    if (input.type === "password") {
        input.type = "text";
        btn.innerHTML = `<i class="fa-regular fa-eye"></i>`;

    } else {
        input.type = "password";
        btn.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
    }
}
function submit(input){
    console.log("registered")
    input.type = "password";
}



let form;
const body = document.querySelector('body');
const openFormBtn = document.getElementById('open-form');

openFormBtn.addEventListener('click', () => {
    body.insertAdjacentHTML('beforeend', `
        <div id="login-container" class="register-form">
            ${registerForm()}
        </div>
    `);
    form = document.getElementById('login-container');

    requestAnimationFrame(() => {
        form.style.transform = "translateX(0)";
    });

    redoAllListeners();
});

openFormBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    openForm();
});


function openForm() {
    if (form) return;

    body.insertAdjacentHTML('beforeend', `
        <div id="login-container" class="register-form">
            ${registerForm()}
        </div>
    `);
    form = document.getElementById('login-container');

    requestAnimationFrame(() => {
        form.style.transform = "translateX(0)";
    });

    redoAllListeners();
    addStopPropagationToForm();
}

function addStopPropagationToForm() {
    form.addEventListener('click', event => {
        event.stopPropagation();
    });
}

function closeForm() {
    if (!form) return;

    form.style.transform = "translateX(100%)";
    setTimeout(() => {
        if (form) {
            form.remove();
            form = null;
        }
    }, 400);
}

document.addEventListener('click', (event) => {
    if (form && !form.contains(event.target) && !openFormBtn.contains(event.target)) {
        closeForm();
    }
});

function redoAllListeners() {
    const changeFormType = document.getElementById('change-form');
    changeFormType.addEventListener('click', e => {
        changeForm();
    });

    const showPassBtn = document.getElementById('show-password');
    const passwordInput = document.querySelector('#password');
    showPassBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showHidePassword(passwordInput, showPassBtn);
    });


    const registerButton = document.getElementById('register');
    if (registerButton) {
        registerButton.addEventListener('click', () => {
            submit(passwordInput);
        });
    }

    const loginButton = document.getElementById('login');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            console.log("logged in");
        });
    }

    const closeButton = document.getElementById('close-btn');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            closeForm();
        })
    }



}

function changeForm(){
    if(form.classList.contains('register-form')){
        form.classList.remove('register-form');
        form.classList.add('login-form');

        form.innerHTML = loginForm();
    } else {
        form.classList.remove('login-form');
        form.classList.add('register-form');

        form.innerHTML = registerForm();
    }


    redoAllListeners();
    addStopPropagationToForm();
}



function registerForm(){
    return `
    <button id="close-btn">zavřít</button>
    <h2>registrace</h2>
        <div id="name-container" class="input-container">
            <label for="name"></label>
            <input id="name" type="text" class="input-field" placeholder="Jméno & Příjmení" required>
        </div>
        <div id="email-container" class="input-container">
            <label for="email"></label>
            <input id="email" type="email" class="input-field" placeholder="Email" required>
        </div>
        <div id="password-container" class="input-container">
            <label for="password"></label>
            <input id="password" type="password" class="input-field" placeholder="Heslo" required>
            <label for="show-password"></label>
            <button id="show-password">
                <i class="fa-regular fa-eye-slash"></i>
            </button>
        </div>
        <button id="register" class="submit-button">Registrovat se</button>
        <a id="change-form">už mám účet</a>
`
}

function loginForm(){
    return `
    <button id="close-btn">zavřít</button>
    <h2>přihlášení</h2>
        <div id="email-container" class="input-container">
            <label for="email"></label>
            <input id="email" type="email" class="input-field" placeholder="Email" required>
        </div>
        <div id="password-container" class="input-container">
            <label for="password"></label>
            <input id="password" type="password" class="input-field" placeholder="Heslo" required>
            <label for="show-password"></label>
            <button id="show-password">
                <i class="fa-regular fa-eye-slash"></i>
            </button>
        </div>
        <button id="login" class="submit-button">Přihlásit se</button>
        <a id="change-form">nemám účet</a>
    `;
}
/*import { gsap } from "gsap";
import Lenis from 'lenis'*/

gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({
    duration: 1,
    smoothWheel: true,
    smoothTouch: false,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

gsap.ticker.lagSmoothing(0);

const pageHero = document.getElementById('hero-section');

if(pageHero){
    // Parallax timeline
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: "+=100%",
            scrub: 0

        }
    });

    const layers = gsap.utils.toArray(".parallax");
    layers.forEach(layer => {
        const depth = parseFloat(layer.dataset.depth || "0");
        const movement = -(layer.offsetHeight * depth);
        tl.to(layer, {y: movement, ease: "none"}, 0);
    });

// Separate pin
    ScrollTrigger.create({
        trigger: "#hero-section",
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1
    });
}
