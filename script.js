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
      "<img id='imgVerso' src='https://i.imgur.com/JdMskvM.jpg'>";
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
var end = "https://static.wikia.nocookie.net/gensin-impact/images/";
var cartaAmber = {
  nome: "Amber",
  imagem: end + "2/26/Character_Amber_Card.jpg",
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
  nome: "Bennet",
  imagem: end + "7/7f/Character_Bennett_Card.jpg",
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
  imagem: end + "4/45/Character_Diluc_Card.jpg",
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
  imagem: end + "7/78/Character_Klee_Card.jpg",
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
  imagem: end + "f/f1/Character_Xiangling_Card.jpg",
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
  imagem: end + "4/4c/Character_Xinyan_Card.jpeg",
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
  imagem: end + "2/22/Character_Hu_Tao_Card.jpg",
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
  imagem: end + "f/f3/Character_Yanfei_Card.png",
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
  imagem: end + "4/4b/Character_Yoimiya_Card.png",
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
  imagem: end + "9/93/Character_Barbara_Card.jpg",
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
  imagem: end + "6/69/Character_Mona_Card.jpg",
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
  imagem: end + "c/c2/Character_Xingqiu_Card.jpg",
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
  imagem: end + "4/4c/Character_Tartaglia_Card.png",
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
  imagem: end + "a/a4/Character_Raiden_Shogun_Card.jpg",
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
  imagem: end + "8/84/Character_Beidou_Card.jpg",
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
  imagem: end + "4/48/Character_Fischl_Card.jpg",
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
  imagem: end + "f/f4/Character_Keqing_Card.jpg",
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
  imagem: end + "d/dc/Character_Lisa_Card.jpg",
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
  imagem: end + "6/68/Character_Razor_Card.jpg",
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
  imagem: end + "7/70/Character_Kujou_Sara_Card.jpg",
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
  imagem: end + "f/fa/Character_Chongyun_Card.jpg",
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
  imagem: end + "6/64/Character_Kaeya_Card.jpg",
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
  imagem: end + "b/b9/Character_Qiqi_Card.jpg",
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
  imagem: end + "0/08/Character_Diona_Card.png",
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
  imagem: end + "8/8d/Character_Ganyu_Card.png",
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
  imagem: end + "6/6d/Character_Rosaria_Card.png",
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
  imagem: end + "3/34/Character_Kamisato_Ayaka_Card.png",
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
  imagem: end + "a/ac/Character_Eula_Card.png",
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
  imagem: end + "c/cb/Character_Aloy_Card.png",
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
  imagem: end + "7/76/Character_Venti_Card.jpg",
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
  imagem: end + "0/0e/Character_Jean_Card.jpg",
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
  imagem: end + "2/22/Character_Sucrose_Card.jpg",
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
  imagem: end + "8/88/Character_Xiao_Card.jpg",
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
  imagem: end + "2/2d/Character_Kaedehara_Kazuha_Card.png",
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
  imagem: end + "8/83/Character_Sayu_Card.png",
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
  imagem: end + "7/79/Character_Zhongli_Card.png",
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
  imagem: end + "3/3e/Character_Ningguang_Card.jpg",
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
  imagem: end + "9/92/Character_Noelle_Card.jpg",
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
  imagem: end + "f/f8/Character_Albedo_Card.png",
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
  imagem: "https://wallpaperaccess.com/full/5918327.jpg",
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
  imagem: end + "1/1c/Traveler_Male_Card.jpg",
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
  imagem: end + "c/c8/Traveler_Female_Card.jpg",
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