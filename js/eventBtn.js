let lockedRows = {};
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('nameInput').value;
    const plate = document.getElementById('plateInput').value;
    const text = document.getElementById('textInput').value;

    const newData = { name, plate, text };
    data.push(newData);

    updateTable();

    document.getElementById('nameInput').value = '';
    document.getElementById('plateInput').value = '';
    document.getElementById('textInput').value = '';
});

function updateTable() {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

    data.forEach((item, index) => {
        const row = tableBody.insertRow(0); // Menambahkan baris baru di paling atas

        row.id = 'row-' + index;

        const nameCell = row.insertCell(0);
        nameCell.className = 'name';
        nameCell.contentEditable = 'true';
        nameCell.innerText = item.name;

        const plateCell = row.insertCell(1);
        plateCell.className = 'plate';
        plateCell.contentEditable = 'true';
        plateCell.innerText = item.plate;

        const textCell = row.insertCell(2);
        textCell.className = 'otherText';
        textCell.contentEditable = 'true';
        textCell.innerText = item.text;

        const actionCell = row.insertCell(3);
        actionCell.innerHTML = `
            <button class="listen-button" onclick="readText('row-${index}')">Dengarkan</button>
            <button class="lock-button" onclick="lockRow('row-${index}')">Lock</button>
            <button class="remove-button" onclick="confirmRemoveRow(${index})">Remove</button>
        `;
    
        addEditableListener(nameCell);
        addEditableListener(plateCell);
        addEditableListener(textCell);
    });
}

function disableAllListenButtons() {
    const buttons = document.querySelectorAll('.listen-button');
    buttons.forEach(button => {
        button.disabled = true;
    });
    console.log("Button Disabled");
}

function enableAllListenButtons() {
    const buttons = document.querySelectorAll('.listen-button');
    buttons.forEach(button => {
        button.disabled = false;
    });
}

function lockRow(rowId) {
    const row = document.getElementById(rowId);
    const lockButton = row.querySelector('button:nth-child(2)'); // Lock button
    const removeButton = row.querySelector('button:nth-child(3)'); // Remove button

    if (lockedRows[rowId]) {
        // Unlock the row
        lockedRows[rowId] = false;
        lockButton.innerText = "Lock";
        removeButton.disabled = false;
    } else {
        // Lock the row
        lockedRows[rowId] = true;
        lockButton.innerText = "Unlock";
        removeButton.disabled = true;
    }
}

function addEditableListener(cell) {
    cell.addEventListener('click', function () {
        this.focus();
    });

    cell.addEventListener('blur', function () {
        const updatedValue = this.innerText;
        Swal.fire({
            title: 'Perubahan Tersimpan',
            text: `Data berhasil diperbarui: ${updatedValue}`,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
    });
}

function confirmRemoveRow(index) {
    Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Data ini akan dihapus!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            removeRow(index);
        }
    });
}

function removeRow(index) {
    if (lockedRows['row-' + index]) {
        alert("Baris ini terkunci dan tidak dapat dihapus!");
        return;
    }

    data.splice(index, 1);
    updateTable();
}

document.querySelectorAll('td[contenteditable="true"]').forEach(addEditableListener);
