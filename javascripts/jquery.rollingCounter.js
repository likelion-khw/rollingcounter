/**
 * jquery.rollingCounter.js 숫자를 돌리면서 카운트 하는 jQuery 플러그인
 *
 * @example
 *
 *
 * @date 2013년 4월 25일 목요일
 * @author jsyang < yakuyaku@gmail.com >
 * @version 1.0
 *
 * Dual licensed under the MIT and GPL licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-license.php
 *
 * http://oog.co.kr
 */
;(function($, f){

    if ( !$ ) return f;

    // 기본 옵션
    var counterDefaults = {
        animate : true,
        oneMore : true,
        numbers : 9999999,
        rollingCount : 400,
        numHeight : 10,
        delayTime : 20 ,
        waitTime : 1,
        expect : 0 ,
        duration : 1000,
        attrCount : 'data-count',
        easing : 'linear',
        randomnumber : 0 ,
        digit : 'digit',
        endfunc : false

    };

    var Counter = function( el, options ) {
        this.container = $(el);
        this.opts = $.extend( {}, counterDefaults, options );
        this.opts.numbers = this.container.attr( this.opts.attrCount );
        this.busy = false;
        this.init();
    };

    Counter.prototype = {

        init : function() {
            var ss = this;
            ss.makeDigit();
            ss.setComma();
            ss.rolling();
        },

        // rolling 하기.
        rolling : function(){
            var ss = this,
                numHeight = this.opts.numHeight,
                digigName = this.opts.digit;
            if ( ss.busy ) {
                return true;
            }
            ss.busy = true;
            this.rollingCount = this.opts.rollingCount;

            this.container.find("." + digigName).each(function(){
                var $display = $(this) ,
                    $digit = $display.find('span');

                $digit.css({
                    top: '-' + (parseFloat($display.height()) * (numHeight)) + 'px'
                });

                if ( ss.opts.animate ) {
                    ss.fastRolling( $digit );
                } else {
                    $digit.css({
                        top: '-' + (parseInt($display.height(),10) * (numHeight - parseInt($digit.attr('title')) ) ) + 'px'
                    });
                };
            });

        },
        // 숫자들 롤링 회전 시키기
        fastRolling : function( $digit ) {
            var ss = this,
                numHeight = this.opts.numHeight,
                $display = $digit.parent();

             ss.rollingCount--;

             if ( ss.rollingCount < 0 ) {
                ss.busy = false;
                if ( ss.opts.oneMore ) {
                    var rnd = parseInt(( Math.random() * numHeight ) + 1, 10);
                    $digit.css({
                        top: '-' + (parseInt($display.height(), 10) * rnd) + 'px'
                    });
                    ss.transition( $digit );
                } else {
                    $digit.css({
                        top: '-' + (parseInt($display.height(), 10) * (numHeight - parseInt($digit.attr('title')))) + 'px'
                    });
                }
             } else {
                 var delayValue =  Math.random() * ss.opts.delayTime + ss.opts.waitTime;//
                 $digit.delay( delayValue );
                 $digit.animate({
                    top: '+=' + $display.height() + 'px'
                 }, 10, function(){
                    setTimeout(function(){
                        ss.fastRolling( $digit );
                    }, 1 );
                    if ( parseInt($digit.css('top')) > -1 * parseInt($display.height())){
                        $digit.css({
                            top: '-' + (parseInt($display.height()) * 10) + 'px'
                        });
                    };
                 });
             };
        },

        // 애니메이션 실행하기
        transition : function ( $digit  ){
            var ss = this,
                numHeight = ss.opts.numHeight,
                $display = $digit.parent(),
                totalHeight = $display.height(),
                delayValue = Math.random() * ss.opts.delayTime + ss.opts.waitTime; // Math.random() * 범위 + 시작
            $digit.delay( delayValue );
            $digit.animate({
                top: '-' + ( parseFloat(totalHeight) * ( numHeight - parseFloat( $digit.attr('title') ) ) ) + 'px'
            }, {duration: ss.opts.duration , specialEasing: {  top: ss.opts.easing } });
        },

        // @todo 기대치 만크 추가로 이동하기
        expectAnimate : function( $digit ) {

        },

        // 현재 숫자들 얻기
        getCounter : function( $counter ) {
            var $total = '';
            $this.find('.digit').each(function(){
                var $display = $(this);
                var $digit = $display.find('span');
                $total = $total+$digit.attr('title')
            });
            return ($total*1);
        },

        // 숫자 Html 만들기
        makeDigit : function(){
            var sHtml = "",
                sNum = this.opts.numbers.toString(),
                iNumLength = sNum.length - 1,
                rows = [0,1,2,3,4,5,6,7,8,9,0].reverse().join('<br/>'),
                digigName = this.opts.digit;

            sHtml += '<div  class="counter-holder">';
            sHtml += '<span class="counter">';
            for ( var i=0; i <= iNumLength; i++ ) {
                sHtml += '<span class="' + digigName + '"><span title="' + sNum.charAt(i) + '" >' + rows + '</span><hr></span>';
            };
            sHtml += '</span></div>';
            this.container.append( sHtml );
        },

        // 3자리 마다 콤마찍기
        setComma : function() {
            var digigName = this.opts.digit;
            var digit = this.container.find("." + digigName ).toArray().reverse();
            $.each( digit, function(i) {
                if ( i != 0 && i % 3 == 0 ) {
                    $('<span class="separator"><span title=",">,</span><hr></span>').insertAfter( $(digit[i]) );
                };
            });
        }
    };

    // jQuery 플러그인 생성
    $.fn.rollingCounter = function(o) {
        var len = this.length;
        return this.each(function(index){
            var $this = $(this),
                instance = new Counter( $this, o );
            $this.data('rollingCounter' + ( len > 1 ? '-' + ( index + 1 )  : ''), instance );
        });
    };

})( window.jQuery, false );
