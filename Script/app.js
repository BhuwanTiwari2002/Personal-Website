let website_intro = document.querySelector('.website-intro');
let website_intro_header = document.querySelector('.website-intro-header');
let website_intro_logo = document.querySelectorAll('.website-intro-logo');

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        website_intro_logo.forEach((span,idx) => { // idx means the index
            setTimeout(() => {
                span.classList.add('active');
            }, (idx +1) * 400)
        });

        setTimeout(() => {
            website_intro_logo.forEach((span,idx) => { 
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade')
                }, (idx + 1) * 50)
            })
        },2000);

        setTimeout(() => {
            website_intro.style.top = '-100vh';
        },2300)
    })
})

