let cart_badge_count = 0;

$(document).ready(function () {
  //Init
  backToTop();

  $(document).on('click', "#backToTop button", function () {
    $("html, body").animate({ scrollTop: 0 }, 100);
  });

  $(document).on('scroll', window, function () {
    const onScroll = window.scrollY;
    if (onScroll >= 150) {
      $("#backToTop").css('display', 'block');
    } else {
      $("#backToTop").css('display', 'none');
    }
  });

  //Handle
  $(".updating").click(function (e) {
    e.preventDefault();
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Chức năng đang được cập nhật !',
      showConfirmButton: true,
      timerProgressBar: true,
      timer: 2500
    });
  });

  //Function
  function backToTop() {
    $('body').append(
      `
        <div id="backToTop">
          <button><i class='bx bx-chevron-up'></i></button>
        </div>
      `
    );
  }
});

function priceFormat(price) {
  let fmt = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return fmt.format(price);
}

function cartBadgeCount() {
  $(document).ready(function () {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('user_token='));
    if (typeof cookieValue != 'undefined') {
      $.ajax({
        type: "GET",
        url: "/api/product/cart/get",
        success: function (response) {
          if (response == null) {
            $("#cart_badge_count").html(0);
          } else {
            $("#cart_badge_count").html(response.items.length);
          }
        }
      });
    } else {
      $("#cart_badge_count").html(0);
    }
  });
}

cartBadgeCount();