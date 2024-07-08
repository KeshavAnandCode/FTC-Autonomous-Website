document.addEventListener("DOMContentLoaded", function() {
    var currentLocation = window.location.pathname.split("/").pop();
    var sidebarLinks = document.querySelectorAll(".sidebar ul li a");

    sidebarLinks.forEach(function(link) {
        if (link.getAttribute("href") === currentLocation) {
            link.classList.add("active");
        }
    });
});