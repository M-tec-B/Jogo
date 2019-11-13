var carta_virando = new Audio("Sound/Som_Carta.wav");
	var carta_certa = new Audio("Sound/Som_Certo.mp3");
	var tentativa = 10;
	var pontuacao = 0;
	const cards = document.querySelectorAll('.memory');
	let foiClicado  = false;
	let bloquea = false;
	let primeiro,segundo;
	function flipcard(){
		carta_virando.play();
		if(bloquea){
			return;	
		} 
		if(this === primeiro){
			return;
		}
		this.classList.add('flip');

		if(!foiClicado){
			foiClicado = true;
			primeiro = this;
			return;
		}
		foiClicado = false;

		segundo = this;
		chequando();
	}

	function chequando(){	
		let certo=primeiro.dataset.framework === segundo.dataset.framework;
		certo ?  desativa(): naoDesativa();	
		if(tentativa ==0 ){
			setTimeout(() =>{
				alert("Que pena você não conseguio\n mas pelo menos tentou e é isso que vale :) ");
				window.location.reload();
			}, 500);
		}
	}

	function desativa() { 
		document.getElementById("pontuacao").innerHTML= ++pontuacao;
		setTimeout(() =>{
			carta_certa.play();
		}, 500);


		if(pontuacao == 6 && tentativa == 1){
			alert("Parabens você ganhou na ultima tentativa :)");
			window.location.reload();
		}
		teste();
		primeiro.removeEventListener('click', flipcard);
		segundo.removeEventListener('click', flipcard);
		reseta();

	}
	function naoDesativa(){
		document.getElementById("tentativa").innerHTML=--tentativa;
		bloquea = true;
		setTimeout(() =>{
			primeiro.classList.remove('flip');
			segundo.classList.remove('flip');
			bloquea =false;
		}, 1000);
	}
	function reseta(){
		[foiClicado,bloquea] =[false,false];
	}
	(function aleatorio(){
		cards.forEach(card =>{
			let random = Math.floor(Math.random() * 12);
			card.style.order =random;
		});
	})();
	function teste(){
		if(pontuacao == 6){
			setTimeout(() =>{
				alert("Parabens você ganhou o jogo em "+(10-tentativa)+" tentativas :)");
				window.location.reload();
			}, 500);
		}
	}
		cards.forEach(card=> card.addEventListener('click',flipcard));

