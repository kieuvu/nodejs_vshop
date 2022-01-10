function priceFormat(price) {
  let fmt = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });
  return fmt.format(price);
}

$(document).ready(function () {
  $(window).on('load', function () {
    $('select').selectpicker();
  });
});