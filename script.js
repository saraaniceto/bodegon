const campoBusca = document.querySelector("#campo-busca");
const botaoBusca = document.querySelector("#botao-busca");
const cardContainer = document.querySelector(".card-container");
let dados = [];

async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        if (!resposta.ok) {
            throw new Error('Erro ao carregar o arquivo data.json');
        }
        dados = await resposta.json();
        renderizarCards(dados); // Renderiza todos os cards inicialmente
    } catch (erro) {
        console.error("Falha na requisição:", erro);
        cardContainer.innerHTML = `<p>Ocorreu um erro ao carregar as obras. Tente novamente mais tarde.</p>`;
    }
}

function iniciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();

    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.autoria.toLowerCase().includes(termoBusca) ||
        dado.descrição.toLowerCase().includes(termoBusca)
    );

    renderizarCards(resultados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa o container antes de adicionar novos cards
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <img src="${dado.imagem}" alt="Imagem da obra ${dado.nome}">
        <div class="card-content">
            <h2>${dado.nome}</h2>
            <p>${dado.autoria}</p>
            <p class="card-descricao">${dado.descrição}</p> 
            <a href="${dado.link}" target="_blank">Saiba mais</a>
        </div>
        `;
        cardContainer.appendChild(article);
    }
}

// Adiciona os "escutadores de evento" para o clique e para a tecla Enter
botaoBusca.addEventListener("click", iniciarBusca);
campoBusca.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        iniciarBusca();
    }
});

// Carrega os dados assim que a página é aberta
carregarDados();
