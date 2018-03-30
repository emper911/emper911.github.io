$(document).ready(function() {
    //boolean value isIndex = true or false
    $("#github-link").hover(function(){
        if($("html").attr("id") == "home"){
            $("#github-image").attr("src", "images/footer/GitHub-Mark-Light-64px.png");
        }//if current document is not index then
        else{
            $("#github-image").attr("src", "../images/footer/GitHub-Mark-Light-64px.png");
        }
    }, function(){
        if($("html").attr("id") == "home"){
            $("#github-image").attr("src", "images/footer/GitHub-Mark-64px.png");
        }//if current document is not index then
        else{
            $("#github-image").attr("src", "../images/footer/GitHub-Mark-64px.png");
        }
    });

    $("#linkedin-link").hover(function(){
        if($("html").attr("id") == "home"){
            $("#linkedin-image").attr("src", "images/footer/In-White-66px-R.png");
        }//if current document is not index then
        else{
            $("#linkedin-image").attr("src", "../images/footer/In-White-66px-R.png");
        } 
     }, function(){
        if($("html").attr("id") == "home"){
            $("#linkedin-image").attr("src", "images/footer/In-Black-66px-R.png");
        }//if current document is not index then
        else{
            $("#linkedin-image").attr("src", "../images/footer/In-Black-66px-R.png");
        } 
    });

    $("#resume-link").hover(function(){
        if($("html").attr("id") == "home"){
            $("#resume-image").attr("src","images/footer/resumeIconWhite.png");
        }//if current document is not index then
        else{
            $("#resume-image").attr("src","../images/footer/resumeIconWhite.png");
        } 
    },function(){
        if($("html").attr("id") == "home"){
            $("#resume-image").attr("src","images/footer/resumeIcon.png");
        }//if current document is not index then
        else{
            $("#resume-image").attr("src","../images/footer/resumeIcon.png");
        } 
    });
  

});
