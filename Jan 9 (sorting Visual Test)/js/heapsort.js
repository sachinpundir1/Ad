function left(index) {
    return 2 * index + 1;
}

function right(index) {
    return 2 * (index + 1);
}

let swap_heap_cont = (a, b) => {
    return new Promise(res => {
        window.requestAnimationFrame(function () {
            s = setTimeout(() => {
                container.insertBefore(arr_cont[b], arr_cont[a]);
                container.insertBefore(arr_cont[a], arr_cont[b]);
                res();
            }, sp + 10)
        })
    })
}

function maxHeapify(arr, i, heapsize) {
    let l = left(i);
    let r = right(i);
    let largest;
    if (l < heapsize && arr[l] > arr[i]) {
        largest = l;
    }
    else
        largest = i;
    if (r < heapsize && arr[r] > arr[largest]) {
        largest = r;
    }

    if (largest != i) {
        swap(arr, largest, i)
        swap_heap_cont(largest, i);
        maxHeapify(arr, largest, heapsize)
    }
}

function build_max_heap(arr, heapsize) {
    for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
        maxHeapify(arr, i, heapsize)
    }
}

async function Heapsort(arr, heapsize) {
    build_max_heap(arr, heapsize);

    for (let i = arr.length - 1; i > 0; i--) {
        swap(arr, i, 0);
        await swap_heap_cont(i, 0);
        arr_cont[i].style.background = '#1dca1c';

        heapsize -= 1;
        maxHeapify(arr, 0, heapsize);
    }
    arr_cont[0].style.background = '#1dca1c';
    return arr;
}
