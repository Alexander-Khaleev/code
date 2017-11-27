/**
 * Created by Александр on 02.08.2017.
 */

(function( $ ) {
  $.fn.blockRedactor = function () {

    var configs = arguments;

    class Collection {
      constructor(action) {
        this.action = action;
        this.offset = $(this.action).offset();
        this.marginLeft = this.offset.left + $(this.action).width() + 25;
        this.marginAnimateLeft = $('body').width()  - this.marginLeft - 300;
        this.bodyOffset = $('body').width() - this.offset.left;
        this.marginTop = this.offset.top + 5;
        this.options = [];
        this.optionConfig = '';
        this.configs = configs;
      }

      init() {
        var newOptions = this.options;
        if ($("#redactor_block_plugin").is(":visible") == true) {
          $("#redactor_block_plugin").remove();
        }
          for (var i = 0; i < this.configs.length; i++) {
            if (this.configs[i] == 'palitra' || this.configs[i] == 'resize' || this.configs[i] == 'border') {
              newOptions.push(this.configs[i]);
            }
          }
          if (Object.keys($('#redactor_block_plugin')).length == 0) {
            if (this.options.length == 0) {
              $('body').append("<div id='redactor_block_plugin'> <ul><li id='redactor_block_plugin_change_color'> Change color </li><li id='redactor_block_plugin_change_size'> Change size </li><li id='redactor_block_plugin_change_border'> Change border </li><div id='redactor_block_plugin_exit'> &#10008; Close redactor</div></ul> </div>");
            }
            else {
              for (i = 0; i < newOptions.length; i++) {
                switch (newOptions[i]) {
                  case 'palitra':
                    this.optionConfig += "<li id='redactor_block_plugin_change_color'> Change color </li>";
                    break;
                  case 'resize':
                    this.optionConfig += "<li id='redactor_block_plugin_change_size'> Change size </li>";
                    break;
                  case 'border':
                    this.optionConfig += "<li id='redactor_block_plugin_change_border'> Change border </li>";
                    break;
                }
              }
              $('body').append("<div id='redactor_block_plugin'><ul>" + this.optionConfig + "<div id='redactor_block_plugin_exit'> &#10008; Close redactor</div></ul></div>");
            }
          }
          else {
            $('#redactor_block_plugin').remove();
            $('body').append("<div id='redactor_block_plugin'> <ul><li id='redactor_block_plugin_change_color'> Change color </li><li id='redactor_block_plugin_change_size'> Change size </li><li id='redactor_block_plugin_change_border'> Change border </li><div id='redactor_block_plugin_exit'> &#10008; Close redactor</div></ul> </div>");
          }

          if ($("#redactor_block_plugin_palitra").is(":visible") == false && $("#redactor_block_plugin_resize").is(":visible") == false && $("#redactor_block_plugin_border").is(":visible") == false) {
            if ($(this.action).width() == $('body').width()) {
              $('#redactor_block_plugin').css({
                'display': 'block',
                'left': $('body').width() - 300 + 'px',
                'top': this.marginTop
              });
            }
            else if (this.bodyOffset < $('body').width() / 2 && $('body').width() > 600) {
              $('#redactor_block_plugin').css({
                'display': 'block',
                'left': $('body').width() - $(this.action).width() - 250 + 'px',
                'top': this.marginTop
              });
            }
            else if ($(this.action).width() !== $('body').width() && $('body').width() < 600) {
              $('#redactor_block_plugin').css({
                'display': 'block',
                'left': $('body').width() - 200 + 'px',
                'top': this.marginTop
              });
            }
            else {
              $('#redactor_block_plugin').css({'display': 'block', 'left': this.marginLeft, 'top': this.marginTop});
            }
          }
        $('#redactor_block_plugin_exit').click(function() {
          $('#redactor_block_plugin').remove();
        });
      }

        change(selection) {
          var selectionId = $(selection).attr('id');
          $('#redactor_block_plugin').fadeOut();
          switch(selectionId) {
            case 'redactor_block_plugin_change_color':
              $('body').append("<div id='redactor_block_plugin_palitra'> <div id='redactor_block_plugin_palitra_wrapper'> <div id='redactor_block_plugin_red'></div><div id='redactor_block_plugin_blue'></div><div id='redactor_block_plugin_black'></div><div id='redactor_block_plugin_green'></div><div id='redactor_block_plugin_yellow'></div><div id='redactor_block_plugin_grey'></div><div style='clear:both'></div><div id='redactor_block_plugin_palitra_return'> 	&larr; Return to main menu</div></div></div>");
              break;
            case 'redactor_block_plugin_change_size':
              $('body').append("<div id='redactor_block_plugin_resize'><div id='redactor_block_plugin_resize_wrapper'><div id='redactor_block_plugin_resize_width'>Width: <input type='number' id='redactor_block_plugin_resize_width_input'></div><div id='redactor_block_plugin_resize_height'>Height: <input type='number' id='redactor_block_plugin_resize_height_input'></div><div style='clear:both'></div><div id='redactor_block_plugin_resize_return'> 	&larr; Return to main menu</div></div></div>");
              break;
            case 'redactor_block_plugin_change_border':
              $('body').append("<div id='redactor_block_plugin_border'><div id='redactor_block_plugin_border_wrapper'><div id='redactor_block_plugin_border_size'>Border-width: <input type='number' id='redactor_block_plugin_border_size_input'></div><div id='redactor_block_plugin_border_radius'>Border-radius: <input type='number' id='redactor_block_plugin_border_radius_input'></div><div id='redactor_block_plugin_border_red'></div><div id='redactor_block_plugin_border_blue'></div><div id='redactor_block_plugin_border_black'></div><div id='redactor_block_plugin_border_green'></div><div id='redactor_block_plugin_border_yellow'></div><div id='redactor_block_plugin_border_grey'></div><div style='clear:both'></div><div id='redactor_block_plugin_border_return'> 	&larr; Return to main menu</div></div></div>");
              break;
          }
          var bodyChildren = $('body').children();
          if ($(this.action).width() == $('body').width()) {
            $(bodyChildren[bodyChildren.length - 1]).css({'display':'block','left':$('body').width() - 400 + 'px', 'top':this.marginTop - 100 + 'px'});
          }
          else if (this.bodyOffset < $('body').width() / 2) {
            $(bodyChildren[bodyChildren.length - 1]).css({'display':'block', 'left': $('body').width() - 300 + 'px', 'top': this.marginTop});
            $(bodyChildren[bodyChildren.length - 1]).stop().animate({left: '-=' + $(this.action).width()  + 'px'}, 1000);
          }
          else if($(this.action).width() !== $('body').width() &&  $('body').width() < 600)  {
            $(bodyChildren[bodyChildren.length - 1]).css({'display':'block', 'left':$('body').width() - 300 + 'px', 'top':this.marginTop - 100 + 'px'});
          }
          else {
            $(bodyChildren[bodyChildren.length - 1]).css({'display':'block', 'left': $('body').width() - 300 + 'px', 'top': this.marginTop});
            $(bodyChildren[bodyChildren.length - 1]).stop().animate({left: '-=' + this.marginAnimateLeft + 'px'}, 1000);
          }
         if (selectionId =='redactor_block_plugin_change_size')  {
           $('#redactor_block_plugin_resize_width_input').val($(this.action).width());
           $('#redactor_block_plugin_resize_height_input').val($(this.action).height());
           $(this.action).removeClass('ui-resizable-disabled');
           var newAction = $(this.action);
           $(this.action).resizable({stop:function(event,ui) {
             $('#redactor_block_plugin_resize_width_input').val(ui.size.width);
             $('#redactor_block_plugin_resize_height_input').val(ui.size.height);
           }
           });
           $('#redactor_block_plugin_resize_width_input').change(function() {
             $(newAction).css('width', $('#redactor_block_plugin_resize_width_input').val() + 'px');
           });
           $('#redactor_block_plugin_resize_height_input').change(function() {
             $(newAction).css('height', $('#redactor_block_plugin_resize_height_input').val() + 'px');
           });
         }
          if (selectionId =='redactor_block_plugin_change_border')  {
            $('#redactor_block_plugin_border_radius_input').change(function() {
              $(this.action).css('border-radius', $('#redactor_block_plugin_border_radius_input').val() + 'px');
            });
          }
        }

      returned(returning, thisBlock) {
        var returning = $(returning).attr('id');
        if (returning == 'redactor_block_plugin_palitra_return') {
          var block = '#redactor_block_plugin_palitra';
        }
        if (returning == 'redactor_block_plugin_resize_return') {
          var block = '#redactor_block_plugin_resize';
          // JQUERY UI bug
          var resizeBug = $(block).attr('style');
        }
        if (returning == 'redactor_block_plugin_border_return') {
          var block = '#redactor_block_plugin_border';
        }
        if ($(this.action).width() == $('body').width()) {
          $(block).remove();
          $('#redactor_block_plugin').fadeIn(1000);
          $('#redactor_block_plugin').attr('style', resizeBug);
          $(this.action).resizable({disabled:'true'});
        }
        else if (this.bodyOffset < $('body').width() / 2) {
          $(block).remove();
          $('#redactor_block_plugin').fadeIn(1000);
          $('#redactor_block_plugin').attr('style', resizeBug);
          $(this.action).resizable({disabled:'true'});
        }
        else if($(this.action).width() !== $('body').width() &&  $('body').width() < 600)  {
          $(block).remove();
          $('#redactor_block_plugin').fadeIn(1000);
          $('#redactor_block_plugin').attr('style', resizeBug);
          $(this.action).resizable({disabled:'true'});
        }
        else {
          $(block).stop().animate({'marginLeft': '+=' + $('body').width() + 'px'}, 1000);
          setTimeout(function () {$(block).remove()}, 500);
          $('#redactor_block_plugin').fadeIn(1000);
          $('#redactor_block_plugin').attr('style', resizeBug);
          $(this.action).resizable({disabled:'true'});
        }
        // Save results
        var results = $(thisBlock).attr('style');
        if (results !== undefined) {
        /*$.ajax({
           url : API,
           type: "POST",
           data: results,
           success: function(data, textStatus, jqXHR)
            {
            console.log('Success response');
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
            console.log(errorThrown);
            }
          })*/
        }
      }

      changeColor(color) {
        var color = color;
        var thisColor = $(color).attr('id');
        var thisColorNew = thisColor.split('_');
        var i =  thisColorNew.length - 1;
        $(this.action).css('background',thisColorNew[i]);
      }

      changeBorder(border) {
        var border = border;
        var thisColor = $(border).attr('id');
        var thisColorNew = thisColor.split('_');
        var i =  thisColorNew.length - 1;
        var thisBorderColor = $('#redactor_block_plugin_border_size_input').val() + 'px solid ' + thisColorNew[i];
        $(this.action).css({'border': thisBorderColor, 'border-radius': $('#redactor_block_plugin_border_radius_input').val() + 'px'});
      }
    }

    this.click(function() {
      var thisBlock = this;
      var option = new Collection($(this));
      option.init();

      $('#redactor_block_plugin_change_color, #redactor_block_plugin_change_size, #redactor_block_plugin_change_border').click(function() {
        option.change($(this));

        $('#redactor_block_plugin_palitra_return, #redactor_block_plugin_resize_return, #redactor_block_plugin_border_return').click(function() {
          option.returned($(this), thisBlock);
        });

        $('#redactor_block_plugin_red, #redactor_block_plugin_blue, #redactor_block_plugin_black, #redactor_block_plugin_yellow, #redactor_block_plugin_green, #redactor_block_plugin_grey').click(function() {
          option.changeColor($(this));
        });
        $('#redactor_block_plugin_border_red, #redactor_block_plugin_border_blue, #redactor_block_plugin_border_black, #redactor_block_plugin_border_yellow, #redactor_block_plugin_border_green, #redactor_block_plugin_border_grey').click(function() {
          option.changeBorder($(this));
        });
      });

    });
  };
})(jQuery);
