import './style.css';
import crossImage from './tic-cross.png';
import circleImage from './tic-circle.png';

const boxes = document.querySelectorAll('.tic-box-container');

global.turn = true;

class ticInspector{
  constructor() {
    this.storage = [];
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

const checkVictory = (ticPos) => {
  console.log('bruh');
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
      console.log('storage:', ticTacToe.storage);
    }
  })
});
