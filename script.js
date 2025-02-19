// 🔥 Le vrai flag devient visible SEULEMENT après une action spécifique
let hasClicked = false;
document.getElementById("clickMe").addEventListener("click", function(event) {
    hasClicked = true;
    alert("Mauvais choix... Le flag vient de disparaître.");
    document.getElementById("realFlag").style.display = "none";
});

// 🔥 Le flag est brièvement visible après 15 secondes sans interaction
setTimeout(() => {
    if (!hasClicked) {
        document.getElementById("realFlag").style.display = "block";
    }
}, 15000);

// 🔥 Le vrai flag s'auto-détruit si l'utilisateur essaie de le copier
document.addEventListener("copy", function(event) {
    if (document.getElementById("realFlag").style.display === "block") {
        alert("Tu crois pouvoir copier ça ? Désolé, flag supprimé.");
        document.getElementById("realFlag").remove();
    }
});
