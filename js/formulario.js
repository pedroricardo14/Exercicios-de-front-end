document.addEventListener('DOMContentLoaded', function(){
    var form = document.getElementById('formulario');
    var msg = document.getElementById('form-msg');
    var resultEl = document.getElementById('form-result');

    // Bloqueia recarregamento via tecla F5 e Ctrl+R/Cmd+R
    function preventReloadKey(e){
        var key = e.key || e.keyIdentifier || '';
        var isRefreshKey = key === 'F5' || key === 'f5' || (key === 'r' && (e.ctrlKey || e.metaKey));
        if (isRefreshKey) {
            e.preventDefault();
            if (msg) {
                msg.textContent = 'Recarregamento bloqueado.';
                msg.classList.remove('fade-out');
                msg.classList.add('visible');
                setTimeout(function(){ msg.classList.add('fade-out'); }, 1400);
            }
        }
    }
    document.addEventListener('keydown', preventReloadKey, {capture: true});

    function showMsg(text, isError){
        if (!msg) return;
        msg.textContent = text;
        msg.classList.remove('fade-out');
        msg.classList.add('visible');
        setTimeout(function(){ msg.classList.add('fade-out'); }, 1800);
    }

    if (!form) return;
    var isDirty = false;
    var isProgrammaticReset = false; // <-- flag nova

    var inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(function(inp){
        inp.addEventListener('input', function(){ isDirty = true; });
    });

    form.addEventListener('reset', function(e){
        isDirty = false;
        // Só limpa o resultado se for o usuário clicando em "Limpar"
        if (e && e.isTrusted && !isProgrammaticReset && resultEl) {
            resultEl.innerHTML = '';
            resultEl.classList.remove('visible');
        }
        isProgrammaticReset = false;
    });

    form.addEventListener('submit', function(e){
        e.preventDefault();
        var fd = new FormData(form);
        var nome = (fd.get("nome") || '').toString().trim();
        var email = (fd.get('email') || '').toString().trim();
        var curso = (fd.get('curso') || '').toString().trim();
        if (!nome || !email || !curso) { showMsg('Preencha todos os campos', true); return; }

        // Reseta o form sem apagar o resultado
        isProgrammaticReset = true;
        isDirty = false;
        form.reset();

        // Exibe os dados após o reset
        if (resultEl) {
            resultEl.innerHTML = '<h3>Dados enviados</h3>' +
                '<p><strong>Nome:</strong> ' + nome + '</p>' +
                '<p><strong>Email:</strong> ' + email + '</p>' +
                '<p><strong>Curso:</strong> ' + curso + '</p>';
            resultEl.classList.add('visible');
        }

        showMsg('Enviado com sucesso!');
    });

    window.addEventListener('beforeunload', function (e) {
        if (!isDirty) return;
        e.preventDefault();
        e.returnValue = '';
        return '';
    });
});