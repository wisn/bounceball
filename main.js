// Define the application world
const app = document.getElementById('app');

// Create an object: ball
const ball = document.createElement('div');
ball.style.backgroundColor = '#000';
ball.style.borderRadius = '100%';
ball.style.height = '50px';
ball.style.width = '50px';
ball.style.position = 'absolute';
ball.style.zIndex = '1000';
ball.style.left = '0px';
ball.style.bottom = '0px';
ball.id = 'ball';

// Add the ball to the application world
app.append(ball);

// Add event listener to the ball, enable to moving the ball freely
// KNOWN ISSUE: Overflown cursor create a draggable object bug
ball.onmousedown = function(event) {
  const shiftX = event.clientX - ball.getBoundingClientRect().left;
  const shiftY = event.clientY - ball.getBoundingClientRect().top;

  app.append(ball);

  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + 'px';
    ball.style.top = pageY - shiftY + 'px';

    // Prevent the ball to overflown from the application world
    if (pageX - shiftX < 0) {
      ball.style.left = '0px';
    }
    else if (pageX - shiftX + ball.offsetWidth > app.offsetWidth) {
      ball.style.left = app.offsetWidth - ball.offsetWidth + 'px';
    }
    if (pageY - shiftY + ball.offsetHeight > app.offsetHeight) {
      ball.style.top = app.offsetHeight - ball.offsetHeight + 'px';
    }
    else if (pageY - shiftY < 0) {
      ball.style.top = '0px';
    }

    // Show the current position of the ball
    const inspector = document.getElementById('ball-position');
    const ballPosition = getBallPosition();
    inspector.innerHTML = '(' + ballPosition.x + ', ' + ballPosition.y + ')';
  }

  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };
};

ball.ondragstart = function() {
  return false;
};

// Ball position's fetcher
function getBallPosition() {
  return {
    x: ball.getBoundingClientRect().left + Math.floor(ball.offsetWidth / 2),
    y: app.offsetHeight - ball.getBoundingClientRect().top - Math.floor(ball.offsetHeight / 2),
  };
}

// Create an inspector component
const inspector = document.createElement('div');
inspector.style.backgroundColor = '#004d40';
inspector.style.bottom = '0px';
inspector.style.color = '#fff';
inspector.style.padding = '.5em 1em';
inspector.style.position = 'fixed';
inspector.style.right = '0px';
inspector.id = 'inspector';

const inspectorTable = document.createElement('table');
inspectorTable.style.border = '0';

let inspectorRow, inspectorCol, inspectorVal;

inspectorRow = document.createElement('tr');
inspectorCol = document.createElement('td');
inspectorCol.append(document.createTextNode('Position'));
inspectorRow.append(inspectorCol);
inspectorCol = document.createElement('td');
inspectorCol.append(document.createTextNode(':'));
inspectorRow.append(inspectorCol);
inspectorCol = document.createElement('td');
inspectorVal = document.createElement('span');
inspectorVal.id = 'ball-position';
inspectorVal.append(document.createTextNode('(' + getBallPosition().x +', ' + getBallPosition().y + ')'));
inspectorCol.append(inspectorVal);
inspectorRow.append(inspectorCol);

inspectorTable.append(inspectorRow);
inspector.append(inspectorTable);

// Add the inspector to the application world
app.append(inspector);

