// Fungsi untuk memuat data dari file JSON eksternal
fetch('supplier.json')
    .then(response => response.json())
    .then(data => {
        // Memasukkan data ke dalam datalist untuk setiap kategori
        const supplierOptions = document.getElementById('supplierOptions');
        const supplTextOptions = document.getElementById('supplTextOptions');

        // Menambahkan data ke dalam datalist Nama
        data.supplierName.forEach(name => {
            const nameOption = document.createElement('option');
            nameOption.value = name;
            supplierOptions.appendChild(nameOption);
        });

        // Menambahkan data ke dalam datalist Teks Lain
        data.supplText.forEach(text => {
            const textOption = document.createElement('option');
            textOption.value = text;
            supplTextOptions.appendChild(textOption);
        });
    })
    .catch(error => console.error('Error loading the JSON file:', error));
