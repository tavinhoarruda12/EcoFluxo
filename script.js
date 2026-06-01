// 1. DICIONÁRIO DE DADOS (Base Científica - SENAR-PR)
const WATER_DATA = {
    soja: {
        litros: 550000,
        sugestoes: [
            "Adote o Plantio Direto para reter a umidade natural do solo.",
            "Utilize sensores de manejo de irrigação para monitorar o estresse hídrico real."
        ],
        impacto: "Isso equivale ao consumo residencial diário de cerca de 3.500 pessoas na cidade!"
    },
    milho: {
        litros: 600000,
        sugestoes: [
            "Sincronize a irrigação com o período crítico de florescimento e enchimento de grãos.",
            "Faça rotação de culturas para aumentar a matéria orgânica e reter mais água."
        ],
        impacto: "Essa economia abasteceria uma escola pública urbana por até 2 meses!"
    },
    bovino: {
        litros: 110,
        sugestoes: [
            "Capte água da chuva nos telhados das instalações de ordenha.",
            "Reutilize a água de lavagem para a limpeza inicial de pátios e fertirrigação."
        ],
        impacto: "Evita a sobrecarga dos mananciais que abastecem os municípios vizinhos!"
    },
    suino: {
        litros: 35,
        sugestoes: [
            "Regule os bicos chupeta constantemente para evitar vazamentos.",
            "Adote raspagem prévia dos dejetos a seco antes de usar mangueiras de pressão."
        ],
        impacto: "Garante a segurança e pureza dos rios integrados campo-cidade."
    }
};

// 2. ELEMENTOS DA INTERFACE (DOM)
const form = document.querySelector('#water-form');
const activitySelect = document.querySelector('#activity-select');
const quantityInput = document.querySelector('#quantity-input');
const btnCalculate = document.querySelector('#btn-calculate');
const errorMessageBox = document.querySelector('#error-message-box');
const resultsPanel = document.querySelector('#results-panel');
const litersResult = document.querySelector('#liters-result');
const suggestionsList = document.querySelector('#suggestions-list');
const cityImpactText = document.querySelector('#city-impact-text');

// Elementos de Navegação por Abas
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// 3. LÓGICA DE NAVEGAÇÃO ENTRE ABAS
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe ativa de todos os botões
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Esconde todos os conteúdos das abas
        tabContents.forEach(content => content.hidden = true);

        // Ativa o botão clicado
        button.classList.add('active');
        // Mostra o conteúdo correspondente
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).hidden = false;
    });
});

// 4. LÓGICA DA CALCULADORA E VALIDAÇÃO ESTRITA
btnCalculate.addEventListener('click', () => {
    // Reseta estados visuais anteriores
    errorMessageBox.hidden = true;
    errorMessageBox.textContent = '';
    resultsPanel.hidden = true;

    const selectedActivity = activitySelect.value;
    const quantityValue = quantityInput.value.trim();
    const quantity = Number(quantityValue);

    // Validação Direta na Tela
    if (!selectedActivity) {
        showError('Por favor, selecione uma atividade agropecuária.');
        return;
    }
    if (quantityValue === '' || isNaN(quantity) || quantity <= 0) {
        showError('Por favor, insira uma quantidade válida e maior que zero.');
        return;
    }

    // Se passar na validação, calcula e exibe
    showResults(selectedActivity, quantity);
});

function showError(msg) {
    errorMessageBox.textContent = msg;
    errorMessageBox.hidden = false;
}

function showResults(activityKey, qty) {
    const data = WATER_DATA[activityKey];
    const totalWater = data.litros * qty;

    // Renderiza dados na tela
    litersResult.textContent = totalWater.toLocaleString('pt-BR') + " Litros";
    cityImpactText.textContent = data.impacto;

    // Renderiza lista de sugestões ESG
    suggestionsList.innerHTML = '';
    data.sugestoes.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        suggestionsList.appendChild(li);
    });

    // Exibe o painel de resultados removendo o hidden
    resultsPanel.hidden = false;
}
// 1. DADOS DE REFERÊNCIA
const WATER_DATA = {
    soja: { litros: 550000, impacto: "Isso equivale ao consumo residencial diário de cerca de 3.500 pessoas na cidade!", sugestoes: ["Adote o Plantio Direto para reter a umidade natural do solo.", "Utilize sensores de manejo de irrigação."] },
    milho: { litros: 600000, impacto: "Essa economia abasteceria uma escola pública urbana por até 2 meses!", sugestoes: ["Sincronize a irrigação com o período crítico.", "Faça rotação de culturas."] },
    bovino: { litros: 110, impacto: "Evita a sobrecarga dos mananciais que abastecem os municípios!", sugestoes: ["Capte água da chuva nos telhados.", "Reutilize a água de lavagem."]
