const carrossel = document.querySelector('.expositor-carrossel');
const btnProx = document.getElementById('btn-prox');
const btnAnt = document.getElementById('btn-ant');

let autoPlay = setInterval(passarSlide, 4000);

function passarSlide() {
    const larguraItem = carrossel.clientWidth; 
    const fimDoScroll = carrossel.scrollWidth - carrossel.clientWidth;


    if (carrossel.scrollLeft >= fimDoScroll - 5) {
        carrossel.scrollLeft = 0;
    } else {
        carrossel.scrollLeft += larguraItem;
    }
}


carrossel.addEventListener('mouseenter', () => {
    clearInterval(autoPlay);
});

carrossel.addEventListener('mouseleave', () => {
    autoPlay = setInterval(passarSlide, 4000);
});

btnProx.addEventListener('click', () => {
    const larguraItem= carrossel.clientWidth;
    
    carrossel.scrollBy({ left: larguraItem, behavior: 'smooth' });
});

btnAnt.addEventListener('click', () => {
    const larguraItem = carrossel.clientWidth;
    
    carrossel.scrollBy({ left: -larguraItem, behavior: 'smooth' });
});

