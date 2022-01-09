let quicksort = async (arr, l, h, arr_cont) => {
    if (l < h) {
        let p = await partition(arr, l, h, arr_cont);
        await quicksort(arr, l, p - 1, arr_cont);
        await quicksort(arr, p + 1, h, arr_cont);
    }
    return arr;
}

let swap_cont = (a, b) => {
    return new Promise(res => {
        window.requestAnimationFrame(function () {
            s = setTimeout(() => {
                container.insertBefore(arr_cont[b], arr_cont[a]);
                container.insertBefore(arr_cont[a + 1], arr_cont[b + 1]);
                res();
            }, sp + 10)
        })
    })
}

let swap_pivot = (a, h) => {
    return new Promise(res => {
        window.requestAnimationFrame(function () {
            s = setTimeout(() => {
                container.insertBefore(arr_cont[a], arr_cont[h]);
                arr_cont[h].style.background = 'blue';
                container.insertBefore(arr_cont[h], arr_cont[a]);

                res();
            }, sp + 10)
        })
    })
}

// partition the recieved array based on the pivot element and finally found a suitable index for pivot element

let partition = async (arr, l, h, arr_cont) => {
    let pivot = arr[h];
    arr_cont[h].style.background = 'red';
    let i = l - 1;
    for (let j = l; j < h; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
            await swap_cont(i, j);
            arr_cont[j].style.background = 'blue'
        }
    }
    swap(arr, i + 1, h);
    await swap_pivot(i + 1, h);


    return i + 1;
}
