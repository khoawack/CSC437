const checkbox = document.getElementById('theme-checkbox');
const label = document.getElementById('theme-label');

function displayToggle(isLight) {
  document.body.classList.toggle('light-mode', isLight);
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  label.lastChild.textContent = isLight ? ' Dark mode' : ' Light mode';
}
const saved = localStorage.getItem('theme');
const isLight = saved === 'light';
checkbox.checked = isLight;
displayToggle(isLight);

document.body.addEventListener('theme:toggle', (e) => {
  displayToggle(Boolean(e.detail.checked));
});

label.onchange = (e) => {
  e.stopPropagation();
  const checked = e.target.checked;
  const custom = new CustomEvent('theme:toggle', {
    bubbles: true,
    detail: { checked },
  });
  label.dispatchEvent(custom);
};
