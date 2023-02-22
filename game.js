let gameDifficulty = 'easy';
const squares = document.querySelectorAll('.square');
const squareList = document.getElementById('squares');
const header = document.querySelector('.header')
const navButtons = document.querySelectorAll('.navButton')
const tryAgain = document.getElementById('try-again');
const correct = document.getElementById('correct');
const options = document.getElementById('options');
const difficulty = document.querySelector('.difficulty')
let counter = 0;

// Gerar um número inteiro aleatório
const randomInt = (max) => {
  return Math.floor(Math.random() * max);
};

// Gerar um RGB
const generateRGB = () => {
    return `rgb(${randomInt(255)}, ${randomInt(255)}, ${randomInt(255)})`;
}

// Gerar as cores aleatórias e a cor principal a ser adivinhada (reinicia o jogo)
const generateColors = (difficulty, getColor) => {
    const mainColor = generateRGB();
    const colors = [generateRGB(), generateRGB(), generateRGB(), generateRGB(), generateRGB()]
    let randomColor = generateRGB();
    let counter = 0;

    if(getColor) {
        return mainColor;
    }

    tryAgain.style.display = 'none'; // O botão de tentar novamente se mantém escondido até que o usuário erre pelo menos um quadrado.
    correct.style.display = 'none' // Esconder o sinal de correto.

    // Remover um choosen passado para que um novo possa ser implementado.
    for(element of squares) {
        element.style.opacity = 1;

        if(element.classList.contains('choosen')) {
            element.classList.remove('choosen');
            element.classList.remove('got-it')
        }
    }

    // Se a dificuldade do jogo ser fácil, ele vai escolher apenas 3 quadrados para sortear. Do contrário, 6 serão sorteados.
    difficulty === 'easy' ? choosenSquare = randomInt(3) : choosenSquare = randomInt(6);
    squares[choosenSquare].classList.add('choosen');

    for(square of squares) {
        if(!square.classList.contains('choosen')) {
            square.style.backgroundColor = colors[counter];
            counter++
        };

        if(square.classList.contains('choosen')) {
            square.style.backgroundColor = mainColor;
        }
    };

    // Alterar a representação RGB do painel principal
    const colorDisplay = document.getElementById('color-display');
    colorDisplay.textContent = mainColor;

    // Aplicar uma cor aleatória para os componentes livres
    header.style.backgroundColor = randomColor
    navButtons.forEach(element => {element.style.color = randomColor})

    return mainColor;
};

// Reiniciar quadrados
const resetSquares = () => {
    for(square of squares) {
        square.style.visibility = 'visible'
    }
};

// Função main
const startGame = () => {
    let gameDifficulty = undefined;
    var itsRight = undefined;
    const squareList = document.getElementById('squares');
    const difficultyButtons = document.querySelectorAll('.difficulty-button');
    const startAgain = document.getElementById('start-again');

    let mainColor = generateColors(gameDifficulty);

    startAgain.addEventListener('click', () => {
        mainColor = generateColors(gameDifficulty)
        resetSquares();
    })

    tryAgain.addEventListener('click', () => {
        mainColor = generateColors(gameDifficulty)
        resetSquares();
    })

    squares.forEach(element => {element.addEventListener('click', (element) => {
        element.target.classList.contains('choosen') ? itsRight = true : itsRight = false;

        if(itsRight) {
            console.log('O usuário acertou a cor!');
            element.target.classList.add('got-it'); // Adicionar animação quando o usuário acertar
            correct.style.display = 'block'; // Aparecer o sinal de correto
            tryAgain.style.display = 'none';
            header.style.backgroundColor = mainColor;
            
            for(element of options.children) {
                element.style.color = mainColor;
            }
            
            for(element of difficulty.children) {
                element.style.color = mainColor;
            }

            for(square of squares) {
                square.style.visibility = 'visible', square.style.backgroundColor = mainColor;
            }
        }

        if(!itsRight) {
            console.log('Botão de tentar novamente acionado.')
            tryAgain.style.display = 'block';
            element.target.style.visibility = 'hidden';
        }
    })})

    difficultyButtons.forEach(element => {
        element.addEventListener('click', (element) => {
            if(element.target.classList.contains('easy')) {
                gameDifficulty = 'easy';
                mainColor = generateColors(gameDifficulty);
                resetSquares();
                for(element of squareList.children) {
                    if(element.classList.contains('4') || element.classList.contains('5') || element.classList.contains('6')) {
                        element.style.display = 'none';
                    }
                }
            } else if(element.target.classList.contains('hard')) {
                gameDifficulty = 'hard';
                mainColor = generateColors(gameDifficulty);
                resetSquares();
                for(element of squareList.children) {
                    if(element.classList.contains('4') || element.classList.contains('5') || element.classList.contains('6')) {
                        element.style.display = 'block';
                    }
                }
            }
        })
    })
};

startGame();

// Developed by Gabriel A.
