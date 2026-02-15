// js/include-footer.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('footer.html')
    .then(response => response.text())
    .then(html => {
      const target = document.getElementById('footer-include');
      if (target) {
        target.innerHTML = html;
      }
    })
    .catch(err => {
      console.error('Erreur chargement footer:', err);
    });
});
