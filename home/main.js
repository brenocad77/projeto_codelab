const track = document.querySelector('.expositor-track');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');

btnNext.addEventListener('click', () => {
    const itemWidth = track.clientWidth;
    
    track.scrollBy({ left: itemWidth, behavior: 'smooth' });
});

btnPrev.addEventListener('click', () => {
    const itemWidth = track.clientWidth;
    
    track.scrollBy({ left: -itemWidth, behavior: 'smooth' });
});