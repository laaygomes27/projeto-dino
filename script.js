const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) { //determina qual a tecla vai ser precionada para pular, no caso o espaço
    if (event.keyCode === 32) {
        if (!isJumping) { //evita que o dino pule sem estar pressionado a tecla backspace
            jump();
        }
    }
}

function jump() { //determina o pulo do dino
    isJumping = true;

    let upInterval = setInterval(() => { //fazer ele subir até 150px
        if (position >= 180) {
            // Descendo
            clearInterval(upInterval);

            let downInterval = setInterval(() => { //fazer ele descer
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 30;
                    dino.style.bottom = position + 'px';
                }
            }, 30);
        } else {
            // Subindo
            position += 30;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() { //obstaculo cacto 
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftTimer = setInterval(() => { //faz o cacto percorrer a tela
        if (cactusPosition < -60) {
            // Saiu da tela
            clearInterval(leftTimer);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) { //60 porque a largura do dino é 60 e para dar game over ele tem que ta no lugar do dino
            // Game over
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'; //quando entrar em contato com o dino ele limpa a tela e diz game over
        } else {
            cactusPosition -= 8; //velocidade que o cacto vai para esquerda
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);