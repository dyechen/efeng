
		function start_page(){
		   $(".box").remove();
		   audio_player.play();
	    }
		var canvas = document.getElementById("cas"),ctx = canvas.getContext("2d");
		var x1,y1,a=35,timeout,totimes = 100,jiange = 30;
		var x_length=0,y_length=0;
		canvas.width = document.getElementById("bb").clientWidth;
		canvas.height = document.getElementById("bb").clientHeight;
		//alert(document.getElementById("bb").clientWidth);
		//alert(document.getElementById("bb").clientHeight);
		var img = new Image();
		//alert(wipescreen.length);
		if((wipescreen!="no") && (wipescreen.length>1)){
			img.src = wipescreen;
		    img.onload = function(){
			ctx.drawImage(img,0,0,canvas.width,canvas.height);
			//ctx.fillRect(0,0,canvas.width,canvas)
			tapClip();
			//$('.main').css("opacity","1");
	 	    }
		}
		//ͨ���޸�globalCompositeOperation���ﵽ������Ч��
		function tapClip(){
			var hastouch = "ontouchstart" in window?true:false,
				tapstart = hastouch?"touchstart":"mousedown",
				tapmove = hastouch?"touchmove":"mousemove",
				tapend = hastouch?"touchend":"mouseup";
				
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.lineWidth = a*2;
			ctx.globalCompositeOperation = "destination-out";
			
			canvas.addEventListener(tapstart , function(e){
				clearTimeout(timeout)
				e.preventDefault();
				
				x1 = hastouch?e.targetTouches[0].pageX:e.clientX-canvas.offsetLeft;
				y1 = hastouch?e.targetTouches[0].pageY:e.clientY-canvas.offsetTop;
				
				ctx.save();
				ctx.beginPath()
				ctx.arc(x1,y1,1,0,2*Math.PI);
				ctx.fill();
				ctx.restore();
				
				canvas.addEventListener(tapmove , tapmoveHandler);
				canvas.addEventListener(tapend , function(){
					canvas.removeEventListener(tapmove , tapmoveHandler);				
					timeout = setTimeout(function(){
                        //alert(x_length);
						//alert(y_length);
						if((x_length>2500)||(y_length>4500)){
							 canvas.className='pt-page-rotateFall';
							 var t=setTimeout("start_page()",1000);

						}
					},totimes)
				});
				function tapmoveHandler(e){
					clearTimeout(timeout)
					e.preventDefault()
					x2 = hastouch?e.targetTouches[0].pageX:e.clientX-canvas.offsetLeft;
					y2 = hastouch?e.targetTouches[0].pageY:e.clientY-canvas.offsetTop;
					
					ctx.save();
					ctx.moveTo(x1,y1);
					ctx.lineTo(x2,y2);
					ctx.stroke();
					ctx.restore()
					x_length+= Math.abs(x2-x1);
					y_length+= Math.abs(y2-y1);					
					x1 = x2;
					y1 = y2;


				}
			})
		}	
	

     function touches(obj,direction,fun){
        //obj:ID����
        //direction:swipeleft,swiperight,swipetop,swipedown,singleTap,touchstart,touchmove,touchend
        //          ������    ���ң�     ���ϣ�   ���£�    ������    ��ʼ������ �����ƶ��� ��������
        //fun:�ص�����
        var defaults = {x: 5,y: 5,ox:0,oy:0,nx:0,ny:0};
        direction=direction.toLowerCase();
        //���ã����ķ�Χ��5X5�����ڵ���������
        obj.addEventListener("touchstart",function() {
			if(isPlay) {audio_player.play();}
            defaults.ox = event.targetTouches[0].pageX;
            defaults.oy = event.targetTouches[0].pageY;
            defaults.nx = defaults.ox;
            defaults.ny = defaults.oy;
            if(direction.indexOf("touchstart")!=-1)fun();
        }, false);
        obj.addEventListener("touchmove",function() {
            event.preventDefault();
            defaults.nx = event.targetTouches[0].pageX;
            defaults.ny = event.targetTouches[0].pageY;
            if(direction.indexOf("touchmove")!=-1)fun();
        }, false);
        obj.addEventListener("touchend",function() {
            var changeY = defaults.oy - defaults.ny;
            var changeX = defaults.ox - defaults.nx;
            if(Math.abs(changeX)>Math.abs(changeY)&&Math.abs(changeY)>defaults.y){
                //�����¼�
                if(changeX > 0) {
                   // if(direction.indexOf("swipeleft")!=-1)fun();
				   fun("swipeleft");
                }else{
                    //if(direction.indexOf("swiperight")!=-1)fun();
				   fun("swiperight");
                }
            }else if(Math.abs(changeY)>Math.abs(changeX)&&Math.abs(changeX)>defaults.x){
                //�����¼�
                if(changeY > 0) {
                    //if(direction.indexOf("swipetop")!=-1)fun();
					fun("swipetop");
                }else{
                    //if(direction.indexOf("swipedown")!=-1)fun();
					fun("swipedown");
                }
            }else{
                //�����¼�
                if(direction.indexOf("singleTap")!=-1)fun();
            }
            if(direction.indexOf("touchend")!=-1)fun();
        }, false);
    };

