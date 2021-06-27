const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const DEFAULT_MAX_LIFE = 100;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";

const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_SECOND_CHANCE = "SECOND_CHANCE";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

let chosenMaxLife;
try {
  chosenMaxLife = getMaxLife();
} catch (error) {
  alert(`Invalid user input, default value ${DEFAULT_MAX_LIFE} used`);
  console.log(error.message);
  chosenMaxLife = DEFAULT_MAX_LIFE;
} finally {
  console.log(`chosenMaxLife = ${chosenMaxLife}`)
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

let battleLog = [];

adjustHealthBars(chosenMaxLife);

function getMaxLife() {
  const parsedValue = parseInt(prompt("Enter maximum life", 100));
  if (isNaN(parsedValue) || chosenMaxLife <= 0) {
    throw { message: "Invalid user input, not a number" }
  }
  return parsedValue;
}

function writeToLog(event, value, playerHealth, monsterHealth) {
  let logEntry = {
    event: event,
    value: value,
    playerHealth: playerHealth,
    monsterHealth: monsterHealth,
  };
  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentPlayerHealth, currentMonsterHealth);

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    writeToLog(LOG_EVENT_SECOND_CHANCE, null, currentPlayerHealth, currentMonsterHealth);
    alert("One last chance!");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You Won!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You Lost!");
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("You have a draw");
  }

  if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
    writeToLog(LOG_EVENT_GAME_OVER, null, currentPlayerHealth, currentMonsterHealth);
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage = ATTACK_VALUE;
  let logEvent = LOG_EVENT_PLAYER_ATTACK;
  if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentPlayerHealth, currentMonsterHealth);

  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentPlayerHealth, currentMonsterHealth);

  endRound();
}

function healPlayerHandler() {
  increasePlayerHealth(HEAL_VALUE);

  let healValue = HEAL_VALUE;
  if (currentPlayerHealth + healValue > chosenMaxLife) {
    healValue = chosenMaxLife - currentPlayerHealth;
  }
  currentPlayerHealth += healValue;
  writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentPlayerHealth, currentMonsterHealth);

  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function printLogHandler() {
    // console.log(battleLog);

    // for(let i = 0; i < battleLog.length; ++i) {
    //   console.log(battleLog[i]);
    // }

    let i = 0;
    for(const logEntry of battleLog) {
      console.log(i++ + ':');
      for (const key in logEntry) {
        console.log(`${key} -> ${logEntry[key]}`);
      }
    }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
