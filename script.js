// ==========================================
// NOMES ALEATÓRIOS
// ==========================================

const nomes = [

  "Gabriel",
  "Ana",
  "Lucas",
  "Mariana",
  "Pedro",
  "Julia",
  "Rafael",
  "Beatriz"

];


// ==========================================
// AFIRMAÇÕES ALEATÓRIAS
// ==========================================

const afirmacoes = [

  "No futuro, as escolhas de cada pessoa podem transformar o mundo.",

  "Em 2049, novas tecnologias poderão fazer parte da nossa rotina.",

  "O futuro depende das decisões que tomamos no presente.",

  "Pequenas atitudes podem gerar grandes mudanças.",

  "A tecnologia pode ser uma grande aliada para construir um futuro melhor."

];


// ==========================================
// PERGUNTAS
// ==========================================

const perguntas = [

  {

    pergunta:
      "Qual atitude ajuda a construir um futuro mais sustentável?",

    alternativas: [

      "Desperdiçar água e energia",

      "Reciclar e reduzir o desperdício",

      "Aumentar a poluição",

      "Desmatar sem planejamento"

    ],

    correta: 1

  },


  {

    pergunta:
      "Qual tecnologia pode ajudar na produção de energia limpa?",

    alternativas: [

      "Painéis solares",

      "Queima de lixo a céu aberto",

      "Desperdício de combustíveis",

      "Aumento da fumaça"

    ],

    correta: 0

  },


  {

    pergunta:
      "Por que devemos pensar no futuro?",

    alternativas: [

      "Porque nossas ações de hoje têm consequências",

      "Porque o futuro não depende de ninguém",

      "Porque não precisamos cuidar do planeta",

      "Porque a tecnologia resolve tudo sozinha"

    ],

    correta: 0

  },


  {

    pergunta:
      "Qual destas atitudes contribui para o uso consciente dos recursos naturais?",

    alternativas: [

      "Deixar torneiras abertas",

      "Desperdiçar alimentos",

      "Economizar água e energia",

      "Jogar lixo nos rios"

    ],

    correta: 2

  },


  {

    pergunta:
      "Como a tecnologia pode contribuir para um futuro melhor?",

    alternativas: [

      "Criando soluções para problemas da sociedade",

      "Aumentando todos os tipos de poluição",

      "Incentivando o desperdício",

      "Impedindo novas ideias"

    ],

    correta: 0

  }

];


// ==========================================
// CAPTURANDO ELEMENTOS DO HTML
// ==========================================

const telaInicial =
  document.querySelector("#tela-inicial");


const telaJogo =
  document.querySelector("#tela-jogo");


const telaFinal =
  document.querySelector("#tela-final");


const btnIniciar =
  document.querySelector("#btn-iniciar");


const btnProxima =
  document.querySelector("#btn-proxima");


const btnJogarNovamente =
  document.querySelector("#btn-jogar-novamente");


const afirmacao =
  document.querySelector("#afirmacao");


const pergunta =
  document.querySelector("#pergunta");


const alternativas =
  document.querySelector("#alternativas");


const mensagem =
  document.querySelector("#mensagem");


const contador =
  document.querySelector("#contador");


const pontuacao =
  document.querySelector("#pontuacao");


const barraProgresso =
  document.querySelector("#barra-progresso");


const resultadoTexto =
  document.querySelector("#resultado-texto");


const resultadoPontos =
  document.querySelector("#resultado-pontos");


// ==========================================
// VARIÁVEIS DO JOGO
// ==========================================

let perguntaAtual = 0;

let pontos = 0;

let nomeAtual = "";


// ==========================================
// NÚMERO ALEATÓRIO
// Math.random() + Math.floor()
// ==========================================

function numeroAleatorio(maximo) {

  return Math.floor(
    Math.random() * maximo
  );

}


// ==========================================
// ESCOLHER NOME
// ==========================================

function escolherNome() {

  return nomes[
    numeroAleatorio(nomes.length)
  ];

}


// ==========================================
// ESCOLHER AFIRMAÇÃO
// ==========================================

