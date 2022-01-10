$(document).ready(function () {
  // Init
  const pathname = window.location.pathname.split("/");
  const id = pathname[pathname.length - 1];
  let data = {};
  getProduct(id);
  // Handle

  // Function
  function getProduct(id) {
    $.ajax({
      type: "GET",
      url: "/admin/product/getproduct",
      data: {
        prd_id: id
      },
      success: function (response) {
        data = response[0];
        renderData(data);
      }
    });
  }

  function renderData(data) {
    getCateBrand();
    $("#prd_isTrending").html("");
    $("#prd_isTrending").append(
      `
        <option value="0"${(data.prd_isTrending == 0) ? "selected" : ""}> Không HOT</option >
        <option value="1"${(data.prd_isTrending == 1) ? "selected" : ""}> Đang HOT</option >
      `
    );
    $("#prd_name").val(data.prd_name);
    $("#prd_quantity").val(data.prd_quantity);
    $("#prd_price").val(data.prd_price);
    $("#prd_id").val(data.prd_id);
    $("#prd_chip").val(data.prd_chip);
    $("#prd_ram").val(data.prd_ram);
    $("#prd_rom").val(data.prd_rom);
    $("#prd_display").val(data.prd_display);
    $("#prd_os").val(data.prd_os);
    $("#prd_camera").val(data.prd_camera);
    $("#prd_battery").val(data.prd_battery);
    $("#prd_gcard").val(data.prd_gcard);
    $("#prd_weight").val(data.prd_weight);
    $("#prd_size").val(data.prd_size);
    $("#prd_date").val(data.prd_date);
    $("#prd_material").val(data.prd_material);
    $("#img_preview-img1").attr("src", `/uploads/img/${data.prd_id}`);
    $("#img_preview-img2").attr("src", `/uploads/img/${data.prd_id}_1`);
    $("#img_preview-img3").attr("src", `/uploads/img/${data.prd_id}_2`);
    $("#img_preview-img4").attr("src", `/uploads/img/${data.prd_id}_3`);
    myEditor.setData(data.prd_desc);
  }

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
              <option ${(data.prd_cate == item.cate_slug) ? "selected" : ""} value='${item.cate_slug}' > ${item.cate_name}</ >
            `
          );
        });

        $.each(brands, function (index, item) {
          $("#prd_brand").append(
            `
              <option ${(data.prd_brand == item.brand_slug) ? "selected" : ""} value ='${item.brand_slug}'> ${item.brand_name}</option>
            `
          );
        });

      }
    });
  }

  $("#update_prdForm").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    formData.append(prd_id, data.prd_id);
    $.ajax({
      url: "/admin/product/update",
      type: 'PATCH',
      data: formData,
      success: function (data) {
        if (!data.err) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sửa thành công !!!',
            timerProgressBar: true,
            timer: 1500
          }).then(function () {
            window.location.href = "/admin/product/";
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

let prd_stImg = document.getElementById('prd_stImg');
let prd_scImg = document.getElementById('prd_scImg');
let prd_rdImg = document.getElementById('prd_rdImg');
let prd_thImg = document.getElementById('prd_thImg');

const img1prev = document.getElementById("img_preview-img1");
const img2prev = document.getElementById("img_preview-img2");
const img3prev = document.getElementById("img_preview-img3");
const img4prev = document.getElementById("img_preview-img4");

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
