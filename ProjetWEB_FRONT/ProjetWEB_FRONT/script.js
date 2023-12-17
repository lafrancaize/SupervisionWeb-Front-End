function envoyerDonnees() {
    // Récupérer la valeur du champ de recherche
    var recherche = document.getElementById("searchInput").value;

    // Vérifier si le champ de recherche n'est pas vide
    if (recherche.trim() !== "") {
        // Vous pouvez ici effectuer une action avec les données (par exemple, les envoyer à un serveur via une requête AJAX)
        // Dans cet exemple, nous allons simplement afficher les données dans la console
        console.log("Données à envoyer : " + recherche);
    } else {
        alert("Veuillez saisir quelque chose dans le champ de recherche.");
    }
}