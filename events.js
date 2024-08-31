document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

document.addEventListener('click', (e) => {
    createBullet(e.clientX, e.clientY);
})

document.addEventListener("mousemove", (e) => {
    if(increaseShottingSpeed){
        setTimeout(() =>createBullet(e.clientX, e.clientY), 100)
    }
})

window.addEventListener('resize', resizeCanvas);