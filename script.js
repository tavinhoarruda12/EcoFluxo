document.addEventListener("DOMContentLoaded", () => {
    
    let nomeSalvo = "";

    /* CONTROLE DE ACESSO (TELA DE BLOQUEIO) */
    const btnEntrar = document.getElementById("btn-entrar-app");
    const telaBloqueio = document.getElementById("tela-bloqueio");
    const conteudoApp = document.getElementById("conteudo-aplicativo");
    const falaSenarito = document.getElementById("fala-senarito");

    btnEntrar.addEventListener("click", () => {
        const inputNome = document.getElementById("nome-usuario").value.trim();
        if (inputNome === "") {
            alert("Por favor, digite seu nome antes de prosseguir!");
            return;
        }
        nomeSalvo = inputNome;
        telaBloqueio.setAttribute("hidden", "true");
        conteudoApp.classList.remove("app-escondido");

        falaSenarito.innerHTML = `Olá, <strong>${nomeSalvo}</strong>! Que bom ter você aqui no EcoFluxo. Vamos desenhar uma propriedade rural nota 10?`;
    });

    /* NAVEGAÇÃO ENTRE ABAS PRINCIPAIS */
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.setAttribute("hidden", "true"));

            button.classList.add("active");
            const targetAbaId = button.getAttribute("data-aba");
            document.getElementById(targetAbaId).removeAttribute("hidden");

            // Respostas simuladas de comando de voz do Senarito
            if (nomeSalvo !== "") {
                switch(targetAbaId) {
                    case "aba-produtor":
                        falaSenarito.innerHTML = `Veja, <strong>${nomeSalvo}</strong>! Aqui calculamos a pegada do manejo com equações científicas do SENAR-PR.`;
                        break;
                    case "aba-circular":
                        falaSenarito.innerHTML = `Excelente escolha, <strong>${nomeSalvo}</strong>! Veja como fechar ciclos com biodigestores e permacultura.`;
                        break;
                    case "aba-consumidor":
                        falaSenarito.innerHTML = `Conexão campo-cidade! Veja quanta água o produtor gerencia para abastecer sua rotina urbana, <strong>${nomeSalvo}</strong>.`;
                        break;
                    case "aba-quiz":
                        falaSenarito.innerHTML = `Hora de testar seus conhecimentos sobre Água Oculta, <strong>${nomeSalvo}</strong>!`;
                        break;
                    case "aba-governanca":
                        falaSenarito.innerHTML = `Critérios ESG importantes! Vamos checar o CAR e a regularização das APPs.`;
                        break;
                    case "aba-hidroponia":
                        falaSenarito.innerHTML = `Tecnologia hidropônica! Água circulando limpa economizando até 90%, <strong>${nomeSalvo}</strong>!`;
                        break;
                }
            }
        });
    });

    /* NAVEGAÇÃO DE SUB-ABAS UNIVERSAL */
    const subtabButtons = document.querySelectorAll(".subtab-button");
    const subtabContents = document.querySelectorAll(".subtab-content");

    subtabButtons.forEach(subBtn => {
        subBtn.addEventListener("click", () => {
            // Descobre o container pai para isolar a troca de sub-abas daquela seção específica
            const containerPai = subBtn.closest(".tab-content");
            const botoesIrmãos = containerPai.querySelectorAll(".subtab-button");
            const conteudosIrmãos = containerPai.querySelectorAll(".subtab-content");

            botoesIrmãos.forEach(btn => btn.classList.remove("active"));
            conteudosIrmãos.forEach(content => content.setAttribute("hidden", "true"));

            subBtn.classList.add("active");
            const targetSubAbaId = subBtn.getAttribute("data-subaba");
            document.getElementById(targetSubAbaId).removeAttribute("hidden");
        });
    });

    /* CALCULADORA DO PRODUTOR (BASE DE DADOS) */
    const dadosHidricos = {
        soja: { fator: 5500000, esg: 85, dicas: ["Adote o Sistema de Plantio Direto para manter a umidade residual no solo.", "Instale sensores de umidade para evitar irrigações desnecessárias."] },
        milho: { fator: 4500000, esg: 75, dicas: ["Realize rotação de culturas para estruturar biologicamente o perfil da terra.", "Consulte o zoneamento pluvial do Paraná antes de semear."] },
        cafe: { fator: 6000000, esg: 90, dicas: ["Utilize mangueiras de gotejamento subterrâneas para mitigar a evapotranspiração.", "Promova a recirculação interna d'água no lavador de café."] },
        bovino: { fator: 120, esg: 70, dicas: ["Colete água pluvial das calhas da sala de ordenha para lavagem posterior de pisos.", "Use dejetos animais curtidos em processos estruturados de fertirrigação."] },
        suino: { fator: 35, esg: 80, dicas: ["Regule periodicamente as chupetas de pressão dos bebedouros das baias.", "Direcione resíduos densos a biodigestores acoplados para geração energética."] }
    };

    const btnCalculate = document.getElementById("btn-calculate");
    btnCalculate.addEventListener("click", () => {
        const atividade = document.getElementById("atividade").value;
        const quantidade = parseFloat(document.getElementById("quantidade").value);
        const resultadosProdutor = document.getElementById("resultados-produtor");

        if (!atividade || isNaN(quantidade) || quantidade <= 0) {
            alert("Insira os parâmetros corretamente!");
            return;
        }

        const info = dadosHidricos[atividade];
        const pegadaTotal = quantidade * info.fator;

        document.getElementById("valor-pegada").textContent = pegadaTotal.toLocaleString("pt-BR");
        resultadosProdutor.removeAttribute("hidden");

        const barraEsg = document.getElementById("barra-esg");
        const badge = document.getElementById("esg-badge");
        barraEsg.value = info.esg;
        
        if (info.esg >= 85) badge.textContent = "Selo A+ Certificado";
        else if (info.esg >= 75) badge.textContent = "Selo B Regular";
        else badge.textContent = "Selo C Alerta";

        const lista = document.getElementById("lista-sugestoes");
        lista.innerHTML = "";
        info.dicas.forEach(dica => {
            const li = document.createElement("li");
            li.textContent = dica;
            lista.appendChild(li);
        });
    });

    /* CALCULADORA DO CONSUMIDOR & CHUVA */
    const btnCalcConsumer = document.getElementById("btn-calc-consumer");
    btnCalcConsumer.addEventListener("click", () => {
        const leite = parseFloat(document.getElementById("leite-consumo").value) || 0;
        const cafe = parseFloat(document.getElementById("cafe-consumo").value) || 0;
        const totalUrbano = (leite * 200) + (cafe * 130);

        const outConsumer = document.getElementById("resultado-consumidor");
        outConsumer.innerHTML = `Prezado(a) <strong>${nomeSalvo}</strong>, para suprir essa rotina alimentar semanal, foram alocados indiretamente no campo cerca de <strong>${totalUrbano.toLocaleString("pt-BR")} litros</strong> de água virtual.`;
        outConsumer.removeAttribute("hidden");
    });

    const btnCalcRain = document.getElementById("btn-calc-rain");
    btnCalcRain.addEventListener("click", () => {
        const area = parseFloat(document.getElementById("area-telhado").value);
        if (isNaN(area) || area <= 0) {
            alert("Insira uma área válida!");
            return;
        }
        // Fórmula: Área * Índice Pluv. PR médio (1400mm) * Eficiência Cisterna (85%)
        const volumeCaptado = Math.round(area * 1400 * 0.85);
        document.getElementById("valor-chuva").textContent = volumeCaptado.toLocaleString("pt-BR");
        document.getElementById("resultado-chuva").removeAttribute("hidden");
    });

    /* QUIZ DA ÁGUA OCULTA */
    const quizButtons = document.querySelectorAll(".quiz-btn");
    const quizDisplay = document.getElementById("quiz-display");
    const quizText = document.getElementById("quiz-texto-resultado");

    quizButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const litros = btn.getAttribute("data-litros");
            const item = btn.getAttribute("data-item");
            quizText.innerHTML = `Incrível! Estima-se o uso de até <strong>${parseInt(litros).toLocaleString("pt-BR")} litros</strong> de água integrada para consolidar ${item}.`;
            quizDisplay.removeAttribute("hidden");
        });
    });

    /* CHECKLIST GOVERNANÇA ESG */
    const btnValidarGov = document.getElementById("btn-validar-gov");
    btnValidarGov.addEventListener("click", () => {
        const car = document.getElementById("gov-car").checked;
        const outorga = document.getElementById("gov-outorga").checked;
        const app = document.getElementById("gov-app").checked;
        const resGov = document.getElementById("resultado-gov");
        const txtGov = document.getElementById("texto-gov");

        resGov.removeAttribute("hidden");

        if (car && outorga && app) {
            txtGov.innerHTML = `🏆 <strong>Parabéns, ${nomeSalvo}!</strong> Sua propriedade atende a todos os regulamentos de Governança Hídrica e Ambiental. Selo Produtor Guardião Ativado!`;
        } else {
            txtGov.innerHTML = `⚠️ <strong>Faltam requisitos regulatórios:</strong> É essencial alinhar a documentação legal da fazenda. Busque capacitações gratuitas focadas em sustentabilidade no <strong>SENAR-PR</strong>.`;
        }
    });
});
