$(document).ready(function () {
  //Init
  getAnalytics();

  //Handle

  //Function
  function getAnalytics() {
    $.ajax({
      type: "GET",
      url: "/admin/getAnalytics",
      success: function (response) {
        renderData(response);
      }
    });
  }

  function renderData(data) {
    $("#totalEarn").html(priceFormat(data.totalEarn));
    $("#totalOrder").html(data.totalCompleteOrder + " đơn");
    $("#totalUser").html(data.totalUser + " thành viên");
    $("#totalProduct").html(data.totalProduct + " sản phẩm");
    $("#totalProductBought").html(data.totalProductBought + " sản phẩm");
    $("#totalPost").html(data.totalPost + " bài");
  }
});