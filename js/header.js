$(function() {

  var siteSticky = function() {
		$(".js-sticky-header").sticky({
      topSpacing: 0,
      zIndex: 9999,
      wrapperClassName: 'sticky-wrapper'
    });
    
    // Enhanced sticky header with smooth effect
    $(window).on('scroll', function() {
      var scrollTop = $(window).scrollTop();
      var $header = $(".js-sticky-header");
      
      if (scrollTop > 50) {
        $header.addClass('is-sticky');
        $('.sticky-wrapper').addClass('is-sticky');
      } else {
        $header.removeClass('is-sticky');
        $('.sticky-wrapper').removeClass('is-sticky');
      }
    });
	};
	siteSticky();

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-active') ) {
					$('body').removeClass('offcanvas-active');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-active') ) {
				$('body').removeClass('offcanvas-active');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-active');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-active') ) {
					$('body').removeClass('offcanvas-active');
				}
	    }
		});
	}; 
	siteMenuClone();

});


$('.custom-arrow-collapse').click(function() {
    console.log("Collapse button clicked!"); // Check if the click is working
    var target = $(this).data('target');
    $(target).collapse('toggle');  // Manually toggle the collapse
});
