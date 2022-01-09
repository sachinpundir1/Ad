let swap_bubble_cont = (a, b) => {
    return new Promise(res => {
        window.requestAnimationFrame(function () {
            s = setTimeout(() => {
                container.insertBefore(b, a);
                res();
            }, sp+10)
        })
    })
}


let bubbleSort = async (a, arr_cont) => {    
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {

            arr_cont[j + 1].style.background = 'yellow';
            arr_cont[j].style.background = 'yellow';

            await new Promise((res, rej) => {
                setInterval(() => {
                    res();
                }, sp);
            })

            if (a[j] > a[j + 1]) {
               swap(a,j,j+1);
                await swap_bubble_cont(arr_cont[j], arr_cont[j + 1]);
            }
            arr_cont[j].style.background = 'blue'
        }
        arr_cont[arr_cont.length - i - 1].style.background = '#1dca1c';
    }    
}
