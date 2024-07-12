document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeStylesheet = document.getElementById('themeStylesheet');
    const sun = document.getElementById('sun-icon');

    // Set initial theme
    if (localStorage.getItem('theme') === 'light') {
        themeStylesheet.href = 'light-theme.css';
        sun.src = "sun-512.png";
        themeToggle.checked = false;
    } else {
        themeStylesheet.href = 'dark-theme.css';
        themeToggle.checked = true;
        sun.src = "image.png";

    }

    themeToggle.addEventListener('change', function() {
        if (themeToggle.checked) {
            themeStylesheet.href = 'dark-theme.css';
            localStorage.setItem('theme', 'dark');
            sun.src = "image.png";


        } else {
            themeStylesheet.href = 'light-theme.css';
            localStorage.setItem('theme', 'light');
            sun.src = "sun-512.png";

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

document.addEventListener('scroll', function() {
    const scrollLimit = document.body.scrollHeight - window.innerHeight;
    if (window.scrollY > scrollLimit) {
        window.scrollTo(0, scrollLimit);
    }
});