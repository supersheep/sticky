"use strict";
var $ = require('jquery');
var win = $(window);

function sticky(elem, top, cb, bottom) {
  elem = $(elem);
  if (!elem.length) {
    return false;
  }
  var placeholder = null;
  var offsetParent = elem.get(0).offsetParent;
  var elem_css_position = elem.css("position");
  var elem_css_top = elem.css("top");
  var elem_css_left = elem.css("left");
  var elem_css_float = elem.css("float");
  var elem_margin_top = elem.css("margin-top");
  var elem_top = elem.offset().top;
  var elem_left = elem.offset().left;
  var elem_height = elem.height();
  var win_height = win.height();
  var parent_offset = $(offsetParent).offset();
  var win_scroll_top = 0;

  if (elem_css_position === "static") {
    placeholder = $("<div />").css({
      "width": elem.css("width"),
      "height": elem.css("height"),
      "margin": elem.css("margin"),
      "padding": elem.css("padding"),
      "borderTop": elem.css("borderTop"),
      "borderBottom": elem.css("borderBottom"),
      "float": elem.css("float"),
      "visibility": "hidden"
    });
  }


  function fix(elem, top) {

    elem.css({
      "width": elem.css("width"),
      "top": top,
      "left": elem_left,
      "marginTop": 0,
      "position": "fixed"
    });
    placeholder && placeholder.appendTo(elem, "after");
  }

  function unfix(elem) {
    elem.css({
      "marginTop": elem_margin_top,
      "left": elem_css_left,
      "top": elem_css_top,
      "position": elem_css_position
    });
    placeholder && placeholder.remove();
  }

  function fix_buttom(elem) {
    elem.css({
      "position": "absolute",
      "top": win_height - bottom - elem_height - parent_offset.top,
      "left": elem_left - parent_offset.left
    });
  }

  var old_status = "unfix";

  function computeSticky() {
    win_scroll_top = win.scrollTop();
    if (bottom && win_scroll_top + elem_height + top + bottom > win_height) {
      fix_buttom(elem);
      old_status = "fix_bottom";
      return;
    }

    if (elem_top - win_scroll_top < top) {

      if (old_status !== "fix") {
        fix(elem, top);

        cb && cb({
          status: "fix",
          elem: elem
        });
        old_status = "fix";
      }
    } else {
      if (old_status !== "unfix") {
        unfix(elem);
        cb && cb({
          status: "unfix",
          elem: elem
        });
        old_status = "unfix";
      }
    }
  }

  $(win).on("resize", function () {
    win_height = win.height();
    computeSticky();
  });

  $(win).on("scroll", computeSticky);
  $(document).on('ready',computeSticky);
}

module.exports = sticky;