$(document).ready(() => {
  // Init
  $(window).on('load', function () {
    getRecent();
  });

  // Handle
  $(document).on("click", "#recent-order", function () {
    getRecent();
  });

  $(document).on("click", "#confirmed-order", function () {
    getConfirm();
  });

  $(document).on("click", "#completed-order", function () {
    getComplete();
  });

  $(document).on("click", ".confirmed_parcel", function (e) {
    e.preventDefault();
    const id = $(this).data('id');
    updateStage(id, 0);
  });

  $(document).on("click", ".completed_parcel", function (e) {
    e.preventDefault();
    const id = $(this).data('id');
    updateStage(id, 1);
  });

  // Function
  function getRecent() {
    $.ajax({
      type: "GET",
      url: "/admin/ordered/getOrder",
      data: {
        stage: 0
      },
      success: function (response) {
        recentRendering(response);
      }
    });
  }

  function recentRendering(data) {
    $("#recent_items").html("");
    if (data.length == 0) {
      $("#recent_items").append(
        `
          <div class="col-12">
            <div class="text-center">Chưa có đơn hàng nào gần đây.</div>
          </div>
        `
      );
    } else {
      $.each(data, function (index, item) {
        let html = `
          <div class="col-sm-12 mb-4">
          <div class="card">
            <div class="card-header">
              <h5>${item.user} - (${item.createdAt}) - ${item._id}</h5>
              <div class="card-header-right">
                <div class="btn-group card-option">
                  <button type="button" class="btn dropdown-toggle btn-icon" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="feather icon-more-horizontal"></i>
                  </button>
                  <ul class="list-unstyled card-option dropdown-menu dropdown-menu-right">
                    <li data-id="${item._id}" class="dropdown-item confirmed_parcel">
                      <a href="">
                        <span><i class="feather icon-check"></i> Xác nhận</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-body">
             <div class="row">
              <div class="col-md-7">
                <h6>Sản phẩm:</h6>
        `;

        $.each(item.items, function (index, product) {
          html += `
            <div class="d-flex border my-1 p-1 rounded">
              <div class="mr-3">
                <img width="100px" height="100px" style="object-fit:cover;" src="/uploads/img/${product.product_id}" alt="" />
              </div>
              <div style="align-self:center;">
                <div>
                  <a class="text-overfl-2line" href="/product/${product.product_id}" style="width:100%; font-size:16px;">${product.product_name}</a>
                </div>
                <div class="my-1">
                  <span class="text-danger" style="font-weight :500;font-size:16px;">${priceFormat(product.price)}</span> / 1sp
                </div>
                <div>
                  <span>Số lượng: ${product.quantity}</span>
                </div>
              </div>
            </div>
          `;
        });

        html += `
                  <div class="d-flex justify-content-between my-3">
                    <span style="font-size:16px;">
                      Đơn vị vận chuyển: J&T Express
                    </span>
                    <span style="font-size:16px;">
                      Tổng đơn hàng: <span class="text-danger" style="font-size:18px;">${priceFormat(item.total_price)}</span>
                    </span>
                  </div>
                </div>
                <div class="col-md-5" style="font-size:17px;">
                  <h6>Thông tin khách hàng:</h6>
                  <table>
                    <tr>
                      <th style="font-weight: normal;min-width:110px;">Họ tên</th>
                      <td class="pr-1">:</td>
                      <td>${item.info.customer_name}</td>
                    </tr>
                    <tr>
                      <th style="font-weight: normal;min-width:110px;">Số điện thoại</th>
                      <td class="pr-1">:</td>
                      <td>(+84)${item.info.customer_phone}</td>
                    </tr>
                    <tr>
                      <th style="font-weight: normal;min-width:110px;">Địa chỉ</th>
                      <td class="pr-1">:</td>
                      <td>${item.info.customer_address}</td>
                    </tr>
                    <tr>
                      <th style="font-weight: normal;min-width:110px;">Ghi chú</th>
                      <td class="pr-1">:</td>
                      <td>${item.info.customer_note}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
        $("#recent_items").append(html);
      });
    }
  }

  function getConfirm() {
    $.ajax({
      type: "GET",
      url: "/admin/ordered/getOrder",
      data: {
        stage: 1
      },
      success: function (response) {
        confirmRendering(response);
      }
    });
  }

  function confirmRendering(data) {
    $("#confirmed_items").html("");
    if (data.length == 0) {
      $("#confirmed_items").append(
        `
          <div class="col-12">
            <div class="text-center">Chưa có đơn hàng nào gần đây.</div>
          </div>
        `
      );
    } else {
      $.each(data, function (index, item) {
        let html = `
          <div class="col-sm-12">
          <div class="card">
            <div class="card-header">
              <h5>${item.user} - (${item.createdAt}) - ${item._id}</h5>
              <div class="card-header-right">
                <div class="btn-group card-option">
                  <button type="button" class="btn dropdown-toggle btn-icon" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="feather icon-more-horizontal"></i>
                  </button>
                  <ul class="list-unstyled card-option dropdown-menu dropdown-menu-right">
                    <li data-id="${item._id}" class="dropdown-item completed_parcel">
                      <a href="">
                        <span><i class="feather icon-check"></i> Đã giao</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-body">
             <div class="row">
              <div class="col-md-7">
                <h6>Sản phẩm:</h6>
        `;

        $.each(item.items, function (index, product) {
          html += `
            <div class="d-flex border my-1 p-1 rounded">
              <div class="mr-3">
                <img width="100px" height="100px" style="object-fit:cover;" src="/uploads/img/${product.product_id}" alt="" />
              </div>
              <div style="align-self:center;">
                <div>
                  <a class="text-overfl-2line" href="/product/${product.product_id}" style="width:100%; font-size:16px;">${product.product_name}</a>
                </div>
                <div class="my-1">
                  <span class="text-danger" style="font-weight :500;font-size:16px;">${priceFormat(product.price)}</span> / 1sp
                </div>
                <div>
                  <span>Số lượng: ${product.quantity}</span>
                </div>
              </div>
            </div>
          `;
        });

        html += `
                  <div class="d-flex justify-content-between my-3">
                    <span style="font-size:16px;">
                      Đơn vị vận chuyển: J&T Express
                    </span>
                    <span style="font-size:16px;">
                      Tổng đơn hàng: <span class="text-danger" style="font-size:18px;">${priceFormat(item.total_price)}</span>
                    </span>
                  </div>
                </div>
                <div class="col-md-5" style="font-size:17px;">
                  <h6>Thông tin khách hàng:</h6>
                  <table>
                    <tr>
                      <th style="font-weight: normal;min-width:110px;">Họ tên</th>
                      <td class="pr-1">:</td>
                      <td>${item.info.customer_name}</td>
                    </tr>
                    <tr>
                      <th style="font-weight: normal;min-width:110px;">Số điện thoại</th>
                      <td class="pr-1">:</td>
                      <td>(+84)${item.info.customer_phone}</td>
                    </tr>
                    <tr>
                      <th style="font-weight: normal;min-width:110px;">Địa chỉ</th>
                      <td class="pr-1">:</td>
                      <td>${item.info.customer_address}</td>
                    </tr>
                    <tr>
                      <th style="font-weight: normal;min-width:110px;">Ghi chú</th>
                      <td class="pr-1">:</td>
                      <td>${item.info.customer_note}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
        $("#confirmed_items").append(html);
      });
    }
  }

  function getComplete() {
    $.ajax({
      type: "GET",
      url: "/admin/ordered/getOrder",
      data: {
        stage: 2
      },
      success: function (response) {
        completeRendering(response);
      }
    });
  }

  function completeRendering(data) {
    $("#complete_items").html("");
    if (data.length == 0) {
      $("#complete_items").append(
        `
          <div class="col-12">
            <div class="text-center">Chưa có đơn hàng nào gần đây.</div>
          </div>
        `
      );
    } else {
      $.each(data, function (index, item) {
        let html = `
          <div class="col-sm-12">
          <div class="card">
            <div class="card-header">
              <h5>${item.user} - (${item.createdAt}) - ${item._id}</h5>
            </div>
            <div class="card-body">
             <div class="row">
              <div class="col-md-7">
                <h6>Sản phẩm:</h6>
        `;

        $.each(item.items, function (index, product) {
          html += `
            <div class="d-flex border my-1 p-1 rounded">
              <div class="mr-3">
                <img width="100px" height="100px" style="object-fit:cover;" src="/uploads/img/${product.product_id}" alt="" />
              </div>
              <div style="align-self:center;">
                <div>
                  <a class="text-overfl-2line" href="/product/${product.product_id}" style="width:100%; font-size:16px;">${product.product_name}</a>
                </div>
                <div class="my-1">
                  <span class="text-danger" style="font-weight :500;font-size:16px;">${priceFormat(product.price)}</span> / 1sp
                </div>
                <div>
                  <span>Số lượng: ${product.quantity}</span>
                </div>
              </div>
            </div>
          `;
        });

        html += `
                  <div class="d-flex justify-content-between my-3">
                    <span style="font-size:16px;">
                      Đơn vị vận chuyển: J&T Express
                    </span>
                    <span style="font-size:16px;">
                      Tổng đơn hàng: <span class="text-danger" style="font-size:18px;">${priceFormat(item.total_price)}</span>
                    </span>
                  </div>
                </div>
                <div class="col-md-5" style="font-size:17px;">
                  <h6>Thông tin khách hàng:</h6>
                  <table>
                    <tr>
                      <th style="font-weight: normal;min-width:110px;">Họ tên</th>
                      <td class="pr-1">:</td>
                      <td>${item.info.customer_name}</td>
                    </tr>
                    <tr>
                      <th style="font-weight: normal;min-width:110px;">Số điện thoại</th>
                      <td class="pr-1">:</td>
                      <td>(+84)${item.info.customer_phone}</td>
                    </tr>
                    <tr>
                      <th style="font-weight: normal;min-width:110px;">Địa chỉ</th>
                      <td class="pr-1">:</td>
                      <td>${item.info.customer_address}</td>
                    </tr>
                    <tr>
                      <th style="font-weight: normal;min-width:110px;">Ghi chú</th>
                      <td class="pr-1">:</td>
                      <td>${item.info.customer_note}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
        $("#complete_items").append(html);
      });
    }
  }

  function updateStage(id, target) {
    $.ajax({
      type: "POST",
      url: "/admin/ordered/updateState",
      data: {
        id: id
      },
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
          if (target == 0) {
            getRecent();
          } else if (target == 1) {
            getConfirm();
          }
          Toast.fire({
            icon: 'success',
            title: 'Cập nhật thành công !!!'
          });
        }
      }
    });
  }
});