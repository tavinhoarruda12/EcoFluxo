document.addEventListener("DOMContentLoaded", function() {

    // --- ELEMENTOS DE AUTENTICAÇÃO ---
    const telaBloqueio = document.getElementById("tela-bloqueio");
    const conteudoApp = document.getElementById("conteudo-aplicativo");
    const inputNome = document.getElementById("nome-usuario");
    const btnEntrar = document.getElementById("btn-entrar-app");
    const falaSenarito = document.getElementById("fala-senarito");

    let nomeUsuarioGlobal = "Produtor";

    if (btnEntrar) {
        btnEntrar.addEventListener("click", function() {
            const nome = inputNome.value.trim();
            if (nome === "") {
                alert("Por favor, digite seu nome para acessar o aplicativo!");
                return;
            }
            nomeUsuarioGlobal = nome;
            telaBloqueio.style.display = "none";
            conteudoApp.classList.remove("app-escondido");
            conteudoApp.style.display = "block";
            
            falaSenarito.innerHTML = `Olá, <strong>${nomeUsuarioGlobal}</strong>! Bem-vindo ao EcoFluxo. Use as abas para navegar pelas ferramentas!`;
        });
    }

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
                falaSenarito.innerHTML = `<strong>${nomeUsuarioGlobal}</strong>, preencha os dados abaixo para rodar a auditoria técnica de pegada hídrica.`;
                break;
            case "aba-circular":
                falaSenarito.innerHTML = `🔄 Descubra como reutilizar 100% dos insumos e energia disponíveis na propriedade rural.`;
                break;
            case "aba-consumidor":
                falaSenarito.innerHTML = `🏙️ Monitore os gastos virtuais invisíveis das suas compras semanais urbanas.`;
                break;
            case "aba-game":
                falaSenarito.innerHTML = `🎮 <strong>Mini-game Ecológico:</strong> Regule a irrigação ideal para a sua colheita dar lucro!`;
                break;
            case "aba-governanca":
                falaSenarito.innerHTML = `📜 Verifique sua conformidade com as leis ambientais paranaenses e o IAT.`;
                break;
            case "aba-hidroponia":
                falaSenarito.innerHTML = `🌱 Veja os parâmetros de pH e oxigenação exigidos pelas diretrizes do SENAR-PR.`;
                break;
        }
    }

    // --- GERENCIADOR DE SUB-ABAS (Agroecologia e Hidroponia) ---
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
                const targetId = this.getAttribute("data-subaba");
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.hidden = false;
                }
            });
        });
    }
    configurarSubAbas();

    // --- ABA 1: PRODUTOR RURAL ---
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
                alert("Selecione uma atividade e digite um valor maior que zero.");
                return;
            }

            let litrosPorUnidade = 0;
            let dicas = [];

            switch (atividade) {
                case "soja":
                    litrosPorUnidade = 1800;
                    dicas = ["Adote Plantio Direto na Palha.", "Construa terraços contra enxurradas hídricas."];
                    break;
                case "milho":
                    litrosPorUnidade = 1200;
                    dicas = ["Implemente rotação integrada com braquiária."];
                    break;
                case "cafe":
                    litrosPorUnidade = 2500;
                    dicas = ["Migre para irrigação por microaspersão direcionada."];
                    break;
                case "bovino":
                    litrosPorUnidade = 15000;
                    dicas = ["Adote pastejo rotacionado e proteja bebedouros do sol."];
                    break;
                case "suino":
                    litrosPorUnidade = 4500;
                    dicas = ["Lave baias com bicos de alta pressão.", "Direcione dejetos para biodigestores."];
                    break;
            }

            const totalPegada = litrosPorUnidade * quantidade;
            valorPegada.textContent = totalPegada.toLocaleString("pt-BR");
            
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
            dicas.forEach(dica => {
                const li = document.createElement("li");
                li.textContent = dica;
                listaSugestoes.appendChild(li);
            });

            resultadosProdutor.hidden = false;
        });
    }

    // --- ABA 4: LÓGICA DO MINI-GAME DE IRRIGAÇÃO (Nova!) ---
    const sliderAgua = document.getElementById("slider-agua");
    const txtPorcentagem = document.getElementById("txt-porcentagem");
    const btnAbrirTorneira = document.getElementById("btn-abrir-torneira");
    const gameResultados = document.getElementById("game-resultados");
    
    const hortaVisual = document.getElementById("horta-visual");
    const hortaEmoji = document.getElementById("horta-emoji");
    const hortaEfeitoChuva = document.getElementById("horta-efeito-chuva");

    const gameStatusSolo = document.getElementById("game-status-solo");
    const gameDiasMolhada = document.getElementById("game-dias-molhada");
    const gameFinanceiro = document.getElementById("game-financeiro");
    const gameFeedbackTexto = document.getElementById("game-feedback-texto");

    if (sliderAgua && txtPorcentagem) {
        sliderAgua.addEventListener("input", function() {
            txtPorcentagem.textContent = `${this.value}%`;
        });
    }

    if (btnAbrirTorneira) {
        btnAbrirTorneira.addEventListener("click", function() {
            const volume = parseInt(sliderAgua.value);
            
            // Ativar visual da animação de chuva
            hortaEfeitoChuva.className = "chuva-animada";
            
            // Variáveis do cálculo
            let status = "";
            let dias = 0;
            let financeiro = "";
            let feedback = "";

            // Lógica do jogo (Seco, Ideal ou Encharcado)
            if (volume < 40) {
                status = "Seca Extrema 🍂";
                dias = Math.round(volume / 10);
                financeiro = "Prejuízo: - R$ 1.500";
                feedback = "A horta secou! Sem água virtual suficiente, as plantas murcharam e você perdeu a colheita do período.";
                
                hortaVisual.className = "horta-status status-seco";
                hortaEmoji.textContent = "🍂";
            } 
            else if (volume >= 40 && volume <= 70) {
                status = "Manejo Ideal! 🟢";
                dias = Math.round(volume / 5); // Fica úmida de forma saudável
                financeiro = "Lucro: + R$ 3.000 🏅";
                feedback = "Excelente! Equilíbrio hídrico perfeito recomendado pelas cartilhas do SENAR-PR. Solo úmido na medida certa.";
                
                hortaVisual.className = "horta-status status-ideal";
                hortaEmoji.textContent = "🥦";
            } 
            else {
                status = "Encharcado! ⚠️";
                dias = Math.round(volume / 3); // Fica alagada por muito tempo
                financeiro = "Prejuízo Total: - R$ 2.200";
                feedback = "O solo virou um lamaçal! As raízes apodreceram por falta de oxigênio e o fertilizante escorreu com a enxurrada.";
                
                hortaVisual.className = "horta-status status-encharcado";
                hortaEmoji.textContent = "🥀";
            }

            // Exibir as saídas nas telas/abas do relatório
            gameStatusSolo.textContent = status;
            gameDiasMolhada.textContent = `${dias} dias seguidos`;
            gameFinanceiro.textContent = financeiro;
            gameFeedbackTexto.innerHTML = `<strong>Análise Técnica:</strong> ${feedback}`;

            // Exibe o painel de resultados do game
            gameResultados.hidden = false;
        });
    }

    // --- ABA 3: CONSUMIDOR E CAPTAÇÃO ---
    const btnCalcConsumer = document.getElementById("btn-calc-consumer");
    const resultadoConsumidor = document.getElementById("resultado-consumidor");

    if (btnCalcConsumer) {
        btnCalcConsumer.addEventListener("click", function() {
            const leite = parseInt(document.getElementById("leite-consumo").value) || 0;
            const cafe = parseInt(document.getElementById("cafe-consumo").value) || 0;
            const total = (leite * 200) + (cafe * 130);
            
            resultadoConsumidor.innerHTML = `Seu impacto semanal estimado é de: <strong>${total.toLocaleString("pt-BR")} litros</strong> de água oculta.`;
            resultadoConsumidor.hidden = false;
        });
    }

    const btnCalcRain = document.getElementById("btn-calc-rain");
    const resultadoChuva = document.getElementById("resultado-chuva");
    const valorChuva = document.getElementById("valor-chuva");

    if (btnCalcRain) {
        btnCalcRain.addEventListener("click", function() {
            const area = parseFloat(document.getElementById("area-telhado").value);
            if (!isNaN(area) && area > 0) {
                const vol = Math.round(area * 1400 * 0.85);
                valorChuva.textContent = vol.toLocaleString("pt-BR");
                resultadoChuva.hidden = false;
            }
        });
    }

    // --- ABA 5: GOVERNANÇA ESG ---
    const btnValidarGov = document.getElementById("btn-validar-gov");
    const resultadoGov = document.getElementById("resultado-gov");
    const textoGov = document.getElementById("texto-gov");

    if (btnValidarGov) {
        btnValidarGov.addEventListener("click", function() {
            const car = document.getElementById("gov-car").checked;
            const outorga = document.getElementById("gov-outorga").checked;
            const app = document.getElementById("gov-app").checked;

            let marcados = (car ? 1 : 0) + (outorga ? 1 : 0) + (app ? 1 : 0);
            resultadoGov.hidden = false;

            if (marcados === 3) {
                textoGov.style.color = "var(--color-success)";
                textoGov.textContent = "🏅 100% de Conformidade Ecológica com as normas do Paraná e diretrizes ESG!";
            } else {
                textoGov.style.color = "var(--color-accent)";
                textoGov.textContent = "⚠️ Atenção! Há pendências regulatórias. Regularize junto ao IAT para evitar sanções rurais.";
            }
        });
    }
});
