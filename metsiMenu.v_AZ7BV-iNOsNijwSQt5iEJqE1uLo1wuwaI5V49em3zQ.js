!function(n){"use strict";function u(){var i=document.createElement("mm"),n={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var t in n)if(void 0!==i.style[t])return{end:n[t]};return!1}function f(i){return this.each(function(){var r=n(this),u=r.data("mm"),f=n.extend({},t.DEFAULTS,r.data(),"object"==typeof i&&i);u||r.data("mm",u=new t(this,f));"string"==typeof i&&u[i]()})}var i,t,r;n.fn.emulateTransitionEnd=function(t){var r=!1,f=this,u;n(this).one("mmTransitionEnd",function(){r=!0});return u=function(){r||n(f).trigger(i.end)},setTimeout(u,t),this};i=u();i&&(n.event.special.mmTransitionEnd={bindType:i.end,delegateType:i.end,handle:function(t){if(n(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}});t=function(i,r){this.$element=n(i);this.options=n.extend({},t.DEFAULTS,r);this.transitioning=null;this.init()};t.TRANSITION_DURATION=350;t.DEFAULTS={toggle:!0,doubleTapToGo:!1,activeClass:"active"};t.prototype.init=function(){var t=this,i=this.options.activeClass;this.$element.find("li."+i).has("ul").children("ul").addClass("collapse in");this.$element.find("li").not("."+i).has("ul").children("ul").addClass("collapse");this.options.doubleTapToGo&&this.$element.find("li."+i).has("ul").children("a").addClass("doubleTapToGo");this.$element.find("li").has("ul").children("a").on("click.metisMenu",function(r){var u=n(this),f=u.parent("li"),e=f.children("ul");return r.preventDefault(),f.hasClass(i)?t.hide(e):t.show(e),t.options.doubleTapToGo&&t.doubleTapToGo(u)&&"#"!==u.attr("href")&&""!==u.attr("href")?(r.stopPropagation(),void(document.location=u.attr("href"))):void 0})};t.prototype.doubleTapToGo=function(n){var t=this.$element;return n.hasClass("doubleTapToGo")?(n.removeClass("doubleTapToGo"),!0):n.parent().children("ul").length?(t.find(".doubleTapToGo").removeClass("doubleTapToGo"),n.addClass("doubleTapToGo"),!1):void 0};t.prototype.show=function(r){var o=this.options.activeClass,u=n(r),e=u.parent("li"),f;if(!this.transitioning&&!u.hasClass("in"))return e.addClass(o),this.options.toggle&&this.hide(e.siblings().children("ul.in")),u.removeClass("collapse").addClass("collapsing").height(0),this.transitioning=1,f=function(){u.removeClass("collapsing").addClass("collapse in").height("");this.transitioning=0},i?void u.one("mmTransitionEnd",n.proxy(f,this)).emulateTransitionEnd(t.TRANSITION_DURATION).height(u[0].scrollHeight):f.call(this)};t.prototype.hide=function(r){var e=this.options.activeClass,u=n(r),f;if(!this.transitioning&&u.hasClass("in"))return u.parent("li").removeClass(e),u.height(u.height())[0].offsetHeight,u.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1,f=function(){this.transitioning=0;u.removeClass("collapsing").addClass("collapse")},i?void u.height(0).one("mmTransitionEnd",n.proxy(f,this)).emulateTransitionEnd(t.TRANSITION_DURATION):f.call(this)};r=n.fn.metisMenu;n.fn.metisMenu=f;n.fn.metisMenu.Constructor=t;n.fn.metisMenu.noConflict=function(){return n.fn.metisMenu=r,this}}(jQuery)