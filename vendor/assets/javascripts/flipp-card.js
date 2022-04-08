// jQuery Flipp Card Plugin
;
(function($) {
    $.fn.flippCard = function(options){
      //options
      var settings = $.extend({
          'close': true,
          'container': '<div/>',
          'zindex': 10000
      }, options );

      this.on('click', function() {
        var content = $(this).html();
        var back = $(settings.container).insertAfter(this);
        back.addClass("flippCard");
        back.html(content);

        if (settings.close) {
          var btn = $('<div class="fas fa-times"></div>');
          back.append(btn);
          btn.css({
            'position': 'absolute',
            'display': 'none',
            'cursor': 'pointer',
            'z-index': settings.zindex,
            'font-size': settings.size + 'px',
            'color': settings.color
          });
          btn.on('click', function() {});
        }

        $(this).addClass('flippant-back');
      });
      
      return this;
    };
})(jQuery);