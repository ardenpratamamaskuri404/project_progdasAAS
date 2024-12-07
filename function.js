let productArray = [];
let autoincrement = 1;

function updateKodeProduk() {
    const kodeProduk = "MD-00" + autoincrement;
    document.getElementById("kodeproduk").value = kodeProduk;
}

function saveForm() {
    const kodeProduk = document.getElementById("kodeproduk").value; 
    const nameProduk = document.getElementById("nameProduk").value.trim();
    const harga = document.getElementById("harga").value.trim();
    const satuan = document.getElementById("satuan").value;
    const kategori = document.getElementById("kategori").value;
    const gambar = document.getElementById("website").value.trim();
    const stokproduk = document.getElementById("stokproduk").value.trim();

    if (document.getElementById("saveBtn").textContent === "Perbarui") {
        const index = document.getElementById("saveBtn").dataset.index;
        productArray[index] = {
            kodeProduk,
            nameProduk: nameProduk || "Nama Produk",
            harga: harga || "0",
            satuan: satuan || "Unit",
            kategori: kategori || "Tidak Ditentukan",
            gambar: gambar || "Tidak Ada Gambar",
            stokproduk: stokproduk || "0",
        };

        document.getElementById("saveBtn").textContent = "Simpan"; 
        document.getElementById("saveBtn").removeAttribute("data-index");
        alert("Produk berhasil diperbarui."); 
    } else {
        productArray.push({
            kodeProduk,
            nameProduk: nameProduk || "Nama Produk",
            harga: harga || "0",
            satuan: satuan || "Unit",
            kategori: kategori || "Tidak Ditentukan",
            gambar: gambar || "Tidak Ada Gambar",
            stokproduk: stokproduk || "0",
        });
        autoincrement++;
    }

    renderTable(); 
    document.getElementById("formdata").reset();
    updateKodeProduk(); 
}

function renderTable() {
    const tableBody = document
        .getElementById("productTable")
        .getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    productArray.forEach((product, index) => {
        const row = tableBody.insertRow();

        const stockClass =
            product.stokproduk <= 0
                ? "stok-unavailable"
                : product.stokproduk < 5
                ? "stok-low"
                : "stok-available";

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.kodeProduk}</td>
            <td>${product.nameProduk}</td>
            <td>${product.harga}</td>
            <td>${product.satuan}</td>
            <td>${product.kategori}</td>
            <td class="${stockClass}">${product.stokproduk > 0 ? `${product.stokproduk}` : "habis"}</td>
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
    const product = productArray[index];

    document.getElementById("kodeproduk").value = product.kodeProduk;
    document.getElementById("nameProduk").value = product.nameProduk;
    document.getElementById("harga").value = product.harga;
    document.getElementById("satuan").value = product.satuan;
    document.getElementById("kategori").value = product.kategori;
    document.getElementById("website").value = product.gambar;
    document.getElementById("stokproduk").value = product.stokproduk;

    const saveButton = document.getElementById("saveBtn");
    saveButton.textContent = "Perbarui";
    saveButton.setAttribute("data-index", index); 
}

document.addEventListener("DOMContentLoaded", updateKodeProduk);

document.getElementById("saveBtn").addEventListener("click", saveForm);