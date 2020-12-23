(function ($) {
	var tag = {
		saveInitialData: function ($tag) { $tag.data({ width: $tag.width(), height: $tag.height(), left: $tag.position().left, top: $tag.position().top }).addClass($tag.data('link')) }, rotate: function ($tag, cache) {
			var center = { x: $tag.position().left + $tag.width() / 2, y: $tag.position().top + $tag.height() / 2 }; var quadrant = tag.getElementQuadrant(center, cache); var dist_element; switch (quadrant) { case 1: dist_element = Math.sqrt(Math.pow((center.x - 0), 2) + Math.pow((center.y - 0), 2)); break; case 2: dist_element = Math.sqrt(Math.pow((center.x - cache.ztdim.x), 2) + Math.pow((center.y - 0), 2)); break; case 3: dist_element = Math.sqrt(Math.pow((center.x - 0), 2) + Math.pow((center.y - cache.ztdim.y), 2)); break; case 4: dist_element = Math.sqrt(Math.pow((center.x - cache.ztdim.x), 2) + Math.pow((center.y - cache.ztdim.y), 2)); break }
			var anglefactor = 25; var angle = ((cache.dist_center - dist_element) / cache.dist_center) * anglefactor; switch (quadrant) { case 1: $tag.data('rotate', angle).transform({ 'rotate': angle + 'deg' }); break; case 2: $tag.data('rotate', -angle).transform({ 'rotate': -angle + 'deg' }); break; case 3: $tag.data('rotate', -angle).transform({ 'rotate': -angle + 'deg' }); break; case 4: $tag.data('rotate', angle).transform({ 'rotate': angle + 'deg' }); break }
		}, getElementQuadrant: function (c, cache) {
			if (c.x <= cache.ztdim.x / 2 && c.y <= cache.ztdim.y / 2)
				return 1; else if (c.x > cache.ztdim.x / 2 && c.y <= cache.ztdim.y / 2)
				return 2; else if (c.x <= cache.ztdim.x / 2 && c.y >= cache.ztdim.y / 2)
				return 3; else if (c.x > cache.ztdim.x / 2 && c.y > cache.ztdim.y / 2)
				return 4
		}
	}, viewport = {
		zoom: function ($ztcontainer, $tag, cache, settings) {
			var $ztitem = $tag.closest('div.zt-item'), ztitemid = $ztitem.data('id'), $ztimage = $ztitem.children('img.zt-current'), zoomfactor = $tag.data('zoom'), speedfactor = $tag.data('speed'), imgdelayfactor = $tag.data('delay'), link = $tag.data('link'), dir = $tag.data('dir'), $new_ztitem = $ztcontainer.find('div.' + link), $new_ztitemimage = $new_ztitem.find('img.zt-current'), zoomAnimation = !0; if (!link) return !1; if (zoomfactor === undefined || speedfactor === undefined || imgdelayfactor === undefined || dir === undefined)
				zoomAnimation = !1; (dir === 1) ? viewport.zoomin($tag, $ztitem, ztitemid, $ztimage, zoomfactor, speedfactor, imgdelayfactor, zoomAnimation, $new_ztitem, $new_ztitemimage, cache, settings) : viewport.zoomout($tag, $ztitem, ztitemid, $ztimage, zoomfactor, speedfactor, imgdelayfactor, zoomAnimation, $new_ztitem, $new_ztitemimage, cache, settings)
		}, zoomin: function ($tag, $ztitem, ztitemid, $ztimage, zoomfactor, speedfactor, imgdelayfactor, zoomAnimation, $new_ztitem, $new_ztitemimage, cache, settings) {
			var el_l = $tag.data('left') + $tag.data('width') / 2, el_t = $tag.data('top') + $tag.data('height') / 2; $.fn.applyStyle = (zoomAnimation) ? $.fn.animate : $.fn.css; $ztimage.applyStyle({ width: cache.ztdim.x * zoomfactor + 'px', height: cache.ztdim.y * zoomfactor + 'px', left: -((zoomfactor * (2 * el_l)) - (2 * el_l)) / 2 + 'px', top: -((zoomfactor * (2 * el_t)) - (2 * el_t)) / 2 + 'px' }, $.extend(!0, [], { duration: speedfactor })); $ztitem.children('div.zt-tag').hide(); var imgAnimationCss = { width: cache.ztdim.x + 'px', height: cache.ztdim.y + 'px', left: '0px', top: '0px', opacity: 1 }; if (settings.rotation && !cache.ieLte8)
				imgAnimationCss.rotate = '0deg'; var newztimg = $new_ztitemimage.attr('src'); var tagCss = { position: 'absolute', width: $tag.data('width'), height: $tag.data('height'), left: $tag.data('left'), top: $tag.data('top') }; if (settings.rotation && !cache.ieLte8)
				tagCss.rotate = $tag.data('rotate') + 'deg'; $ztitem.append($('<img src="' + newztimg + '" class="zt-temp"></img>').css(tagCss).delay(imgdelayfactor).applyStyle(imgAnimationCss, $.extend(!0, [], { duration: speedfactor, easing: settings.zoominEasing, complete: function () { viewport.zoominCallback($(this), $new_ztitem, $ztitem, $ztimage, cache) } }))); if (!zoomAnimation)
				viewport.zoominCallback($ztitem.find('img.zt-temp'), $new_ztitem, $ztitem, $ztimage, cache)
		}, zoominCallback: function ($zttemp, $new_ztitem, $ztitem, $ztimage, cache) { $(this).remove(); $new_ztitem.show().children('div.zt-tag').show(); $ztitem.hide(); $ztimage.css({ width: cache.ztdim.x + 'px', height: cache.ztdim.y + 'px', left: '0px', top: '0px' }); cache.animTour = !1 }, zoomout: function ($tag, $ztitem, ztitemid, $ztimage, zoomfactor, speedfactor, imgdelayfactor, zoomAnimation, $new_ztitem, $new_ztitemimage, cache, settings) {
			var $originalTag = $new_ztitem.children('div.' + ztitemid), o_tag_w = $originalTag.data('width'), o_tag_h = $originalTag.data('height'), o_tag_l = $originalTag.data('left'), o_tag_t = $originalTag.data('top'), o_tag_r = $originalTag.data('rotate'), el_l = o_tag_l + o_tag_w / 2, el_t = o_tag_t + o_tag_h / 2; $.fn.applyStyle = (zoomAnimation) ? $.fn.animate : $.fn.css; $new_ztitemimage.css({ width: cache.ztdim.x * zoomfactor + 'px', height: cache.ztdim.y * zoomfactor + 'px', left: -((zoomfactor * (2 * el_l)) - (2 * el_l)) / 2 + 'px', top: -((zoomfactor * (2 * el_t)) - (2 * el_t)) / 2 + 'px' }); $ztitem.hide(); var $new_ztitem_tags = $new_ztitem.children('div.zt-tag'); $new_ztitem_tags.hide(); $new_ztitem.show(); var expandCss = { width: cache.ztdim.x + 'px', height: cache.ztdim.y + 'px', left: '0px', top: '0px', opacity: 1 }; if (settings.rotation && !cache.ieLte8)
				expandCss.rotate = '0deg'; var imgAnimationCss = { width: o_tag_w + 'px', height: o_tag_h + 'px', left: o_tag_l + 'px', top: o_tag_t + 'px', opacity: 0 }; if (settings.rotation && !cache.ieLte8)
				imgAnimationCss.rotate = o_tag_r + 'deg'; $new_ztitem.append($('<img src="' + $ztimage.attr('src') + '" class="zt-temp"></img>').css(expandCss))
			var $zttemp = $new_ztitem.find('img.zt-temp'); $zttemp.applyStyle(imgAnimationCss, $.extend(!0, [], { duration: speedfactor, complete: function () { $(this).remove() } })); if (!zoomAnimation)
				$zttemp.remove(); $new_ztitemimage.delay(imgdelayfactor).applyStyle({ width: cache.ztdim.x + 'px', height: cache.ztdim.y + 'px', left: '0px', top: '0px' }, $.extend(!0, [], { duration: speedfactor, easing: settings.zoomoutEasing, complete: function () { viewport.zoomoutCallback($new_ztitem_tags, cache) } })); if (!zoomAnimation)
				viewport.zoomoutCallback($new_ztitem_tags, cache)
		}, zoomoutCallback: function ($new_ztitem_tags, cache) { $new_ztitem_tags.show(); cache.animTour = !1 }
	}, methods = {
		init: function (options) {
			if (this.length) {
				var settings = { rotation: !0, zoominEasing: '', zoomoutEasing: '' }; return this.each(function () {
					if (options) { $.extend(settings, options) }
					var $ztcontainer = $(this), $ztitems = $ztcontainer.children('div.zt-item'), $ztimages = $ztitems.children('img.zt-current'), $zttags = $ztitems.children('div.zt-tag'), cache = { ztdim: { x: $ztcontainer.width(), y: $ztcontainer.height() }, ieLte8: ($.browser.msie && parseInt($.browser.version) <= 8), animTour: !1 }; var $loading = $('<div class="zt-loading"></div>').prependTo($ztcontainer); $ztitems.each(function () { var $ztitem = $(this); $ztitem.addClass($ztitem.data('id')) }); if (settings.rotation && !cache.ieLte8)
						cache.dist_center = Math.sqrt(Math.pow((cache.ztdim.x / 2), 2) + Math.pow((cache.ztdim.y / 2), 2)); $zttags.each(function () {
							var $tag = $(this); tag.saveInitialData($tag); if (settings.rotation && !cache.ieLte8 && !$tag.hasClass('zt-tag-back'))
								tag.rotate($tag, cache)
						}).hide(); $ztitems.not(':first').hide(); var loaded = 0, totalImages = $ztimages.length; $ztimages.each(function () {
							$('<img>').load(function () {
								++loaded
								if (loaded === totalImages) { $ztimages.show(); $loading.hide(); $zttags.show(); $zttags.bind('click.zoomtour', function (e) { if (cache.animTour) return !1; cache.animTour = !0; var $tag = $(this); viewport.zoom($ztcontainer, $tag, cache, settings) }) }
							}).attr('src', $(this).attr('src'))
						})
				})
			}
		}
	}; $.fn.zoomtour = function (method) { if (methods[method]) { return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) } else if (typeof method === 'object' || !method) { return methods.init.apply(this, arguments) } else { $.error('Method ' + method + ' does not exist on jQuery.zoomtour') } }
})(jQuery)