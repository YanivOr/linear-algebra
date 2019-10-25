// DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    const _console = document.getElementById('console');
    const input = _console.querySelector('.input');
    const output = _console.querySelector('.output');

    input.addEventListener('keydown', event => {
        if (event.keyCode === 13) {
            const command = event.target.value;
            event.target.value = null;

            try {
                eval(command);
            }
            catch (e) {
                console.log(e);
            }
        }
    });

    input.focus();
})