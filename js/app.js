const numbers = document.querySelectorAll('.numbers');
const screen = document.querySelector('.screen');
const ac = document.querySelector('#ac');
const sumBtn = document.querySelector('#sum');
const mathBtns = document.querySelectorAll('.btn');

let result = 0;
let action = '';
let fn = null;
let screenNumber = '';

// Converts string to number
const toNumber = num => {
  return num * 1;
};

const math = {
  '+': sum => {
    return function(x) {
      return (result = sum + x);
    };
  },
  '-': sum => {
    return function(x) {
      return (result = sum - x);
    };
  },
  '*': sum => {
    return function(x) {
      return (result = sum * x);
    };
  },
  '/': sum => {
    return function(x) {
      return (result = sum / x);
    };
  }
};

// Clear all
ac.addEventListener('click', () => {
  screen.textContent = 0;
  screenNumber = '';
  result = 0;
  action = '';
  fn = null;
});

// Get result
sumBtn.addEventListener('click', () => {
  action = '';
  fn = null;
  screen.textContent = result;
  setFontSize();
});

numbers.forEach(number => {
  number.addEventListener('click', e => {
    // Checks if number already contains comma
    const comma = screenNumber.includes('.');
    if (e.target.textContent === '.' && comma) {
      return;
    }

    if (screen.textContent === '0') {
      if (e.target.textContent === '.') {
        screenNumber = '0.';
        screen.textContent = screenNumber;
      } else {
        screenNumber = e.target.textContent;
        screen.textContent = screenNumber;
      }
    } else {
      if (action !== '') {
        if (screenNumber.length > 8) {
          return;
        }
        screenNumber += e.target.textContent;
        screen.textContent = screenNumber;
        result = fn(toNumber(screenNumber));
      } else {
        if (screenNumber.length > 8) {
          return;
        }
        screenNumber += e.target.textContent;
        screen.textContent = screenNumber;
      }
    }

    setFontSize();
  });
});

mathBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.math === '%') {
      screenNumber = toNumber(screenNumber) / 100;
      screen.textContent = screenNumber;
    } else if (btn.dataset.math === '+/-') {
      screenNumber = -1 * toNumber(screenNumber);
      screen.textContent = screenNumber;
    } else {
      screenNumber = '';
      if (toNumber(result) !== 0) {
        screen.textContent = result;
      }
      action = btn.dataset.math;
      result = toNumber(screen.textContent);
      fn = math[action](result);
    }
    setFontSize();
  });
});

const setFontSize = () => {
  if (screen.textContent.toString().length > 8) {
    screen.style.fontSize = '2.5rem';
  } else if (screen.textContent.toString().length > 6) {
    screen.style.fontSize = '3rem';
  } else {
    screen.style.fontSize = '4rem';
  }
};