var PageTransitions = (function() {

	var $main = $( '#pt-main' ),
		$pages = $main.children( 'div.pt-page' ),
		$iterate = $( '#iterateEffects' ),
		animcursor = 1,
		pagesCount = $pages.length,
		current = 0,
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		//animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
		animEndEventName = animEndEventNames['WebkitAnimation' ];
		// support css animations
		//support = Modernizr.cssanimations;
	
	function init() {
		gotoPage=nextPage;
		var main_page = document.getElementById("pt-main");
        touches(main_page,"swipeleft swiperight swipetop swipedown" ,function( event ) {	
			if( isAnimating ) {
				return false;
			}
			//if( animcursor > 67 ) {
			//	animcursor = 1;
			//}
			if(event == "swipeleft"){
				nextPage( pageTransition_left,current+1);
			}
			else if(event == "swiperight"){
				nextPage( pageTransition_right,current-1);
			}
			else if(event == "swipetop"){
				nextPage( pageTransition_top,current+1);
			}
			else if(event == "swipedown"){
				nextPage( pageTransition_bottom,current-1);
			}

			//nextPage( pageTransition);//animcursor );
			//++animcursor;
			return false;
					
		});

		$pages.each( function() {
			var $page = $( this );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );

		$pages.eq( current ).addClass( 'pt-page-current' );

	/*	$( '#dl-menu' ).dlmenu( {
			animationClasses : { in : 'dl-animate-in-2', out : 'dl-animate-out-2' },
			onLinkClick : function( el, ev ) {
				ev.preventDefault();
				nextPage( el.data( 'animation' ) );
			}
		} );

		$iterate.on( 'click', function() {
			if( isAnimating ) {
				return false;
			}
			if( animcursor > 67 ) {
				animcursor = 1;
			}
			nextPage( animcursor );
			++animcursor;
		} );
		*/
       itemAnimation();
	}

	function nextPage( animation ,toPage) {
        if(animation ==0 )return;
		if(animation ==-1){
		  if( pageTransition_left>0)animation=pageTransition_left;
		  else if(pageTransition_top>0)animation=pageTransition_top;
		  else animation =3;
		}
		if( isAnimating ) {
			return false;
		}

		isAnimating = true;
		
		var $currPage = $pages.eq( current );
        /*
		if( current < pagesCount - 1 ) {
			++current;
		}
		else {
			current = 0;
		}
        */
		current =toPage;

		if(current==pagesCount)current=0;
		else if(current<0)current=pagesCount-1;
		var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),
			outClass = '', inClass = '';

		switch( animation ) {

			case 1:
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 2:
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 3:
				outClass = 'pt-page-moveToTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 4:
				outClass = 'pt-page-moveToBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 5:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 6:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 7:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 8:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 9:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 10:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 11:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 12:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 13:
				outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
				inClass = 'pt-page-moveFromRight';
				break;
			case 14:
				outClass = 'pt-page-moveToRightEasing pt-page-ontop';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 15:
				outClass = 'pt-page-moveToTopEasing pt-page-ontop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 16:
				outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
				inClass = 'pt-page-moveFromTop';
				break;
			case 17:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 18:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 19:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 20:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 21:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-scaleUpDown pt-page-delay300';
				break;
			case 22:
				outClass = 'pt-page-scaleDownUp';
				inClass = 'pt-page-scaleUp pt-page-delay300';
				break;
			case 23:
				outClass = 'pt-page-moveToLeft pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 24:
				outClass = 'pt-page-moveToRight pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 25:
				outClass = 'pt-page-moveToTop pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 26:
				outClass = 'pt-page-moveToBottom pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 27:
				outClass = 'pt-page-scaleDownCenter';
				inClass = 'pt-page-scaleUpCenter pt-page-delay400';
				break;
			case 28:
				outClass = 'pt-page-rotateRightSideFirst';
				inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
				break;
			case 29:
				outClass = 'pt-page-rotateLeftSideFirst';
				inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
				break;
			case 30:
				outClass = 'pt-page-rotateTopSideFirst';
				inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
				break;
			case 31:
				outClass = 'pt-page-rotateBottomSideFirst';
				inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
				break;
			case 32:
				outClass = 'pt-page-flipOutRight';
				inClass = 'pt-page-flipInLeft pt-page-delay500';
				break;
			case 33:
				outClass = 'pt-page-flipOutLeft';
				inClass = 'pt-page-flipInRight pt-page-delay500';
				break;
			case 34:
				outClass = 'pt-page-flipOutTop';
				inClass = 'pt-page-flipInBottom pt-page-delay500';
				break;
			case 35:
				outClass = 'pt-page-flipOutBottom';
				inClass = 'pt-page-flipInTop pt-page-delay500';
				break;
			case 36:
				outClass = 'pt-page-rotateFall pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 37:
				outClass = 'pt-page-rotateOutNewspaper';
				inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
				break;
			case 38:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 39:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 40:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 41:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 42:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-rotatePullRight pt-page-delay180';
				break;
			case 43:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-rotatePullLeft pt-page-delay180';
				break;
			case 44:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-rotatePullBottom pt-page-delay180';
				break;
			case 45:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-rotatePullTop pt-page-delay180';
				break;
			case 46:
				outClass = 'pt-page-rotateFoldLeft';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 47:
				outClass = 'pt-page-rotateFoldRight';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 48:
				outClass = 'pt-page-rotateFoldTop';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 49:
				outClass = 'pt-page-rotateFoldBottom';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 50:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-rotateUnfoldLeft';
				break;
			case 51:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-rotateUnfoldRight';
				break;
			case 52:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-rotateUnfoldTop';
				break;
			case 53:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-rotateUnfoldBottom';
				break;
			case 54:
				outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomLeftIn';
				break;
			case 55:
				outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomRightIn';
				break;
			case 56:
				outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomTopIn';
				break;
			case 57:
				outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomBottomIn';
				break;
			case 58:
				outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeLeftIn';
				break;
			case 59:
				outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeRightIn';
				break;
			case 60:
				outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeTopIn';
				break;
			case 61:
				outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeBottomIn';
				break;
			case 62:
				outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselLeftIn';
				break;
			case 63:
				outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselRightIn';
				break;
			case 64:
				outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselTopIn';
				break;
			case 65:
				outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselBottomIn';
				break;
			case 66:
				outClass = 'pt-page-rotateSidesOut';
				inClass = 'pt-page-rotateSidesIn pt-page-delay200';
				break;
			case 67:
				outClass = 'pt-page-rotateSlideOut';
				inClass = 'pt-page-rotateSlideIn';
				break;

		}

		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );
        hideitem($nextPage);
		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		//if( !support ) {
		//	onEndAnimation( $currPage, $nextPage );
		//}

	}

	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		isAnimating = false;
		itemAnimation();
		hideitem($outpage);
	}
	function hideitem($page){
		var $items= $page.children("div");
		$items.each( function() {
			var $item = $( this );			
			var animation = $item.attr( 'animation' );
			if(animation.length>0){
			   $item.css("visibility","hidden");
			}
                
		});
	}
    function itemAnimation(){
		var $items= $pages.eq( current ).children("div");
		$items.each( function() {
			var $item = $( this );			
			var animation = $item.attr( 'animation' );
			if(animation.length>0){
			  var animation_name= $item.attr("animation-name");
			  $item.css("visibility","visible");
	          $item.css("-webkit-animation","");
			  $item.css("animation","");
	          $item.css("-webkit-animation",$item.attr("animation"));
              
	         /* $item.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                 $(this).css("-webkit-animation","");
				  $(this).css("animation","");
		       });
			   */
			  $item.removeClass(animation_name).addClass(animation_name ).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                   $(this).removeClass(animation_name);
                   $(this).css("-webkit-animation","");
		           $(this).css("animation","");
              });
			}
		});		


	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
	}

	init();

	return { init : init };

})();