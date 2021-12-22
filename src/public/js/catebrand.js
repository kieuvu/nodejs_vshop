$(document).ready(function () {
  //Init Function
  getCateBrand();

  //Handler
  $("#cate_submit").click(function (e) {
    e.preventDefault();
    if ($("#cate_name").val().length == 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Chưa điền đủ thông tin!!!',
        timerProgressBar: true,
        timer: 1500
      });
    } else {
      addCategory();
    }
  });

  $("#brand_submit").click(function (e) {
    e.preventDefault();
    if ($("#brand_name").val().length == 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Chưa điền đủ thông tin!!!',
        timerProgressBar: true,
        timer: 1500
      });
    } else {
      addBrand();
    }
  });

  $(document).on('click', '.delbtn', function (e) {
    e.preventDefault();
    const target = $(this).data('target');
    const id = $(this).data('id');

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
        deleteCateBrand(target, id);
      }
    });

  });

  //Function
  function getCateBrand() {
    $.ajax({
      type: "GET",
      url: "/admin/product/catebrand/getall",
      contentType: false,
      processData: false,
      success: function (response) {
        const categories = response.categories;
        const brands = response.brands;

        $("#cate_show").html('');
        $("#brand_show").html('');

        $.each(categories, function (index, item) {
          $("#cate_show").append(
            `
            <tr>
              <td>${index + 1}</td>
              <td>${item.cate_name}</td>
              <td>
                <button data-id="${item.cate_slug}" data-target="cate"
                class="btn btn-warning delbtn">Xóa</button>
              </td>
            </tr>
            `
          );
        });

        $.each(brands, function (index, item) {
          $("#brand_show").append(
            `
            <tr>
              <td>${index + 1}</td>
              <td>${item.brand_name}</td>
              <td>
                <button data-id="${item.brand_slug}" data-target="brand"
                class="btn btn-warning delbtn">Xóa</button>
              </td>
            </tr>
            `
          );
        });

      }
    });
  }

  function addCategory() {
    $.ajax({
      type: "POST",
      url: "/admin/product/catebrand/add",
      data: {
        cate_name: $("#cate_name").val(),
      },
      success: function (response) {
        if (response.err) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${response.msg}`,
            timerProgressBar: true,
            timer: 2000
          });
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Thêm thành công !!!`,
            timerProgressBar: true,
            timer: 1500
          }).then(() => {
            $("#cate_name").val("");
            getCateBrand();
          });
        }
      }
    });
  }

  function addBrand() {
    $.ajax({
      type: "POST",
      url: "/admin/product/catebrand/add",
      data: {
        brand_name: $("#brand_name").val(),
      },
      success: function (response) {
        if (response.err) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${response.msg}`,
            timerProgressBar: true,
            timer: 2000
          });
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Thêm thành công !!!`,
            timerProgressBar: true,
            timer: 1500
          }).then(() => {
            getCateBrand();
            $("#brand_name").val("");
          });
        }
      }
    });
  }

  function deleteCateBrand(target, id) {
    $.ajax({
      type: "DELETE",
      url: "/admin/product/catebrand/delete",
      data: {
        target: target,
        id: id
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
            getCateBrand();
          });
        }
      }
    });
  }
});
