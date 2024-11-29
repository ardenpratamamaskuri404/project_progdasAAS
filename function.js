let productArray = [];
let autoincrement = 1;

function saveForm() {
    const kodeProduk = "MD-00" + autoincrement;

    const nameProduk = document.getElementById("nameProduk").value.trim();
    const harga = document.getElementById("harga").value.trim();
    const satuan = document.getElementById("satuan").value;
    const kategori = document.getElementById("kategori").value;
    const gambar = document.getElementById("website").value.trim();
    const stokAwal = document.getElementById("stokawal").value.trim();

    // Tambahkan data ke array produk
    productArray.push({
        kodeProduk,
        nameProduk: nameProduk || "Nama Produk",
        harga: harga || "0",
        satuan: satuan || "Unit",
        kategori: kategori || "Tidak Ditentukan",
        gambar: gambar || "Tidak Ada Gambar",
        stokAwal: stokAwal || "0",
    });

    renderTable();
    autoincrement++;
    document.getElementById("formdata").reset();
}

function renderTable() {
    const tableBody = document
        .getElementById("productTable")
        .getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    productArray.forEach((product, index) => {
        const row = tableBody.insertRow();

        // Ternary for stock display
        const stockClass =
            product.stokAwal <= 0
                ? "stok-unavailable" // Stok habis
                : product.stokAwal < 5
                ? "stok-low" // Stok rendah
                : "stok-available"; // Stok cukup

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.kodeProduk}</td>
            <td>${product.nameProduk}</td>
            <td>${product.harga}</td>
            <td>${product.satuan}</td>
            <td>${product.kategori}</td>
            <td class="${stockClass}">${product.stokAwal > 0 ? `${product.stokAwal} ${product.satuan}` : "Habis"}</td>
            <td><img src="${product.gambar}" alt="Gambar Produk" style="width: 50px; height: 50px;"></td>
            <td>
                <button onclick="editProduct(${index})" class="edit-btn">Edit</button>
                <button onclick="deleteProduct(${index})" class="delete-btn">Hapus</button>
            </td>
        `;
    });
}

function deleteProduct(index) {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
        productArray.splice(index, 1);
        renderTable();
        alert("Produk berhasil dihapus.");
    }
}

function editProduct(index) {
    if (confirm("Apakah Anda yakin ingin mengedit produk ini?")) {
        const product = productArray[index];

        document.getElementById("kodeproduk").value = product.kodeProduk;
        document.getElementById("nameProduk").value = product.nameProduk;
        document.getElementById("harga").value = product.harga;
        document.getElementById("satuan").value = product.satuan;
        document.getElementById("kategori").value = product.kategori;
        document.getElementById("website").value = product.gambar;
        document.getElementById("stokawal").value = product.stokAwal;

        const saveButton = document.querySelector("button");
        saveButton.textContent = "Update";
        saveButton.onclick = () => updateProduct(index);
    }
}

function updateProduct(index) {
    productArray[index] = {
        kodeProduk: productArray[index].kodeProduk, // Tetap gunakan kode produk asli
        nameProduk: document.getElementById("nameProduk").value.trim(),
        harga: document.getElementById("harga").value.trim(),
        satuan: document.getElementById("satuan").value,
        kategori: document.getElementById("kategori").value,
        gambar: document.getElementById("website").value.trim(),
        stokAwal: document.getElementById("stokawal").value.trim(),
    };

    document.getElementById("formdata").reset();
    const saveButton = document.querySelector("button");
    saveButton.textContent = "Simpan";
    saveButton.onclick = saveForm;

    renderTable();
    alert("Produk berhasil diperbarui.");
}

// Event listener untuk tombol simpan
document.getElementById("saveBtn").addEventListener("click", saveForm);
