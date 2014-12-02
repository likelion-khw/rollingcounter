$(function(){

    $('pre').addClass('brush: js; toolbar: false');
    $('pre.dark').removeClass().addClass('brush: js; class-name: dark');
    SyntaxHighlighter.defaults['gutter'] = true;
    SyntaxHighlighter.all();

    var options = {
        animate : true,
        attrCount : 'data-count',
        delayTime : 20 ,
        waitTime : 1 ,
        easing : 'easeOutBounce',
        duration : 500
    };
    $("#example .counter").rollingCounter( options );

    $("#oneMore").bind("click", function(){
        var counter =  $(".counter").eq(0).data("rollingCounter-1");
        counter.rolling();
    });
    var cnt = 1;
    $("#btnslot").bind("click", function(){
        var randomnumber = Math.floor(Math.random()*50);
        var sHtml = '<div><div id="slottitle"><h2>' + cnt + '번째 돌립니다. </h1></div>';
            sHtml += '<div id="slotmashine' + cnt + '" data-count="' + randomnumber +'"></div><div>';
        $("#slot").append(sHtml);
        $("#slotmashine"+ cnt).rollingCounter( options );
        cnt++;
    });

});
