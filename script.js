// Selecionando os elementos
const itemInput = document.getElementById("itemInput");
const addItemButton = document.getElementById("addItemButton");
const itemList = document.getElementById("itemList");

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

  // Adiciona a classe "comprado" se o item estiver marcado como comprado
  if (comprado) {
    listItem.classList.add("comprado");
  }

  // Função para marcar/desmarcar item como comprado
  listItem.addEventListener("click", function () {
    listItem.classList.toggle("comprado");
    saveList();
  });

  // Criando o botão de remover
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remover";
  removeButton.style.marginLeft = "10px";

  // Evento de remover o item da lista e do Local Storage
  removeButton.addEventListener("click", function () {
    itemList.removeChild(listItem);
    saveList();
  });

  // Adicionando o botão ao item da lista e adicionando o item na lista do DOM
  listItem.appendChild(removeButton);
  itemList.appendChild(listItem);
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

  // Limpando o campo de entrada
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

// Carregar a lista ao iniciar a página
loadList();
