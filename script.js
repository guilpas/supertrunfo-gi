var baralhoJogador;
var baralhoMaquina;
var carta1;
var carta2;

function comecarPartida() {
  //nova variavel para manter o baralho
  baralhoJogador = baralho;
  //o tipo de jogo curto/medio/longo determina a quantidade de cartas
  var quantidade = obtemTipo();
  baralhoJogador = embaralhar(baralhoJogador);
  baralhoMaquina = baralhoJogador.slice(0, quantidade);
  baralhoJogador = baralhoJogador.slice(quantidade, quantidade * 2);
  document.querySelector("#inicial").style.display = "none";
  document.querySelector("#regras").style.display = "none";
  document.querySelector("#partida").style.display = "block";
  pegarCartas();
}

function pegarCartas() {
  document.querySelector("#tabuleiroVs").innerHTML = "";
  carta1 = baralhoJogador.shift();
  carta2 = baralhoMaquina.shift();
  mostrarCartas(false); //mostra apenas as suas
  if (carta1.supertrunfo == 1 || carta2.supertrunfo == 1) {
    resolverJogada("supertrunfo");
  }
}

function testeFimDeJogo() {
  var texto = "";
  if (baralhoMaquina.length > 0 && baralhoJogador.length > 0) {
    texto += "<button onclick='pegarCartas()'> Próximas cartas</button>";
  } else if (baralhoMaquina.length == 0) {
    texto +=
      "<h2>Fim de jogo. Parabéns você ganhou!</h2><button onclick='comecarPartida()'> Começar novamente</button>";
  } else {
    texto +=
      "<h2>Fim de jogo. Você perdeu.</h2><button onclick='comecarPartida()'> Tentar outra vez</button>";
  }
  document.querySelector("#tabuleiroVs").innerHTML += texto;
}

function resolverJogada(atributo) {
  var texto;
  var v1;
  var v2;

  if (atributo == "supertrunfo") {
    v1 = carta1.supertrunfo;
    v2 = carta2.supertrunfo;
    texto = "<h2>PAIMON</h2>";
    texto += `<h2> ${carta1.codigo} VS ${carta2.codigo} </h2>`;
  } else {
    v1 = carta1.atributos[atributo];
    v2 = carta2.atributos[atributo];
    texto = `<h2>${atributo.toUpperCase()}</h2>`;
    texto += `<h2> ${v1} VS ${v2} </h2>`;
  }

  mostrarCartas(true); //mostra do oponente
  desativaBotoes();
  var cartas = embaralhar([carta1, carta2]);

  if (v1 > v2) {
    texto += "<h2>Você venceu</h2>";
    baralhoJogador.push(cartas.pop());
    baralhoJogador.push(cartas.pop());
  } else if (v1 < v2) {
    texto += "<h2>Você perdeu</h2>";
    baralhoMaquina.push(cartas.pop());
    baralhoMaquina.push(cartas.pop());
  } else {
    texto += "<h2>Empatou</h2>";
    baralhoMaquina.push(carta2);
    baralhoJogador.push(carta1);
  }
  document.querySelector("#tabuleiroVs").innerHTML = texto;
  testeFimDeJogo();
}

function mostrarCartas(mostraOponente) {
  var novoTabuleiroJogador;
  var novoTabuleiroMaquina;
  if (mostraOponente == false) {
    novoTabuleiroJogador = novoTabuleiro(
      "Jogador",
      baralhoJogador,
      carta1,
      true
    );
    document.querySelector(
      "#tabuleiroJogador"
    ).innerHTML = novoTabuleiroJogador;
    novoTabuleiroMaquina =
      `<p>Máquina</p><p>Cartas: ${baralhoMaquina.length + 1}</p>` +
      "<img id='imgVerso' src='img/carta-fundo.jpg'>";
  } else {
    novoTabuleiroMaquina = novoTabuleiro(
      "Máquina",
      baralhoMaquina,
      carta2,
      false
    );
  }

  document.querySelector("#tabuleiroMaquina").innerHTML = novoTabuleiroMaquina;
}

