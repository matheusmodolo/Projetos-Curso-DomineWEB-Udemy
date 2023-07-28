var largura = 0;
var altura = 0;
var vida = 1;
var tempo = 10;
var criaAlvoTempo = 0;

var nivel = window.location.search;
nivel = nivel.replace("?", "");
console.log(nivel);

switch (nivel) {
	case "facil":
		criaAlvoTempo = 1500;
		break;
	case "medio":
		criaAlvoTempo = 1000;
		break;
	case "dificil":
		criaAlvoTempo = 750;
		break;
	default:
		break;
}

var cronometro = setInterval(function () {

	if (tempo < 0) {
		clearInterval(cronometro);
		clearInterval(criaAlvo);

		window.location.href = "vitoria.html";

	} else {
		document.getElementById("cronometro").innerHTML = tempo;
	}

	tempo -= 1;

}, 1000);

function ajustaTamanhoPalcoJogo() {
	largura = window.innerWidth;
	altura = window.innerHeight;

}

ajustaTamanhoPalcoJogo();

function posicaoRandomica() {

	//remover o alvo anterior (caso exista)
	if (document.getElementById("alvo")) {
		document.getElementById("alvo").remove();

		if (vida > 3) {
			window.location.href = "fim_de_jogo.html";
		}
		document.getElementById("v" + vida).src = "imagens/coracao_vazio.png";

		vida++;
	}

	var alvo = document.createElement("img");
	alvo.src = "imagens/alvo.png";
	alvo.className = tamanhoAleatorio();

	document.body.appendChild(alvo);

	//impede de que a imagem ultrapasse os limites de largura da tela
	var posicaoX = Math.floor(Math.random() * largura) - larguraCSS(alvo);
	posicaoX = posicaoX < 0 ? 0 : posicaoX;

	//impede de que a imagem ultrapasse os limites de altura da tela
	var posicaoY = Math.floor(Math.random() * altura) - alturaCSS(alvo);
	posicaoY = posicaoY < 0 ? 0 : posicaoY;

	alvo.style.left = posicaoX + "px";
	alvo.style.top = posicaoY + "px";
	alvo.style.position = "absolute";
	alvo.id = "alvo";

	alvo.onclick = function () {
		this.remove();
	};

}

//retorna a largura do elemento no CSS
function larguraCSS(elemento) {
	var largura = document.defaultView.getComputedStyle(elemento).getPropertyValue("width");
	//retorna o valor em string: "VALORpx"
	var tamanho = largura.length;
	//remove o "px" da string
	largura = largura.substring(0, tamanho - 2);

	return parseInt(largura);
}

//retorna a altura do elemento no CSS
function alturaCSS(elemento) {
	var altura = document.defaultView.getComputedStyle(elemento).getPropertyValue("height");
	//retorna o valor em string: "VALORpx"
	var tamanho = altura.length;
	//remove o "px" da string
	altura = altura.substring(0, tamanho - 2);
	return parseInt(altura);
}

function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3);

	switch (classe) {
		case 0:
			return "alvo1";
		case 1:
			return "alvo2";
		case 2:
			return "alvo3";
	}
}