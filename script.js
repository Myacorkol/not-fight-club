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
//ENEMY
const fightBtn = document.querySelector('.start-fight');
const enemyChooseBtn = document.querySelector('.choose-enemy');
const enemyImg = document.getElementById('enemy-img');
const enemyName = document.querySelector('.enemy-name');
let enemyHeath = document.querySelector('.enemy-heath');
//PLAYER
let playerHeath = document.querySelector('.player-heath');
//LOGS
const logs = document.querySelector('.logs');
//wariables
let currentEnemy = null;
let currentPlayer = null

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
    name: "wind Mage",
    hp: 350,
    minDmg: 23,
    maxDmg: 140,
    attackZones: 2,
    defendZones: 1
  },

  { img: "./images/enemy2.png",
    name: "wind Mage",
    hp: 570,
    minDmg: 15,
    maxDmg: 83,
    attackZones: 2,
    defendZones: 1
  },

  { img: "./images/enemy3.png",
    name: "Skeletor",
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
    name: "Mr puk",
    hp: 795,
    minDmg: 50,
    maxDmg: 50,
    attackZones: 2,
    defendZones: 1
  },
];

const zones = ["head", "neck", "body", "belly", "legs"];

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
        })
    }
    registration.style.zIndex = 1;
    mainPage.style.zIndex = 2;
})
// MAINPAGE
mainPageBtn.addEventListener('click', function () {
    mainPage.style.zIndex = 0;
    playerPage.style.zIndex = 2;

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
      playerPage.style.zIndex = 1;
      beforeFightPage.style.zIndex = 2;
    })
})
// BEFOREBATTLE PAGE
const openBattleField = document.querySelector('.fight__btn');
const BattleFieldPage = document.getElementById('battle');

openBattleField.addEventListener('click', function () {
  beforeFightPage.style.zIndex = 1;
  BattleFieldPage.style.zIndex = 2;
});

// BATTLE PAGE

//random enemy
function getRandomEnemy(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
//random num
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomZones(zones, maxCount) {
  // сколько зон выбираем (от 1 до maxCount)
  const count = Math.floor(Math.random() * maxCount) + 1;

  // копия массива и перемешивание
  const shuffled = [...zones].sort(() => Math.random() - 0.5);

  // возвращаем нужное количество зон
  return shuffled.slice(0, count);
}

enemyChooseBtn.addEventListener('click', function (){
  currentEnemy = getRandomEnemy(enemies);
  console.log(currentEnemy);
  enemyChooseBtn.disabled = true;
  enemyImg.src = currentEnemy.img;
  enemyName.textContent = currentEnemy.name;
  enemyHeath.textContent = currentEnemy.hp;

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
      console.log(playerAttackZones);
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
      console.log(playerDefenceZones);
    });
  });
};
  playerAttack(attackPlayerInputs);
  playerDefence(deffencePlayerInputs);

resetAttackBtn.addEventListener('click', () => {
  attackPlayerInputs.forEach(input => {
    input.checked = false;
  });
  deffencePlayerInputs.forEach(input => {
    input.checked = false;
  });
});



//enemy turn
fightBtn.addEventListener('click', function () {
  let EnemyAttackRate = getRandom(currentEnemy.minDmg, currentEnemy.maxDmg);

  let EnemydefZones = getRandomZones(zones, currentEnemy.defendZones);
  console.log(`${currentEnemy.name} поставил защиту на: ${EnemydefZones}`);

  let EnemyattackZones = getRandomZones(zones, currentEnemy.attackZones);
  console.log(`${currentEnemy.name} атакует зоны: ${EnemyattackZones}`);

  let playerAttackRate = getRandom(currentPlayer.minDmg, currentPlayer.maxDmg);
  console.log(`${currentPlayer.name} готов нанести ${playerAttackRate} урона в зоны: ${playerAttackZones}`);

  // === Атака врага ===
  console.log(`⚔️ ${currentEnemy.name} атакует ${EnemyattackZones}, а ${currentPlayer.name} защищает ${playerDefenceZones}`);
  let EnemyAttackmatches = EnemyattackZones.filter(item => playerDefenceZones.includes(item));

  if (EnemyAttackmatches.length === 0) {
    currentPlayer.hp -= EnemyAttackRate;
    if (currentPlayer.hp < 0) currentPlayer.hp = 0;

    console.log(` ${currentEnemy.name} попал! Нанес ${EnemyAttackRate} урона.`);
    console.log(` Здоровье ${currentPlayer.name}: ${currentPlayer.hp}`);
    playerHeath.textContent = currentPlayer.hp;

    if (currentPlayer.hp <= 0) {
      alert('You lose!');
      resetGame();
    }
  } else {
    console.log(` ${currentPlayer.name} успешно защитился в зонах: ${EnemyAttackmatches}`);
  }

  // === Атака игрока ===
  console.log(`⚔️ ${currentPlayer.name} атакует ${playerAttackZones}, а ${currentEnemy.name} защищает ${EnemydefZones}`);
  let playerAttackmatches = playerAttackZones.filter(item => EnemydefZones.includes(item));

  if (playerAttackmatches.length === 0) {
    currentEnemy.hp -= playerAttackRate;
    if (currentEnemy.hp < 0) currentEnemy.hp = 0;

    console.log(` ${currentPlayer.name} попал! Нанес ${playerAttackRate} урона.`);
    console.log(` Здоровье ${currentEnemy.name}: ${currentEnemy.hp}`);
    enemyHeath.textContent = currentEnemy.hp;

    if (currentEnemy.hp <= 0) {
      alert('You won!');
      resetGame();
    }
  } else {
    console.log(` ${currentEnemy.name} успешно защитился в зонах: ${playerAttackmatches}`);
  }
});

//reset game

function resetGame() {
  playerAttackZones = [];
  playerDefenceZones = [];

  attackPlayerInputs.forEach(input => input.checked = false);
  deffencePlayerInputs.forEach(input => input.checked = false);

  // Сбрасываем врага
  currentEnemy = null;
  enemyChooseBtn.disabled = false;
  enemyImg.src = "./images/question.png";
  enemyName.textContent = "";
  enemyHeath.textContent = "";

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