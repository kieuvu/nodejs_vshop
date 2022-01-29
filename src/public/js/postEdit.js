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
  const pathname = window.location.pathname.split("/");
  const id = pathname[pathname.length - 1];
  getPost(id);

  // Handle
  $("#edit").click(function (e) {
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
      submitForm(title, content, id);
    }
  });

  // Function
  function getPost(id) {
    $.ajax({
      type: "GET",
      url: "/admin/post/getPost",
      data: {
        id: id
      },
      success: function (response) {
        renderData(response);
      }
    });
  }

  function renderData(data) {
    $('#postTitle').val(data[0].title);
    myEditor.setData(data[0].content);
  }

  function submitForm(title, content) {
    $.ajax({
      type: "POST",
      url: "/admin/post/update",
      data: {
        title: title,
        content: content,
        id: id
      },
      success: function (response) {
        if (!response.stt) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sửa thành công !!!',
            showConfirmButton: true,
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            window.location.href = '/admin/post';
          });
        }
      }
    });
  }

});