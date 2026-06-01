/* ==========================================================================
   1. CONTROLE DE ACESSO E COLOGAÇÃO DO NOME (TELA DE BLOQUEIO)
   ========================================================================== */
let nomeUsuario = "";

const telaBloqueio = document.getElementById("tela-bloqueio");
const conteudoApp = document.getElementById("conteudo-aplicativo");
const inputNome = document.getElementById("nome-usuario");
const btnEntrar = document.getElementById("btn-entrar-app");
const balaoSenaritoTexto = document.querySelector("#balao-senarito p");

btnEntrar.addEventListener("click", () => {
    nomeUsuario = inputNome.value.trim();

    if (nomeUsuario === "") {
        alert("Por favor, digite seu nome para entrar!");
        return;
    }

    // Transição visual para sumir com a tela de bloqueio e liberar o app
    telaBloqueio.classList.add("tela-sumir");
    conteudoApp.classList.remove("app-escondido");
    conteudoApp.classList.add("app-visivel");

    // Senarito dá as boas-vindas personalizadas
    balaoSenaritoTexto.innerHTML = `Olá, <strong>${nomeUsuario}</strong>! Que bom ter você aqui no EcoFluxo. Escolha uma atividade para calcularmos a pegada hídrica!`;
});

/* ==========================================================================
   2. BANCO DE DADOS TÉCNICOS (BASE CIENTÍFICA DO SENAR-PR / FAEP)
   ========================================================================== */
const dadosHidricos = {
    // Agricultura: litros estimados de água por hectare durante o ciclo
    soja: { nome: "Soja", fator: 5500000, unidade: "hectares", esg: 80 },
    milho: { nome: "Milho", fator: 4500000, unidade: "hectares", esg: 75 },
    cafe: { nome: "Café", fator: 6000000, unidade: "hectares", esg: 85 },
    // Pecuária: litros de água consumidos diretamente por animal/lote por dia
    bovino_leite: { nome: "Bovinos de Leite", fator: 120, unidade: "animais", esg: 70 },
    aves: { nome: "Aves de Corte", fator: 400, unidade: "lotes", esg: 90 }, // considerando consumo do lote médio
    suinos: { nome: "Suínos", fator: 35, unidade: "animais", esg: 75 }
};

const recomendacoesESG = {
    soja: [
        "Adote o Sistema de Plantio Direto para manter a palhada no solo e reter até 30% mais umidade.",
        "Monitore o solo com sensores de umidade para irrigar apenas quando necessário.",
        "Preserve as Matas Ciliares nas APPs para proteger as nascentes da sua propriedade."
    ],
    milho: [
        "Faça rotação de culturas para melhorar a estrutura do solo e o aproveitamento da água da chuva.",
        "Utilize sistemas de irrigação por gotejamento se houver necessidade de complementação hídrica.",
        "Consulte os boletins climáticos do IDR-Paraná antes de programar as irrigações."
    ],
    cafe: [
        "Use a irrigação por gotejamento, que reduz o desperdício por evaporação em relação ao canhão.",
        "Mantenha a cobertura vegetal nas entrelinhas para diminuir a erosão e reter água.",
        "Aproveite a lavagem dos grãos fazendo recirculação de água no circuito."
    ],
    bovino_leite: [
        "Instale sistemas de captação de água da chuva nos telhados das salas de ordenha.",
        "Faça o reuso da água de lavagem do piso para a primeira limpeza dos pátios ou fertirrigação.",
        "Monitore vazamentos constantes em boias e bebedouros dos piquetes."
    ],
    aves: [
        "Troque os nipples antigos por modelos modernos que evitam o gotejamento e desperdício na cama de aviário.",
        "Monitore diariamente o hidrômetro para identificar vazamentos ocultos sob o piso.",
        "Otimize o sistema de nebulização controlando por umidade relativa do ar."
    ],
    suinos: [
        "Utilize comedouros do tipo eco-friendly (ração úmida) que reduzem o desperdício de água.",
        "Trate os dejetos utilizando lagoas de estabilização ou biodigestores, gerando biofertilizante e preservando rios.",
        "Regule a pressão das chupetas/bebedouros conforme a idade dos animais."
    ]
};

/* ==========================================================================
   3. LÓGICA DA CALCULADORA PRINCIPAL DE PEGADA HÍDRICA
   ========================================================================== */
const btnCalcular = document.getElementById("btn-calcular");
const sectionResultados = document.getElementById("resultados");
const loadingProcessamento = document.getElementById("loading-processamento");