function novoTabuleiro(nome, pbaralho, carta, ativo) {
  var elementoNovoTabuleiro =
    `<p>${nome}</p><p>Cartas: ${pbaralho.length + 1}</p>` +
    `<div class='cartaJogador ${carta.elemento} ${carta.estrelas} '>` +
    `<h2>${carta.nome}</h2>` +
    `<img src=${carta.imagem}>` +
    cBotaos(carta, ativo) +
    `<span class='spCodigo'>${carta.codigo}</span></div>`;
  return elementoNovoTabuleiro;
}

function desativaBotoes() {
  var botoes = document.querySelectorAll(".escolhaAtributos");
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].disabled = true;
  }
}

function cBotaos(carta, clicks) {
  var texto = "";
  for (var prop in carta.atributos) {
    texto += '<button class="escolhaAtributos"';
    if (clicks) {
      texto += ` onclick="resolverJogada('${prop}')"`;
    }
    texto += ">" + prop + ":" + carta.atributos[prop] + "</button>";
  }
  return texto;
}

function mostrarRegras() {
  var regras = document.querySelector("#regras");
  if (regras.style.display === "none") {
    regras.style.display = "block";
  } else {
    regras.style.display = "none";
  }
}

function voltarTelaInicial() {
  document.querySelector("#inicial").style.display = "block";
  document.querySelector("#regras").style.display = "block";
  document.querySelector("#partida").style.display = "none";
}

function obtemTipo() {
  var tipos = document.getElementsByName("tipoJogo");
  for (var i = 0; i < tipos.length; i++) {
    if (tipos[i].checked) {
      return tipos[i].value;
    }
  }
}

function embaralhar(cartas) {
  cartas = cartas.sort(() => Math.random() - 0.5);
  return cartas;
}

var baralho = [];
var end = "img/portraits/portrait-";
var cartaAmber = {
  nome: "Amber",
  imagem: end + "amber.jpg",
  elemento: "pyro",
  estrelas: "4s",
  atributos: {
    hp: 6233,
    atk: 147,
    def: 396
  },
  supertrunfo: 0,
  codigo: "1B"
};
baralho.push(cartaAmber);

var cartaBennet = {
  nome: "Bennett",
  imagem: end + "bennett.jpg",
  elemento: "pyro",
  estrelas: "4s",
  atributos: {
    hp: 8168,
    atk: 126,
    def: 508
  },
  supertrunfo: 0,
  codigo: "1C"
};
baralho.push(cartaBennet);

var cartaDiluc = {
  nome: "Diluc",
  imagem: end + "diluc.jpg",
  elemento: "pyro",
  estrelas: "5s",
  atributos: {
    hp: 8421,
    atk: 217,
    def: 509
  },
  supertrunfo: 0,
  codigo: "1D"
};
baralho.push(cartaDiluc);

var cartaKlee = {
  nome: "Klee",
  imagem: end + "klee.jpg",
  elemento: "pyro",
  estrelas: "5s",
  atributos: {
    hp: 6673,
    atk: 202,
    def: 399
  },
  supertrunfo: 0,
  codigo: "1E"
};
baralho.push(cartaKlee);

var cartaXiangling = {
  nome: "Xiangling",
  imagem: end + "xiangling.jpg",
  elemento: "pyro",
  estrelas: "4s",
  atributos: {
    hp: 7164,
    atk: 148,
    def: 441
  },
  supertrunfo: 0,
  codigo: "1F"
};
baralho.push(cartaXiangling);

var cartaXinyan = {
  nome: "Xinyan",
  imagem: end + "xinyan.jpg",
  elemento: "pyro",
  estrelas: "4s",
  atributos: {
    hp: 7379,
    atk: 164,
    def: 526
  },
  supertrunfo: 0,
  codigo: "1G"
};
baralho.push(cartaXinyan);

