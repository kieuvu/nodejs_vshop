$(document).ready(function () {
  //Init
  $(window).on('load', function () {
    getUser();
  });

  //Handle
  $("#filter_btn").click(function (e) {
    e.preventDefault();
    getUser();
  });

  $(document).on('click', ".del", function () {
    const id = $(this).data("id");
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
        deleteUser(id);
      }
    });
  });

  $(document).on('click', ".edit", async function () {
    const currentPerm = $(this).data('current');
    const target = $(this).data('id');

    const { value: perm } = await Swal.fire({
      title: 'Phân quyền',
      input: 'select',
      inputOptions: {
        1: 'Admin',
        2: 'Nhân viên',
        3: 'Khách hàng',
      },
      showCancelButton: true,
      inputValidator: (value) => {
        console.log(value, currentPerm);
        return new Promise((resolve) => {
          if (value != currentPerm) {
            Swal.fire({
              title: 'Có chắc chắn muốn thay đổi?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Thay đổi!'
            }).then((result) => {
              if (result.isConfirmed) {
                updateUser(target, value);
              }
            });
          } else {
            resolve("Tài khoản hiện đang ở trạng thái này");
          }
        });
      }
    });
  });

  //Function
  function pagin(data) {
    $('#pagin').pagination({
      dataSource: data,
      pageSize: 20,
      callback: function (data, pagination) {
        currentPage = pagination.pageNumber;
        renderData(data);
      }
    });
  }

  function getUser() {
    const search = $.trim($("#search_name").val());
    const userperm = $("#userperm").val();

    $.ajax({
      type: "GET",
      url: "/admin/user/get",
      data: {
        search_name: search,
        userperm: userperm
      },
      success: function (response) {
        pagin(response);
      }
    });
  }

  function renderData(data) {
    $("#user_show").html("");
    if (data.length == 0) {
      $("#user_show").append(
        `
          <tr>
            <td colspan="9">
              <div class ="text-center">
                Chưa có tài khoản nào.
              </div>
            </td>
          </tr>
        `
      );
    }

    $.each(data, function (index, item) {
      $("#user_show").append(
        `
          <tr>
            <td>${item.username}</td>
            <td>${(item.userperm == 1) ? "Admin" : (item.userperm == 2) ? "Nhân viên" : "Khách hàng"}</td>
            <td>${item.createdAt}</td>
            <td>
              <button class="btn btn-primary edit" data-id="${item.username}" data-current="${item.userperm}">Phân quyền</button>
              <button class="btn btn-danger del" data-id="${item.username}">Xóa</button>
            </td>
          </tr>
        `
      );
    });

    scroolTop();
  }

  function deleteUser(id) {
    $.ajax({
      type: "DELETE",
      url: "/admin/user/delete",
      data: {
        target: id
      },
      success: function (response) {
        if (!response.err) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Xóa thành công !!!`,
            timerProgressBar: true,
            timer: 1500
          }).then(() => {
            getUser();
          });
        }
      }
    });
  }

  function updateUser(id, newPerm) {
    $.ajax({
      type: "PATCH",
      url: "/admin/user/update",
      data: {
        target: id,
        newPerm: newPerm
      },
      success: function (response) {
        if (!response.err) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Sửa thành công !!!`,
            timerProgressBar: true,
            timer: 1500
          }).then(() => {
            getUser();
          });
        }
      }
    });
  }

  function scroolTop() {
    $("html, body").animate({ scrollTop: 0 }, 100);
  }
});