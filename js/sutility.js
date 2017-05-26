/*
	sutility.js (Smart Utility)
	version : 1.0.0
	authors : facebook.com/nguyenvanquyet.bn
	license : imgspec.com/sutilitiy
*/
$.fn.extend({
	/*Set equal height or width of column*/
	sColumn: function(options){
		var col = 0;
		var max_h = 0;
		var max_w = 0;
		var marginRight = 0;

		var paras = $.extend({
			setWidth: false,
			breakPoint: {
				320: {
					column: 0,
					width: 0,
				}
			}
		}, options);
		if(jQuery.isEmptyObject(paras.breakPoint[320])){
			paras.breakPoint[320] = {column: 0, width: 0};
		}

		/*Add style for selecttor*/
		if(paras.setWidth){
			$.each(this.selector.split(','), function(index, value){
				$('body').append('<style>'+value+':after{content:"";display:table;clear:both;}'+value+' > *{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}</style>');
			})
		}
		
		var timer = false;
		var selector = $(this.selector);
		init();
		$(window).resize(function() {
			init();
		});
		function init(){
			if (timer) clearTimeout(timer);
			timer = setTimeout(function(){
				/*Cacl colum, width, marginright*/
				var ww = $(window).width();
				Object.keys(paras.breakPoint).forEach(function(key) {
					if( ww >= key){
						col = Math.abs(paras.breakPoint[key].column);
						max_w = Math.abs(parseInt(paras.breakPoint[key].width));
						if(col > 1){
							marginRight = Math.abs((100 - col*max_w)/(col - 1));
						}
					}
				})
				/*Calc height*/
				selector.each(function(){
					var from = 0;
					var cur_selector = $(this).children();
					cur_selector.removeAttr('style');
					if(col > 1){
						cur_selector.css({'float': 'left', 'width': max_w + '%'});
						cur_selector.each(function($i){
							if( $i % col == 0){
								from = $i;
								max_h = 0;
							}
							if($(this).outerHeight() > max_h){
								max_h = $(this).outerHeight();
							}
							/*Add style for element*/
							cur_selector.each(function($i2){
								if($i2 >= from && $i2 <= $i){
									$css = {'height' : max_h}
									if(paras.setWidth && max_w > 0){
										$css = $.extend($css, {
											'width': max_w + '%',
											'float': 'left'
										});
										if(!($i2 == $i || $i2 == cur_selector.length)){
											$css = $.extend($css, {
												'margin-right': marginRight + '%'
											});
										}
									}
									$(this).css($css);

								}
							})
						})
					}
				})
			}, 300);
		}
	}
})