btnCalcular.addEventListener("click", () => {
    const atividadeSelecionada = document.getElementById("atividade").value;
    const quantidadeInserida = parseFloat(document.getElementById("quantidade").value);

    // Validação
    if (!atividadeSelecionada || isNaN(quantidadeInserida) || quantidadeInserida <= 0) {
        alert("Por favor, preencha todos os campos da calculadora corretamente!");
        return;
    }

    // Exibe animação de Loading (Estilo Agrohackathon)
    loadingProcessamento.hidden = false;
    sectionResultados.hidden = true;

    setTimeout(() => {
        // Esconde o Loading após 1.5 segundos simulados de processamento técnico
        loadingProcessamento.hidden = true;
        sectionResultados.hidden = false;

        // Executa o cálculo científico
        const dadosAtividade = dadosHidricos[atividadeSelecionada];
        const pegadaTotal = quantidadeInserida * dadosAtividade.fator;

        // Atualiza os valores na tela formatted
        document.getElementById("valor-pegada").textContent = pegadaTotal.toLocaleString("pt-BR");

        // Atualiza a Barra de Progresso ESG de forma dinâmica
        const progressEsg = document.getElementById("progresso-esg");
        progressEsg.value = dadosAtividade.esg;

        // Atualiza a lista de recomendações ESG baseada no SENAR-PR
        const listaSugestoes = document.getElementById("lista-sugestoes");
        listaSugestoes.innerHTML = ""; // limpa anteriores

        recomendacoesESG[atividadeSelecionada].forEach(dica => {
            const li = document.createElement("li");
            li.textContent = dica;
            listaSugestoes.appendChild(li);
        });

        // Conexão Campo-Cidade: Tradução do Impacto
        // 1 habitante urbano gasta em média 150 litros de água por dia no Brasil
        const diasAbastecimentoCidade = Math.round(pegadaTotal / 150);
        const textoImpacto = document.getElementById("texto-impacto");
        textoImpacto.innerHTML = `<strong>${nomeUsuario}</strong>, a água gerenciada na sua produção equivale ao consumo diário doméstico de aproximadamente <strong>${diasAbastecimentoCidade.toLocaleString("pt-BR")} moradores da cidade</strong>. Seus cuidados no manejo protegem as bacias que abastecem todo o Paraná!`;

        // Inteligência do Senarito reagindo aos resultados
        balaoSenarito.style.display = "block";
        balaoSenaritoTexto.innerHTML = `Excelente trabalho, <strong>${nomeUsuario}</strong>! Os cálculos para <strong>${dadosAtividade.nome}</strong> foram concluídos. Siga as recomendações técnicas ali embaixo para atingir a nota máxima em sustentabilidade! 🏆`;

        // Rola a tela suavemente para os resultados
        sectionResultados.scrollIntoView({ behavior: "smooth" });

    }, 1500);
});

/* ==========================================================================
   4. LÓGICA DO CALCULADOR DE CHUVA (CISTERNAS)
   ========================================================================== */
const btnCalcularChuva = document.getElementById("btn-calcular-chuva");
const resultadoChuvaDiv = document.getElementById("resultado-chuva");

btnCalcularChuva.addEventListener("click", () => {
    const areaTelhado = parseFloat(document.getElementById("area-telhado").value);

    if (isNaN(areaTelhado) || areaTelhado <= 0) {
        alert("Por favor, digite uma área válida em metros quadrados!");
        return;
    }

    // Fórmula: Área do telhado * Índice Pluviométrico Médio do PR (1400mm) * Eficiência (85%)
    const aguaCaptadaAnual = Math.round(areaTelhado * 1400 * 0.85);

    document.getElementById("valor-chuva").textContent = aguaCaptadaAnual.toLocaleString("pt-BR");
    resultadoChuvaDiv.hidden = false;

    // Senarito comenta o cálculo da chuva
    balaoSenarito.style.display = "block";
    balaoSenaritoTexto.innerHTML = `Olha só, <strong>${nomeUsuario}</strong>! Captando água da chuva você deixa de puxar da fonte e economiza energia elétrica. Investir em cisternas é pura Governança ESG!`;
});

/* ==========================================================================
   5. COMPORTAMENTO VISUAL DO SENARITO (WIDGET FLUTUANTE)
   ========================================================================= */
const btnAvatarSenarito = document.getElementById("btn-senarito-avatar");
const balaoSenarito = document.getElementById("balao-senarito");
const btnFecharBalao = document.getElementById("btn-fechar-balao");
const badgeNotificacao = document.querySelector(".notificacao-badge");

// Fechar balão de fala ao clicar no "X"
btnFecharBalao.addEventListener("click", (e) => {
    e.stopPropagation(); // impede de disparar o clique do avatar
    balaoSenarito.style.display = "none";
});

// Alternar balão ao clicar diretamente no avatar do Senarito
btnAvatarSenarito.addEventListener("click", () => {
    // Esconde a bolinha de notificação vermelha após o primeiro clique
    if (badgeNotificacao) {
        badgeNotificacao.style.display = "none";
    }

    if (balaoSenarito.style.display === "none" || balaoSenarito.style.display === "") {
        balaoSenarito.style.display = "block";
        if (nomeUsuario !== "") {
            balaoSenaritoTexto.innerHTML = `Estou aqui monitorando seus dados, <strong>${nomeUsuario}</strong>! Pode alterar os números da calculadora e processar novamente sempre que quiser ver novas simulações.`;
        }
    } else {
        balaoSenarito.style.display = "none";
    }
});
