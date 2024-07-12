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

    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const container = document.querySelector('.container');
    
    // Toggle sidebar visibility on hamburger click
    hamburger.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');
        container.classList.toggle('sidebar-open');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickInsideHamburger = hamburger.contains(event.target);
    
        if (!isClickInsideSidebar && !isClickInsideHamburger) {
            sidebar.classList.remove('show-sidebar');
            container.classList.remove('sidebar-open');

        }
    });
    
    // Close sidebar when clicking on the container
    container.addEventListener('click', function() {
        sidebar.classList.remove('show-sidebar');
        container.classList.remove('sidebar-open');

    });
    
});