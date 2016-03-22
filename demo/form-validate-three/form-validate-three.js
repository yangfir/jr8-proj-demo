define("demo/form-validate-three/form-validate-three", function(require, exports, module){

    module.exports = function(opt) {
        
        var $ = require('zepto'),
            $form = $("#form");
            
        require('libs/zepto.info');
        require('libs/zepto.form');
        //require('libs/zepto.form.errmsg');
        
        
        $(".btn-validate", $form).on("click",function(e){
            
            
            var result = $form.form('validate', [{
                errmsg: "不允许为空",
                name: "UserName",
                rule:"isNonEmpty"
            },{
                errmsg: "身份证不正确",
                name: "CardNum",
                regexp: "(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)"
            },{
                errmsg: '请输入正确的手机号',
                name: "PhoneNum",
                vfunc: function(value)  {
                    if(value){
                        return ( /^1[3|4|5|7|8][0-9]\d{8}$/ ).test(value);
                    } else {
                        return false;
                    }
                }
            } ]);

            if ( !result.isValid ) {
                
                for(var key in result.messages) { // key ==> value

                    var msg = result.messages[key];
                    
                    $form.find('[name='+ key +']').parent().find('[data-err]').html(msg);
                }

                return false;
            }

            $.info("验证通过");
        });

        $form.on('focus', 'input,select,textarea', function() {
            var $this = $(this);
            $err = $this.parent().find('[data-err]');
            $err.html('&nbsp;');
        })



        //$form.errmsg();
        
    };
});