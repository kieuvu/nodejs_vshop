let cart_badge_count = 0;
$(document).ready(function () {
  // Init
  getCate();
  // Handle

  // Function
  function getCate() {
    $.ajax({
      type: "GET",
      url: "/api/product/catebrand/getall",
      success: function (response) {
        const categories = response.categories;

        $("#pc_nav-cate .second_menu").html('');

        $.each(categories, function (index, item) {
          $("#pc_nav-cate .second_menu").append(
            `
             <li class="px-4">
              <a class="text-dark no-under" href="" >
                ${item.cate_name}
              </a>
            </li>
            `
          );
        });
      }
    });
  }
});


function priceFormat(price) {
  let fmt = new Intl.NumberFormat('en-US', {
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