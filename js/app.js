const products = [
  {
    id: "ular",
    name: "Ular",
    price: 50000,
    category: "Reptil",
    image: "images/corn-snake.jpeg",
    seller: "Ular Imut",
    rating: "4.9",
    sold: "Terjual 28",
    tag: "Pilihan populer",
  },
  {
    id: "sugar",
    name: "Sugar Glider",
    price: 300000,
    category: "Mamalia",
    image: "images/sugar-glider.jpeg",
    seller: "Hewan Lucu",
    rating: "4.8",
    sold: "Terjual 46",
    tag: "Terlaris",
  },
  {
    id: "kucing",
    name: "Kucing Persia",
    price: 500000,
    category: "Mamalia",
    image: "images/persian-cat.jpeg",
    seller: "Meow",
    rating: "4.9",
    sold: "Terjual 32",
    tag: "Favorit",
  },
  {
    id: "gecko",
    name: "Leopard Gecko",
    price: 130000,
    category: "Reptil",
    image: "images/leopard-gecko.jpeg",
    seller: "Gecko House",
    rating: "4.7",
    sold: "Terjual 19",
    tag: "Baru",
  },
  {
    id: "Koala",
    name: "Koala",
    price: 500000000,
    category: "Mamalia",
    image: "images/pet-product-06.jpeg",
    seller: "Pet",
    rating: "4.8",
    sold: "Terjual 8",
    tag: "Gratis ongkir",
  },
  {
    id: "Otter",
    name: "Otter",
    price: 500000,
    category: "Mamalia",
    image: "images/pet-product-02.jpeg",
    seller: "mengemaskan",
    rating: "4.9",
    sold: "Terjual 105",
    tag: "Hemat",
  },
  {
    id: "Orang Utan",
    name: "Orang Utan",
    price: 100000000,
    category: "Mamalia",
    image: "images/pet-product-03.jpeg",
    seller: "Exotic pet",
    rating: "4.8",
    sold: "Terjual 5",
    tag: "Best seller",
  },
  {
    id: "Pinguin",
    name: "Pinguin",
    price: 7000000,
    category: "Burung",
    image: "images/pet-accessory-01.jpeg",
    seller: "Pet Haven",
    rating: "4.7",
    sold: "Terjual 37",
    tag: "Pilihan toko",
  },
  {
    id: "Panda",
    name: "Panda",
    price: 1000000000,
    category: "Mamalia",
    image: "images/pet-product-04.jpeg",
    seller: "Rare",
    rating: "4.9",
    sold: "Terjual 3",
    tag: "Hemat",
  },
  {
    id: "Anjing",
    name: "Anjing",
    price: 5500000,
    category: "Mamalia",
    image: "images/pet-product-05.jpeg",
    seller: "Jinak",
    rating: "4.8",
    sold: "Terjual 22",
    tag: "Baru",
  },
  {
    id: "Kelinci",
    name: "Kelinci",
    price: 350000,
    category: "Mamalia",
    image: "images/pet-product-07.jpeg",
    seller: "Pet Cute",
    rating: "4.8",
    sold: "Terjual 41",
    tag: "Rekomendasi",
  },
  {
    id: "Hamster",
    name: "Hamster",
    price: 65000,
    category: "Mamalia",
    image: "images/pet-product-08.jpeg",
    seller: "Small Pet",
    rating: "4.7",
    sold: "Terjual 58",
    tag: "Favorit",
  },
  {
    id: "Landak",
    name: "Landak Mini",
    price: 175000,
    category: "Mamalia",
    image: "images/pet-product-09.jpeg",
    seller: "Mamalia",
    rating: "4.9",
    sold: "Terjual 36",
    tag: "Terlaris",
  },
];
let cart = JSON.parse(localStorage.getItem("zoora-cart") || "[]"),
  favorites = JSON.parse(localStorage.getItem("zoora-favorites") || "[]"),
  activeCategory = "Semua";