function escolherAfirmacao() {

  return afirmacoes[
    numeroAleatorio(
      afirmacoes.length
    )
  ];

}


// ==========================================
// TROCAR DE TELA
// ==========================================

function mostrarTela(tela) {

  telaInicial.classList.remove("ativa");

  telaJogo.classList.remove("ativa");

  telaFinal.classList.remove("ativa");


  tela.classList.add("ativa");

}


// ==========================================
// INICIAR JOGO
// ==========================================

function iniciarJogo() {

  perguntaAtual = 0;

  pontos = 0;

  nomeAtual = escolherNome();


  mostrarTela(telaJogo);


  carregarPergunta();

}


// ==========================================
// CARREGAR PERGUNTA
// ==========================================

function carregarPergunta() {

  const atual =
    perguntas[perguntaAtual];


  // Contador

  contador.textContent =
    `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;


  // Pontuação

  pontuacao.textContent =
    `Pontos: ${pontos}`;


  // Barra de progresso

  barraProgresso.style.width =
    `${((perguntaAtual + 1) / perguntas.length) * 100}%`;


  // Afirmação aleatória

  afirmacao.textContent =
    escolherAfirmacao();


  // Pergunta

  pergunta.textContent =
    atual.pergunta;


  // Limpa alternativas anteriores

  alternativas.innerHTML = "";


  // Limpa mensagem

  mensagem.textContent = "";


  // Esconde botão próxima

  btnProxima.hidden = true;


  // Criando alternativas

  atual.alternativas.forEach(
    (texto, indice) => {

      const botao =
        document.createElement("button");


      botao.className =
        "alternativa";


      botao.textContent =
        texto;


      botao.addEventListener(
        "click",
        () => responder(indice)
      );


      alternativas.appendChild(
        botao
      );

    }
  );

}


// ==========================================
// RESPONDER
// ==========================================

function responder(indiceEscolhido) {

  const atual =
    perguntas[perguntaAtual];


  const botoes =
    document.querySelectorAll(
      ".alternativa"
    );


  // Desabilita todos os botões

  botoes.forEach(
    botao => {

      botao.disabled = true;

    }
  );


  // Marca a resposta correta

  botoes[
    atual.correta
  ].classList.add("correta");


  // Verifica resposta

  if (
    indiceEscolhido === atual.correta
  ) {

    pontos++;


    mensagem.textContent =
      "✅ Resposta correta!";

  }

  else {

    botoes[
      indiceEscolhido
    ].classList.add("errada");


    mensagem.textContent =
      "❌ Resposta incorreta. A alternativa correta foi destacada.";

  }


  // Atualiza pontuação

  pontuacao.textContent =
    `Pontos: ${pontos}`;


  // Mostra botão próxima

  btnProxima.hidden = false;

}


// ==========================================
// PRÓXIMA PERGUNTA
// ==========================================

function proximaPergunta() {

  perguntaAtual++;


  if (
    perguntaAtual < perguntas.length
  ) {

    carregarPergunta();

  }

  else {

    finalizarJogo();

  }

}


// ==========================================
// FINALIZAR JOGO
// ==========================================

function finalizarJogo() {

  mostrarTela(telaFinal);


  resultadoPontos.textContent =
    `${pontos}/${perguntas.length}`;


  if (
    pontos === perguntas.length
  ) {

    resultadoTexto.textContent =
      `${nomeAtual}, você acertou todas! Você está preparado para a missão de 2049.`;

  }


  else if (
    pontos >= 3
  ) {

    resultadoTexto.textContent =
      `${nomeAtual}, você foi muito bem! Continue aprendendo para construir um futuro melhor.`;

  }


  else {

    resultadoTexto.textContent =
      `${nomeAtual}, a missão terminou! Tente novamente para melhorar sua pontuação.`;

  }

}


// ==========================================
// EVENTOS DOS BOTÕES
// ==========================================

btnIniciar.addEventListener(
  "click",
  iniciarJogo
);


btnProxima.addEventListener(
  "click",
  proximaPergunta
);


btnJogarNovamente.addEventListener(
  "click",
  iniciarJogo
);