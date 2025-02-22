let lockedRows = {};
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('nameInput').value;
    const text = document.getElementById('textInput').value;

    const newData = { name, text };
    data.push(newData);

    updateTable();

    document.getElementById('nameInput').value = '';
    document.getElementById('textInput').value = '';
});

function updateTable() {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

    data.slice().reverse().forEach((item, index) => {
        const row = tableBody.insertRow();

        row.id = 'row-' + index;

        const nameCell = row.insertCell(0);
        nameCell.className = 'name';
        nameCell.contentEditable = 'true';
        nameCell.innerText = item.name;

        const textCell = row.insertCell(1);
        textCell.className = 'otherText';
        textCell.contentEditable = 'true';
        textCell.innerText = item.text;

        const actionCell = row.insertCell(2);
        actionCell.innerHTML = `
            <button onclick="readText('row-${index}')">Dengarkan</button>
            <button class="lock-button" onclick="lockRow('row-${index}')">Lock</button>
            <button class="remove-button" onclick="confirmRemoveRow('row-${index}')">Remove</button>
        `;
    
        addEditableListener(nameCell);
        addEditableListener(textCell);
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

function confirmRemoveRow(rowId) {
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
            removeRow(rowId);
        }
    });
}

function removeRow(rowId) {
    if (lockedRows[rowId]) {
        alert("Baris ini terkunci dan tidak dapat dihapus!");
        return;
    }

    const row = document.getElementById(rowId);
    const index = Array.from(row.parentNode.children).indexOf(row);

    data.splice(index, 1);
    updateTable();
}

document.querySelectorAll('td[contenteditable="true"]').forEach(addEditableListener); 