/* ==========================================================================
   1. DICIONÁRIO DE DADOS (Base Científica)
   ========================================================================== */
const WATER_DATA = {
    soja: {
        nome: "Soja",
        litros: 550000,
        sugestoes: [
            "Adote o Plantio Direto para reter a humidade do solo.",
            "Monitore a necessidade real do solo antes de ligar os pivôs."
        ],
        impactoUrbano: "A água poupada em 1 hectare de soja eficiente abastece 3.500 pessoas na cidade por um dia!"
    },
    milho: {
        nome: "Milho",
        litros: 600000,
        sugestoes: [
            "Sincronize a irrigação com o regime de chuvas locais.",
            "Faça irrigação noturna para evitar evaporação acelerada pelo sol."
        ],
        impactoUrbano: "O manejo inteligente no milho poupa o equivalente a uma escola pública urbana inteira por 2 meses."
    },
    bovino: {
        nome: "Bovinos de Leite",
        litros: 110,
        sugestoes: [
            "Instale calhas para captar água da chuva nos telhados dos estábulos.",
            "Reutilize a água de lavagem das salas de ordenha para limpar os pátios."
        ],
        impactoUrbano: "A reutilização de água na pecuária protege os mananciais que abastecem os bairros da cidade."
    },
    suino: {
        nome: "Suínos",
        litros: 35,
        sugestoes: [
            "Ajuste a altura das chupetas de água dos animais para evitar desperdício.",
            "Faça a raspagem a seco dos dejetos antes de usar as mangueiras de pressão."
        ],
        impactoUrbano: "Evitar perdas na suinocultura garante rios urbanos mais limpos e volumosos."
    }
};

/* ==========================================================================
   2. SISTEMA DE NAVEGAÇÃO POR ABAS (TABS)
   ========================================================================== */
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe ativa de todos os botões
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Oculta todas as secções
        tabContents.forEach(content => {
            content.hidden = true;
            content.classList.remove('active-content');
        });

        // Ativa o botão clicado
        button.classList.add('active');
        
        // Mostra a secção correspondente
        const targetId = button.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        targetContent.hidden = false;
        targetContent.classList.add('active-content');
    });
});

/* ==========================================================================
   3. LÓGICA DA CALCULADORA E CORREÇÃO DE EXIBIÇÃO
   ========================================================================== */
const form = document.querySelector('#water-form');
const activitySelect = document.querySelector('#activity-select');
const quantityInput = document.querySelector('#quantity-input');
const btnCalculate = document.querySelector('#btn-calculate');

const errorMessageBox = document.querySelector('#error-message-box');
const resultsPanel = document.querySelector('#results-panel');
const litersResult = document.querySelector('#liters-result');
const suggestionsList = document.querySelector('#suggestions-list');
const cityImpactText = document.querySelector('#city-impact-text');

btnCalculate.addEventListener('click', () => {
    // Reset de estados e esconde o painel para processar o novo clique
    errorMessageBox.hidden = true;
    errorMessageBox.textContent = '';
    resultsPanel.hidden = true;

    const selectedActivity = activitySelect.value;
    const quantityValue = quantityInput.value.trim();
    const quantity = Number(quantityValue);

    // Validação Estrita diretamente na tela
    if (!selectedActivity) {
        showError('Por favor, selecione uma atividade antes de calcular.');
        return;
    }
    if (quantityValue === '' || isNaN(quantity)) {
        showError('O campo de quantidade não pode ficar vazio.');
        return;
    }
    if (quantity <= 0) {
        showError('A quantidade deve ser um número maior que zero.');
        return;
    }

    // Se passar na validação, executa o cálculo e EXIBE o painel
    exibirResultados(selectedActivity, quantity);
});

function showError(message) {
    errorMessageBox.textContent =
