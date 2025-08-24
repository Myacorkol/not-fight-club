//MUSIC
const player = document.getElementById('player');
const tracks = ["sounds/mainMenu.mp3", "sounds/character.mp3"];
let currentTrack = 0;
//GAMEFLOW
registrationPage = document.getElementById('registration');
inputName = document.getElementById('character-name');
registrationBtn = document.querySelector('.regForm__btn');
userNames = document.querySelectorAll('.user-name');
mainPage = document.getElementById('main');
mainPageBtn = document.querySelector('.mainPage__btn');
playerPage = document.getElementById('player');
playerPageBtns = document.querySelectorAll('.hero-btn');
beforeFightPage = document.getElementById('beforeFight');
settingsPage = document.getElementById('settings');
settingsPageBtn = document.querySelector('.settings-btn');
changeNameBtn = document.querySelector('.change-name-btn');
changeNameInput = document.getElementById('character-name-settings');
headerBattleBtn = document.querySelector('.fight-page');
headerPlayerPage = document.querySelector('.player-page');

//ENEMY
const fightBtn = document.querySelector('.start-fight');
const enemyChooseBtn = document.querySelector('.choose-enemy');
const enemyImg = document.getElementById('enemy-img');
const enemyName = document.querySelector('.enemy-name');
let enemyHeath = document.querySelector('.enemy-heath');
//PLAYER
let playerHeath = document.querySelector('.player-heath');

// BEFOREBATTLE PAGE
const openBattleField = document.querySelector('.fight__btn');
const BattleFieldPage = document.getElementById('battle');

//LOGS
const logs = document.querySelector('.logs');
//wariables
let currentEnemy = null;
let currentPlayer = null;

//AVATARS
const heroes = ['zena', 'chief', 'paladin', 'mage'];
//PLAYERS
const players = [
  { img: "./images/player1.png",
    hp: 350,
    minDmg: 20,
    maxDmg: 60,
    attackZones: 2,
    defendZones: 1
  },
  { img: "./images/player3.png",
    hp: 570,
    minDmg: 1,
    maxDmg: 120,
    attackZones: 2,
    defendZones: 1
  },
  { img: "./images/player4.png",
    hp: 850,
    minDmg: 40,
    maxDmg: 80,
    attackZones: 2,
    defendZones: 1
  },
  { img: "./images/player5.png",
    hp: 450,
    minDmg: 30,
    maxDmg: 180,
    attackZones: 2,
    defendZones: 1
  },
]
let playerDefenceZones = [];
let playerAttackZones = [];

//ENEMIES
const enemies = [

  { img: "./images/enemy1.png",
    name: "WIND MAGE",
    hp: 350,
    minDmg: 23,
    maxDmg: 140,
    attackZones: 2,
    defendZones: 1
  },

  { img: "./images/enemy2.png",
    name: "SKELETON",
    hp: 570,
    minDmg: 15,
    maxDmg: 83,
    attackZones: 2,
    defendZones: 1
  },

  { img: "./images/enemy3.png",
    name: "POISON SPIDER",
    hp: 330,
    minDmg: 12,
    maxDmg: 120,
    attackZones: 2,
    defendZones: 1
  },

  { img: "./images/enemy4.png",
    name: "Ogr the hummer",
    hp: 730,
    minDmg: 1,
    maxDmg: 100,
    attackZones: 2,
    defendZones: 1
  },

  { img: "./images/enemy5.png",
    name: "Angry Octopus",
    hp: 795,
    minDmg: 50,
    maxDmg: 50,
    attackZones: 2,
    defendZones: 1
  },
];

const zones = ["head", "neck", "body", "belly", "legs"];

function closeAllPages () {
  registrationPage.style.zIndex = 0;
  mainPage.style.zIndex = 0;
  playerPage.style.zIndex = 0;
  beforeFightPage.style.zIndex = 0;
  settingsPage.style.zIndex = 0;
  BattleFieldPage.zIndex = 0
}

//REGISTRATION PAGE 
inputName.addEventListener('input', function () {
    const value = inputName.value.trim();
  if (value !== "" && value.length > 2) {
    registrationBtn.classList.add('active');
    registrationBtn.disabled = false;
  } else {
    registrationBtn.classList.remove('active');
    registrationBtn.disabled = true;
  }
});
registrationBtn.addEventListener('click', function () {
    const nameValue = inputName.value.trim();
    if (nameValue.length > 2) {
        localStorage.setItem('userName', nameValue);
        console.log(`Имя "${nameValue}" сохранено в localStorage!`);
        const savedName = localStorage.getItem('userName');

        userNames.forEach(function (name) {
            name.textContent = savedName;
        });
    }
    closeAllPages();
    mainPage.style.zIndex = 1;
})
// MAINPAGE
mainPageBtn.addEventListener('click', function () {
    closeAllPages();
    playerPage.style.zIndex = 1;

    currentTrack = (currentTrack + 1) % tracks.length;
    player.src = tracks[currentTrack];
    player.play(); 
})

