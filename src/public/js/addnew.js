$(document).ready(function () {
  // Init
  getCateBrand();

  // Function
  function getCateBrand() {
    $.ajax({
      type: "GET",
      url: "/admin/product/catebrand/getall",
      success: function (response) {
        const categories = response.categories;
        const brands = response.brands;

        $("#prd_cate").html('');
        $("#prd_brand").html('');

        $("#prd_brand").append(`<option value=''></option>`);
        $("#prd_cate").append(`<option value=''></option>`);

        $.each(categories, function (index, item) {
          $("#prd_cate").append(
            `
              <option value='${item.cate_slug}'>${item.cate_name}</option>
            `
          );
        });

        $.each(brands, function (index, item) {
          $("#prd_brand").append(
            `
              <option value='${item.brand_slug}'>${item.brand_name}</option>
            `
          );
        });

      }
    });
  }

  $("#add_prdForm").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      url: '/admin/product/add',
      type: 'POST',
      data: formData,
      success: function (data) {
        if (!data.err) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thêm thành công !!!',
            timerProgressBar: true,
            timer: 1500
          }).then(function () {
            location.reload();
          });
        }
      },
      cache: false,
      contentType: false,
      processData: false
    });
  });

});

let myEditor;
ClassicEditor
  .create(document.querySelector('#prd_desc'))
  .then(editor => {
    myEditor = editor;
  })
  .catch(err => {
    console.error(err.stack);
  });

const img1prev = document.getElementById("img_preview-img1");
const img2prev = document.getElementById("img_preview-img2");
const img3prev = document.getElementById("img_preview-img3");
const img4prev = document.getElementById("img_preview-img4");

let prd_stImg = document.getElementById('prd_stImg');
let prd_scImg = document.getElementById('prd_scImg');
let prd_rdImg = document.getElementById('prd_rdImg');
let prd_thImg = document.getElementById('prd_thImg');

img1prev.style.display = "none";
img2prev.style.display = "none";
img3prev.style.display = "none";
img4prev.style.display = "none";


prd_stImg.onchange = evt => {
  const [file] = prd_stImg.files;
  if (file) {
    img1prev.style.display = "block";
    img1prev.src = URL.createObjectURL(file);
  }
};

prd_scImg.onchange = evt => {
  const [file] = prd_scImg.files;
  if (file) {
    img2prev.style.display = "block";
    img2prev.src = URL.createObjectURL(file);
  }
};

prd_rdImg.onchange = evt => {
  const [file] = prd_rdImg.files;
  if (file) {
    img3prev.style.display = "block";
    img3prev.src = URL.createObjectURL(file);
  }
};

prd_thImg.onchange = evt => {
  const [file] = prd_thImg.files;
  if (file) {
    img4prev.style.display = "block";
    img4prev.src = URL.createObjectURL(file);
  }
};
