$(document).ready(function () {
  //Init
  getPost();

  //Handle
  $(document).on('click', '.delete_post', function (e) {
    e.preventDefault();
    Swal.fire({
      title: 'Có chắc chắn muốn xóa?',
      text: "Hành động này sẽ không thể phục hồi!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const id = $(this).data('id');
        deletePost(id);
      }
    });
  });

  $("#search").click(function (e) {
    e.preventDefault();
    const searchValue = $("#searchValue").val();
    if ($.trim(searchValue).length > 0) {
      getPost($.trim(searchValue));
    } else {
      getPost("");
    }
  });

  //Function
  function getPost(search = "") {
    $.ajax({
      type: "GET",
      url: "/admin/post/getPost",
      data: {
        search: (search.length > 0) ? search : "",
      },
      success: function (response) {
        pagin(response);
      }
    });
  }

  function pagin(data) {
    $('#pagin').pagination({
      dataSource: data,
      pageSize: 15,
      callback: function (data, pagination) {
        console.log(pagination);
        currentPage = pagination.pageNumber;
        renderData(data);
      }
    });
  }

  function renderData(data) {
    $("#post_item").html("");
    $.each(data, function (index, item) {
      $("#post_item").append(
        `
          <div class="card">
              <div class="card-header">
                  <h5>Tác giả: ${item.author} - ${item.updatedAt}</h5>
                      <div class="card-header-right">
                          <div class="btn-group card-option">
                              <button type="button" class="btn dropdown-toggle btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i class="feather icon-more-horizontal"></i>
                              </button>
                              <ul class="list-unstyled card-option dropdown-menu dropdown-menu-right">
                                  <li class="dropdown-item edit_post"><a href="/admin/post/edit/${item._id}"><i class="feather icon-edit"></i>Sửa bài viết</a></li>
                                  <li class="dropdown-item delete_post" data-id="${item._id}"><a href=""><i class="feather icon-trash"></i>Xóa bài viết</a></li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div class="card-body">
                      <h6><a href="/post/${item._id}">${item.title}</a></h6>
                  </div>
              </div>
          </div>
        `
      );
    });
    scroolTop();
  }

  function scroolTop() {
    $("html, body").animate({ scrollTop: 0 }, 100);
  }

  function deletePost(id) {
    $.ajax({
      type: "DELETE",
      url: "/admin/post/delete",
      data: {
        id: id
      },
      success: function (response) {
        if (!response.stt) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xóa thành công !!!',
            showConfirmButton: true,
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            getPost();
          });
        }
      }
    });
  }
});