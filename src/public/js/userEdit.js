$(document).ready(function () {
  // Init

  // Handle
  $("#submit").click(function (e) {
    e.preventDefault();
    const currentPassword = $("#currentPass").val();
    const newPass = $("#newPass").val();
    const renewPass = $("#renewPass").val();
    if ($.trim(currentPassword).length == 0 || $.trim(newPass).length == 0 || $.trim(renewPass).length == 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Chưa điền đầy đủ thông tin !',
        showConfirmButton: true,
        timer: 3000
      });
    } else {
      changPassword(currentPassword, newPass, renewPass);
    }
  });

  // Function
  function changPassword(currentPassword, newPassword, renewPass) {
    $.ajax({
      type: "POST",
      url: "/user/changePass",
      data: {
        password: currentPassword,
        newPassword: newPassword,
        renewPass: renewPass
      },
      success: function (response) {
        if (response.err == true && response.oldPass == false) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Mật khẩu cũ không đúng !',
            showConfirmButton: true,
            timer: 3000
          });
        }
        if (response.err == true && response.newPass == false) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Mật khẩu mới không hợp lệ !',
            showConfirmButton: true,
            timer: 3000
          });
        }
        if (response.err == true && response.repass == false) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Xác nhận mật khẩu mới không khớp !',
            showConfirmButton: true,
            timer: 3000
          });
        }
        if (!response.err) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại !',
            showConfirmButton: true,
            timer: 3000
          }).then(() => {
            $.ajax({
              type: "GET",
              url: "/logout",
              success: function (response) {
                window.location.href = "/login";
              }
            });
          });
        }
      }
    });
  }

});