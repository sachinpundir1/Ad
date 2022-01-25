
let obj = {
    b : 'b',
    fn : function a() {

        setTimeout(function(){
            console.log('inside timeout');
            console.log(this);
        }, close to Infinity);
    }
}

obj.fn();
