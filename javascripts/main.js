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
        duration : 1000
    };
    $("#example .counter").rollingCounter( options );

    $("#oneMore").bind("click", function(){
        var counter =  $(".counter").eq(0).data("rollingCounter-1");
        counter.rolling();
    });

});
