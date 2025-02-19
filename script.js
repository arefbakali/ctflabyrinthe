// 🔥 Bloque complètement l'accès au code source
document.addEventListener("keydown", function(event) {
    if (event.key === "F12" || (event.ctrlKey && event.key === "u")) {
        event.preventDefault();
        alert("Pas de triche ici !");
    }
});

// 🔥 Désactive le clic droit
document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    alert("Pas de clic droit !");
});

// 🔥 Si le joueur clique plus de 50 fois n'importe où, le flag apparaît
let clickCount = 0;
document.addEventListener("click", function() {
    clickCount++;
    if (clickCount >= 50) {
        document.getElementById("realFlag").style.display = "block";
        alert("Bravo ! Tu as cliqué 50 fois dans le vide...");
    }
});

// 🔥 Si la souris bouge en cercle, le flag apparaît (mouvement circulaire détecté)
let lastX = 0, lastY = 0, movementHistory = [];
document.addEventListener("mousemove", function(event) {
    movementHistory.push({x: event.clientX, y: event.clientY});
    if (movementHistory.length > 20) movementHistory.shift();
    
    let dx = movementHistory[movementHistory.length - 1].x - movementHistory[0].x;
    let dy = movementHistory[movementHistory.length - 1].y - movementHistory[0].y;
    
    if (Math.abs(dx) > 50 && Math.abs(dy) > 50) { 
        document.getElementById("realFlag").style.display = "block";
        alert("Tu as bougé la souris en cercle. Bien joué !");
    }
});

// 🔥 Si le joueur réduit la fenêtre à une toute petite taille, le flag apparaît
window.addEventListener("resize", function() {
    if (window.innerWidth < 400) {
        document.getElementById("realFlag").style.display = "block";
        alert("Tu as réduit la fenêtre... intéressant !");
    }
});

// 🔥 Si le joueur essaie de copier du texte, le flag s’efface définitivement
document.addEventListener("copy", function(event) {
    alert("Tu as essayé de copier ? Mauvaise idée.");
    document.getElementById("realFlag").remove();
});

