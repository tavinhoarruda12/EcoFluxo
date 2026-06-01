// 1. DICIONÁRIO DE DADOS (Base de Pesquisa SENAR-PR)
const WATER_DATA = {
    soja: {
        litros: 550000,
        sugestoes: [
            "Adote o Sistema de Plantio Direto para manter a palhada sobre o solo, diminuindo drasticamente a evaporação da água da chuva.",
            "Faça o manejo com sensores de umidade do solo para saber exatamente o momento e a quantidade certa de irrigar."
        ],
        impacto: "Uma boa gestão hídrica em 1 hectare de soja poupa o volume equivalente ao consumo residencial diário de cerca de 3.500 pessoas na cidade!"
    },
    milho: {
        litros: 600000,
        sugestoes: [
            "Planeje as datas de plantio em conformidade com o Zoneamento Agrícola de Risco Climático (ZARC).",
            "Proteja o solo realizando rotação de culturas para estruturar melhor as raízes e a capacidade de infiltração da água."
        ],
        impacto: "A água poupada com tecnologia e monitoramento no milho é suficiente para abastecer uma escola pública urbana por até 2 meses!"
    },
    bovino: {
        litros: 110,
        sugestoes: [
            "Instale calhas para captação de água pluvial nos telhados da pista de alimentação e sala de ordenha.",
            "Efetue a reutilização da água de lavagem das instalações (através de decantação) para fertirrigação ou limpeza pesada de pátios."
        ],
        impacto: "Ao diminuir a captação direta, o pecuarista preserva os lençóis freáticos e garante a estabilidade dos reservatórios que abastecem as cidades vizinhas!"
    },
    suino: {
        litros: 35,
        sugestoes: [
            "Regule a altura e a pressão das chupetas dos bebedouros regularmente para evitar que os animais desperdecem água.",
            "Realize a raspagem a seco dos dejetos das baias antes de iniciar a lavagem com as mangueiras de pressão."
        ],
        impacto: "A produção de suínos eficiente protege os mananciais integrados, mantendo as bacias hidrográficas limpas e seguras para toda a sociedade."
    }
};

// 2. AGUARDAR O CARREGAMENTO DO DOCUMENTO
document.addEventListener('DOMContentLoaded', () => {

    // Seleção dos Componentes de Navegação
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Seleção da Calculadora
    const activitySelect = document.querySelector('#activity-select');
    const quantityInput = document.querySelector('#quantity-input');
    const btnCalculate = document.querySelector('#btn-calculate');
    const errorMessageBox = document.querySelector('#error-message-box');
    const resultsPanel = document.querySelector('#results-panel');
    const litersResult = document.querySelector('#liters-result');
    const suggestionsList = document.querySelector('#suggestions-list');
    const cityImpactText = document.querySelector('#city-impact-text');

    // Verificação de Segurança: Garante que todos os elementos básicos existem na tela
    const elementsOk = activitySelect && quantityInput && errorMessageBox && resultsPanel && litersResult && suggestionsList && cityImpactText;

    // ==========================================
    // SISTEMA DE NAVEGAÇÃO ENTRE ABAS
    // ==========================================
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.hidden = true);
            
            button.classList.add('active');
            
            const targetId = button.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.hidden = false;
            }
        });
    });

    // ==========================================
    // LÓGICA DE PROCESSAMENTO DO BOTÃO
    // ==========================================
    if (btnCalculate && elementsOk) {
        btnCalculate.addEventListener('click', () => {
            // Limpa mensagens e esconde painel anterior
            errorMessageBox.hidden = true;
            errorMessageBox.textContent = '';
            resultsPanel.hidden = true;

            const selectedActivity = activitySelect.value;
            const quantityValue = quantityInput.value.trim();
            const quantity = Number(quantityValue);

            // VALIDAÇÃO ESTRITA DIRETAMENTE NA TELA (UX Segura)
            if (!selectedActivity) {
                showError('Por favor, selecione uma atividade agropecuária válida.');
                return;
            }

            if (quantityValue === '' || isNaN(quantity)) {
                showError('O campo de quantidade não pode ficar em branco. Digite um número.');
                return;
            }

            if (quantity <= 0) {
                showError('Quantidade inválida! Insira um número maior do que zero.');
                return;
            }

            // SE PASSAR: Executa a Renderização dos Dados
            const data = WATER_DATA[selectedActivity];
            const totalWater = data.litros * quantity;

            // Injeta os valores processados na tela
            litersResult.textContent = totalWater.toLocaleString('pt-BR') + " Litros";
            cityImpactText.textContent = data.impacto;

            // Gera a lista de sugestões ESG dinamicamente
            suggestionsList.innerHTML = '';
            data.sugestoes.forEach(sugestao => {
                const li = document.createElement('li');
                li.textContent = sugestao;
                suggestionsList.appendChild(li);
            });

            // Torna o painel visível para o usuário
            resultsPanel.hidden = false;
        });
    } else {
        console.warn("EcoFluxo: Elementos da calculadora não foram totalmente encontrados no HTML desta página.");
    }

    // Função interna para exibir alertas de erro amigáveis na interface
    function showError(message) {
        if (errorMessageBox) {
            errorMessageBox.textContent = message;
            errorMessageBox.hidden = false;
        }
    }
});