var cartaHutao = {
  nome: "Hu tao",
  imagem: end + "hutao.jpg",
  elemento: "pyro",
  estrelas: "5s",
  atributos: {
    hp: 10089,
    atk: 69,
    def: 568
  },
  supertrunfo: 0,
  codigo: "1H"
};
baralho.push(cartaHutao);

var cartaYanfei = {
  nome: "Yanfei",
  imagem: end + "yanfei.jpg",
  elemento: "pyro",
  estrelas: "4s",
  atributos: {
    hp: 6161,
    atk: 158,
    def: 387
  },
  supertrunfo: 0,
  codigo: "1I"
};
baralho.push(cartaYanfei);

var cartaYoimiya = {
  nome: "Yoimiya",
  imagem: end + "yoimiya.jpg",
  elemento: "pyro",
  estrelas: "5s",
  atributos: {
    hp: 6593,
    atk: 209,
    def: 399
  },
  supertrunfo: 0,
  codigo: "1J"
};
baralho.push(cartaYoimiya);

var cartaBarbara = {
  nome: "Barbara",
  imagem: end + "barbara.jpg",
  elemento: "hydro",
  estrelas: "4s",
  atributos: {
    hp: 6448,
    atk: 105,
    def: 441
  },
  supertrunfo: 0,
  codigo: "2B"
};
baralho.push(cartaBarbara);

var cartaMona = {
  nome: "Mona",
  imagem: end + "mona.jpg",
  elemento: "hydro",
  estrelas: "5s",
  atributos: {
    hp: 6752,
    atk: 186,
    def: 424
  },
  supertrunfo: 0,
  codigo: "2C"
};
baralho.push(cartaMona);

var cartaXingqiu = {
  nome: "Xingqiu",
  imagem: end + "xingqiu.jpg",
  elemento: "hydro",
  estrelas: "4s",
  atributos: {
    hp: 6735,
    atk: 133,
    def: 499
  },
  supertrunfo: 0,
  codigo: "2D"
};
baralho.push(cartaXingqiu);

var cartaTartaglia = {
  nome: "Tartaglia",
  imagem: end + "tartaglia.jpg",
  elemento: "hydro",
  estrelas: "5s",
  atributos: {
    hp: 8500,
    atk: 195,
    def: 528
  },
  supertrunfo: 0,
  codigo: "2E"
};
baralho.push(cartaTartaglia);

var cartaRaiden = {
  nome: "Raiden Ei",
  imagem: end + "raiden.jpg",
  elemento: "electro",
  estrelas: "5s",
  atributos: {
    hp: 8373,
    atk: 219,
    def: 512
  },
  supertrunfo: 2,
  codigo: "3A"
};
baralho.push(cartaRaiden);

var cartaBeidou = {
  nome: "Beidou",
  imagem: end + "beidou.jpg",
  elemento: "electro",
  estrelas: "4s",
  atributos: {
    hp: 8597,
    atk: 148,
    def: 427
  },
  supertrunfo: 0,
  codigo: "3B"
};
baralho.push(cartaBeidou);

var cartaFischl = {
  nome: "Fischl",
  imagem: end + "fischl.jpg",
  elemento: "electro",
  estrelas: "4s",
  atributos: {
    hp: 6054,
    atk: 161,
    def: 391
  },
  supertrunfo: 0,
  codigo: "3C"
};
baralho.push(cartaFischl);

var cartaKeqing = {
  nome: "Keqing",
  imagem: end + "keqing.jpg",
  elemento: "electro",
  estrelas: "5s",
  atributos: {
    hp: 8500,
    atk: 209,
    def: 519
  },
  supertrunfo: 0,
  codigo: "3D"
};
baralho.push(cartaKeqing);

var cartaLisa = {
  nome: "Lisa",
  imagem: end + "lisa.jpg",
  elemento: "electro",
  estrelas: "4s",
  atributos: {
    hp: 6305,
    atk: 153,
    def: 378
  },
  supertrunfo: 0,
  codigo: "3E"
};
baralho.push(cartaLisa);

