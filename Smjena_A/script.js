function transliterate(s) {
    return s.replace(/č/g, 'c')
            .replace(/ć/g, 'c')
            .replace(/š/g, 's')
            .replace(/đ/g, 'd')
            .replace(/ž/g, 'z');
}

function toSnakeCase(s) {
    s = s.toLowerCase();
    s = transliterate(s);
    s = s.replace(/\s+/g, '_');
    s = s.replace(/[^\w\-_]/g, '');
    return s;
}

function loadNames() {
    fetch('rasporedi/lista_imena.txt')
        .then(response => response.text())
        .then(data => {
            const names = data.split('\n').map(name => name.trim()).filter(Boolean);
            const comboBox = document.getElementById('comboBox');
            names.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                comboBox.appendChild(option);
            });

            comboBox.addEventListener('change', () => {
                const selectedName = comboBox.value;
                const imageName = toSnakeCase(selectedName) + '.png';
                const img = document.getElementById('slika');
                img.src = `rasporedi/${imageName}`;
                img.style.display = 'block';
                img.onerror = () => {
                    img.style.display = 'none';
                    alert("Slika nije pronađena za: " + selectedName);
                };
            });

            // Automatski pokreni promenu ako je prvi odabran
            if (comboBox.options.length > 0) {
                comboBox.dispatchEvent(new Event('change'));
            }
        })
        .catch(error => {
            console.error("Greška pri učitavanju liste imena:", error);
        });
}

window.onload = loadNames;
