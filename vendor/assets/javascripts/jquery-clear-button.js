;
(function($) {
    //どこでもクリアボタン
    $.fn.jQueryClearButton = function(options){

        //対象物が表示されていない場合は終了
        if (!this.is(':visible')) {
            return this;
        }

        var obj = this;

        //option
        var defaults = {
            'always': false, //cleat button always display
            'zindex': 0,
            'offset_right': 15,
            'size': 15,
            'color': '#aaa'
        };
        var setting = $.extend(defaults, options); //merge

        //IEデフォルトのバツボタンを無効化
        $('body').append('<style> input::-ms-clear { visibility:hidden; } </style>');

        //inputを親要素で囲む
        var btn_parent = $('<div style="position:relative; margin:0; padding:0; border:none;">');
        this.before(btn_parent);
        this.prependTo(btn_parent);

        //make batsu button
        var btn = $('<div class="fas fa-times"></div>');
        this.before(btn);

        //button style
        btn.css({
            'position': 'absolute',
            'display': 'none',
            'cursor': 'pointer',
            'z-index': setting.zindex,
            'font-size': setting.size + 'px',
            'color': setting.color
        });

        //ボタンの位置をセット
        /* input要素がfloatしているとbtn_parentのheightが0になる。
         * その場合はinput要素自体のheightをbtn_parentのheightとする
         */
        var btn_parent_height = btn_parent.height();
        if (!btn_parent_height) {
            btn_parent_height = obj.height();
        }

        var offset_top = (btn_parent_height - setting.size) / 2;
        btn.css({
            'top': offset_top + 'px',
            'right': setting.offset_right + 'px'
        });

        //button event - click
        btn.on('click', function() {
            //clear
            obj.val('').focus();

            if (!setting.always) {
                btn.hide();
            }

            if (setting.click) {
                setting.click(obj.get(0));
            }
        });

        //input event - input
        obj.on('input', function() {
            if (obj.val()) {
                btn.show();
            } else {
                if (!setting.always) {
                    btn.hide();
                }
            }
        });

        if (setting.always) {
            //always display
            btn.show();
        } else {

            //input event - focus
            obj.on('focus', function() {
                if (obj.val()) {
                    btn.show();
                } else {
                    btn.hide();
                }
            });

            var btn_hide = function(){ btn.hide(); }
            obj.on('blur', function() {
                setTimeout(btn_hide, 200);
            });

            //input event - moseover
            btn_parent.on('mouseenter', function() {
                if (obj.val()) {
                    btn.show();
                } else {
                    btn.hide();
                }
            });

            btn_parent.on('mouseleave', function() {
                if(!obj.is(':focus')) {
                    setTimeout(btn_hide, 200);
                }
            });

        }

        //メソッドチェーン対応(thisを返す)
        return (this);
    };
})(jQuery);
