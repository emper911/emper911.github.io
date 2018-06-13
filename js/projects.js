$(document).ready(function() {
    $(".carousel").carousel({
        keyboard: true,
        interval: false
    });
    $("#autogarden-button").onclick(function(){
        $(this).hide();
        $("#autogarden-video").get(0).play();
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