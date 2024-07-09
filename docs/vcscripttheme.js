document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeStylesheet = document.getElementById('themeStylesheet');

    // Set initial theme
    if (localStorage.getItem('theme') === 'light') {
        themeStylesheet.href = 'vc-light.css';
        themeToggle.checked = false;
    } else {
        themeStylesheet.href = 'vc-dark.css';
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', function() {
        if (themeToggle.checked) {
            themeStylesheet.href = 'vc-dark.css';
            localStorage.setItem('theme', 'dark');
        } else {
            themeStylesheet.href = 'vc-light.css';
            localStorage.setItem('theme', 'light');
        }
    });
});