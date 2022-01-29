$(document).ready(function () {
  //INIT
  getPost();
  //Handle

  //Function
  function getPost() {
    $.ajax({
      type: "GET",
      url: "/post/getPost",
      success: function (response) {
        pagin(response);
      }
    });
  }

  function pagin(data) {
    $('#pagin').pagination({
      dataSource: data,
      pageSize: 16,
      callback: function (data, pagination) {
        currentPage = pagination.pageNumber;
        renderData(data);
      }
    });
  }

  function scroolTop() {
    $("html, body").animate({ scrollTop: 0 }, 100);
  }

  function renderData(data) {
    $("#postItems").html("");
    $.each(data, function (index, item) {
      $("#postItems").append(
        `
        <div class="col-md-6 mb-5">
          <div class="d-flex align-items-center">
            <div class="mr-2">
              <a href="/post/${item._id}"><img src="img/hidden.png" style="object-fit:contain;width:100px" alt="" /></a>
            </div>
            <div>
              <div>
                <a class="text-overfl-2line" href="/post/${item._id}"><h6>${item.title}</h6></a>
              </div>
              <div>
              <p class="text-secondary m-0 mt-1">${item.updatedAt.split("T")[0]}</p>
                <p class="text-secondary m-0">Tác giả: ${item.author}</p>
              </div>
            </div>
          </div>
        </div>
        `
      );

    });
    scroolTop();
  }
});