$(".button").on("mousemove", function (e) {  
  const x = e.pageX - e.target.offsetLeft - e.target.offsetParent.offsetParent.offsetLeft -e.target.offsetParent.offsetLeft;
  const y = e.pageY - e.target.offsetTop - e.target.offsetParent.offsetParent.offsetTop - e.target.offsetParent.offsetTop;

  e.target.style.setProperty("--x", x + "px");
  e.target.style.setProperty("--y", y + "px");
});
  
/* $("#homePageButton").off("click").on("click", function () {
    location.href = "/";
  });
   */