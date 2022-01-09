let container = document.getElementById('container');
let el = document.getElementById('elements');
let speed = document.getElementById('speed');

let genArr = () => {
    let arr = [];
    for (let i = 0; i < el.value; i++) {
        let d = 80;
        let rand = Math.floor(Math.random() * d)
        if (rand === 0) {
            rand = Math.floor(Math.random() * d)
        }
        arr.push(rand);
    }
    return arr;
}

let printArr = (arr) => {
    while (container.lastChild) {
        container.removeChild(container.lastChild);
    }
    for (let i = 0; i < arr.length; i++) {
        let arr_div = document.createElement('div');
        arr_div.setAttribute('class', 'arr_div');
        arr_div.style.height = (arr[i]) + 'vh';
        arr_div.style.width = 40 / arr.length + 'vw';
        arr_div.style.border = 'none';
        arr_div.style.background = 'blue'
        container.append(arr_div);
    }
    let arr_cont = document.getElementsByClassName('arr_div');
    return arr_cont;
}

let a = genArr();
let arr_cont = printArr(a);


let sp = 1500 - speed.value;
speed.addEventListener('mouseup', () => {
    sp = 1500 - speed.value;
})

el.addEventListener('mouseup', (event) => {
    algo.selectedIndex = 0;
    console.log(el.value);
    a = genArr();
    arr_cont = printArr(a);

})

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

let algo = document.getElementById('algos');


algo.addEventListener('change', function () {
    //xconsole.log(algo.selectedIndex)
    if (algo.selectedIndex === 1) {        
        bubbleSort(a, arr_cont, false);
    }   
})


