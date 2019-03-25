$(function() {
  $("button").on("click", function() {
    let title = $(this).data("title");
    let link = $(this).data("link");
    let savedArticle = {
      title: title,
      link: link
    };
    $.ajax("/api/saved", {
      type: "POST",
      data: savedArticle
    }).then(function(response) {
      console.log(response);
      if (response.title === title) {
        $("button[data-title='" + title + "']")
          .parent()
          .remove();
      }
    });
  });
  $("");
});
