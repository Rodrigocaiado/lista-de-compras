// Selecionando os elementos
const itemInput = document.getElementById("itemInput");
const addItemButton = document.getElementById("addItemButton");
const itemList = document.getElementById("itemList");
const clearListButton = document.getElementById("clearListButton");
const counter = document.getElementById("counter");

// Função para salvar a lista no Local Storage
function saveList() {
  const items = [];
  itemList.querySelectorAll("li").forEach(item => {
    items.push({
      text: item.firstChild.textContent,
      comprado: item.classList.contains("comprado")
    });
  });
  localStorage.setItem("listaDeCompras", JSON.stringify(items));
}

// Função para carregar a lista do Local Storage
function loadList() {
  const savedItems = JSON.parse(localStorage.getItem("listaDeCompras"));
  if (savedItems) {
    savedItems.forEach(item => {
      addItemToDOM(item.text, item.comprado);
    });
  }
}

// Função para adicionar um item ao DOM e salvar no Local Storage
function addItemToDOM(text, comprado = false) {
  const listItem = document.createElement("li");
  listItem.textContent = text;

  if (comprado) {
    listItem.classList.add("comprado");
  }

  // Função para marcar/desmarcar item como comprado
  listItem.addEventListener("click", function () {
    listItem.classList.toggle("comprado");
    saveList();
    updateCounter();
  });

  // Criando o botão de remover
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remover";
  removeButton.style.marginLeft = "10px";

  // Evento de remover o item da lista e do Local Storage
  removeButton.addEventListener("click", function () {
    if (confirm("Tem certeza de que deseja remover este item?")) {
      itemList.removeChild(listItem);
      saveList();
      updateCounter();
    }
  });

  listItem.appendChild(removeButton);
  itemList.appendChild(listItem);
  updateCounter();
}

// Função principal para adicionar o item
function addItem() {
  const itemText = itemInput.value;

  if (itemText === "") {
    alert("Digite um item para adicionar à lista.");
    return;
  }

  addItemToDOM(itemText);
  saveList();
  itemInput.value = "";
}

// Evento para o botão de adicionar
addItemButton.addEventListener("click", addItem);

// Evento para a tecla Enter no campo de entrada
itemInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addItem();
  }
});

// Função para limpar toda a lista e o Local Storage
function clearList() {
  if (confirm("Tem certeza de que deseja limpar toda a lista?")) {
    itemList.innerHTML = "";  
    localStorage.removeItem("listaDeCompras");
    updateCounter();
  }
}

// Evento para o botão "Limpar Lista"
clearListButton.addEventListener("click", clearList);

// Função para atualizar o contador de itens
function updateCounter() {
  const totalItems = itemList.querySelectorAll("li").length;
  const itemsComprados = itemList.querySelectorAll("li.comprado").length;
  const itemsRestantes = totalItems - itemsComprados;

  counter.textContent = `Total: ${totalItems} | Pego: ${itemsComprados} | Restantes: ${itemsRestantes}`;

  // Exibe mensagem quando a lista está vazia
  if (totalItems === 0) {
    itemList.innerHTML = "<p>Sua lista está vazia!</p>";
  }
}

// Carregar a lista ao iniciar a página
loadList();
updateCounter();
