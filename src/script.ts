let number_one: number = 0
let number_two: number = 0
let number_result: number = 0

let result_show: boolean = false
let set_point: boolean = false

let c_point: number = 0

let set_operation: string

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
]

const display_number = document.getElementById('display-nmb') as HTMLHeadingElement
const display_operation = document.getElementById('display-opr') as HTMLParagraphElement

const btn_equal = document.getElementById('btn-equal') as HTMLButtonElement
const btn_del = document.getElementById('btn-del') as HTMLButtonElement
const btn_point = document.getElementById('btn-point') as HTMLButtonElement
const btn_backspace = document.getElementById('btn-backspace') as HTMLButtonElement
const btn_chg = document.getElementById('btn-chg') as HTMLButtonElement
const hst = document.getElementById('history') as HTMLDivElement

const btn_plus = document.getElementById('btn-plus') as HTMLButtonElement
const btn_mult = document.getElementById('btn-mult') as HTMLButtonElement
const btn_div = document.getElementById('btn-div') as HTMLButtonElement
const btn_sub = document.getElementById('btn-sub') as HTMLButtonElement

btn_equal.addEventListener('click', () => result())
btn_del.addEventListener('click', () => del())
btn_point.addEventListener('click', () => set_point = true)
btn_backspace.addEventListener('click', () => backspace())
btn_chg.addEventListener('click', () => change())

btn_plus.addEventListener('click', () => operation('+'))
btn_mult.addEventListener('click', () => operation('X'))
btn_div.addEventListener('click', () => operation('/'))
btn_sub.addEventListener('click', () => operation('-'))

IdBtnNumber.forEach(btn => {
    const btn_number = document.getElementById(btn) as HTMLButtonElement

    btn_number.addEventListener('click', () => {
        if(result_show){
            display_number.textContent = ''
            result_show = false
        }
        if(set_point && c_point == 0){
            display_number.textContent += '.'
            set_point = false
            c_point += 1
        }
        display_number.textContent += btn_number.value
    })
})

const result = () => {
    number_two = Number(display_number.textContent)

    switch(set_operation){
        case '+':
            number_result = number_one + number_two
            show_result()
            break
        case '-':
            number_result = number_one - number_two
            show_result()
            break
        case 'X':
            number_result = number_one * number_two
            show_result()
            break
        case '/':
            number_result = number_one / number_two
            show_result()
            break
        default:
            break
    }

    number_one = number_result
}

const operation = (op: string):void => {
    number_one = Number(display_number.textContent)
    display_operation.textContent = op
    display_number.textContent = ''
    set_operation = op
    c_point = 0
}

const show_result = () => {
    display_number.textContent = `${number_result}`
    display_operation.textContent = ''
    result_show = true
    c_point = 0
    history_create()
}

const del = () => {
    number_one = 0
    number_two = 0
    number_result = 0
    display_number.textContent = ''
    display_operation.textContent = ''
    c_point = 0
}

const backspace = () => {
    const number  = display_number.textContent
    const new_number = number?.slice(0, -1)

    display_number.textContent = String(new_number)
}

const change = () => {
    const number = display_number.textContent
    const change_number: number = Number(number) * -1

    display_number.textContent = String(change_number)
}

const history_create = () => {

    const div = document.createElement('div') as HTMLDivElement
    const h2 = document.createElement('h2') as HTMLHeadingElement
    const p = document.createElement('p') as HTMLParagraphElement

    h2.textContent = String(number_result)
    p.textContent = `${number_one} ${set_operation} ${number_two}`

    div.appendChild(p)
    div.appendChild(h2)

    hst.appendChild(div)
}
