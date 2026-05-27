var incrementar = document.querySelector("#incrementar");
var decrementar = document.querySelector("#decrementar");
var resetar = document.querySelector("#resetar");
var contador = document.querySelector("#valor");
var contadorMsg = document.querySelector("#contador-msg");

if (incrementar && decrementar && resetar && contador) {
    function showMsg(element, text) {
        if (!element) return;
        element.textContent = text;
        element.classList.remove('fade-out');
        void element.offsetWidth;
        element.classList.add('visible');
        setTimeout(function() { element.classList.add('fade-out'); }, 1500);
    }

    incrementar.addEventListener("click", function() {
        contador.textContent = parseInt(contador.textContent) + 1;
    })

    decrementar.addEventListener("click", function() {
        var value = parseInt(contador.textContent) - 1;
        if (value < 0) {
            contador.textContent = 0;
            showMsg(contadorMsg, 'Valor não pode ser negativo');
            return;
        }
        contador.textContent = value;
    })

    resetar.addEventListener("click", function() {
        contador.textContent = 0;
        showMsg(contadorMsg, 'Zerado');
    })
}
