
async function cocktail(arr, arr_cont) {
    let swapped = true;
    let start = 0, end = arr.length;
    while (swapped) {
        swapped = false;

        for (let i = start; i < end - 1; i++) {            
            arr_cont[i].style.background = 'violet';
            arr_cont[i+1].style.background = 'violet';

            if (arr[i] > arr[i + 1]) {
                await new Promise(res => {
                    setTimeout(() => {
                        res();
                    }, sp)
                })

                swap(arr, i, i + 1);
                await swap_bubble_cont(arr_cont[i], arr_cont[i + 1]);
                swapped = true;
            }
            arr_cont[i].style.background = 'blue';
            arr_cont[i+1].style.background = 'blue';
        }

        arr_cont[end - 1].style.background = '#1dca1c';

        if (!swapped) {
            console.log('brea');
            break;
        }

        end -= 1;
        swapped = false;

        for (let i = end - 1; i >= start; i--) {
            arr_cont[i].style.background = 'violet';
            if(i != start)
            arr_cont[i-1].style.background = 'violet';

            if (arr[i] < arr[i - 1]) {
                swap(arr, i, i - 1);
                await new Promise(res => {
                    setTimeout(() => {
                        res();
                    }, sp)
                })                
                await swap_bubble_cont(arr_cont[i - 1], arr_cont[i]);
                swapped = true;
            }
            arr_cont[i].style.background = 'blue';       
        }
        arr_cont[start].style.background = '#1dca1c';
        start += 1;        
    }
    
    while (start != end) {
        await new Promise(res => {
            setTimeout(() => {
                arr_cont[start].style.background = '#1dca1c';
                res();
            }, sp);
        })
        start++;
    }
}