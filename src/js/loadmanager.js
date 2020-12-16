var LoadManager = function(){
    this.items ={};
    //$(".loader-wrapper").show();
};
LoadManager.prototype.start = function(el){
    this.items[el] = true;
    //console.log("started: " + el);
    $(".loader-wrapper").show();
};
LoadManager.prototype.finish = function(el){
    //console.log("finished: " + el);
    this.items[el] = false;
    let done = true;
    for(let i in this.items){
        if (this.items[i]){
            done = false;
        }
    }
    if(done){
        //console.log("done");
        setTimeout(function(){
            $(".loader-wrapper").fadeOut();
        },1700);
        //$(".loader-wrapper").hide();
    }
};
var lm = new LoadManager();