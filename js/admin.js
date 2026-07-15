const user = JSON.parse(
  localStorage.getItem("zoora-user") || '{"name":"Admin"}',
);
const defaultProducts = [
  {
    id: 1,
    name: "Ular",
    price: 50000,
    stock: 8,
    category: "Reptil",
    image: "images/corn-snake.jpeg",
  },
  {
    id: 2,
    name: "Sugar Glider",
    price: 300000,
    stock: 12,
    category: "Mamalia",
    image: "images/sugar-glider.jpeg",
  },
  {
    id: 3,
    name: "Kucing Persia",
    price: 500000,
    stock: 5,
    category: "Mamalia",
    image: "images/persian-cat.jpeg",
  },
  {
    id: 4,
    name: "Leopard Gecko",
    price: 130000,
    stock: 9,
    category: "Reptil",
    image: "images/leopard-gecko.jpeg",
  },
  {
    id: 5,
    name: "Koala",
    price: 500000000,
    stock: 15,
    category: "Mamalia",
    image: "images/pet-product-06.jpeg",
  },
  {
    id: 6,
    name: "Otter",
    price: 500000,
    stock: 25,
    category: "Mamalia",
    image: "images/pet-product-02.jpeg",
  },
  {
    id: 7,
    name: "Orang Utan",
    price: 100000000,
    stock: 14,
    category: "Mamalia",
    image: "images/pet-product-03.jpeg",
  },
  {
    id: 8,
    name: "Pinguin",
    price: 7000000,
    stock: 7,
    category: "Burung",
    image: "images/pet-accessory-01.jpeg",
  },
  {
    id: 9,
    name: "Panda",
    price: 1000000000,
    stock: 20,
    category: "Mamalia",
    image: "images/pet-product-04.jpeg",
  },
  {
    id: 10,
    name: "Anjing",
    price: 5500000,
    stock: 11,
    category: "Mamalia",
    image: "images/pet-product-05.jpeg",
  },
  {
    id: 11,
    name: "Kelinci",
    price: 350000,
    stock: 18,
    category: "Mamalia",
    image: "images/pet-product-07.jpeg",
  },
  {
    id: 12,
    name: "Hamster",
    price: 65000,
    stock: 30,
    category: "Mamalia",
    image: "images/pet-product-08.jpeg",
  },
  {
    id: 13,
    name: "Landak Mini",
    price: 175000,
    stock: 10,
    category: "Mamalia",
    image: "images/pet-product-09.jpeg",
  },
];
let adminProducts =
  JSON.parse(localStorage.getItem("zoora-admin-catalog-v2") || "null") ||
  defaultProducts;
let selectedId = null;
let selectedImage = "";
const $ = (selector) => document.querySelector(selector);
const rupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
$("#adminName").textContent = user.name;
function save() {
  localStorage.setItem("zoora-admin-catalog-v2", JSON.stringify(adminProducts));
}
function show(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.adminToast);
  window.adminToast = setTimeout(() => toast.classList.remove("show"), 2200);
}
function renderProducts() {
  $("#activeProductCount").textContent = adminProducts.filter(
    (product) => product.stock > 0,
  ).length;
  $("#productList").innerHTML = adminProducts
    .map(
      (product) =>
        `<div class="product-row" data-id="${product.id}" tabindex="0"><img class="product-thumb" src="${product.image || "images/zoora-collection.jpeg"}" alt="${product.name}"><b>${product.name}</b><span>${rupiah(product.price)}</span><span class="stock">Stok: <strong>${product.stock}</strong></span><i>${product.stock ? "Aktif" : "Habis"}</i><button class="edit-button" data-edit="${product.id}">Edit</button></div>`,
    )
    .join("");
}
function setPreview(image) {
  selectedImage = image || "";
  const preview = $("#imagePreview");
  preview.hidden = !selectedImage;
  if (selectedImage) preview.src = selectedImage;
}
function openModal(product = null) {
  selectedId = product?.id || null;
  $("#modalLabel").textContent = product ? "EDIT PRODUK" : "TAMBAH PRODUK";
  $("#modalTitle").textContent = product ? product.name : "Produk baru";
  $("#saveProduct").textContent = product
    ? "Simpan perubahan"
    : "Tambah produk";
  $("#productName").value = product?.name || "";
  $("#productPrice").value = product?.price || "";
  $("#productStock").value = product?.stock ?? "";
  $("#productCategory").value = product?.category || "Mamalia";
  $("#productImage").value = "";
  setPreview(product?.image);
  $("#productModal").classList.add("open");
  $("#productModal").setAttribute("aria-hidden", "false");
  $("#productName").focus();
}
function closeModal() {
  $("#productModal").classList.remove("open");
  $("#productModal").setAttribute("aria-hidden", "true");
}
$("#productImage").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 1500000) {
    show("Ukuran gambar maksimal 1.5 MB.");
    event.target.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => setPreview(reader.result);
  reader.readAsDataURL(file);
});
$("#logoutButton").addEventListener("click", () => {
  localStorage.removeItem("zoora-user");
  location.href = "index.html";
});
$("#addProduct").addEventListener("click", () => openModal());
$("#manageButton").addEventListener("click", () => {
  $("#productList").scrollIntoView({ behavior: "smooth" });
  show("Klik produk untuk mengedit stok atau detail.");
});
$("#closeModal").addEventListener("click", closeModal);
$("#productModal").addEventListener("click", (event) => {
  if (event.target === $("#productModal")) closeModal();
});
function editRow(row) {
  openModal(
    adminProducts.find((product) => product.id === Number(row.dataset.id)),
  );
}
$("#productList").addEventListener("click", (event) => {
  const row = event.target.closest(".product-row");
  if (row) editRow(row);
});
$("#productList").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const row = event.target.closest(".product-row");
    if (row) editRow(row);
  }
});
$("#productForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = {
    name: $("#productName").value.trim(),
    price: Number($("#productPrice").value),
    stock: Number($("#productStock").value),
    category: $("#productCategory").value,
    image: selectedImage || "images/zoora-collection.jpeg",
  };
  if (selectedId) {
    adminProducts = adminProducts.map((product) =>
      product.id === selectedId ? { ...product, ...data } : product,
    );
    show("Produk, stok, dan gambar berhasil diperbarui.");
  } else {
    adminProducts.push({ id: Date.now(), ...data });
    show("Produk baru berhasil ditambahkan.");
  }
  save();
  renderProducts();
  closeModal();
});
renderProducts();
