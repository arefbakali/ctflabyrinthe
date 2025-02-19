// 🔥 Empêche l'inspection et troll les tricheurs
document.addEventListener("keydown", function(event) {
    if (event.key === "F12" || (event.ctrlKey && event.key === "u")) {
        event.preventDefault();
        alert("C'est NON !");
    }
});

// 🔥 Désactive le clic droit
document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    alert("Essaye encore !");
});

// 🔥 Variables pour la détection du cercle
let movementHistory = [];
let precision = 0.99; // Extrêmement strict (99% de précision)
let startTime = null;
let failCount = 0;
let perfectCircles = 0;

// 🔥 Détection d’un mouvement circulaire extrême
document.addEventListener("mousemove", function(event) {
    if (!startTime) startTime = Date.now(); // Démarre le timer au premier mouvement

    movementHistory.push({x: event.clientX, y: event.clientY});

    if (movementHistory.length > 100) { // On garde 100 points pour une analyse fine
        movementHistory.shift();
    }

    if (movementHistory.length === 100) { // Analyse quand 100 points sont enregistrés
        let centerX = movementHistory.reduce((sum, p) => sum + p.x, 0) / movementHistory.length;
        let centerY = movementHistory.reduce((sum, p) => sum + p.y, 0) / movementHistory.length;
        
        let radii = movementHistory.map(p => Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2));
        let avgRadius = radii.reduce((sum, r) => sum + r, 0) / radii.length;

        let deviations = radii.map(r => Math.abs(r - avgRadius) / avgRadius);
        let avgDeviation = deviations.reduce((sum, d) => sum + d, 0) / deviations.length;
        
        let duration = (Date.now() - startTime) / 1000; // Temps en secondes

        if (avgDeviation < (1 - precision) && duration > 5) { // Exige un cercle **très précis** et **lent**
            document.getElementById("realFlag").style.display = "block";
            alert("INCROYABLE ! Tu as réussi un cercle parfait !");
            perfectCircles++;
        } else {
            failCount++;
            document.getElementById("failCount").innerText = "Échecs : " + failCount;
            
            if (failCount % 5 === 0) { // Après 5 échecs, on ajoute du troll
                document.getElementById("trollMessage").innerText = "As-tu envisagé une carrière ailleurs ?";
            } else if (failCount % 10 === 0) {
                document.getElementById("trollMessage").innerText = "C’est peut-être juste impossible ?";
            } else if (failCount % 15 === 0) {
                document.getElementById("trollMessage").innerText = "Tu aimes échouer, non ?";
            }

            alert("Échec ! Le cercle n'était pas parfait, essaie encore...");
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