const defaultStock = { ular: 8, sugar: 12, kucing: 5, gecko: 9, Koala: 15, Otter: 25, "Orang Utan": 14, Pinguin: 7, Panda: 20, Anjing: 11, Kelinci: 18, Hamster: 30, Landak: 10 };
const savedStock = JSON.parse(localStorage.getItem("zoora-market-stock-v1") || "{}");
const stock = { ...defaultStock, ...savedStock };
const $ = (selector) => document.querySelector(selector);
const rupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
function availableStock(product) {
  return Math.max(0, stock[product.id] ?? 0);
}
function saveStock() {
  localStorage.setItem("zoora-market-stock-v1", JSON.stringify(stock));
}
function syncAdminStock() {
  const catalog = JSON.parse(localStorage.getItem("zoora-admin-catalog-v2") || "null");
  if (!Array.isArray(catalog)) return;
  const updatedCatalog = catalog.map((adminProduct) => {
    const product = products.find((entry) => entry.name === adminProduct.name);
    return product ? { ...adminProduct, stock: availableStock(product) } : adminProduct;
  });
  localStorage.setItem("zoora-admin-catalog-v2", JSON.stringify(updatedCatalog));
}
function getStockIssues() {
  return cart.filter((item) => {
    const product = products.find((entry) => entry.id === item.id);
    return !product || item.qty > availableStock(product);
  });
}
function getVisibleProducts() {
  const keyword = $("#searchInput").value.trim().toLowerCase();
  const order = $("#sortSelect").value;
  const result = products.filter(
    (product) =>
      (activeCategory === "Semua" || product.category === activeCategory) &&
      `${product.name} ${product.seller}`.toLowerCase().includes(keyword),
  );
  return result.sort((a, b) =>
    order === "low"
      ? a.price - b.price
      : order === "high"
        ? b.price - a.price
        : products.indexOf(a) - products.indexOf(b),
  );
}
function renderProducts() {
  const list = getVisibleProducts();
  $("#productGrid").innerHTML = list
    .map(
      (product) =>
        `<article class="product-card"><img class="product-image" src="${product.image}" alt="${product.name}"><span class="product-tag">${product.tag}</span><button class="favorite-toggle ${favorites.includes(product.id) ? "liked" : ""}" data-favorite="${product.id}" aria-label="Simpan favorit">${favorites.includes(product.id) ? "♥" : "♡"}</button><div class="product-content"><p class="seller">${product.seller}</p><h3 class="product-name">${product.name}</h3><p class="product-meta"><span class="rating">★ ${product.rating}</span> · ${product.sold}</p><div class="product-bottom"><span class="price">${rupiah(product.price)}</span><button class="add-button" data-add="${product.id}">+ Keranjang</button></div></div></article>`,
    )
    .join("");
  $("#productResult").textContent = `Menampilkan ${list.length} produk`;
  $("#emptyState").hidden = list.length > 0;
}
function save() {
  localStorage.setItem("zoora-cart", JSON.stringify(cart));
  localStorage.setItem("zoora-favorites", JSON.stringify(favorites));
}
function updateCounts() {
  $("#cartCount").textContent = cart.reduce(
    (total, item) => total + item.qty,
    0,
  );
  $("#favoriteCount").textContent = favorites.length;
}
function renderCart() {
  const box = $("#cartItems");
  if (!cart.length) {
    box.innerHTML =
      '<p class="cart-empty">Keranjangmu masih kosong.<br>Yuk, pilih produk favoritmu!</p>';
    $("#cartTotal").textContent = "Rp0";
    return;
  }
  box.innerHTML = cart
    .map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      return `<div class="cart-item"><img src="${product.image}" alt="${product.name}"><div><h3>${product.name}</h3><p>${rupiah(product.price)}</p><div class="quantity-controls"><button data-qty="${product.id}" data-change="-1">−</button><b>${item.qty}</b><button data-qty="${product.id}" data-change="1">+</button></div></div><button class="remove-item" data-remove="${product.id}" aria-label="Hapus">×</button></div>`;
    })
    .join("");
  $("#cartTotal").textContent = rupiah(
    cart.reduce(
      (total, item) =>
        total +
        products.find((product) => product.id === item.id).price * item.qty,
      0,
    ),
  );
}
function notify(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}
function openCart() {
  renderCart();
  $("#cartDrawer").classList.add("open");
  $("#overlay").classList.add("visible");
}
function closeCart() {
  $("#cartDrawer").classList.remove("open");
  $("#overlay").classList.remove("visible");
}
document.querySelectorAll(".category-card").forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    document
      .querySelectorAll(".category-card")
      .forEach((item) => item.classList.toggle("active", item === button));
    renderProducts();
    $("#produk").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
