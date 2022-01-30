import './style.css';
import crossImage from './tic-cross.png';
import circleImage from './tic-circle.png';

const boxes = document.querySelectorAll('.tic-box-container');

global.turn = true;

class ticInspector{
  constructor() {
    this.storage = [null, null, null, null, null, null, null, null, null];
  }

  setCross (pos) {
    this.storage[pos] = 'cross'; 
  }

  setCircle (pos) {
    this.storage[pos] = 'circle';
  }
}

const boxIsEmpty = (box) => {
  if (box.firstElementChild.firstElementChild === null) {
    return true;
  } else {
    return false;
  }
}

const addCirlceOrCross = (box) => {
  const ticSimbol = new Image();
  if (turn) {
    ticSimbol.src = crossImage;
    ticSimbol.classList.add('tic-box-cross');
    turn = false;
  } else {
    ticSimbol.src = circleImage;
    ticSimbol.classList.add('tic-box-circle')
    turn = true;
  }
  ticSimbol.classList.add('w-100');
  box.firstElementChild.appendChild(ticSimbol);  
}

const getPosition = (boxes, clickedBox) => {
  for (let i = 0; i < boxes.length; i += 1) {
    if (boxes[i] === clickedBox) {
      return i;
    }
  }
}

const checkVictory = (ticTacToe) => {
  const tC = ticTacToe.storage;
  const vicPos = [
    [0, 4, 8], // Diagonal NW to SE
    [2, 4, 6], // Diagonal NE to SW
    [0, 1, 2], // Upper horizontal
    [3, 4, 5], // Middle horizontal
    [6, 7, 8], // Lower horizontal
    [0, 3, 6], // Left vertical
    [1, 4, 7], // Center vertical
    [2, 5, 8]  // Right vertical
  ];

  let simbol = 'circle';
  let cicle = 1;

  do {
    for (let i = 0; i < vicPos.length; i += 1) {
      if (tC[vicPos[i][0]] === simbol && tC[vicPos[i][1]] === simbol && tC[vicPos[i][2]] === simbol) {
        return true;
      }
    }
    simbol = 'cross';
    cicle += 1;
  } while (cicle < 3);

  return false;
}

const ticTacToeIsFull = (ticTacToe) => {
  let nullCounter = 0;
  for (let i = 0; i < ticTacToe.storage.length; i += 1) {
    if (ticTacToe.storage[i] === null) {
      nullCounter += 1;
    }
  }
  if (nullCounter === 0) {
    return true;
  } else {
    return false;
  }
}

const saveTicTacToeProgressLocally = (progress) => {
  localStorage.setItem('ticTacToeProgress', JSON.stringify(progress));
}

const getLocalTicTacToeProgress = () => {
  return JSON.parse(localStorage.getItem('ticTacToeProgress'))
}

const ticTacToe = new ticInspector();

boxes.forEach(box => {
  box.addEventListener('click', () => {
    if (boxIsEmpty(box)) {
      if (turn) {
        ticTacToe.setCross(getPosition(boxes, box));
      } else {
        ticTacToe.setCircle(getPosition(boxes, box));
      }
      saveTicTacToeProgressLocally(ticTacToe);
      addCirlceOrCross(box);

      if (checkVictory(ticTacToe)) {
        console.log('VICTORY')
      }

      if (ticTacToeIsFull(ticTacToe)) {
        console.log('FULL');
      }
    }
  })
});
