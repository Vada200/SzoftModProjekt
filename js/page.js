$(".button").off("mousemove").on("mousemove", function (e) {
    var x = e.pageX - e.target.offsetLeft;
    var y = e.pageY - e.target.offsetTop;
  
    e.target.style.setProperty("--x", x + "px");
    e.target.style.setProperty("--y", y + "px");
  });
  
$("#homePageButton").off("click").on("click", function () {
    location.href = "/";
  });
  