$("#searchInput").addEventListener("input", renderProducts);
$("#sortSelect").addEventListener("change", renderProducts);
$("#cartButton").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#overlay").addEventListener("click", closeCart);
$(".menu-toggle").addEventListener("click", (event) => {
  const menu = $(".nav-menu");
  const opened = menu.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", opened);
  event.currentTarget.textContent = opened ? "×" : "☰";
});
document.addEventListener("click", (event) => {
  const add = event.target.closest("[data-add]");
  const favorite = event.target.closest("[data-favorite]");
  const quantity = event.target.closest("[data-qty]");
  const remove = event.target.closest("[data-remove]");
  if (add) {
    const item = cart.find((entry) => entry.id === add.dataset.add);
    item ? item.qty++ : cart.push({ id: add.dataset.add, qty: 1 });
    save();
    updateCounts();
    notify("Produk ditambahkan ke keranjang");
  }
  if (favorite) {
    const id = favorite.dataset.favorite;
    favorites = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];
    save();
    updateCounts();
    renderProducts();
  }
  if (quantity) {
    const item = cart.find((entry) => entry.id === quantity.dataset.qty);
    item.qty += Number(quantity.dataset.change);
    if (item.qty < 1) cart = cart.filter((entry) => entry !== item);
    save();
    updateCounts();
    renderCart();
  }
  if (remove) {
    cart = cart.filter((item) => item.id !== remove.dataset.remove);
    save();
    updateCounts();
    renderCart();
  }
});
$(".favorites-button").addEventListener("click", () =>
  favorites.length
    ? notify(`${favorites.length} produk tersimpan sebagai favorit`)
    : notify("Belum ada produk favorit"),
);
$("#logoutLink").addEventListener("click", () =>
  localStorage.removeItem("zoora-user"),
);
renderProducts();
updateCounts();

const history = JSON.parse(
  localStorage.getItem("zoora-payment-history") || "[]",
);
function cartTotal() {
  return cart.reduce(
    (total, item) =>
      total +
      products.find((product) => product.id === item.id).price * item.qty,
    0,
  );
}
function showCheckout() {
  if (!cart.length) {
    notify("Keranjangmu masih kosong");
    return;
  }
  if (getStockIssues().length) {
    notify("Ada produk yang stoknya tidak mencukupi. Perbarui keranjangmu.");
    renderCart();
    return;
  }
  closeCart();
  $("#checkoutTotal").textContent = rupiah(cartTotal());
  $("#checkoutStockList").innerHTML = cart.map((item) => { const product = products.find((entry) => entry.id === item.id); return `<p><span>${product.name} (${item.qty} item)</span><strong>Tersedia ${availableStock(product)}</strong></p>`; }).join("");
  $("#checkoutFormView").hidden = false;
  $("#checkoutSuccess").hidden = true;
  $("#checkoutModal").classList.add("open");
  $("#checkoutModal").setAttribute("aria-hidden", "false");
}
function closeCheckout() {
  $("#checkoutModal").classList.remove("open");
  $("#checkoutModal").setAttribute("aria-hidden", "true");
}
function renderHistory() {
  const box = $("#paymentHistory");
  if (!history.length) {
    box.innerHTML =
      '<p class="history-empty">Belum ada riwayat pembayaran.</p>';
    return;
  }
  box.innerHTML = history
    .map(
      (item) =>
        `<article class="history-entry"><div><b>${item.order}</b><small>${item.date} · ${item.method}</small><small>${item.items} produk · ${item.address}</small></div><strong>${rupiah(item.total)}</strong></article>`,
    )
    .join("");
}
function openHistory() {
  renderHistory();
  $("#historyModal").classList.add("open");
  $("#historyModal").setAttribute("aria-hidden", "false");
}
function closeHistory() {
  $("#historyModal").classList.remove("open");
  $("#historyModal").setAttribute("aria-hidden", "true");
}
$("#checkoutButton").addEventListener("click", showCheckout);
$("#closeCheckout").addEventListener("click", closeCheckout);
$("#historyButton").addEventListener("click", openHistory);
$("#closeHistory").addEventListener("click", closeHistory);
$("#checkoutModal").addEventListener("click", (event) => {
  if (event.target === $("#checkoutModal")) closeCheckout();
});
$("#historyModal").addEventListener("click", (event) => {
  if (event.target === $("#historyModal")) closeHistory();
});
$("#checkoutForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (getStockIssues().length) {
    notify("Stok berubah dan tidak mencukupi. Silakan perbarui keranjang.");
    closeCheckout();
    openCart();
    return;
  }
  const order = `ZT-${Date.now().toString().slice(-6)}`;
  history.unshift({
    order,
    date: new Date().toLocaleDateString("id-ID"),
    method: $("#paymentMethod").value,
    items: cart.reduce((total, item) => total + item.qty, 0),
    address: $("#receiverAddress").value,
    total: cartTotal(),
  });
  localStorage.setItem("zoora-payment-history", JSON.stringify(history));
  cart.forEach((item) => { stock[item.id] -= item.qty; });
  saveStock();
  syncAdminStock();
  cart = [];
  save();
  updateCounts();
  renderCart();
  $("#checkoutFormView").hidden = true;
  $("#checkoutSuccess").hidden = false;
  $("#successOrderId").textContent = `Nomor pesanan: ${order}`;
});
$("#finishCheckout").addEventListener("click", () => {
  closeCheckout();
  openHistory();
});