var cartaRazor = {
  nome: "Razor",
  imagem: end + "razor.jpg",
  elemento: "electro",
  estrelas: "4s",
  atributos: {
    hp: 7881,
    atk: 154,
    def: 495
  },
  supertrunfo: 0,
  codigo: "3F"
};
baralho.push(cartaRazor);

var cartaKujou = {
  nome: "Kujou Sara",
  imagem: end + "kujou.jpg",
  elemento: "electro",
  estrelas: "4s",
  atributos: {
    hp: 6305,
    atk: 129,
    def: 414
  },
  supertrunfo: 0,
  codigo: "3G"
};
baralho.push(cartaKujou);

var cartaChong = {
  nome: "Chongyun",
  imagem: end + "chongyun.jpg",
  elemento: "cryo",
  estrelas: "4s",
  atributos: {
    hp: 7236,
    atk: 147,
    def: 427
  },
  supertrunfo: 0,
  codigo: "4B"
};
baralho.push(cartaChong);

var cartaKaeya = {
  nome: "Kaeya",
  imagem: end + "kaeya.jpg",
  elemento: "cryo",
  estrelas: "4s",
  atributos: {
    hp: 7666,
    atk: 147,
    def: 522
  },
  supertrunfo: 0,
  codigo: "4C"
};
baralho.push(cartaKaeya);

var cartaQiqi = {
  nome: "Qiqi",
  imagem: end + "qiqi.jpg",
  elemento: "cryo",
  estrelas: "5s",
  atributos: {
    hp: 8023,
    atk: 186,
    def: 598
  },
  supertrunfo: 0,
  codigo: "4D"
};
baralho.push(cartaQiqi);

var cartaDiona = {
  nome: "Diona",
  imagem: end + "diona.jpg",
  elemento: "cryo",
  estrelas: "4s",
  atributos: {
    hp: 6305,
    atk: 140,
    def: 396
  },
  supertrunfo: 0,
  codigo: "4E"
};
baralho.push(cartaDiona);

var cartaGanyu = {
  nome: "Ganyu",
  imagem: end + "ganyu.jpg",
  elemento: "cryo",
  estrelas: "5s",
  atributos: {
    hp: 6355,
    atk: 217,
    def: 409
  },
  supertrunfo: 0,
  codigo: "4F"
};
baralho.push(cartaGanyu);

var cartaRosaria = {
  nome: "Rosaria",
  imagem: end + "rosaria.jpg",
  elemento: "cryo",
  estrelas: "4s",
  atributos: {
    hp: 8096,
    atk: 158,
    def: 468
  },
  supertrunfo: 0,
  codigo: "4G"
};
baralho.push(cartaRosaria);

var cartaAyaka = {
  nome: "Ayaka",
  imagem: end + "ayaka.jpg",
  elemento: "cryo",
  estrelas: "5s",
  atributos: {
    hp: 8341,
    atk: 222,
    def: 509
  },
  supertrunfo: 0,
  codigo: "4H"
};
baralho.push(cartaAyaka);

var cartaEula = {
  nome: "Eula",
  imagem: end + "eula.jpg",
  elemento: "cryo",
  estrelas: "5s",
  atributos: {
    hp: 8579,
    atk: 222,
    def: 487
  },
  supertrunfo: 0,
  codigo: "4I"
};
baralho.push(cartaEula);

var cartaAloy = {
  nome: "Aloy",
  imagem: end + "aloy.jpg",
  elemento: "cryo",
  estrelas: "5s",
  atributos: {
    hp: 7070,
    atk: 152,
    def: 439
  },
  supertrunfo: 0,
  codigo: "4J"
};
baralho.push(cartaAloy);

var cartaVenti = {
  nome: "Venti",
  imagem: end + "venti.jpg",
  elemento: "anemo",
  estrelas: "5s",
  atributos: {
    hp: 6832,
    atk: 171,
    def: 434
  },
  supertrunfo: 2,
  codigo: "5A"
};
baralho.push(cartaVenti);

