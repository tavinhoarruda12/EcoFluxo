document.addEventListener("DOMContentLoaded", function() {

    // --- ELEMENTOS DE AUTENTICAÇÃO ---
    const telaBloqueio = document.getElementById("tela-bloqueio");
    const conteudoApp = document.getElementById("conteudo-aplicativo");
    const inputNome = document.getElementById("nome-usuario");
    const btnEntrar = document.getElementById("btn-entrar-app");
    const falaSenarito = document.getElementById("fala-senarito");

    let nomeUsuarioGlobal = "Produtor";

    btnEntrar.addEventListener("click", function() {
        const nome = inputNome.value.trim();
        if (nome === "") {
            alert("Por favor, digite seu nome ou alcunha para acessar o ecossistema!");
            return;
        }
        nomeUsuarioGlobal = nome;
        telaBloqueio.style.display = "none";
        conteudoApp.classList.remove("app-escondido");
        conteudoApp.style.display = "block";
        
        falaSenarito.innerHTML = `Olá, <strong>${nomeUsuarioGlobal}</strong>! Que bom ter você aqui no EcoFluxo. Vamos transformar a sustentabilidade em resultados reais?`;
    });

    // --- GERENCIADOR DE ABAS PRINCIPAIS ---
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", function() {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.hidden = true);

            this.classList.add("active");
            const targetAbaId = this.getAttribute("data-aba");
            const targetAba = document.getElementById(targetAbaId);
            if (targetAba) {
                targetAba.hidden = false;
            }

            atualizarMascote(targetAbaId);
        });
    });

    function atualizarMascote(abaId) {
        switch (abaId) {
            case "aba-produtor":
                falaSenarito.innerHTML = `<strong>${nomeUsuarioGlobal}</strong>, use esta calculadora técnica para monitorar os litros consumidos na produção primária.`;
                break;
            case "aba-circular":
                falaSenarito.innerHTML = `🔄 Incrível! Aqui você descobre como fechar os ciclos de resíduos e energia na fazenda. Design inteligente!`;
                break;
            case "aba-consumidor":
                falaSenarito.innerHTML = `🏙️ Sabia que a cidade depende umbilicalmente do campo? Avalie sua pegada e o potencial pluvial de captação.`;
                break;
            case "aba-quiz":
                falaSenarito.innerHTML = `💡 Desafio aceito! Clique nos botões para desmascarar a quantidade de água oculta em itens comuns.`;
                break;
            case "aba-governanca":
                falaSenarito.innerHTML = `📜 A conformidade legal protege a sua marca rural. Faça o checklist baseado nas regras do IAT e do Código Florestal.`;
                break;
            case "aba-hidroponia":
                falaSenarito.innerHTML = `🌱 Hidroponia representa o futuro da máxima eficiência hídrica! Veja as técnicas recomendadas pelo SENAR-PR.`;
                break;
            default:
                falaSenarito.innerHTML = `Olá, vamos continuar construindo soluções sustentáveis juntos?`;
        }
    }

    // --- GERENCIADOR DE SUB-ABAS INSULADAS ---
    function configurarSubAbas() {
        const subButtons = document.querySelectorAll(".subtab-button");
        subButtons.forEach(button => {
            button.addEventListener("click", function() {
                const parentNav = this.parentElement;
                const irmaosButtons = parentNav.querySelectorAll(".subtab-button");
                irmaosButtons.forEach(btn => btn.classList.remove("active"));

                const subtabContainer = parentNav.nextElementSibling;
                const blocosConteudo = subtabContainer.querySelectorAll(".subtab-content");
                blocosConteudo.forEach(bloco => bloco.hidden = true);

                this.classList.add("active");
                const targetId = this.getAttribute("data-subaba") || this.textContent.trim().toLowerCase().replace(/[^a-z0-9]/g, "-");
                
                let targetElement = document.getElementById(targetId);
                if (!targetElement) {
                    const index = Array.from(irmaosButtons).indexOf(this);
                    targetElement = blocosConteudo[index];
                }
                
                if (targetElement) {
                    targetElement.hidden = false;
                }
            });
        });
    }
    configurarSubAbas();

    // --- ABA 1: CÁLCULO DA PEGADA DO PRODUTOR RURAL (Com Selo C Alerta ativo) ---
    const btnCalculate = document.getElementById("btn-calculate");
    const resultadosProdutor = document.getElementById("resultados-produtor");
    const valorPegada = document.getElementById("valor-pegada");
    const esgBadge = document.getElementById("esg-badge");
    const barraEsg = document.getElementById("barra-esg");
    const listaSugestoes = document.getElementById("lista-sugestoes");

    if (btnCalculate) {
        btnCalculate.addEventListener("click", function() {
            const atividade = document.getElementById("atividade").value;
            const quantidade = parseFloat(document.getElementById("quantidade").value);

            if (!atividade || isNaN(quantidade) || quantidade <= 0) {
                alert("Por favor, selecione uma atividade válida e preencha a quantidade positiva.");
                return;
            }

            let litrosPorUnidade = 0;
            let sitemasDica = [];

            switch (atividade) {
                case "soja":
                    litrosPorUnidade = 1800;
                    sitemasDica = [
                        "Adote o Plantio Direto na Palha para reduzir a evapotranspiração do solo.",
                        "Monitore previsões climáticas via SIMEPAR antes de realizar manejos de pulverização.",
                        "Instale terraços agrícolas para evitar enxurradas e perda de solo superficial."
                    ];
                    break;
                case "milho":
                    litrosPorUnidade = 1200;
                    sitemasDica = [
                        "Faça rotação de culturas com braquiária para melhorar a porosidade do perfil de terra.",
                        "Evite tráfego desnecessário de maquinário pesado para mitigar a compactação."
                    ];
                    break;
                case "cafe":
                    litrosPorUnidade = 2500;
                    sitemasDica = [
                        "Utilize sistemas de microaspersão ou gotejamento programado se houver necessidade de irrigação.",
                        "Adote o sombreamento parcial com árvores nativas para conservar microclima úmido."
                    ];
                    break;
                case "bovino":
                    litrosPorUnidade = 15000;
                    sitemasDica = [
                        "Proteja os bebedouros da radiação solar direta para evitar evaporação drástica.",
                        "Trabalhe com pastejo rotacionado (Voisin) para otimizar o vigor da pastagem e infiltração."
                    ];
                    break;
                case "suino":
                    litrosPorUnidade = 4500;
                    sitemasDica = [
                        "Lave as baias utilizando bicos de alta pressão e vazão reduzida.",
                        "Canalize 100% dos dejetos para lagoas de biodigestão visando reciclagem de biofertilizantes."
                    ];
                    break;
            }

            const totalPegada = litrosPorUnidade * quantidade;
            valorPegada.textContent = totalPegada.toLocaleString("pt-BR");
            
            // Lógica ajustada dos Selos conforme o volume gerado
            if (totalPegada > 500000) {
                esgBadge.textContent = "Selo C Alerta ⚠️";
                barraEsg.value = 35;
            } else if (totalPegada > 150000) {
                esgBadge.textContent = "Selo B Regular 👍";
                barraEsg.value = 65;
            } else {
                esgBadge.textContent = "Selo A Ouro Sustentável 🏅";
                barraEsg.value = 95;
            }

            listaSugestoes.innerHTML = "";
            sitemasDica.forEach(sug => {
                const li = document.createElement("li");
                li.textContent = sug;
                listaSugestoes.appendChild(li);
            });

            resultadosProdutor.hidden = false;
        });
    }

    // --- ABA 3: CALCULADORA DO CONSUMIDOR E CAPTAÇÃO DE CHUVA ---
    const btnCalcConsumer = document.getElementById("btn-calc-consumer");
    const resultadoConsumidor = document.getElementById("resultado-consumidor");

    if (btnCalcConsumer) {
        btnCalcConsumer.addEventListener("click", function() {
            const leite = parseInt(document.getElementById("leite-consumo").value) || 0;
            const cafe = parseInt(document.getElementById("cafe-consumo").value) || 0;

            const pegadaOculta = (leite * 200) + (cafe * 130);
            resultadoConsumidor.innerHTML = `Consumo Semanal Analisado: Esse hábito alimentar exige aproximadamente <strong>${pegadaOculta.toLocaleString("pt-BR")} litros</strong> de água virtual semanalmente de forma invisível.`;
            resultadoConsumidor.hidden = false;
        });
    }

    const btnCalcRain = document.getElementById("btn-calc-rain");
    const resultadoChuva = document.getElementById("resultado-chuva");
    const valorChuva = document.getElementById("valor-chuva");

    if (btnCalcRain) {
        btnCalcRain.addEventListener("click", function() {
            const area = parseFloat(document.getElementById("area-telhado").value);
            if (isNaN(area) || area <= 0) {
                alert("Insira uma área válida em metros quadrados.");
                return;
            }

            const volumeAnual = Math.round(area * 1400 * 0.85);
            valorChuva.textContent = volumeAnual.toLocaleString("pt-BR");
            resultadoChuva.hidden = false;
        });
    }

    // --- ABA 4: INTERATIVIDADE DO QUIZ DA ÁGUA ---
    const quizButtons = document.querySelectorAll(".quiz-btn");
    const quizDisplay = document.getElementById("quiz-display");
    const quizTextoResultado = document.getElementById("quiz-texto-resultado");

    quizButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            const litros = this.getAttribute("data-litros");
            const itemNome = this.getAttribute("data-item");
            
            quizTextoResultado.innerHTML = `Para produzir <strong>${itemNome}</strong>, são consumidos impressionantes <span style='color:#e63946; font-size:1.3rem; font-weight:bold;'>${parseInt(litros).toLocaleString("pt-BR")} litros</span> de água virtual ao longo de toda a sua cadeia de fabricação e insumos!`;
            quizDisplay.hidden = false;
            quizDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });

    // --- ABA 5: AUDITORIA E VALIDAÇÃO DE GOVERNANÇA ESG ---
    const btnValidarGov = document.getElementById("btn-validar-gov");
    const resultadoGov = document.getElementById("resultado-gov");
    const textoGov = document.getElementById("texto-gov");

    if (btnValidarGov) {
        btnValidarGov.addEventListener("click", function() {
            const car = document.getElementById("gov-car").checked;
            const outorga = document.getElementById("gov-outorga").checked;
            const app = document.getElementById("gov-app").checked;
            const reserva = document.getElementById("gov-reserva").checked;

            let marcados = 0;
            if (car) marcados++;
            if (outorga) marcados++;
            if (app) marcados++;
            if (reserva) marcados++;

            resultadoGov.hidden = false;

            if (marcados === 4) {
                textoGov.style.color = "var(--color-success)";
                textoGov.innerHTML = `🏅 EXCELÊNCIA ESG CONSTATADA! Sua propriedade atende integralmente os critérios da Lei Estadual nº 12.726/1999 e do Código Florestal Brasileiro. Está apta para solicitar Certificação de Produto Sustentável e as melhores taxas do Plano Safra Verde!`;
            } else if (marcados >= 2) {
                textoGov.style.color = "var(--color-secondary)";
                textoGov.innerHTML = `⚠️ ATENÇÃO REQUERIDA (${marcados}/4): Você já possui pilares fundamentais, mas a falta de alguns documentos (como Outorga do IAT ou regularização de APP) pode gerar restrições. Busque o escritório local do SENAR-PR para orientações gratuitas!`;
            } else {
                textoGov.style.color = "var(--color-accent)";
                textoGov.innerHTML = `🚨 ALERTA CRÍTICO DE CONFORMIDADE: Menos da metade dos critérios de governança hídrica e ambiental foram preenchidos. É urgente iniciar um plano de manejo corretivo e georreferenciamento para evitar sanções.`;
            }
            
            resultadoGov.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

});
