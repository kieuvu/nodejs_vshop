$(document).ready(function () {
  // Init
  const pathname = window.location.pathname.split("/");
  const id = pathname[pathname.length - 1];
  let prd_name;
  let prd_id;
  let prd_price;
  getProduct(id);

  // Handle
  $(window).on('load', function () {
    let currentImg = $('#relImg_1').attr('src');
    $("#bigImg").attr("src", currentImg);
    $('#relImg_1').click(function (e) {
      currentImg = $('#relImg_1').attr('src');
      $("#bigImg").attr("src", currentImg);
    });
    $('#relImg_2').click(function (e) {
      currentImg = $('#relImg_2').attr('src');
      $("#bigImg").attr("src", currentImg);
    });
    $('#relImg_3').click(function (e) {
      currentImg = $('#relImg_3').attr('src');
      $("#bigImg").attr("src", currentImg);
    });
    $('#relImg_4').click(function (e) {
      currentImg = $('#relImg_4').attr('src');
      $("#bigImg").attr("src", currentImg);
    });

    $('#add_cart').click(function (e) {
      e.preventDefault();
      if (prd_quantity == 0) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Sản phẩm đang tạm hết hàng !',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500
        });
      } else {
        const items = [
          {
            'product_name': prd_name,
            'product_id': prd_id,
            'price': +prd_price,
            'quantity': 1
          }
        ];
        addToCart(items);
      }
    });
  });
  $(document).on('click', '#readmore', function () {
    $('#prd_desc').removeClass("inactive");
    $('#readmore').addClass("hide");
    $('#hidden').removeClass("hide");
  });
  $(document).on('click', '#hidden', function () {
    $('#prd_desc').addClass("inactive");
    $('#hidden').addClass("hide");
    $('#readmore').removeClass("hide");
  });

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

  function getProduct(id) {
    $.ajax({
      type: "GET",
      url: "/api/product/getproduct",
      data: {
        prd_id: id
      },
      success: function (response) {
        prd_name = response[0].prd_name;
        prd_id = response[0].prd_id;
        prd_price = response[0].prd_price;
        renderData(response);
      }
    });
  };

  function renderData(data) {
    data = data[0];
    $("#breadcrumbName").html(data.prd_name);
    $("#relImg_1").attr("src", `/uploads/img/${data.prd_id}`);
    $("#relImg_2").attr("src", `/uploads/img/${data.prd_id + "_1"}`);
    $("#relImg_3").attr("src", `/uploads/img/${data.prd_id + "_2"}`);
    $("#relImg_4").attr("src", `/uploads/img/${data.prd_id + "_3"}`);
    $("#prd_name").html(data.prd_name);
    $("#prd_price").html(
      `
      ${(data.prd_priceSaled > 0) ? `
      <span><del style="font-size:13px;" class="text-muted">${priceFormat(data.prd_price)}</del></span>
      <span style="color:red; font-size:18px; font-weight:600;">${priceFormat(data.prd_priceSaled)}</span>
     ` : `
      <span style="color:red; font-size:18px; font-weight:600;">${priceFormat(data.prd_price)}</span>
     `}
      `
    );
    $("#prd_quantity").html(
      `
        ${(data.prd_quantity > 0) ? `Còn hàng (${data.prd_quantity})` : "Hết hàng"}
      `
    );
    $("#prd_brand").html(data.prd_brand);
    $("#prd_cate").html(data.prd_cate);
    $("#prd_desc").append(data.prd_desc);
    if (data.prd_chip.length > 0) {
      $('#detailSpec').append(
        `
        <tr>
          <th style="font-weight: normal;min-width:110px;">Chip xử lý</th>
          <td id="prd_chip">${data.prd_chip}</td>
        </tr>
        `
      );
    }
    if (data.prd_ram.length > 0) {
      $('#detailSpec').append(
        `
        <tr>
          <th style="font-weight: normal;min-width:110px;">Thông số RAM</th>
          <td id="prd_ram">${data.prd_ram}</td>
        </tr>
        `
      );
    }
    if (data.prd_rom.length > 0) {
      $('#detailSpec').append(
        `
        <tr>
          <th style="font-weight: normal;min-width:110px;">Bộ nhớ trong</th>
          <td id="prd_rom">${data.prd_rom}</td>
        </tr>
        `
      );
    }
    if (data.prd_display.length > 0) {
      $('#detailSpec').append(
        `
        <tr>
          <th style="font-weight: normal;min-width:110px;">Màn hình</th>
          <td id="prd_display">${data.prd_display}</td>
        </tr>
        `
      );
    }
    if (data.prd_os.length > 0) {
      $('#detailSpec').append(
        `
        <tr>
          <th style="font-weight: normal;min-width:110px;">Hệ điều hành</th>
          <td id="prd_os">${data.prd_os}</td>
        </tr>
        `
      );
    }
    if (data.prd_camera.length > 0) {
      $('#detailSpec').append(
        `
        <tr>
          <th style="font-weight: normal;min-width:110px;">Camera</th>
          <td id="prd_camera">${data.prd_camera}</td>
        </tr>
        `
      );
    }
    if (data.prd_battery.length > 0) {
      $('#detailSpec').append(
        `
        <tr>
          <th style="font-weight: normal;min-width:110px;">Pin</th>
          <td id="prd_battery">${data.prd_battery}</td>
        </tr>
        `
      );
    }
    if (data.prd_gcard.length > 0) {
      $('#detailSpec').append(
        `
        <tr>
          <th style="font-weight: normal;min-width:110px;">Card đồ họa</th>
          <td id="prd_gcard">${data.prd_gcard}</td>
        </tr>
        `
      );
    }
    if (data.prd_weight > 0) {
      $('#detailSpec').append(
        `
        <tr>
          <th style="font-weight: normal;min-width:110px;">Trọng lượng</th>
          <td id="prd_weight">${data.prd_weight} kg</td>
        </tr>
        `
      );
    }
    if (data.prd_size.length > 0) {
      $('#detailSpec').append(
        `
        <tr>
          <th style="font-weight: normal;min-width:110px;">Kích thước</th>
          <td id="prd_size">${data.prd_size}</td>
        </tr>
        `
      );
    }
    if (data.prd_date > 0) {
      $('#detailSpec').append(
        `
        <tr>
          <th style="font-weight: normal;min-width:110px;">Năm sản xuất</th>
          <td id="prd_date">${data.prd_date}</td>
        </tr>
        `
      );
    }
    if (data.prd_material.length > 0) {
      $('#detailSpec').append(
        `
        <tr>
          <th style="font-weight: normal;min-width:110px;">Màu, chất liệu</th>
          <td id="prd_material">${data.prd_material}</td>
        </tr>
        `
      );
    }

    getByCate(data.prd_cate, 10, $("#owlcarousel1"));

  }

  function addToCart(items) {
    $.ajax({
      type: "POST",
      url: "/product/cart",
      data: {
        items: JSON.stringify(items)
      },
      dataType: 'JSON',
      success: function (response) {
        if (!response.err) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });
          cartBadgeCount();
          Toast.fire({
            icon: 'success',
            title: 'Đang thêm vào giỏ hàng...'
          }).then(() => {
            Toast.fire({
              icon: 'success',
              title: 'Thêm thành công !'
            });
          });
        } else {
          if (response.err && !response.hasAccount) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Đăng nhập để tiếp tục !',
              footer: '<a href="/login">Bấm vào đây để đăng nhập</a>',
              timerProgressBar: true,
              showConfirmButton: true,
              timer: 3000
            });
          }
        }
      }
    });
  }
});
