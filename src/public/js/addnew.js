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
