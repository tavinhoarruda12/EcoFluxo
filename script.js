document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       1. SISTEMA DE ALTERNÂNCIA DE ABAS PRINCIPAIS
       ========================================================================== */
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");
    const falaSenarito = document.getElementById("fala-senarito");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.setAttribute("hidden", "true"));

            button.classList.add("active");
            const targetAbaId = button.getAttribute("data-aba");
            document.getElementById(targetAbaId).removeAttribute("hidden");

            // Senarito interage dinamicamente mudando de aba
            switch(targetAbaId) {
                case "aba-produtor":
                    falaSenarito.innerHTML = "Muito bem! Aqui o produtor insere o manejo rural para verificar os indicadores e dados do <strong>SENAR-PR</strong>.";
                    break;
                case "aba-consumidor":
                    falaSenarito.innerHTML = "Excelente! Na aba urbana calculamos o consumo invisível e o potencial de captação de cisternas.";
                    break;
                case "aba-quiz":
                    falaSenarito.innerHTML = "Hora do teste! Clique nos botões para descobrir o segredo da <strong>Água Virtual</strong> oculta nos objetos.";
                    break;
                case "aba-governanca":
                    falaSenarito.innerHTML = "Critérios ESG importantes! Vamos verificar a regularização das APPs e do Cadastro Ambiental Rural.";
                    break;
                case "aba-hidroponia":
                    falaSenarito.innerHTML = "Tecnologia pura! Veja como a hidroponia revoluciona poupando até 90% da nossa água.";
                    break;
            }
        });
    });

    /* ==========================================================================
       2. SISTEMA DE SUB-ABAS (MANUAL DE HIDROPONIA)
       ========================================================================== */
    const subtabButtons = document.querySelectorAll(".subtab-button");
    const subtabContents = document.querySelectorAll(".subtab-content");

    subtabButtons.forEach(subBtn => {
        subBtn.addEventListener("click", () => {
            subtabButtons.forEach(btn => btn.classList.remove("active"));
            subtabContents.forEach(content => content.setAttribute("hidden", "true"));

            subBtn.classList.add("active");
            const targetSubAbaId = subBtn.getAttribute("data-subaba");
            document.getElementById(targetSubAbaId).removeAttribute("hidden");
        });
    });

    /* ==========================================================================
       3. CALCULADORA DO PRODUTOR RURAL (PEGADA HÍDRICA & ESG)
       ========================================================================== */
    const dadosHidricos = {
        soja: { fator: 5500000, esg: 85, dicas: ["Adote o Plantio Direto para manter a palhada cobrindo e protegendo o solo.", "Utilize monitoramento por sensores para ajustar os pivôs de irrigação."] },
        milho: { fator: 4500000, esg: 75, dicas: ["Faça rotação de culturas para estruturar o perfil físico do solo.", "Siga rigorosamente o zoneamento agrícola de plantio."] },
        cafe: { fator: 6000000, esg: 90, dicas: ["Prefira sistemas de gotejamento localizado subterrâneo ou superficial.", "Pratique a recirculação da água nos tanques de lavagem pós-colheita."] },
        bovino: { fator: 120, esg: 70, dicas: ["Instale calhas nos barracões de ordenha para aproveitamento pluvial.", "Faça reuso de efluentes lavados para processos de fertirrigação."] },
        suino: { fator: 35, esg: 80, dicas: ["Ajuste periodicamente as chupetas de pressão dos bebedouros.", "Direcione os resíduos para biodigestores gerando energia limpa."] }
    };

    const btnCalculate = document.getElementById("btn-calculate");
    btnCalculate.addEventListener("click", () => {
        const atividade = document.getElementById("atividade").value;
        const quantidade = parseFloat(document.getElementById("quantidade").value);
        const resultadosProdutor = document.getElementById("resultados-produtor");

        if (!atividade || isNaN(quantidade) || quantidade <= 0) {
            alert("Preencha a atividade e insira uma quantidade válida!");
            return;
        }

        const info = dadosHidricos[atividade];
        const pegadaTotal = quantidade * info.fator;

        document.getElementById("valor-pegada").textContent = pegadaTotal.toLocaleString("pt-BR");
        resultadosProdutor.removeAttribute("hidden");

        // Atualização da barra ESG e Selo
        const barraEsg = document.getElementById("barra-esg");
        const badge = document.getElementById("esg-badge");
        barraEsg.value = info.esg;
        
        if (info.esg >= 85) badge.textContent = "A+ Sustentável";
        else if (info.esg >= 75) badge.textContent = "B Regulamentado";
        else badge.textContent = "C Atenção";

        // Preenche as sugestões
        const lista = document.getElementById("lista-sugestoes");
        lista.innerHTML = "";
        info.dicas.forEach(dica => {
            const li = document.createElement("li");
            li.textContent = dica;
            lista.appendChild(li);
        });

        falaSenarito.innerHTML = `Cálculo realizado! Essa produção movimentou cerca de <strong>${pegadaTotal.toLocaleString("pt-BR")}</strong> litros d'água no ciclo do ecossistema.`;
    });

    /* ==========================================================================
       4. CALCULADORA DO CONSUMIDOR URBANO & CISTERNAS
       ========================================================================== */
    const btnCalcConsumer = document.getElementById("btn-calc-consumer");
    btnCalcConsumer.addEventListener("click", () => {
        const leite = parseFloat(document.getElementById("leite-consumo").value) || 0;
        const cafe = parseFloat(document.getElementById("cafe-consumo").value) || 0;
        const totalConsumidor = (leite * 200) + (cafe * 130);

        const outConsumer = document.getElementById("resultado-consumidor");
        outConsumer.innerHTML = `Seu consumo semanal desses itens gerou um impacto indireto de <strong>${totalConsumidor.toLocaleString("pt-BR")} litros</strong> monitorados no campo.`;
        outConsumer.removeAttribute("hidden");
    });

    const btnCalcRain = document.getElementById("btn-calc-rain");
    btnCalcRain.addEventListener("click", () => {
        const area = parseFloat(document.getElementById("area-telhado").value);
        if (isNaN(area) || area <= 0) {
            alert("Insira uma área de telhado válida!");
            return;
        }

        // Média pluvial do PR simulada com fator de aproveitamento (0.85)
        const captação = Math.round(area * 1400 * 0.85);
        document.getElementById("valor-chuva").textContent = captação.toLocaleString("pt-BR");
        document.getElementById("resultado-chuva").removeAttribute("hidden");
    });

    /* ==========================================================================
       5. QUIZ DA ÁGUA OCULTA
       ========================================================================== */
    const quizButtons = document.querySelectorAll(".quiz-btn");
    const quizDisplay = document.getElementById("quiz-display");
    const quizText = document.getElementById("quiz-texto-resultado");

    quizButtons.forEach(qBtn => {
        qBtn.addEventListener("click", () => {
            const litros = qBtn.getAttribute("data-litros");
            const item = qBtn.getAttribute("data-item");

            quizText.innerHTML = `Impressionante! São necessários aproximadamente <strong>${parseInt(litros).toLocaleString("pt-BR")} litros</strong> de água limpa para produzir ${item}.`;
            quizDisplay.removeAttribute("hidden");
        });
    });

    /* ==========================================================================
       6. CHECKLIST DE GOVERNANÇA ESG
       ========================================================================== */
    const btnValidarGov = document.getElementById("btn-validar-gov");
    btnValidarGov.addEventListener("click", () => {
        const car = document.getElementById("gov-car").checked;
        const outorga = document.getElementById("gov-outorga").checked;
        const app = document.getElementById("gov-app").checked;
        
        const resGov = document.getElementById("resultado-gov");
        const txtGov = document.getElementById("texto-gov");
        resGov.removeAttribute("hidden");

        if (car && outorga && app) {
            txtGov.innerHTML = "🏆 <strong>Excelente!</strong> Sua propriedade cumpre 100% das obrigações de Governança Hídrica e Ambiental. Certificado de Produtor Guardião Ativo!";
        } else {
            txtGov.innerHTML = "⚠️ <strong>Atenção:</strong> Faltam critérios para atingir a conformidade legal. Busque orientações e cursos de capacitação técnica gratuitos oferecidos pelo <strong>SENAR-PR</strong>.";
        }
    });
});
