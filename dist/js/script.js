"use strict";
let number_one = 0;
let number_two = 0;
let number_result = 0;
let result_show = false;
let set_point = false;
let c_point = 0;
let set_operation = '';
const IdBtnNumber = [
    'btn-number-1',
    'btn-number-2',
    'btn-number-3',
    'btn-number-4',
    'btn-number-5',
    'btn-number-6',
    'btn-number-7',
    'btn-number-8',
    'btn-number-9',
    'btn-number-0'
];
const display_number = document.getElementById('display-nmb');
const display_operation = document.getElementById('display-opr');
const hst = document.getElementById('history');
const btn_equal = document.getElementById('btn-equal');
const btn_del = document.getElementById('btn-del');
const btn_point = document.getElementById('btn-point');
const btn_backspace = document.getElementById('btn-backspace');
const btn_chg = document.getElementById('btn-chg');
const btn_plus = document.getElementById('btn-plus');
const btn_mult = document.getElementById('btn-mult');
const btn_div = document.getElementById('btn-div');
const btn_sub = document.getElementById('btn-sub');
const btn_fat = document.getElementById('btn-fat');
const btn_per = document.getElementById('btn-per');
btn_equal.addEventListener('click', () => result());
btn_del.addEventListener('click', () => del());
btn_point.addEventListener('click', () => set_point = true);
btn_backspace.addEventListener('click', () => backspace());
btn_chg.addEventListener('click', () => change());
btn_plus.addEventListener('click', () => operation('+'));
btn_mult.addEventListener('click', () => operation('X'));
btn_div.addEventListener('click', () => operation('/'));
btn_sub.addEventListener('click', () => operation('-'));
btn_fat.addEventListener('click', () => fatorial());
btn_per.addEventListener('click', () => percent());
IdBtnNumber.forEach(btn => {
    const btn_number = document.getElementById(btn);
    btn_number.addEventListener('click', () => {
        if (result_show) {
            display_number.textContent = '';
            result_show = false;
        }
        if (set_point && c_point == 0) {
            display_number.textContent += '.';
            set_point = false;
            c_point += 1;
        }
        display_number.textContent += btn_number.value;
    });
});
const result = (op_cient) => {
    if (!op_cient) {
        number_two = Number(display_number.textContent);
    }
    switch (set_operation) {
        case '+':
            number_result = number_one + number_two;
            show_result();
            break;
        case '-':
            number_result = number_one - number_two;
            show_result();
            break;
        case 'X':
            number_result = number_one * number_two;
            show_result();
            break;
        case '/':
            number_result = number_one / number_two;
            show_result();
            break;
        default:
            break;
    }
    number_one = number_result;
};
const operation = (op) => {
    number_one = Number(display_number.textContent);
    display_operation.textContent = op;
    display_number.textContent = '';
    set_operation = op;
    c_point = 0;
};
const show_result = (op_cient) => {
    display_number.textContent = `${number_result}`;
    display_operation.textContent = '';
    result_show = true;
    c_point = 0;
    history_create(op_cient);
    set_operation = '';
};
const del = () => {
    number_one = 0;
    number_two = 0;
    number_result = 0;
    display_number.textContent = '';
    display_operation.textContent = '';
    c_point = 0;
};
const backspace = () => {
    const number = display_number.textContent;
    const new_number = number === null || number === void 0 ? void 0 : number.slice(0, -1);
    display_number.textContent = String(new_number);
};
const change = () => {
    const number = display_number.textContent;
    const change_number = Number(number) * -1;
    display_number.textContent = String(change_number);
};
const history_create = (op_cient) => {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    if (op_cient) {
        h2.textContent = String(number_result);
        p.textContent = `${number_result}!`;
    }
    else {
        h2.textContent = String(number_result);
        p.textContent = `${number_one} ${set_operation} ${number_two}`;
    }
    div.appendChild(p);
    div.appendChild(h2);
    hst.appendChild(div);
};
const fatorial = () => {
    let number_fat = Number(display_number.textContent);
    let result_fat = 1;
    while (number_fat > 0) {
        result_fat = result_fat * number_fat;
        number_fat -= 1;
    }
    if (set_operation != '') {
        number_two = result_fat;
        result(true);
    }
    else {
        number_result = result_fat;
        show_result(true);
    }
};
const percent = () => {
    number_one = Number(display_number.textContent);
    display_operation.textContent = `${number_one}%`;
    number_one = number_one / 100;
    set_operation = 'X';
    display_number.textContent = '';
};
