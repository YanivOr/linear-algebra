// DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    const _console = document.getElementById('console');
    input = _console.querySelector('.input');
    output = _console.querySelector('.output');

    input.addEventListener('keydown', event => {
        if (event.keyCode === 13) {
            const command = event.target.value;
            event.target.value = null;
            handleCommand(command);
        }
    });

    input.focus();
})
