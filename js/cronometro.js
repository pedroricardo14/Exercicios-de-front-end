// cronômetro
var iniciar = document.querySelector("#iniciar");
var pausar = document.querySelector("#pausar");
var zerar = document.querySelector("#zerar");
var cronometro = document.querySelector("#cronometro");
var tempo = 0;
var intervalo;
var cronMsg = document.querySelector('#cron-msg');

function formatTime(seconds) {
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = seconds % 60;
    return [h, m, s].map(function(n) { return String(n).padStart(2, '0'); }).join(':');
}

if (cronometro) cronometro.textContent = formatTime(tempo);

if (iniciar) iniciar.addEventListener("click", function() {
    if (intervalo) { showMsg(cronMsg, 'Cronômetro já em execução'); return; }
    intervalo = setInterval(function() {
        tempo++;
        if (cronometro) cronometro.textContent = formatTime(tempo);
    }, 1000);
})

if (pausar) pausar.addEventListener("click", function() {
    if (!intervalo) { showMsg(cronMsg, 'Cronômetro não está em execução'); return; }
    clearInterval(intervalo);
    intervalo = null;
})

if (zerar) zerar.addEventListener("click", function() {
    if (!intervalo && tempo === 0) { showMsg(cronMsg, 'Já está zerado'); return; }
    clearInterval(intervalo);
    intervalo = null;
    tempo = 0;
    if (cronometro) cronometro.textContent = formatTime(tempo);
    showMsg(cronMsg, 'Zerado');
})
function showMsg(element, text) {
    if (!element) return;
    element.textContent = text;
    element.classList.remove('fade-out');
    void element.offsetWidth;
    element.classList.add('visible');
    setTimeout(function() { element.classList.add('fade-out'); }, 1800);
}