// PLAYER PAGE
playerPageBtns.forEach(function (btn, index) {
    btn.addEventListener('click', function() {
      console.log(players[index]);
      currentPlayer = players[index];
      console.log('игрок выбран');
      document.getElementById('player-img').src = currentPlayer.img;
      playerHeath.textContent = currentPlayer.hp;
      beforeFightPage.style.zIndex = 5;
    })
})

openBattleField.addEventListener('click', function () {
  closeAllPages();
  BattleFieldPage.style.zIndex = 2;
});

// SETTINGS HEADER

settingsPageBtn.addEventListener('click', function () {
  const userName = localStorage.getItem("userName");
  if (userName) {
    closeAllPages();
    settingsPage.style.zIndex = 5;
  }else {
    alert('at first you need to chose your character name');
  }
})
changeNameBtn.addEventListener('click', function () {
  const name = changeNameInput.value.trim();
  if (name.length > 2) {
        localStorage.setItem("userName", name);
        console.log(`Имя "${name}" сохранено в localStorage!`);
        const savedName = localStorage.getItem('userName');
        userNames.forEach(function (name) {
            name.textContent = savedName;
        });
    }
  alert('New name saved successfully');
})
headerBattleBtn.addEventListener('click', function () {
  const userName = localStorage.getItem("userName");
  if (!userName) {
    alert('At first you need to choose your character name');
    return;
  }
  if (currentPlayer === null) {
    alert('At first you need to choose your character avatar');
    return;
  }
  closeAllPages();
  beforeFightPage.style.zIndex = 9;
});
headerPlayerPage.addEventListener('click', function () {
  const userName = localStorage.getItem("userName");
  if (userName) {
  closeAllPages();
  playerPage.style.zIndex = 5;
  }else {
    alert('at first you need to chose your character name');
  }
})
//random enemy
function getRandomEnemy(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
//random num
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomZones(zones, maxCount) {

  const count = Math.floor(Math.random() * maxCount) + 1;
  const shuffled = [...zones].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

enemyChooseBtn.addEventListener('click', function (){
  currentEnemy = getRandomEnemy(enemies);
  console.log(currentEnemy);
  enemyChooseBtn.disabled = true;
  enemyImg.src = currentEnemy.img;
  enemyName.textContent = currentEnemy.name;
  enemyHeath.textContent = currentEnemy.hp;
  document.querySelector('.fight').classList.remove('hidden');
  document.querySelector('.pick-enemy-box').classList.add('hidden');
});
//player turn
const attackPlayerInputs = document.querySelectorAll('.AttackOption-input');
const deffencePlayerInputs = document.querySelectorAll('.DefenceOption-input');
resetAttackBtn = document.querySelector('.reset-attack-inputs');

function playerAttack(inputs) {
  inputs.forEach(input => {
    input.addEventListener('change', () => {
      let selected = [...inputs].filter(c => c.checked);

      if (selected.length > 1) {
        input.checked = false;
        alert("Hero alert: you can choose only one options!");
        selected = [...inputs].filter(c => c.checked); 
      }
      playerAttackZones = selected.map(c => c.dataset.zone);
    });
  });
};


function playerDefence(inputs) {
  inputs.forEach(input => {
    input.addEventListener('change', () => {
      let selected = [...inputs].filter(c => c.checked);

      if (selected.length > 2) {
        input.checked = false;
        alert("Hero alert: you can choose only two options!");
        selected = [...inputs].filter(c => c.checked); 
      }
      playerDefenceZones = selected.map(c => c.dataset.zone);
      fightBtn.classList.remove('is-disabled'); 
    });
  });
};
playerAttack(attackPlayerInputs);
playerDefence(deffencePlayerInputs);

resetAttackBtn.addEventListener('click', () => {
  attackPlayerInputs.forEach(input => {
    input.checked = false;
    fightBtn.classList.add('is-disabled'); 
  });
  deffencePlayerInputs.forEach(input => {
    input.checked = false;
    fightBtn.classList.add('is-disabled');
  });
});



//enemy turn
fightBtn.addEventListener('click', function (e) {
  if (fightBtn.classList.contains('is-disabled')) {
    e.preventDefault();
    alert('Сначала выбери 2 опции атаки');
    return;
  }
  const log = document.createElement('li');
  let logText = "";
  
  let EnemydefZones = getRandomZones(zones, currentEnemy.defendZones);
  // logText += `<span style="color: red; font-size: 24px">${currentEnemy.name}</span>
  // protects:
  //  <span style="color: yellow; font-size: 24px">${EnemydefZones};</span> `;

  let EnemyattackZones = getRandomZones(zones, currentEnemy.attackZones);
  let EnemyAttackRate = getRandom(currentEnemy.minDmg, currentEnemy.maxDmg);
  let playerAttackRate = getRandom(currentPlayer.minDmg, currentPlayer.maxDmg);

  // === Enemy Attack ===
  const localUserName = localStorage.getItem("userName");

  logText += `<span style="color: red; font-size: 24px">${currentEnemy.name}</span> 
  protects:
   <span style="color: yellow; font-size: 24px">${EnemydefZones};</span>
  Attack:
   <span style="color: yellow; font-size: 24px">${EnemyattackZones}</span>
   ,but 
    <span style="color: green; font-size: 24px">${localUserName}</span>
     protects
     <span style="color: green; font-size: 24px">${playerDefenceZones};</span> `;

  let EnemyAttackmatches = EnemyattackZones.filter(item => playerDefenceZones.includes(item));

  if (EnemyAttackmatches.length === 0) {
    currentPlayer.hp -= EnemyAttackRate;
    if (currentPlayer.hp < 0) currentPlayer.hp = 0;

    logText += `<span style="color: red; font-size: 24px">${currentEnemy.name}</span>  hit the target <span style="color: red; font-size: 24px">${EnemyAttackRate}</span>;  `;

    playerHeath.textContent = currentPlayer.hp;

    if (currentPlayer.hp <= 0) {
      alert('You lose!');
      resetGame();
    }
  } else {
    logText += `<span style="color: red; font-size: 24px">${localUserName}</span>
     successfully defended: 
    <span style="color: red; font-size: 24px">${EnemyAttackmatches};</span>  `;
  }

  // === Player Attack ===
  logText += `<span style="color: green; font-size: 24px">${localUserName}</span> attack
   <span style="color: green; font-size: 20px">${playerAttackZones}</span>, and
    <span style="color: red; font-size: 24px">${currentEnemy.name}</span>  deffend 
    <span style="color: green; font-size: 20px">${EnemydefZones};</span>`;

  let playerAttackmatches = playerAttackZones.filter(item => EnemydefZones.includes(item));

  if (playerAttackmatches.length === 0) {
    currentEnemy.hp -= playerAttackRate;
    if (currentEnemy.hp < 0) currentEnemy.hp = 0;

    logText += `<span style="color: red; font-size: 24px">${localUserName}</span>
     hit the target
      <span style="color: red; font-size: 20px">${playerAttackRate}</span>
       damage; `;
      enemyHeath.textContent = currentEnemy.hp; 

    if (currentEnemy.hp <= 0) {
      alert('You won!');
      resetGame();
    }
  } else {
    logText += `<span style="color: red; font-size: 24px">${currentEnemy.name}</span> successfully defended:
     <span style="color: green; font-size: 20px">${playerAttackmatches}; </span> `;
  }
  log.innerHTML = logText;
  logs.appendChild(log);
  logs.scrollTop = logs.scrollHeight;
});

//reset game

function resetGame() {
  playerAttackZones = [];
  playerDefenceZones = [];

  attackPlayerInputs.forEach(input => input.checked = false);
  deffencePlayerInputs.forEach(input => input.checked = false);

  // Reset enemy 
  currentEnemy = null;
  enemyChooseBtn.disabled = false;
  enemyImg.src = "./images/question.png";
  enemyName.textContent = "";
  enemyHeath.textContent = "";
  document.querySelector('.fight').classList.add('hidden');
  document.querySelector('.pick-enemy-box').classList.remove('hidden');

}


let currentSlide = 0; // Текущий индекс слайда
const slides = document.querySelector('.slides'); // Контейнер для всех слайдов
const totalSlides = document.querySelectorAll('.slide').length; // Общее количество слайдов

// Функция для отображения слайда по индексу
function showSlide(index) {
    // Проверка на выход за пределы количества слайдов
    if (index >= totalSlides) {
        currentSlide = 0; // Если индекс больше или равен количеству слайдов, переходим к первому слайду
    } else if (index < 0) {
        currentSlide = totalSlides - 1; // Если индекс меньше 0, переходим к последнему слайду
    } else {
        currentSlide = index; // Иначе устанавливаем текущий слайд
    }

    // Вычисляем смещение для перехода к текущему слайду
    const offset = -currentSlide * 100; // 100% на каждый слайд
    slides.style.transform = `translateX(${offset}%)`; // Применяем смещение к контейнеру слайдов
}

// Функция для перехода к следующему слайду
function nextSlide() {
    showSlide(currentSlide + 1); // Увеличиваем индекс текущего слайда на 1
}

// Функция для перехода к предыдущему слайду
function prevSlide() {
    showSlide(currentSlide - 1); // Уменьшаем индекс текущего слайда на 1
}