//let heartReady = false;
function goTo(id){
  document.querySelectorAll('.screen')
  .forEach(s => s.classList.remove('active')
  );
  document.getElementById(id).classList.add('active');

  if(id === 'screen-passcode')
  {
    currentCode = "";
    updateDots();
  }
  if(id === 'screen-bday')
  {
    launchConfetti();
  }
  /*
  if(id === 'screen-wish' && !heartReady)
  {
    setupHeartDraw();
    heartReady = true;
  }*/
}

//set target passcode
const correctCode = "0307";
let currentCode = "";

//fxn triggered when a keypad num is pressed
function pressKey(num)
{
  if(currentCode.length<4)
  {
    currentCode += num;
    updateDots();
  }
  //check code once 4 digits are entered
  if(currentCode.length === 4)
  {
    setTimeout(checkCode, 300);
  }
}

  //clear the current passcode input
  function clearCode()
  {
    currentCode = "";
    updateDots();
  }

  //visually fills in the circles abv the keypad
  function updateDots()
  {
    const dots =document.querySelectorAll('.dot');
    dots.forEach((dot, index) =>
    {
      if(index < currentCode.length)
      {
        dot.classList.add('filled');
      } else{
        dot.classList.remove('filled');
      }
    });
  }

  //validates the code and change screen
  function checkCode()
  {
    if(currentCode === correctCode)
    {
      setTimeout(goTo('screen-miss-you'), 500);
    } else{
      showWrongPasscode();
    }
  }

  //fxn of wrong code
  function showWrongPasscode()
  {
    const dotsEl = document.getElementById('dots');
    dotsEl.classList.add('shake');
    setTimeout(() => 
    {
      dotsEl.classList.remove('shake');
      currentCode= "";
      updateDots();
    }, 500);
  }

  //launch confetti
  let confettiInterval = null;
  function launchConfetti()
  {
    const layer = document.getElementById('confetti-layer');
    layer.innerHTML = "";

    //keeps spawning
    spawnConfettiBatch();
    confettiInterval = setInterval(spawnConfettiBatch, 400);
  }

  function spawnConfettiBatch()
  {
    const layer = document.getElementById('confetti-layer');
    const colors = ["#c9b8e8", "#d9a9c4", "#a9a5b0", "#ede9f7"];

    for(let i = 0; i < 8; i++)
    {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + "%";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      const duration = 2 + Math.random() * 2;
      piece.style.animationDuration = (2 + Math.random() * 2) + "s";
      layer.appendChild(piece);
      setTimeout(() => 
        piece.remove(), duration * 1000);
    }
  }

  function stopConfetti()
  {
    clearInterval(confettiInterval);
  }
/*
  //the heart
function setupHeartDraw()
{
  const path = document.getElementById('heart-path');
  const card = document.querySelector('#screen-wish.card');
  const length = path.getTotalLength();
//start fully hidden
path.style.strokeDasharray = length;
path.style.strokeDashoffset = length;

const isScrollable = card.scrollHeight > card.clientHeight;
if (isScrollable)
  {
    card.addEventListener('scroll', () =>
    {
      const maxScroll = card.scrollHeight - card.clientHeight;
      const progress = card.scrollTop / maxScroll;
      path.style.strokeDashoffset = length * (1 - progress);
    });
  } else{
    let start = null;
    const duration = 3500;

    function animateDraw(timeSpan)
    {
      if(!start) start = timeSpan;
      const elapse = timeSpan - start;
      const progress = Math.min(elapse / duration, 1);
      path.style.strokeDashoffset = length * (1 - progress);
      if(progress < 1) requestAnimationFrame(animateDraw);
    }
    requestAnimationFrame(animateDraw);
  }
} */