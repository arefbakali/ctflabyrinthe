// 🔥 Bloque l'accès au code source et à la console
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

// 🔥 Vérifie si l'utilisateur bouge la souris en cercle parfait
let movementHistory = [];
let precision = 0.97; // Seuil de précision (plus proche de 1 = plus dur)
let lastX, lastY;
let startTime;

document.addEventListener("mousemove", function(event) {
    if (!startTime) startTime = Date.now(); // Démarrer le timer au premier mouvement

    movementHistory.push({x: event.clientX, y: event.clientY});
    
    if (movementHistory.length > 30) {
        movementHistory.shift(); // Garder uniquement les 30 derniers points pour analyser
    }

    // Vérifier si les mouvements forment un cercle
    if (movementHistory.length === 30) {
        let centerX = movementHistory.reduce((sum, p) => sum + p.x, 0) / movementHistory.length;
        let centerY = movementHistory.reduce((sum, p) => sum + p.y, 0) / movementHistory.length;
        
        let radii = movementHistory.map(p => Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2));
        let avgRadius = radii.reduce((sum, r) => sum + r, 0) / radii.length;

        // Vérifier la précision du cercle
        let deviations = radii.map(r => Math.abs(r - avgRadius) / avgRadius);
        let avgDeviation = deviations.reduce((sum, d) => sum + d, 0) / deviations.length;
        
        if (avgDeviation < (1 - precision)) { // Si le cercle est presque parfait
            let duration = (Date.now() - startTime) / 1000;
            
            if (duration < 3) { // Si trop rapide, refuser
                alert("Trop rapide ! Fais un cercle plus lentement.");
                movementHistory = [];
                startTime = null;
            } else {
                document.getElementById("realFlag").style.display = "block";
                alert("Incroyable ! Tu as réussi un cercle parfait !");
            }
        }
    }
});

// 🔥 Si l'utilisateur essaie de copier du texte, le flag disparaît
document.addEventListener("copy", function(event) {
    alert("Tu as essayé de copier ? Mauvaise idée.");
    document.getElementById("realFlag").remove();
});

