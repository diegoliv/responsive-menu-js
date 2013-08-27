// RESPONSIVE MENU ===========================//
// wrapper para plugin de menu responsivo,    //
//desenvolvido por Favolla Comunicacao        //
//============================================//

/* INSTRUCOES
 Aplique o plugin diretamente no principal wrapper do menu responsivo. por exemplo:

 $(#menu).responsiveMenu($(#trigger));

 O plugin simplesmente trabalha com os toggles de classes, deixando a interatividade para as configuracoes em css

 CONFIGURACOES
 - trigger: seletor do botao ou elemento que ira ativar o toggle do menu responsivo (REQUERIDO)
 - activeClass: nome da classe a ser inserida nos elementos do menu principal quando o toggle for ativado (default: active)
 - submenuTrigger: seletor do botao que ativa os submenus, caso haja (default: $('sub-toggle'))
 - submenu: seletor dos elementos dos submenus (default: $('.submenu'))
 - submenuActiveClass: nome da classe a ser inserida nos submenus quando forem ativados (default: open)
 - breakpoint: tamanho maximo de tela onde o menu responsivo vai funcionar (default: 720)
 - timeOut: tempo em milissegundos onde sera executado o onResize. Quanto maior o numero, maior a economia de recurso, mas mais lenta e a resposta do plugin (default: 100)
 - moveCanvas: opcao para ativar um toggle na tela inteira do site, movendo todo o conteudo juntamente com o meu, seguindo o padrao "off canvas" (default: false)
 - canvas: nome da classe dos elementos que compoem o "canvas" (default: null)
*/
;(function ( $, window, document, undefined ) {

  $.fn.responsiveMenu = function(settings){

     var config = {
          'trigger': '',
          'activeClass': 'active',
          'submenuTrigger': $('.sub-toggle'),
          'submenu': false,
          'submenuActiveClass': 'open',
          'breakpoint': 720,
          'timeOut': 100,
          'moveCanvas': false,
          'canvas': '',
      };

      if (settings){$.extend(config, settings);}

      // variaveis utilizadas no plugin
      var mTrigger,
          menu = $(this),
          active = config.activeClass,
          button = config.trigger,
          bpoint = config.breakpoint,
          submTrigger = config.submenuTrigger,
          submenu = config.submenu,
          submenuActive = config.submenuActiveClass,
          canvasOn = config.moveCanvas,
          canvas = config.canvas,
          time = config.timeOut;

          // console.log(config);

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

        var submenuClass = '.' + submenu.prop('class');
        // console.log(submenuClass);

        // toggle para os submenus
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