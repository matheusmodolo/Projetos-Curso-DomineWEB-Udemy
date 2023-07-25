
var largura = 0;
var altura = 0;

function ajustaTamanhoPalcoJogo() {
	largura = window.innerWidth;
	altura = window.innerHeight;

	console.log(largura, altura);
}

ajustaTamanhoPalcoJogo();

function posicaoRandomica() {
	var posicaoX = Math.floor(Math.random() * largura) - 50;
	posicaoX = posicaoX < 0 ? 0 : posicaoX;

	var posicaoY = Math.floor(Math.random() * altura) - 50;
	posicaoY = posicaoY < 0 ? 0 : posicaoY;

	var alvo = document.createElement("img");
	alvo.src = "imagens/alvo.png";
	alvo.className = "alvo1";
	alvo.style.left = posicaoX + "px";
	alvo.style.top = posicaoY + "px";
	alvo.style.position = "absolute";

	document.body.appendChild(alvo);
}

