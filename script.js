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
    updateCounter(); // Atualize o contador após a remoção
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

// Função para limpar toda a lista e o Local Storage
function clearList() {
  if (confirm("Tem certeza de que deseja limpar toda a lista?")) {
    // Remove todos os itens do DOM
    itemList.innerHTML = "";  
    
    // Remove a a lista do local Storage
    localStorage.removeItem("listaDeCompras"); 

    // Atualiza o contador para refletir a lista vazia
    updateCounter();
  }
}

// Função para atualizar o contador de itens
function updateCounter() {
  const totalItens = itemList.querySelectorAll("li").length;
  const itensComprados = itemList.querySelectorAll("li.comprado").length;
  const itensRestantes = totalItens - itensComprados;

  const counter = document.getElementById("counter");
  counter.textContent = `Total: ${totalItens} | Pego: ${itensComprados} | Restantes: ${itensRestantes}`;

  // Verifique se a lista está vazia e exibe a mensagem
  if (totalItens === 0) {
    itemList.innerHTML = "<p>Sua lista está vazia!</p>";
  }
}

// Modifique `addItemDOM` e `clearList` para chamar `updateCounter`
function addItemDOM(text, comprado = false) {
  // código atual...

  // Atualiza o contador após adicionar o item
  updateCounter();
}

function clearList() {
  // código atual...

  // Atualiza o contador após limpar a lista
  updateCounter();
}

// Evento para o botão de adicionar
addItemButton.addEventListener("click", addItem);

// Evento para a tecla Enter no campo de entrada
itemInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      addItem();
    }
});

// Evento para o botão "Limpar Lista"
const clearListButton = document.getElementById("clearListButton");
clearListButton.addEventListener("click", clearList);

// Carregar a lista ao iniciar a página
loadList();

// Chame `updateCounter` em `loadList` para garantir que o contador atualize ao carregar
updateCounter();
