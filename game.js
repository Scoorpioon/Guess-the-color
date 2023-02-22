let gameDifficulty = 'easy';
const squares = document.querySelectorAll('.square');
const squareList = document.getElementById('squares');
let numberOfSquares = 3;
let counter = 0;

// Gerar um número inteiro aleatório
const randomInt = (max) => {
  return Math.floor(Math.random() * max);
};

// Gerar um RGB
const generateRGB = () => {
    return `rgb(${randomInt(255)}, ${randomInt(255)}, ${randomInt(255)})`;
}

// Gerar as cores aleatórias e a cor principal a ser adivinhada
const generateColors = (difficulty) => {
    const mainColor = generateRGB();
    const colors = [generateRGB(), generateRGB(), generateRGB(), generateRGB(), generateRGB()]
    let randomColor = generateRGB();
    let counter = 0;

    // Remover um choosen passado para que um novo possa ser implementado.
    for(element of squares) {
        if(element.classList.contains('choosen')) {
            element.classList.remove('choosen')
        }
    }
  
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

    const colorDisplay = document.getElementById('color-display');
    colorDisplay.textContent = mainColor;
};

// Função main
const startGame = () => {
    let gameDifficulty = undefined;
    const squareList = document.getElementById('squares');
    const difficultyButtons = document.querySelectorAll('.difficulty-button');
    const startAgain = document.getElementById('start-again');
    let attempt = 0;

    startAgain.addEventListener('click', () => {
        generateColors(gameDifficulty)
    })

    squares.forEach(element => {element.addEventListener('click', (element) => {
        let itsRight = undefined;
        element.target.classList.contains('choosen') ? itsRight = true : itsRight = false;

        if(itsRight) {
            console.log('The user choosen the correct color.')
        }
    })})

    difficultyButtons.forEach(element => {
        element.addEventListener('click', (element) => {
            if(element.target.classList.contains('easy')) {
                gameDifficulty = 'easy';
                generateColors(gameDifficulty);
                for(element of squareList.children) {
                    if(element.classList.contains('4') || element.classList.contains('5') || element.classList.contains('6')) {
                        element.style.display = 'none';
                    }
                }
            } else if(element.target.classList.contains('hard')) {
                gameDifficulty = 'hard';
                generateColors(gameDifficulty);
                for(element of squareList.children) {
                    if(element.classList.contains('4') || element.classList.contains('5') || element.classList.contains('6')) {
                        element.style.display = 'block';
                    }
                }
            }
        })
    })

    generateColors(gameDifficulty)
};

startGame();

// Developed by Gabriel A.