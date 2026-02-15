document.addEventListener("DOMContentLoaded", function() {
    // 1. Détecter si on est dans un sous-dossier (ex: /articles/ ou /royautes/)
    // On vérifie si l'URL contient ces dossiers
    const isSubFolder = window.location.pathname.includes("/articles/") || window.location.pathname.includes("/royautes/");
    
    // Si oui, le chemin vers la racine est "../", sinon c'est vide ""
    const pathPrefix = isSubFolder ? "../" : "";

    // Fonction pour charger un fichier HTML dans un élément
    function loadHTML(selector, file) {
        const element = document.querySelector(selector);
        if (!element) return; // Si l'élément n'existe pas sur la page, on arrête

        fetch(pathPrefix + file)
            .then(response => {
                if (!response.ok) throw new Error("Erreur chargement " + file);
                return response.text();
            })
            .then(html => {
                // Si on est dans un sous-dossier, on corrige les liens dans le HTML chargé
                if (isSubFolder) {
                    // Ajoute "../" devant les href qui ne sont pas des liens externes (http) ou des ancres (#)
                    html = html.replace(/href="(?!(http|#|mailto))/g, 'href="../');
                    // Ajoute "../" devant les sources d'images
                    html = html.replace(/src="images/g, 'src="../images');
                }
                element.innerHTML = html;
            })
            .catch(error => console.error(error));
    }

    // Charger le header (dans la balise <header>) et le footer (dans la classe .site-footer)
    loadHTML("header", "header.html");
    loadHTML(".site-footer", "footer.html");
});