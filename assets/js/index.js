(function (id) {
    var c = document.getElementById(id),
        width = window.innerWidth,
        height = window.innerHeight,        
        ctx = c.getContext("2d");
    
    var lastX = 0, lastY = 0, nextX = 0, nextY = 0;
    var lastImageData = null;
    lastImageData = lastMove(ctx, width, height)
    
    // 标记第一次进入
    var flag = true
    document.body.onmousemove = blackboard

    // 点击的时候 切换画还时候不画
    c.onclick = function () {
        if (document.body.onmousemove) {
            document.body.onmousemove = null
            flag = true;
        } else {
            document.body.onmousemove = blackboard
        }
    }

    document.body.onmouseleave = function () {
        lastX = 0, lastY = 0, nextX = 0, nextY = 0;
        flag = true
    }

    var img = new Image();
    img.src = './assets/images/beauty' + (Math.floor(Math.random() * 2)+1)+'.jpg';
    img.onload = function () {
        document.body.onmousemove = blackboard
    }

    function blackboard(e) {
        
        ctx.beginPath()
        if (flag) {
            if (e.target.nodeName == 'CANVAS') {
                lastX = e.offsetX
                lastY = e.offsetY
            } else {
                var offset = getBodyOffset(e.target)
                lastX = offset.left + e.offsetX + (window.screen.availWidth - window.innerWidth) / 2
                lastY = offset.top + e.offsetY
            }
            flag = false
        }
        drawLast(ctx, lastImageData)
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = "round"
        ctx.lineCap = "round"

        var pattern = ctx.createPattern(img, 'no-repeat');

        ctx.strokeStyle = pattern;
        ctx.moveTo(lastX, lastY);
        if (e.target.nodeName == 'CANVAS') {
            nextX = e.offsetX
            nextY = e.offsetY
        } else {
            var offset = getBodyOffset(e.target)
            
            nextX = offset.left + e.offsetX + (window.screen.availWidth-window.innerWidth)/2
            nextY = offset.top + e.offsetY
        }
        
        ctx.lineTo(nextX, nextY);
        lastX = nextX
        lastY = nextY
        ctx.stroke();
        lastImageData = lastMove(ctx, width, height)
    }
    function lastMove(ctx, width, height) {
        return ctx.getImageData(0, 0, width, height);
    }
    function drawLast(ctx, imgData) {
        ctx.putImageData(imgData, 0, 0);
    }
    function getBodyOffset(element){
        
        var left = element.offsetLeft||0,top=element.offsetTop||0;
        while (element.parentElement !=null){

            left += element.parentElement.offsetLeft||0
            top += element.parentElement.offsetTop||0
            element = element.parentElement        
        }
        return {
            left:left,
            top:top
        }
    }
    
    var lineWidth = 10;
    var btn_voice = document.getElementById('btn_voice')
    $('.tool ul li').on('click',function(){
        $(this).addClass('on').siblings().removeClass('on')
        lineWidth = ($(this).index()+1)*10;
    }).on('mouseenter',function(){
        btn_voice.currentTime = 0;
        btn_voice.play();
    })
    $('.enter').on('click',function(){
        
    })
})("lineCanvas")
