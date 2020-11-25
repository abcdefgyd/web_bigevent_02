//险些入口函数
$(function () {
  //1绑定链接，点击时操作盒子
  $("#link_reg").on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $("#link_login").on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  //2自定义验证规则
  var form = layui.form
  form.verify({
    pwd: [
      /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      var pwd = $(".reg-box input[name=password]").val()
      //比较
      if (value !== pwd) {
        return "两次输入的密码不一致"
      }
    }
  })

  //3注册功能表单提交
  var layer=layui.layer
  $('#form_reg').on('submit', function (e) {
    //组织表单提交
    e.preventDefault()
    //发送ajax
    $.ajax({
      method: 'POST',
      // url: 'http://ajax.frontend.itheima.net/api/reguser',
     url: 'api/reguser',
      data: {
        username: $('.reg-box [name=username]').val(),
        password: $('.reg-box [name=password]').val(),
      },
      success: function (res) {
        //返回状态判断
        if (res.status != 0) {
          return layer.msg(res.message)
        }
        // alert(res.message)
        layer.msg('恭喜您，注册成功')
      }
    })                  
  })
})