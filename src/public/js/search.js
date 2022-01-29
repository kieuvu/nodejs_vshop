$(document).ready(function () {
  //Init
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get('q');

  getProduct(param);
  //Handle

  //Function
  function getProduct(string) {
    $.ajax({
      type: "GET",
      url: "/api/product/getproduct",
      data: {
        search_name: string
      },
      success: function (response) {
        pagin(response);
      }
    });
  }

  function pagin(data) {
    $('#pagin').pagination({
      dataSource: data,
      pageSize: 24,
      callback: function (data, pagination) {
        currentPage = pagination.pageNumber;
        renderData(data);
      }
    });
  }

  function renderData(data) {
    $('#show_product').html("");
    if (data.length == 0) {
      $('#show_product').append(
        `
         <div class="col-12 mb-5">
          <div class="text-center">Không tìm thấy sản phẩm nào.</div>
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
    scroolTop();
  }

  function scroolTop() {
    $("html, body").animate({ scrollTop: 0 }, 100);
  }
});