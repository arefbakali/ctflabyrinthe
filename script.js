// 🔥 Bloque l'accès au code source
document.addEventListener("keydown", function(event) {
    if (event.key === "F12" || (event.ctrlKey && event.key === "u")) {
        event.preventDefault();
        alert("Tu crois vraiment que c'est aussi simple ?");
    }
});

// 🔥 Désactive le clic droit
document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    alert("Non, non, non...");
});

// 🔥 Détection ultra précise d’un cercle
let movementHistory = [];
let precision = 0.98; // Seuil de précision élevé (rendu plus difficile)
let startTime = null;

document.addEventListener("mousemove", function(event) {
    if (!startTime) startTime = Date.now(); // Démarrer le timer au premier mouvement

    movementHistory.push({x: event.clientX, y: event.clientY});

    if (movementHistory.length > 50) { // On garde les 50 derniers points
        movementHistory.shift();
    }

    if (movementHistory.length === 50) { // Vérification quand on a 50 points
        let centerX = movementHistory.reduce((sum, p) => sum + p.x, 0) / movementHistory.length;
        let centerY = movementHistory.reduce((sum, p) => sum + p.y, 0) / movementHistory.length;
        
        let radii = movementHistory.map(p => Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2));
        let avgRadius = radii.reduce((sum, r) => sum + r, 0) / radii.length;

        // Vérifier la précision du cercle
        let deviations = radii.map(r => Math.abs(r - avgRadius) / avgRadius);
        let avgDeviation = deviations.reduce((sum, d) => sum + d, 0) / deviations.length;
        
        let duration = (Date.now() - startTime) / 1000; // Temps en secondes

        if (avgDeviation < (1 - precision) && duration > 3) { // Cercle parfait + minimum 3 secondes
            document.getElementById("realFlag").style.display = "block";
            alert("Incroyable ! Tu as réussi un cercle parfait !");
        } else if (duration < 3) { // Trop rapide
            alert("Trop rapide ! Fais un cercle plus lentement.");
            movementHistory = [];
            startTime = null;
        }
    }
});

// 🔥 Empêche la copie du flag
document.addEventListener("copy", function(event) {
    alert("Tu as essayé de copier ? Mauvaise idée.");
    document.getElementById("realFlag").remove();
});


