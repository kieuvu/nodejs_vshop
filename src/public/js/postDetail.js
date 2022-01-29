$(document).ready(function () {
  //Init
  const pathname = window.location.pathname.split("/");
  const id = pathname[pathname.length - 1];
  let data = {};
  getPost(id);
  //Handle

  //Function
  function getPost(id) {
    $.ajax({
      type: "GET",
      url: "/post/getPost",
      data: {
        id: id,
      },
      success: function (response) {
        renderData(response);
      }
    });
  }

  function getLimit() {
    $.ajax({
      type: "get",
      url: "/post/getPost",
      data: {
        limit: 5
      },
      success: function (response) {
        renderRecent(response);
      }
    });
  }

  function renderRecent(data) {
    $("#recent_item").html("");
    $.each(data, function (index, item) {
      $("#recent_item").append(
        `
          <li><a class="text-overfl-1line" href="/post/${item._id}">${item.title}</a></li>
        `
      );
    });
  }

  function renderData(data) {
    $("#post_title").html(data[0].title);
    $("#post_author").html("Tác giả: " + data[0].author);
    $("#post_time").html((data[0].updatedAt).split("T")[0]);
    $("#post_content").html(data[0].content);
    getLimit();
  }
});