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

  $.fn.responsiveMenu = function(settings){
     var config = {
          'trigger': null,
          'activeClass': 'active',
          'submenuTrigger': $('.sub-toggle'),
          'submenu': false,
          'submenuActiveClass': 'open',
          'breakpoint': 720,
          'timeOut': 100,
          'moveCanvas': false,
          'canvas': null,
      };
      if (settings){$.extend(config, settings);}

      // declaring plugin variables
      var mTrigger;
      var menu = $(this);
      var active = config.activeClass;
      var button = config.trigger;
      var bpoint = config.breakpoint;
      var submTrigger = config.submenuTrigger;
      var submenu = config.submenu;
      var submenuClass = '.' + submenu.prop('class');
      var submenuActive = config.submenuActiveClass;
      var canvasOn = config.moveCanvas;
      var canvas = config.canvas;
      var time = config.timeOut;

    return this.each(function () {
      if($(window).width() > bpoint){
        mTrigger = false;
      } else {
        mTrigger = true;
      }

      onChange = function(){

        clearTimeout(resizeTimer);
        var resizeTimer = setTimeout(function(){

          if($(window).width() > bpoint){
            mTrigger = false;
            menu.removeClass(active);
            button.removeClass(active);
            if(canvasOn){
              canvas.removeClass(active);
            }

          } else {
            mTrigger = true;
          }
        }, time);
        
      }

      $(window).bind('resize',onChange);
      $(document).ready(onChange);

      button.click(function(){
        if(mTrigger) {
          menu.toggleClass(active);
          button.toggleClass(active);
          if(canvasOn){
            canvas.toggleClass(active);
          }
        }
      });

      if(submenu){
        // toggle for the submenus
        submTrigger.click(function(){

          if(mTrigger) {
            
            if($(this).hasClass(active)){

              submTrigger.removeClass(active);
              submenu.removeClass(submenuActive);

            } else {
              submTrigger.removeClass(active);
              $(this).addClass(active);
              submenu.removeClass(submenuActive);
              $(this).next(submenuClass).addClass(submenuActive);
            }

          }

        }); 
      }

    });
  }
})( jQuery, window, document );