var cartaJean = {
  nome: "Jean",
  imagem: end + "jean.jpg",
  elemento: "anemo",
  estrelas: "5s",
  atributos: {
    hp: 9533,
    atk: 155,
    def: 499
  },
  supertrunfo: 0,
  codigo: "5B"
};
baralho.push(cartaJean);

var cartaSucrose = {
  nome: "Sucrose",
  imagem: end + "sucrose.jpg",
  elemento: "anemo",
  estrelas: "4s",
  atributos: {
    hp: 6090,
    atk: 112,
    def: 463
  },
  supertrunfo: 0,
  codigo: "5C"
};
baralho.push(cartaSucrose);

var cartaXiao = {
  nome: "Xiao",
  imagem: end + "xiao.jpg",
  elemento: "anemo",
  estrelas: "5s",
  atributos: {
    hp: 8262,
    atk: 227,
    def: 519
  },
  supertrunfo: 0,
  codigo: "5D"
};
baralho.push(cartaXiao);

var cartaKazuha = {
  nome: "Kazuha",
  imagem: end + "kazuha.jpg",
  elemento: "anemo",
  estrelas: "5s",
  atributos: {
    hp: 8659,
    atk: 192,
    def: 523
  },
  supertrunfo: 0,
  codigo: "5E"
};
baralho.push(cartaKazuha);

var cartaSayu = {
  nome: "Sayu",
  imagem: end + "sayu.jpg",
  elemento: "anemo",
  estrelas: "4s",
  atributos: {
    hp: 7809,
    atk: 161,
    def: 491
  },
  supertrunfo: 0,
  codigo: "5F"
};
baralho.push(cartaSayu);

var cartaZhongli = {
  nome: "Zhongli",
  imagem: end + "zhongli.jpg",
  elemento: "geo",
  estrelas: "5s",
  atributos: {
    hp: 9533,
    atk: 163,
    def: 479
  },
  supertrunfo: 2,
  codigo: "6A"
};
baralho.push(cartaZhongli);

var cartaNingguang = {
  nome: "Ningguang",
  imagem: end + "ningguang.jpg",
  elemento: "geo",
  estrelas: "4s",
  atributos: {
    hp: 6448,
    atk: 140,
    def: 378
  },
  supertrunfo: 0,
  codigo: "6B"
};
baralho.push(cartaNingguang);

var cartaNoelle = {
  nome: "Noelle",
  imagem: end + "noelle.jpg",
  elemento: "geo",
  estrelas: "4s",
  atributos: {
    hp: 7953,
    atk: 126,
    def: 526
  },
  supertrunfo: 0,
  codigo: "6C"
};
baralho.push(cartaNoelle);

var cartaAlbedo = {
  nome: "Albedo",
  imagem: end + "albedo.jpg",
  elemento: "geo",
  estrelas: "5s",
  atributos: {
    hp: 8579,
    atk: 163,
    def: 568
  },
  supertrunfo: 0,
  codigo: "6D"
};
baralho.push(cartaAlbedo);

var cartaPaimon = {
  nome: "Paimon",
  imagem: end + "paimon.jpg",
  elemento: "neutro",
  estrelas: "0s",
  atributos: {
    hp: 0,
    atk: 0,
    def: 0
  },
  supertrunfo: 1,
  codigo: "0Z"
};
baralho.push(cartaPaimon);

var cartaAether = {
  nome: "Aether",
  imagem: end + "traveler-m.jpg",
  elemento: "neutro",
  estrelas: "5s",
  atributos: {
    hp: 7164,
    atk: 140,
    def: 450
  },
  supertrunfo: 2,
  codigo: "0A"
};
baralho.push(cartaAether);

var cartaLumine = {
  nome: "Lumine",
  imagem: end + "traveler-f.jpg",
  elemento: "neutro",
  estrelas: "5s",
  atributos: {
    hp: 7164,
    atk: 140,
    def: 450
  },
  supertrunfo: 2,
  codigo: "0A"
};
baralho.push(cartaLumine);