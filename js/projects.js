$(document).ready(function() {
    $(".carousel").carousel({
        keyboard: true,
        interval: false
    });
    $("#autogarden-video").onclick(function(event){
        $("#autogarden-video").trigger("play()");
    });
    /*
        $("#autogarden-video").click(function(){
            if (clicked == true){
                $("#autogarden-video").get(0).pause();
                clicked = false;
            }
            else{
                clicked = true;
                $("#autogarden-video").get(0).play();
            }
        });
    */  
});