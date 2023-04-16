Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};
let buttons = document.querySelectorAll('button');
let btns_opponent = document.getElementsByClassName('button-opponent');
let btn_start = document.getElementById('button-start');
let btn_back = document.getElementById('button-back');
let field11 = document.getElementById('field11');
let field12 = document.getElementById('field12');
let field13 = document.getElementById('field13');
let field21 = document.getElementById('field21');
let field22 = document.getElementById('field22');
let field23 = document.getElementById('field23');
let field31 = document.getElementById('field31');
let field32 = document.getElementById('field32');
let field33 = document.getElementById('field33');
let fields = [
  field11,
  field12,
  field13,
  field21,
  field22,
  field23,
  field31,
  field32,
  field33,
];
let state = document.getElementById('state-text');
opponent = 'human';
sign = 'X';
game_mode = false;
state.innerHTML = 'Grasz z drugą osobą';
btn_back.disabled = true;

function CheckResult() {
  if (
    (field11.innerHTML == sign &&
      field12.innerHTML == sign &&
      field13.innerHTML == sign) ||
    (field21.innerHTML == sign &&
      field22.innerHTML == sign &&
      field23.innerHTML == sign) ||
    (field31.innerHTML == sign &&
      field32.innerHTML == sign &&
      field33.innerHTML == sign) ||
    (field11.innerHTML == sign &&
      field22.innerHTML == sign &&
      field33.innerHTML == sign) ||
    (field13.innerHTML == sign &&
      field22.innerHTML == sign &&
      field31.innerHTML == sign) ||
    (field11.innerHTML == sign &&
      field21.innerHTML == sign &&
      field31.innerHTML == sign) ||
    (field12.innerHTML == sign &&
      field22.innerHTML == sign &&
      field32.innerHTML == sign) ||
    (field13.innerHTML == sign &&
      field23.innerHTML == sign &&
      field33.innerHTML == sign)
  ) {
    if (sign == 'X') {
      if (opponent == 'human') {
        state.innerHTML = 'Wygrywa gracz 1';
      } else {
        state.innerHTML = 'Gratulacje, wygrałeś!';
      }
    } else {
      if (opponent == 'human') {
        state.innerHTML = 'Wygrywa gracz 2';
      } else {
        state.innerHTML = 'Niestety, wygrał komputer';
      }
    }
    game_mode = false;
    return true;
  } else if (
    (field11.innerHTML == 'X' || field11.innerHTML == 'O') &&
    (field12.innerHTML == 'X' || field12.innerHTML == 'O') &&
    (field13.innerHTML == 'X' || field13.innerHTML == 'O') &&
    (field21.innerHTML == 'X' || field21.innerHTML == 'O') &&
    (field22.innerHTML == 'X' || field22.innerHTML == 'O') &&
    (field23.innerHTML == 'X' || field23.innerHTML == 'O') &&
    (field31.innerHTML == 'X' || field31.innerHTML == 'O') &&
    (field32.innerHTML == 'X' || field32.innerHTML == 'O') &&
    (field33.innerHTML == 'X' || field33.innerHTML == 'O')
  ) {
    state.innerHTML = 'Mamy remis!';
    game_mode = false;
    return true;
  }
}

function CheckField(event) {
  if (game_mode) {
    event.currentTarget.innerHTML = sign;
    event.currentTarget.removeEventListener('click', CheckField);
    let index = fields.indexOf(event.currentTarget);
    fields.splice(index, 1);
    if (CheckResult()) return;
    if (opponent == 'human') {
      if (sign == 'X') {
        sign = 'O';
        state.innerHTML = 'Kolej gracza 2';
      } else {
        sign = 'X';
        state.innerHTML = 'Kolej gracza 1';
      }
    } else {
      random_field = fields.random();
      random_field.removeEventListener('click', CheckField);
      index = fields.indexOf(random_field);
      fields.splice(index, 1);
      random_field.innerHTML = 'O';
      sign = 'O';
      CheckResult();
      sign = 'X';
    }
  }
}

function Back(event) {
  game_mode = false;
  opponent = 'human';
  state.innerHTML = 'Grasz z drugą osobą';
  sign = 'X';
  for (i of buttons) {
    i.disabled = false;
  }
  btn_back.disabled = true;
  field11.innerHTML = '';
  field12.innerHTML = '';
  field13.innerHTML = '';
  field21.innerHTML = '';
  field22.innerHTML = '';
  field23.innerHTML = '';
  field31.innerHTML = '';
  field32.innerHTML = '';
  field33.innerHTML = '';
  fields = [
    field11,
    field12,
    field13,
    field21,
    field22,
    field23,
    field31,
    field32,
    field33,
  ];
}

function StartGame(event) {
  for (i of buttons) {
    i.disabled = true;
  }
  btn_back.disabled = false;
  game_mode = true;
  if (opponent == 'computer') {
    state.innerHTML = 'Twoja kolej';
  } else {
    state.innerHTML = 'Kolej gracza 1';
  }
  field11.addEventListener('click', CheckField);
  field12.addEventListener('click', CheckField);
  field13.addEventListener('click', CheckField);
  field21.addEventListener('click', CheckField);
  field22.addEventListener('click', CheckField);
  field23.addEventListener('click', CheckField);
  field31.addEventListener('click', CheckField);
  field32.addEventListener('click', CheckField);
  field33.addEventListener('click', CheckField);
}

function PickOpponent(event) {
  if (this.innerHTML == 'Komputer') {
    opponent = 'computer';
    state.innerHTML = 'Grasz z komputerem';
  } else if (this.innerHTML == 'Druga osoba') {
    opponent = 'human';
    state.innerHTML = 'Grasz z drugą osobą';
  }
}

btn_start.addEventListener('click', StartGame, false);
btn_back.addEventListener('click', Back, false);
for (i of btns_opponent) {
  i.addEventListener('click', PickOpponent, false);
}
