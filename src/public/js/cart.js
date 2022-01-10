$(document).ready(function () {
  // Init
  getData();

  // Handle
  $(document).on('click', '.numUp', function (e) {
    e.preventDefault();
    const items = [
      {
        product_id: $(this).data('id'),
        price: $(this).data('price'),
        quantity: 1,
      }
    ];
    increaseProduct(items);
  });

  $(document).on('click', '.numDn', function (e) {
    e.preventDefault();
    if ($(this).data('qty') > 1) {
      const items = [
        {
          product_id: $(this).data('id'),
          price: $(this).data('price'),
          quantity: 1,
        }
      ];
      decreaseProduct(items);
    } else {
      return;
    }
  });

  $(document).on('click', '.cart_remove', function (e) {
    e.preventDefault();

    const items = [
      {
        product_id: $(this).data('id'),
      }
    ];
    cartRemove(items);
  });

  $("#checkoutBtn").click(function (e) {
    e.preventDefault();
    if (!$("#cart_items").children().length) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Chưa có sản phẩm nào trong giỏ hàng',
        showConfirmButton: true,
        timerProgressBar: true,
        timer: 1500
      });
    } else {
      if (
        $.trim($("#customer_name").val()).length == 0 ||
        $.trim($("#customer_address").val()).length == 0 ||
        $.trim($("#customer_phone").val()).length == 0
      ) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Vui lòng điền đầy đủ thông tin giao hàng',
          showConfirmButton: true,
          timerProgressBar: true,
          timer: 1500
        });
      } else {
        const id = $("#checkoutBtn").data("id");
        const name = $.trim($("#customer_name").val());
        const address = $.trim($("#customer_address").val());
        const phone = $.trim($("#customer_phone").val());
        const note = $.trim($("#customer_note").val());
        checkout(id, {
          name, address, phone, note
        });
      }
    }

  });

  // Function
  function getData() {
    $.ajax({
      type: "GET",
      url: "/api/product/cart/get",
      success: function (response) {
        renderData(response);
      }
    });
  }

  function renderData(data) {
    if (data === null) {
      $('#cart_items').html("");
      $('#cart_items').append(
        `
        <div class="d-flex justify-content-center text-secondary">Giỏ hàng rỗng!</div>
        `
      );

    } else {
      $('#cart_count').html(data.items.length);
      $('#cart_total_price').html(priceFormat(data.total_price));
      $('#cart_items').html("");
      $.each(data.items, function (index, item) {
        $('#cart_items').append(
          `
          <div class="d-flex border rounded p-2 mb-2" style="position:relative;">
          <span data-id="${item.product_id}" style="position:absolute; top:10px;right:10px;" class="close cart_remove">&#10005;</span>
            <div class="mr-2">
              <div class=""><img class="img-fluid" src="/uploads/img/${item.product_id}"></div>
            </div>
            <div>
              <div class="pr-3">
                <a class="text-overfl-2line" href="/product/${item.product_id}" style="width:100%;">${item.product_name}</a>
              </div>
              <div class="my-2">
                <div class="numInput d-flex">
                  <button style="width:30px;height:30px;" type="button" data-qty="${item.quantity}" data-price="${item.price}" data-id="${item.product_id}" class="numDn"><i class='bx bx-minus'></i></button>
                  <input style="width:30px;height:30px;"  class="numIn" name="quantity" id="current_qty" type="number" min="1" readonly value="${item.quantity}">
                  <button style="width:30px;height:30px;" type="button" data-price="${item.price}" data-id="${item.product_id}" class="numUp"><i class='bx bx-plus'></i></button>
                </div>
              </div>
              <div>
                <div>
                  <span class="text-danger" style="font-weight :500;">${priceFormat(item.price)}</span>
                </div>
              </div>
            </div>
          </div>
          `
        );
      });
      $('#checkoutBtn').data('id', data._id);
    }
  }

  function increaseProduct(items) {
    $.ajax({
      type: "POST",
      url: "/product/cart",
      data: {
        items: JSON.stringify(items)
      },
      dataType: 'JSON',
      success: function (response) {
        getData();
        if (!response.err) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });

          Toast.fire({
            icon: 'success',
            title: 'Đang cập nhật giỏ hàng...'
          })
            .then(() => {
              Toast.fire({
                icon: 'success',
                title: 'Cập nhật thành công !'
              });
            });
        }
      }
    });
  }

  function decreaseProduct(items) {
    $.ajax({
      type: "POST",
      url: "/product/cart/decrease",
      data: {
        items: JSON.stringify(items)
      },
      dataType: 'JSON',
      success: function (response) {
        getData();
        if (!response.err) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });

          Toast.fire({
            icon: 'success',
            title: 'Đang cập nhật giỏ hàng...'
          })
            .then(() => {
              Toast.fire({
                icon: 'success',
                title: 'Cập nhật thành công !'
              });
            });
        }
      }
    });
  }

  function cartRemove(items) {
    $.ajax({
      type: "POST",
      url: "/product/cart/delete",
      data: {
        items: JSON.stringify(items)
      },
      dataType: 'JSON',
      success: function (response) {
        getData();
        cartBadgeCount();
        if (!response.err) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });

          Toast.fire({
            icon: 'success',
            title: 'Đang cập nhật giỏ hàng...'
          })
            .then(() => {
              Toast.fire({
                icon: 'success',
                title: 'Cập nhật thành công !'
              });
            });
        }
      }
    });
  }

  function checkout(id, info) {
    $.ajax({
      type: "POST",
      url: "/product/cart/checkout",
      data: {
        id: id,
        info: info
      },
      success: function (response) {
        console.log(response);
      }
    });
  }
});
