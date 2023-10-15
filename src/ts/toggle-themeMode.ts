const themeToggleDarkIcon = document.getElementById(
  "theme-toggle-dark-icon",
) as HTMLImageElement;
const themeToggleLightIcon = document.getElementById(
  "theme-toggle-light-icon",
) as HTMLImageElement;

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}

export default function toggleThemeMode() {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  document.documentElement.classList.toggle("dark");
}
