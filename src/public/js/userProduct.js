$(document).ready(function () {
  // Init
  let currentCate = 'all';
  let currentBrand = 'all';
  let currentSort = "product_new";

  $(window).on('load', function () {
    getCateBrand();
    getData(currentCate, currentBrand, currentSort);
  });

  // Handle
  $('#product_sort').on('change', function () {
    currentSort = $('#product_sort').val();
    getData(currentCate, currentBrand, currentSort);
  });

  $(document).on('click', '.cate-item', function (e) {
    e.preventDefault();
    $(".cate-item").removeClass("active");
    $(this).addClass("active");
    currentCate = $(this).data('slug');
    getData(currentCate, currentBrand, currentSort);
  });

  $(document).on('click', '.brand-item', function (e) {
    e.preventDefault();
    $(".brand-item").removeClass("active");
    $(this).addClass("active");
    currentBrand = $(this).data('slug');
    getData(currentCate, currentBrand, currentSort);
  });

  // Function
  function getCateBrand() {
    $.ajax({
      type: "GET",
      url: "/api/product/catebrand/getall",
      success: function (response) {
        const categories = response.categories;
        const brands = response.brands;

        $("#cateList").html('');
        $("#brandList").html('');

        $("#cateList").append(
          `
          <div class="list-group-item disabled mb-1 text-center text-dark" aria-disabled="true">Danh mục</div>
          <a href="" data-slug="all" class="list-group-item list-group-item-action active cate-item">Tất cả</a>
          `
        );
        $("#brandList").append(
          `
          <div class="list-group-item disabled mb-1 text-center text-dark" aria-disabled="true">Thương hiệu</div>
          <a href="" data-slug="all" class="list-group-item list-group-item-action active brand-item">Tất cả</a>
          `
        );

        $.each(categories, function (index, item) {
          $("#cateList").append(
            `
            <a href="" data-slug="${item.cate_slug}" class="list-group-item list-group-item-action cate-item">${item.cate_name}</a>
            `
          );
        });

        $.each(brands, function (index, item) {
          $("#brandList").append(
            `
            <a href="" data-slug="${item.brand_slug}" class="list-group-item list-group-item-action brand-item">${item.brand_name}</a>
            `
          );
        });

      }
    });
  }

  function scroolTop() {
    $("html, body").animate({ scrollTop: 0 }, 100);
  }

  function pagin(data) {
    $('#pagin').pagination({
      dataSource: data,
      pageSize: 24,
      callback: function (data, pagination) {
        currentPage = pagination.pageNumber;
        scroolTop();
        renderData(data);
      }
    });
  }

  function getData(cate, brand, sort) {
    $.ajax({
      type: "GET",
      url: "/api/product/getproduct",
      data: {
        prd_cate: cate,
        prd_brand: brand,
        sort: sort
      },
      beforeSend: function () {
        scroolTop();
        loading('#show_product');
      },
      success: function (response) {
        setTimeout(function () {
          pagin(response);
        }, 200);
      }
    });
  };

  function loading(selector) {
    $(selector).html("");
    $(selector).append(
      `
        <div class="col-12">
          <div class="d-flex justify-content-center align-items-center" style="min-height:50vh;">
            <img src="/img/746.gif" alt="" />
          </div>
        </div>
     `);
  }

  function renderData(data) {
    $('#show_product').html("");
    if (data.length == 0) {
      $('#show_product').append(
        `
         <div class="col-12 d-flex align-items-center justify-content-center" style="min-height:50vh;">
          <p>Chưa có sản phẩm nào.</p>
         </div>
        `
      );
    }

    $.each(data, function (index, item) {
      $('#show_product').append(
        `
          <div class="col-sm-6 col-md-4 col-lg-3 border prd_card p-2 d-flex flex-column">
            <div class="prd_card-img">
              <a class="d-block" href="/product/${item.prd_id}" style="position: relative;width: 100%;padding-top:66.6%;">
                <img
                  style=" position:absolute;top: 0;left: 0;bottom: 0;right: 0;height: 100%; width: 100%;object-fit:contain;"
                  class="card-img-top d-block img-fluid"
                  src="/uploads/img/${item.prd_id}"
                  alt="prd_image">
              </a>
            </div>
            <div style="min-height:80px;flex-grow:1;">
              <div class="prd_card-name my-2 text-center" style="min-height:50px; ">
                <a class="text-overfl-2line" href="/product/${item.prd_id}">${item.prd_name}</a>
              </div>
              <div class="prd_card-price text-center">
              ${(item.prd_priceSaled > 0) ? `
               <span><del style="font-size:13px;" class="text-muted">${priceFormat(item.prd_price)}</del></span>
               <span style="color:red;">${priceFormat(item.prd_priceSaled)}</span>
              ` : `
               <span style="color:red;">${priceFormat(item.prd_price)}</span>
              `}
              </div>
            </div>
            <div class="prd_card-detail my-2 text-center">
              <a href="/product/${item.prd_id}" class="btn btn-primary">Xem chi tiết</a>
            </div>
          </div>
        `
      );
    });
  }
});