$(document).ready(function () {
  //Init
  $(window).on('load', function () {
    getTheLastest('laptop', 10, $("#owlcarousel1"));
    getTrending('dien-thoai', 10, $("#owlcarousel4"));
    getByName('logitech', 10, $("#owlcarousel2"));
    getByCate('linh-kien', 10, $("#owlcarousel3"));
  });

  // Handle

  // Function
  function owl(section, items = 5, margin = 80) {
    section.owlCarousel({
      loop: true,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      margin: margin,
      items: items,
      responsive: {
        0: {
          items: 2,
          margin: 5,
          center: true
        },
        480: {
          items: 2,
          margin: 20,
          center: true
        },
        768: {
          items: 3,
          margin: 5,
          center: false,
        },
        1000: {
          items: 4,
          margin: 5,
          center: false,
        },
        1200: {
          items: 5,
          margin: 5,
          center: false,
        }
      }
    });
  }

  function getTheLastest(cate, limit, section) {
    $.ajax({
      type: "GET",
      url: "/api/product/getproduct",
      data: {
        prd_cate: cate,
        limit: limit
      },
      success: function (response) {
        renderProduct(response, section);
        owl(section);
      }
    });
  };

  function getTrending(cate, limit, section) {
    $.ajax({
      type: "GET",
      url: "/api/product/getproduct",
      data: {
        prd_cate: cate,
        limit: limit,
        is_Trending: 1,
      },
      success: function (response) {
        renderProduct(response, section);
        owl(section);
      }
    });
  };

  function getByName(name, limit, section,) {
    $.ajax({
      type: "GET",
      url: "/api/product/getproduct",
      data: {
        search_name: name,
        limit: limit,
      },
      success: function (response) {
        renderProduct(response, section);
        owl(section,);
      }
    });
  };

  function getByCate(name, limit, section,) {
    $.ajax({
      type: "GET",
      url: "/api/product/getproduct",
      data: {
        prd_cate: name,
        limit: limit,
      },
      success: function (response) {
        renderProduct(response, section);
        owl(section,);
      }
    });
  };

  function renderProduct(data, section) {
    section.html("");
    $.each(data, function (index, item) {
      section.append(
        `
        <div class="item">
          <div class="prd_card p-2 px-5 d-flex flex-column" style="width: 260px;">
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
              <div class="prd_card-name my-2 text-center" style="min-height:50px;">
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
        </div>
        `
      );
    });
  }
});