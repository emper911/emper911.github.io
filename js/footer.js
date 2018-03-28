$(document).ready(function() {
    //boolean value isIndex = true or false
    $("#github-link").hover(function(){
        //if current document is not index then
        //$("#github-image").attr("src", "../images/footer/GitHub-Mark-Light-64px.png");
        $("#github-image").attr("src", "images/footer/GitHub-Mark-Light-64px.png");
    }, function(){
        //if current document is not index then
        //$("#github-image").attr("src", "../images/footer/GitHub-Mark-64px.png");
        $("#github-image").attr("src", "images/footer/GitHub-Mark-64px.png");
    });

    $("#linkedin-link").hover(function(){
        //if current document not index then
        //$("#linkedin-image").attr("src", "../images/footer/In-White-66px-R.png");
        $("#linkedin-image").attr("src", "images/footer/In-White-66px-R.png");
     }, function(){
        //if current document not index then
        //$("#linkedin-image").attr("src", "../images/footer/In-Black-66px-R.png");
        $("#linkedin-image").attr("src", "images/footer/In-Black-66px-R.png");
    });

    $("#resume-link").hover(function(){
        //if current document not index then
        //$("#resume-image").attr("src","../images/footer/resumeIconWhite.png");
        $("#resume-image").attr("src","images/footer/resumeIconWhite.png");
    },function(){
        //if current document not index then
        //$("#resume-image").attr("src","../images/footer/resumeIcon.png");
        $("#resume-image").attr("src","images/footer/resumeIcon.png");
    });
  

});
