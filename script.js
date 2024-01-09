const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBT = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('.toggle-checkbox');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const imagemPlayPause = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio ('/sons/luna-rise-part-one.mp3');
const musicaPlay = new Audio('/sons/play.wav');
const musicaPause = new Audio('/sons/pause.mp3');
const musicaAlarme = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 30;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener ('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
});

focoBt.addEventListener('click',()=>{
    tempoDecorridoEmSegundos = 30;
    alterarContexto('foco');
    focoBt.classList.add('active');

});

curtoBt.addEventListener('click',()=>{
    tempoDecorridoEmSegundos = 5;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', ()=> {
    tempoDecorridoEmSegundos = 10;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto (contexto){
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
           titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
           ` 
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada? 
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície.
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
};

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar();
        musicaAlarme.play();
        alert('Tempo finalizado!');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if(focoAtivo){
            const evento = new CustomEvent('focoFinalizado')
            document.dispatchEvent(evento)
        };
        musicaAlarme.pause();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
mostrarTempo();
};

startPauseBT.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        musicaPause.play();
        zerar();
        return;
    }
    intervaloId = setInterval(contagemRegressiva,1000);
    musicaPlay.play();
    iniciarOuPausarBt.textContent = 'Pausar';
    imagemPlayPause.setAttribute ('src', `/imagens/pause.png`);
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
    iniciarOuPausarBt.textContent = 'Começar';
    imagemPlayPause.setAttribute('src', 'imagens/play_arrow.png');
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos*1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();