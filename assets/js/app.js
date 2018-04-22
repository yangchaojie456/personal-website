window.onload = function(){
    // 导航选中标记 on    
    document.querySelector('.header .' + location.pathname.split('/')[1]).classList.add('on')
    // 菜单 下拉
    document.querySelector('.js-menu').addEventListener('click', function () {
        document.querySelector('.drop-menu').classList.toggle('drop-menu-close')
    })
}