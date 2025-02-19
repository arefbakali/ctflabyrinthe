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
let numpadSequence = [];
let precision = 0.99; // Exige une précision de 99%
let startTime = null;
let failCount = 0;
let perfectCircles = 0;

// 🔥 Détection des mouvements de souris en cercle
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
            showFlag();
        } else {
            handleFailure();
        }
    }
});

// 🔢 Détection des mouvements circulaires via le pavé numérique
document.addEventListener("keydown", function(event) {
    const numpadKeys = {
        "7": "top-left",
        "8": "top",
        "9": "top-right",
        "6": "right",
        "3": "bottom-right",
        "2": "bottom",
        "1": "bottom-left",
        "4": "left"
    };

    if (numpadKeys[event.key]) {
        numpadSequence.push(numpadKeys[event.key]);

        // Vérifie si la séquence est complète
        if (numpadSequence.join(",") === "top-left,top,top-right,right,bottom-right,bottom,bottom-left,left,top-left") {
            showFlag();
        }

        // Garde uniquement les 9 derniers mouvements
        if (numpadSequence.length > 9) {
            numpadSequence.shift();
        }
    }
});

// 🔥 Affiche le flag si le cercle est réussi
function showFlag() {
    document.getElementById("realFlag").style.display = "block";
    alert("INCROYABLE ! Tu as réussi un cercle parfait !");
    perfectCircles++;
}

// 🔥 Gestion des échecs et frustration maximale
function handleFailure() {
    failCount++;
    document.getElementById("failCount").innerText = "Échecs : " + failCount;

    if (failCount % 5 === 0) {
        document.getElementById("trollMessage").innerText = "As-tu envisagé une carrière ailleurs ?";
    } else if (failCount % 10 === 0) {
        document.getElementById("trollMessage").innerText = "C’est peut-être juste impossible ?";
    } else if (failCount % 15 === 0) {
        document.getElementById("trollMessage").innerText = "Tu aimes échouer, non ?";
    }

    alert("Échec ! Le cercle n'était pas parfait, essaie encore...");
    movementHistory = [];
    numpadSequence = [];
    startTime = null;
}

// 🔥 Empêche la copie du flag
document.addEventListener("copy", function(event) {
    alert("Tu as essayé de copier ? Mauvaise idée.");
    document.getElementById("realFlag").remove();
});


