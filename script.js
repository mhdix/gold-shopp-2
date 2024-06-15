// script.js
document.addEventListener("DOMContentLoaded", () => {
  loadItems();
});

function loadItems() {
  const items = JSON.parse(localStorage.getItem("goldItems")) || [];
  const tableBody = document.querySelector("#items-table tbody");
  tableBody.innerHTML = "";
  items.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td class="actions">
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </td>
        `;
    tableBody.appendChild(row);
  });
}

function addItem() {
  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const imageInput = document.getElementById("image");

  const name = nameInput.value;
  const price = priceInput.value;
  const imageFile = imageInput.files[0];

  if (name && price && imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const items = JSON.parse(localStorage.getItem("goldItems")) || [];
      items.push({ name, price, image: e.target.result });
      localStorage.setItem("goldItems", JSON.stringify(items));
      loadItems();
      nameInput.value = "";
      priceInput.value = "";
      imageInput.value = "";
    };
    reader.readAsDataURL(imageFile);
  }
}

function editItem(index) {
  const items = JSON.parse(localStorage.getItem("goldItems"));
  const item = items[index];
  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const imageInput = document.getElementById("image");

  nameInput.value = item.name;
  priceInput.value = item.price;

  deleteItem(index);
}

function deleteItem(index) {
  const items = JSON.parse(localStorage.getItem("goldItems"));
  items.splice(index, 1);
  localStorage.setItem("goldItems", JSON.stringify(items));
  loadItems();
}
