$(document).ready(function() {

  $("#github-link").hover(function(){
    $("#github-image").attr("src", "images/GitHub-Mark-Light-64px.png");
  },function(){
    $("#github-image").attr("src", "images/GitHub-Mark-64px.png");
  });

  $("#linkedin-link").hover(function(){
    $("#linkedin-image").attr("src", "images/In-White-66px-R.png");
  },function(){
    $("#linkedin-image").attr("src", "images/In-Black-66px-R.png");
  });
  $("#resume-link").hover(function(){
    $("#resume-image").attr("src","images/resumeIconWhite.png");
  },function(){
    $("#resume-image").attr("src","images/resumeIcon.png");
  });
  

});
