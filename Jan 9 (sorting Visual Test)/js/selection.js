async function selectionSort(arr, arr_cont) {
    for (let i = 0; i < arr.length - 1; i++) {
        let min = arr[i];
        let min_ind = i;
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < min) {
                min = arr[j];
                min_ind = j;
            }
        }

        await new Promise(res => {
            setTimeout(() => {                
                arr_cont[min_ind].style.background = 'red';
                res();
            },sp);
        })
        swap(arr, i, min_ind);
        await swap_cont(i, min_ind);     // defined in quicksort.js
        arr_cont[i].style.background = '#1dca1c';
    }
    arr_cont[arr.length - 1].style.background = '#1dca1c';
}
