$(document).ready(function () {
  //Init
  let currentState = 'all';
  getData(currentState);

  //Handle
  $(document).on('click', ".cancel_parcel", function () {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn hủy ?',
      text: "Hành động sẽ không thể phục hồi!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận!'
    }).then((result) => {
      if (result.isConfirmed) {
        const id = $(this).data('id');
        cancelParcel(id);
      }
    });

  });

  $(document).on('click', ".rebuy", function () {
    const id = $(this).data("id");
    rebuy(id);
  });

  $('#state').on('change', function () {
    currentState = $('#state').val();
    getData(currentState);
  });

  //Function

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

  function getData(currentState) {
    $.ajax({
      type: "GET",
      url: "/api/product/ordered/get",
      data: {
        stage: currentState,
      },
      beforeSend: function () {
        loading('#ordered_list');
      },
      success: function (response) {
        setTimeout(function () {
          renderData(response);
        }, 200);
      }
    });
  }

  function renderData(data) {
    $('#ordered_list').html("");

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
          <div class="border rounded p-3 mb-5">
            <div class="d-flex justify-content-between">
              <h6>${item.createdAt}</h6>
              <h6>Tình trạng: <span class="text-danger">${(item.stage) == 0 ? "Chờ xác nhận" : (item.stage) == 1 ? "Đang giao" : (item.stage) == 2 ? "Giao thành công" : "Đã hủy"}</span></h6>
            </div>
            <hr class="mt-1 mb-3">
            <div class="row">
              <div class="col-12 col-lg-6">
                <h6>Sản phẩm:</h6>
        `;

        $.each(item.items, function (i, value) {
          html += `
            <div class="d-flex align-items-center border rounded p-2 mb-2">
              <div class="mr-2">
                <div class=""><img width="100" src="/uploads/img/${value.product_id}"></div>
              </div>
              <div>
                <div class="pr-3">
                  <a class="text-overfl-2line" href="/product/${value.product_id}" style="width:100%;">
                    ${value.product_name}</a>
                </div>
                <div>
                  <span>Số lượng: ${value.quantity}</span>
                </div>
                <div>
                  <span class="text-danger" style="font-weight :500;">${priceFormat(value.price)}</span>
                </div>
              </div>
            </div>
          `;
        });

        html += `
          </div>
            <div class="col-12 col-lg-6">
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
              <hr />
              <h6>Thông tin đơn hàng:</h6>
              <div>
                <div>
                  <span>Đơn vị vận chuyển: <h6 class="d-inline">J&t Express</h6></span>
                </div>
                <div>
                  <span>Tổng đơn hàng: <span class="text-danger" style="font-weight :500;">${priceFormat(item.total_price)}</span></span>
                </div>
              </div>
            </div>
          </div>
          ${(item.stage) == 0 ?
            `
            <div class="text-right">
              <button data-id="${item._id}" class="btn btn-danger cancel_parcel">Hủy đơn</button>
            </div>
            `
            : (item.stage) == 1 ?
              `
              <div class="text-right">
                <button disabled class="btn btn-secondary disablebtn">Hủy đơn</button>
              </div>
              `
              :
              `
              <div class="text-right">
                <button data-id="${item._id}" class="btn btn-primary rebuy">Mua lại</button>
              </div>
              `
          }
        </div>
        `;
        $('#ordered_list').append(html);
      });
    }


  }

  function cancelParcel(id) {
    $.ajax({
      type: "POST",
      url: "/product/ordered/updateState",
      data: {
        id: id,
        cancel: true,
      },
      success: function () {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
        getData(currentState);
        Toast.fire({
          icon: 'success',
          title: 'Cập nhật thành công !'
        });
      }
    });
  }

  function rebuy(id) {
    $.ajax({
      type: "POST",
      url: "/product/cart",
      data: {
        id: id,
        rebuy: true
      },
      success: function (response) {
        if (!response.stt) {
          window.location.href = "/product/cart";
        }
      }
    });
  }
});