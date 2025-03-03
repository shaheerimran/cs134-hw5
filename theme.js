document.addEventListener("DOMContentLoaded", function () {
    console.log("being triggered")
    const themeToggle = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);

       
    themeToggle.textContent = currentTheme === "dark" ? "🌞" : "🌙";

    themeToggle.addEventListener("click", function () {
        const newTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        themeToggle.textContent = newTheme === "dark" ? "🌞" : "🌙";
    });
});
