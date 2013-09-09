// responsiveMenu.js =========================//
// Responsive jQuery menu plugin              //
// developed by diegoliv @Favolla Comunicação //
// site: http://favolla.com.br                //
//============================================//

/* INSTRUCTIONS
 Apply the plugin directly on the main wrapper of the menu. Example:

 $(#menu).responsiveMenu($(#trigger));

 The plugin just work if classes toggles, leaving the interactivity and animations for css. 

 CONFIG
 - trigger: selector for the button or element that will activate the toggle of the responsive menu (required)
 - activeClass: class name that will be injected on the elements of the main menu when the toggle is activated (defalut: "active")
 - submenuTrigger: selector of the button(s) that activates the second level (if they exist) of the menu (default: $('sub-toggle'))
 - submenu: selector of the wrappers from the second level of the menu (default: $('.submenu'))
 - submenuActiveClass: class name that will be injected on wrappers of the second level of menus when they are activated (default: "open")
 - breakpoint: maximum width of the screen where the plugin will work. When the screen reach this size, it removes all the injected classes too. (default: 720)
 - timeOut: time interval in miliseconds, when the onResize function will be executed. The biggest the number, the bigger is the resourse economy, but the slower is the plugin response. (default: 100)
 - moveCanvas: option to activate a class toggle on the wrapper of the entire page. Useful for using the "off canvas" menu pattern (default: false)
 - canvas: selector of the wrapper or the elements that build the main site structure (default: null)
*/

;(function ( $, window, document, undefined ) {

  "use strict";

  var $window = $(window),
    ResponsiveMenu = {
    
    init: function(options, elem) {
      this.options = $.extend( {}, this.options, options );
      this.elem = $(elem);

      if($window.width() > this.options.breakpoint){
        this.options.mTrigger = false;
      }

      this.bindEvents();

      return this;
    },

    options: {
      trigger: null,
      activeClass: 'active',
      submenuTrigger: $('.sub-toggle'),
      submenu: false,
      submenuActiveClass: 'open',
      breakpoint: 720,
      timeOut: 100,
      moveCanvas: false,
      canvas: null,
      mTrigger: true
    },

    bindEvents: function() {
      var self = this;

      this.options.trigger.on('click', function(evt) {
        evt.preventDefault();
        self.triggerMain(self);
      });

      if(this.options.submenu){
        this.options.submenuTrigger.on("click", function(evt) {
          evt.preventDefault();
          self.triggerSubMenu(this, self);
        });
      }

      $window.on('resize', function() {
        if(this.resizeTO) clearTimeout(this.resizeTO);
        
        this.resizeTO = setTimeout(function() {
          $(this).trigger('resizeEnd');
        }, self.options.timeOut);
      });

      $window.on('resizeEnd', this.onFinalResize(self));
    },

    triggerMain: function(self) {
      var activeClass = self.options.activeClass;

      if(self.options.mTrigger) {
        self.elem.toggleClass(activeClass);
        self.options.trigger.toggleClass(activeClass);

        if(self.options.moveCanvas){
          self.options.canvas.toggleClass(activeClass);
        }
      }
    },

    triggerSubMenu: function(elem, self) {
      var $elem = $(elem),
        activeClass = self.options.activeClass,
        subActiveClass = self.options.submenuActiveClass,
        submenu = self.options.submenu;

      if(self.options.mTrigger) {
        if($elem.hasClass(activeClass)) {
          $elem.removeClass(activeClass);
          submenu.removeClass(subActiveClass);
        } else {
          $elem.removeClass(activeClass);
          $elem.addClass(activeClass);
          submenu.removeClass(subActiveClass);
          $elem.next('.' + submenu.prop('class')).addClass(subActiveClass);
        }
      }
    },

    onFinalResize: function(self) {
      if($window.width() > self.options.breakpoint){

        var activeClass = self.options.activeClass;
        
        self.options.mTrigger = false;
        self.elem.removeClass(activeClass);
        self.options.trigger.removeClass(activeClass);
        
        if(self.options.moveCanvas) {
          self.options.canvas.removeClass(activeClass);
        }
      } else {
        self.options.mTrigger = true;
      }
    }
  } //ResponsiveMenu

  if ( typeof Object.create !== 'function' ) {
    Object.create = function (o) {
      function F() {}
      F.prototype = o;
      return new F();
    };
  }

  $.fn.responsiveMenu = function( options ) {
    if (this.length) {
      return this.each(function() {
        var myMenu = Object.create(ResponsiveMenu);
        myMenu.init(options, this);
        $.data(this, 'responsiveMenu', myMenu);
      });
    }
  };
})( jQuery, window, document );