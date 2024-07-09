document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeStylesheet = document.getElementById('themeStylesheet');

    // Set initial theme
    if (localStorage.getItem('theme') === 'light') {
        themeStylesheet.href = 'light-theme.css';
        themeToggle.checked = false;
    } else {
        themeStylesheet.href = 'dark-theme.css';
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', function() {
        if (themeToggle.checked) {
            themeStylesheet.href = 'dark-theme.css';
            localStorage.setItem('theme', 'dark');
        } else {
            themeStylesheet.href = 'light-theme.css';
            localStorage.setItem('theme', 'light');
        }
    });
});