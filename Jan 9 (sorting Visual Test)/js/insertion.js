function swap_insertion(a,b){
    return new Promise(res => {
        window.requestAnimationFrame(() => {
            s = setTimeout(function(){
                container.insertBefore(arr_cont[b], arr_cont[a]);
                container.insertBefore(arr_cont[a + 1], arr_cont[b + 1]);
                res();
            },sp+10)
        })
    })
}

async function insertion(arr,arr_cont){
    for(let i = 1; i < arr.length; i++){
        let temp = arr[i];

        let j = i-1;
        while(arr[j] > temp && j >= 0){
            await new Promise(res => {
                setTimeout(() => {
                    res();
                },sp)
            })
            arr_cont[j+1].style.background = 'blue'
            arr_cont[j].style.background = 'blue'
            arr[j+1]= arr[j];                      
            await swap_bubble_cont(arr_cont[j],arr_cont[j+1]);                          
            arr_cont[j+1].style.background = 'yellow'
            j--;
        }
        arr_cont[j+1].style.background = 'yellow'
        arr[j+1] = temp;                
    }
    
}