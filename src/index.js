import './style.css';
import crossImage from './tic-cross.png';
import circleImage from './tic-circle.png';

const boxes = document.querySelectorAll('.tic-box-container');

global.turn = true;

class ticInspector{
  constructor() {
    
  }
}

const boxIsEmpty = (box) => {
  if (box.firstElementChild.firstElementChild === null) {
    return true;
  } else {
    return false;
  }
}

boxes.forEach(box => {
  box.addEventListener('click', () => {
    if (boxIsEmpty(box)) {
      const ticSimbol = new Image();
      if (turn) {
        ticSimbol.src = crossImage;
        turn = false;
      } else {
        ticSimbol.src = circleImage;
        turn = true;
      }
      ticSimbol.classList.add('w-100');
      box.children[0].appendChild(ticSimbol);  
    }
  })
});

