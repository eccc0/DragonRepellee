let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["graveto"];

const body = document.querySelector("#body");
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  {
    name: "graveto",
    power: 10,
  },
  {
    name: "adaga",
    power: 40,
  },
  {
    name: "martelo de guerra",
    power: 80,
  },
  {
    name: "espada de aço",
    power: 120,
  },
];

const monsters = [
  {
    name: "Gosma",
    level: 2,
    health: 60,
  },
  {
    name: "Ungulado",
    level: 8,
    health: 120,
  },
  {
    name: "Dragão",
    level: 20,
    health: 410,
  },
];

const locations = [
  {
    name: "praça da cidade",
    "button text": ["Ir até a loja", "Ir à masmorra", "Lutar com o dragão"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'Você está no centro da cidade. Você vê uma placa que diz "loja".',
  },
  {
    name: "loja",
    "button text": [
      "Comprar 10 de saúde (10 ouros)",
      "Comprar arma (30 ouros)",
      "Voltar para a cidade",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Você entra na loja.",
  },
  {
    name: "masmorra",
    "button text": [
      "Lutar com slime",
      "Lutar com a besta",
      "Voltar para a cidade",
    ],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Você entra na masmorra. Você vê alguns monstros.",
  },
  {
    name: "luta",
    "button text": ["Atacar", "Desviar", "Correr"],
    "button functions": [attack, dodge, goTown],
    text: "Você está lutando com o monstro.",
  },
  {
    name: "matar o monstro",
    "button text": ["Ir até a praça da cidade", "Ir até a praça da cidade", "Ir até a praça da cidade"],
    "button functions": [goTown, goTown, easterEgg],
    text: "O monstro é derrotado e você vê a sua vida se esvair. Você ganha experiência e encontra algumas moedas.",
  },
  {
    name: "perdeu",
    "button text": ["Jogar de novo?", "Jogar de novo?", "Jogar de novo?"],
    "button functions": [restart, restart, restart],
    text: "Sua história acaba aqui. Tente novamente.",
  },
  {
    name: "ganhou",
    "button text": ["Jogar de novo?", "Jogar de novo?", "Jogar de novo?"],
    "button functions": [restart, restart, restart],
    text: "Você derrotou o dragão!!! Os moradores da cidade e arredores sempre serão gratos por sua coragem e bravura!",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Ir para a cidade?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Você descobriu um mini-jogo!. Escolha um número entre 0 e 10. Se o número escolhido coincidir com o número sorteado, você vence!",
  },
];

// Armazenar as ações e imagens associadas aos botões
const buttonActions = {
  button1: {
    action: goStore,
    background: "url('./imagens/loja.jpeg')"
  },
  button2: {
    action: goCave,
    background: "url('./imagens/caverna.jpeg')"
  },
  button3: {
    action: fightDragon,
    background: "url('./imagens/dragão.jpg')"
  }
};

// Função para configurar os botões
function setupButtons() {
  for (const buttonId in buttonActions) {
    const button = document.getElementById(buttonId);
    button.onclick = () => changeBackground(buttonId);
  }
}

// Função para alterar a imagem de fundo e definir a ação do botão
function changeBackground(buttonId) {
  const action = buttonActions[buttonId].action;
  const backgroundImage = buttonActions[buttonId].background;

  // Altera a imagem de fundo
  if (document.body.style.backgroundImage === backgroundImage) {
    document.body.style.backgroundImage = "none"; // ou defina para uma imagem padrão se necessário
  } else {
    document.body.style.backgroundImage = backgroundImage;
  }

  // Define a ação do botão
  const button = document.getElementById(buttonId);
  button.onclick = action;
}

// Configura os botões
setupButtons();

function change1() {
  (button1.onclick = goStore),
    (document.body.style.backgroundImage = "url('./imagens/loja.jpeg')");
}

function change2() {
  button2.onclick = goCave;
  document.body.style.backgroundImage = "url('./imagens/caverna.jpeg')";
}

function change3() {
  button3.onclick = fightDragon;
  document.body.style.backgroundImage = "url('./imagens/dragão.jpg')";
}

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText =
    "Você escolheu " + guess + ". Aqui estão os números sorteados:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Correto! Você ganhou 30 moedas e 10 de XP.";
    gold += 30;
    goldText.innerText = gold;
    xp += 10;
    xpText.innerText = xp;
  } else {
    text.innerText = "Incorreto. Você perdeu 10 de vida e 5 de XP.";
    health -= 10;
    healthText.innerText = health;
    xp -= 5;
    xpText.innerText = xp;
  }
  if (health <= 0) {
    lose();
  }
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function attack() {
  text.innerText = monsters[fighting].name + " ataca.";
  text.innerText += " Você ataca com " + weapons[currentWeaponIndex].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 0.5;
  } else {
    text.innerText += "Você erra o golpe.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
 
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += `${inventory.pop()} quebra.`;
    currentWeaponIndex--;
  }
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function getMonsterAttackValue(level) {
  const hit = level * 4 - Math.floor(Math.random() * xp);
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeaponIndex = 0;
  inventory = ["graveto"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function dodge() {
  text.innerText = "Você desvia do ataque de " + monsters[fighting].name + ".";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText =
      "Você não tem ouro o suficiente para realizar essa compra.";
  }
}

function buyWeapon() {
  if (currentWeaponIndex < weapons.length) {
    if (gold >= 30) {
      gold -= 30;
      currentWeaponIndex++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeaponIndex].name;
      text.innerText = `Você agora tem: ${newWeapon}. \n`;
      inventory.push(newWeapon);
      text.innerText += `No seu inventário há: ${inventory} ` + " ";
    } else {
      text.innerText = button2.innerText = "Vender sua arma por 15 ouros";
      button2.onclick = sellWeapon;
      ("Você não possui dinheiro o suficiente para comprar uma arma.");
    }
  } else {
    text.innerText = "Você já detém a arma mais poderosa.";
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = `Você vendeu ${currentWeapon}.`;
    text.innerText += `No seu inventário há: ${inventory}`;
  } else {
    text.innerText = "Não venda sua única arma!";
  }
}
