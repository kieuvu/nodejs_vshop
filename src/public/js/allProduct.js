$(document).ready(function () {
  // Init
  getCateBrand();

  // Handler
  $(window).on("load", function () {
    getProduct();
  });

  $(document).on('click', '.delbtn', function () {
    const productID = $(this).data("id");
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
        deleteProduct(productID);
      }
    });
  });

  $("#filter_btn").click(function (e) {
    e.preventDefault();
    getProduct();
  });

  // Function
  function pagin(data) {
    $('#pagin').pagination({
      dataSource: data,
      pageSize: 10,
      callback: function (data, pagination) {
        currentPage = pagination.pageNumber;
        renderData(data);
      }
    });
  }

  function scroolTop() {
    $("html, body").animate({ scrollTop: 0 }, 100);
  }

  function getCateBrand() {
    $.ajax({
      type: "GET",
      url: "/admin/product/catebrand/getall",
      success: function (response) {
        const categories = response.categories;
        const brands = response.brands;

        $("#prd_cate").html('');
        $("#prd_brand").html('');

        $("#prd_cate").append(`<option value='all'>Tất Cả</option>`);
        $("#prd_brand").append(`<option value='all'>Tất Cả</option>`);

        $.each(categories, function (index, item) {
          $("#prd_cate").append(
            `
              <option value='${item.cate_slug}'>${item.cate_name}</option>
            `
          );
        });

        $.each(brands, function (index, item) {
          $("#prd_brand").append(
            `
              <option value='${item.brand_slug}'>${item.brand_name}</option>
            `
          );
        });

      }
    });
  }

  function getProduct() {
    const search = $.trim($("#search_name").val());
    const brand = $("#prd_brand").val();
    const cate = $("#prd_cate").val();
    const trend = $('#prd_trend').val();

    console.log($('#prd_trend').val());

    $.ajax({
      type: "GET",
      url: "/admin/product/getproduct",
      data: {
        search_name: search,
        prd_brand: brand,
        prd_cate: cate,
        is_Trending: trend
      },
      success: function (response) {
        pagin(response);
      }
    });
  }

  function deleteProduct(id) {
    $.ajax({
      type: "DELETE",
      url: "/admin/product/delete",
      data: {
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
            getProduct();
          });
        }
      }
    });
  }

  function renderData(data) {
    $("#product_show").html("");

    if (data.length == 0) {
      $("#product_show").append(
        `
          <tr>
            <td colspan="9">
              <div class ="text-center">
                Chưa có sản phẩm nào.
              </div>
            </td>
          </tr>
        `
      );
    }

    $.each(data, function (index, item) {
      $("#product_show").append(
        `
        <tr>
          <td>
           <div>
            <a  style="max-width:450px;" class="d-block text-overfl-2line" href="/product/${item.prd_id}">${item.prd_name}</a>
           </div>
          </td>
          <td>
            ${(item.prd_priceSaled > 0) ? `
            <span><del style="font-size:13px;" class="text-muted d-block">${priceFormat(item.prd_price)}</del></span>
            <span style="color:red;">${priceFormat(item.prd_priceSaled)}</span>
          ` : `
            <span style="color:red;">${priceFormat(item.prd_price)}</span>
          `}
          </td>
          <td>${item.prd_quantity}</td>
          <td>${(item.prd_isTrending == 1) ? "Đang HOT" : "Không HOT"}</td>
          <td>${item.prd_brand}</td>
          <td>${item.prd_cate}</td>
          <td>
            <img width=" 80px" height="80px" style="object-fit: cover;"
              src="/uploads/img/${item.prd_id}" alt="">
          </td>
          <td>
            <a href="/admin/product/edit/${item.prd_id}" class="text-white btn btn-warning">Sửa</a>
            <button data-id="${item.prd_id}" class="btn btn-danger delbtn">Xóa</button>
          </td>
        </tr>
        `
      );
    });
    scroolTop();
  }
})