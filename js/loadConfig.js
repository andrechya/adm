// Fungsi untuk memuat data dari file JSON eksternal
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Memasukkan data ke dalam datalist untuk setiap kategori
        const nameOptions = document.getElementById('nameOptions');
        const plateOptions = document.getElementById('plateOptions');
        const textOptions = document.getElementById('textOptions');

        // Menambahkan data ke dalam datalist Nama
        data.names.forEach(name => {
            const nameOption = document.createElement('option');
            nameOption.value = name;
            nameOptions.appendChild(nameOption);
        });

        // Menambahkan data ke dalam datalist Plat Nomor
        data.plates.forEach(plate => {
            const plateOption = document.createElement('option');
            plateOption.value = plate;
            plateOptions.appendChild(plateOption);
        });

        // Menambahkan data ke dalam datalist Teks Lain
        data.texts.forEach(text => {
            const textOption = document.createElement('option');
            textOption.value = text;
            textOptions.appendChild(textOption);
        });
    })
    .catch(error => console.error('Error loading the JSON file:', error));
