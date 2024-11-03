// Selecionando os elementos
const itemInput = document.getElementById("itemInput");
const addItemButton = document.getElementById("addItemButton");
const itemList = document.getElementById("itemList");
const clearListButton = document.getElementById("clearListButton");
const emptyMessage = document.getElementById("emptyMessage"); // Mensagem de lista vazia
const counter = document.getElementById("counter"); // Contador de itens

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
  itemList.innerHTML = ''; // Limpa a lista atual para evitar duplicações
  const savedItems = JSON.parse(localStorage.getItem("listaDeCompras"));
  if (savedItems) {
    savedItems.forEach(item => {
      addItemToDOM(item.text, item.comprado);
    });
  }
  updateCounter(); // Atualiza o contador
  checkEmptyList(); // Verifica se a lista está vazia
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
    saveList(); // Salva sempre que marcar/desmarcar
    updateCounter(); // Atualiza o contador
    checkEmptyList(); // Verifica se a lista está vazia
  });

  // Criando o botão de remover
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remover";
  removeButton.style.marginLeft = "10px";
  removeButton.style.padding = "4px";
  removeButton.style.fontSize = "15px";
  removeButton.style.borderRadius = "10px"

  // Evento de remover o item da lista e do Local Storage
  removeButton.addEventListener("click", function () {
    itemList.removeChild(listItem);
    saveList(); // Salva a lista após remover o item
    updateCounter(); // Atualiza o contador
    checkEmptyList(); // Verifica se a lista está vazia
  });

  listItem.appendChild(removeButton);
  itemList.appendChild(listItem);
  updateCounter(); // Atualiza o contador
  checkEmptyList(); // Verifica se a lista está vazia
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
  itemInput.value = ""; // Limpa o campo de entrada
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
    updateCounter(); // Atualiza o contador
    checkEmptyList(); // Verifica se a lista está vazia
  }
}

// Evento para o botão "Limpar Lista"
clearListButton.addEventListener("click", clearList);

// Função para verificar se a lista está vazia
function checkEmptyList() {
  if (itemList.children.length === 0) {
    emptyMessage.style.display = "block"; // Mostra a mensagem
  } else {
    emptyMessage.style.display = "none"; // Esconde a mensagem
  }
}

// Função para atualizar o contador de itens
function updateCounter() {
  const totalItems = itemList.querySelectorAll("li").length;
  const itemsComprados = itemList.querySelectorAll("li.comprado").length;
  const itemsRestantes = totalItems - itemsComprados;

  counter.textContent = `Total: ${totalItems} | No carrinho: ${itemsComprados} | Restantes: ${itemsRestantes}`;
}

// Carregar a lista ao iniciar a página
loadList();
