// For toggle button;

function toggleClass()
{

    const body = document.querySelector('body');
    body.classList.toggle('light');
    body.style.transition = `0.3s linear`;
}

const hr = document.querySelector('#hr');

setInterval(() => {
    
    let day = new Date();
    let sec = day.getHours() * 60 * 60 + day.getMinutes() * 60 + day.getSeconds();

    let msec = day.getMilliseconds();
    
    
    // VERY IMPORTANT STEP:
    
    hr.style.transform = `rotateZ(${360/(24*60*60) * (sec + 12 * 60 * 60)}deg)`;
    
    // gives the smooth transitioning effect, but there's a bug here!
    // sc.style.transition = `1s`;
})

