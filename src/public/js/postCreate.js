let myEditor;
ClassicEditor
  .create(document.querySelector('#postContent'))
  .then(editor => {
    myEditor = editor;
  })
  .catch(err => {
    console.error(err.stack);
  });

$(document).ready(function () {
  // Init

  // Handle
  $("#create").click(function (e) {
    e.preventDefault();
    const title = $('#postTitle').val();
    const content = myEditor.getData();

    if ($.trim(title) == 0 || $.trim(content) == 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Chưa điền đủ nội dung !',
        showConfirmButton: true,
        timer: 2000
      });
      $('#postTitle').val("");
      myEditor.setData("");
    } else {
      submitForm(title, content);
    }
  });

  // Function
  function submitForm(title, content) {
    $.ajax({
      type: "POST",
      url: "/admin/post/create/add",
      data: {
        title: title,
        content: content
      },
      success: function (response) {
        if (!response.stt) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thêm thành công !!!',
            showConfirmButton: true,
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            location.reload();
          });
        }
      }
    });
  }

});

