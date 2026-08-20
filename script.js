const products = {
  chocolateria: [
    {
      id: "chocopinatas",
      name: "Chocopiñatas Sorpresa",
      description: "Figuras de chocolate fino para romper con un mini martillo de madera y descubrir una sorpresa en su interior.",
      image: "assets/chocopeanut-2.png",
      details: [
        "Incluye martillo de madera y cinta de regalo.",
        "Relleno personalizable: gomitas, masmelos, frutos secos y bianchi.",
        "Diseños y colores adaptados a tu evento."
      ]
    },
    {
      id: "fresas",
      name: "Fresas Cubiertas",
      description: "Fresas seleccionadas, sumergidas en capas finas de chocolate con acabados artísticos y refinados.",
      image: "assets/fresas.png",
      details: [
        "Decoradas con grageas y/o frutos secos.",
        "Cajas de regalo de 6, 12 y 24 unidades.",
        "Ideales para aniversarios, San Valentín, cumpleaños o agradecimientos."
      ]
    },
    {
      id: "chocobombas",
      name: "Chocobombas",
      description: "Esferas de chocolate rellenas de cacao y mini masmelos para preparar una experiencia dulce con leche caliente.",
      image: "assets/chocobombas.png",
      details: [
        "Cacao de alta calidad y mini malvaviscos en su interior.",
        "Disponibles en empaques individuales.",
        "Sets de regalo de 2, 4 y 6 esferas."
      ]
    }
  ],
  reposteria: [
    {
      id: "donas",
      name: "Donas Artesanales con Fruta Fresca",
      description: "Donas artesanales bañadas en chocolate, acompañadas de frutas frescas.",
      image: "assets/donas.png",
      details: [
        "Frutas: fresas, banano y arándanos.",
        "Coberturas: chocolate de leche, blanco u oscuro.",
        "Toppings: maní, grageas e hilos de chocolate."
      ]
    }
  ],
  regalos: [
    {
      id: "cajas",
      name: "Cajas Especiales",
      description: "Crea un detalle inolvidable personalizando tu propia caja mixta.",
      image: "assets/cajas-especiales.png",
      details: [
        "Combina fresas cubiertas, chocobombas, donas y chocopiñatas.",
        "Incluye caja decorada, listón de tela y tarjeta con dedicatoria.",
        "Ideal para cumpleaños, aniversarios, fechas especiales y detalles corporativos."
      ]
    }
  ],
  bebidas: []
};

const categoryLabels = {
  chocolateria: "Chocolatería",
  reposteria: "Repostería",
  regalos: "Regalos",
  bebidas: "Bebidas"
};

const grid = document.getElementById("product-grid");
const modal = document.getElementById("product-modal");
const modalContent = document.getElementById("modal-content");
const gourmetScreen = document.getElementById("gourmet-screen");
const transition = document.querySelector(".theme-transition");

function renderCategory(category) {
  const items = products[category];

  if (!items.length) {
    grid.innerHTML = `
      <div class="empty-category">
        <p class="eyebrow">${categoryLabels[category]}</p>
        <h3>Muy pronto.</h3>
        <p>Estamos preparando nuevas creaciones para esta categoría.</p>
      </div>`;
    return;
  }

  grid.innerHTML = items.map(product => `
    <article class="product-card">
      <div class="product-image"><img src="${product.image}" alt="${product.name}"></div>
      <div class="product-info">
        <p class="eyebrow">${categoryLabels[category]}</p>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <button type="button" class="product-link" data-product="${product.id}">Ver detalles →</button>
      </div>
    </article>`).join("");
}

function openProduct(id) {
  const product = Object.values(products).flat().find(item => item.id === id);
  if (!product) return;

  modal.querySelector(".modal-photo").innerHTML = `<img src="${product.image}" alt="${product.name}">`;

  modalContent.innerHTML = `
    <p class="eyebrow">SWEET ECLAT</p>
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <ul>${product.details.map(detail => `<li>${detail}</li>`).join("")}</ul>
    <p><strong>Cotización:</strong> <a href="https://www.instagram.com/hello.sweeteclat/" target="_blank" rel="noopener">Hacer cotización en Instagram →</a></p>
    <p><em>Hecho con amor.</em></p>`;

  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.setAttribute("open", "");
  }
}

function closeModal() {
  if (typeof modal.close === "function") modal.close();
  else modal.removeAttribute("open");
}

document.querySelectorAll(".category-tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".category-tab").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    renderCategory(button.dataset.category);
  });
});

document.addEventListener("click", event => {
  const productButton = event.target.closest("[data-product]");
  if (productButton) openProduct(productButton.dataset.product);
});

document.querySelector(".modal-close").addEventListener("click", closeModal);

modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});

function showGourmet() {
  if (gourmetScreen.classList.contains("visible")) return;

  transition.classList.remove("active");
  void transition.offsetWidth;
  transition.classList.add("active");

  setTimeout(() => {
    gourmetScreen.classList.add("visible");
    gourmetScreen.setAttribute("aria-hidden", "false");
    document.body.classList.add("gourmet-mode");
  }, 220);

  document.querySelector('[data-theme-target="gourmet"]').classList.add("active");
  document.querySelector('[data-theme-target="normal"]').classList.remove("active");
}

function showNormal() {
  gourmetScreen.classList.remove("visible");
  gourmetScreen.setAttribute("aria-hidden", "true");
  document.body.classList.remove("gourmet-mode");

  transition.classList.remove("active");
  void transition.offsetWidth;
  transition.classList.add("active");

  document.querySelector('[data-theme-target="normal"]').classList.add("active");
  document.querySelector('[data-theme-target="gourmet"]').classList.remove("active");
}

document.querySelector('[data-theme-target="gourmet"]').addEventListener("click", showGourmet);
document.querySelector('[data-theme-target="normal"]').addEventListener("click", showNormal);
document.getElementById("gourmet-back").addEventListener("click", showNormal);

document.getElementById("year").textContent = new Date().getFullYear();

renderCategory("chocolateria");
