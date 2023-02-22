$(document).ready(function() {

    $(".front").after("<div class='back card'></div>");
    $(".front").append("<div class='bookmark'></div>");
    // page 앞 뒷면 wrap
    var divs = $(".wrapper > div");
    for (let i = 0; i < divs.length; i += 2) {
        divs.slice(i, i + 2).wrapAll("<section class='pages'></section>");
    }
    // 첫번째 페이지에 current 클래스 추가
    $(".pages:first-child").addClass("current");
    // next, prev 버튼 추가
    $(".pages").append(`
        <div class="btn prev" alt="이전버튼"></div>
        <div class="btn next" alt="다음버튼"></div>
    `);
    // id추가
    $(".pages").each(function(index) {
        $(this).attr('id', 'p'+index);
        // nav 안 li 생성
        $("nav ul").append("<li data-page='p" +index+"'>"+$(this).find('.front').attr('title')+"</li>")
    });
    // prev 버튼 클릭
    $(document).on("click", ".prev", function() {
        if($(".pages:first-child").hasClass("current")) {
            alert('첫 페이지 입니다.');
        } else {
            $(".current")
                    .removeClass('current')
                    //.addClass('flipped')
                    .prev('.pages')
                    .addClass('current flip_right')
                    .removeClass('flipped')
                    .siblings();
        }
    });
    // next 버튼 클릭
    $(document).on("click", ".next", function() {
        if($(".pages:last-child").hasClass("current")) {
            alert('마지막 페이지 입니다.');
        } else {
            $(".pages.current").removeClass('flip_right').addClass('flip_left');
            setTimeout(function() {
                $(".current")
                    .removeClass('current flip_left')
                    .addClass('flipped')
                    .next('.pages')
                    .addClass('current')
                    .siblings();
            },1500);
        }
    });
    // 메뉴 클릭
    $(document).on("click", "nav ul li", function() {
        let dataPage = $(this).attr('data-page');

        $(".pages").removeClass('current').removeClass('flipped').removeClass('flip_right').removeClass('flip_left');

        $("#"+dataPage).addClass('current');
        $("#"+dataPage).prev('.pages').addClass('flipped');

        // console.log(Number($(".current").attr("id").split("").pop()));
        // let currentNum = console.log(Number($(".current").attr("id").split("").pop()));

    });
    // 북마크 버튼 클릭
    $(document).on("click", ".bookmark", function() {
        $(this).toggleClass('on');
        let bookOn = $(this).parent('.front').attr('title');
        let bookId = $(this).closest('.pages').attr('id');
        if($(this).hasClass('on')) {
            if($(".bookLi[data-page='"+bookId+"']").length === 0) {
                $("nav ul").append("<li class='bookLi' data-page='" +bookId+"'>"+bookOn+"<span></span></li>");
            } 
        } else {
            $(".bookLi[data-page='"+bookId+"']").remove();
        }
    });
    $(document).on("click", ".bookLi span", function() {
        let xBtn = $(this).parent('.bookLi').attr('data-page');

        $(this).parent('.bookLi').remove();
        $(".pages[id='"+xBtn+"']").find('.bookmark').removeClass('on');

    });
    // $(window).resize(function() {
    //     if($(window).width() > 768) { 	
            	
    //     } else {
    //         // 2장씩 보이던 것의 뒷 페이지를 앞 페이지로 바꿔준다.
    //         $(".back").addClass('front').removeClass('.back');	
    //         // front 클래스를 가진 div 뒤에 back이라는 뒷 페이지를 만들어준다.
    //         $(".front").after("<div class='back card'></div>");
    //         // 새로 생선된 페이지들 다시 2 div씩 묶기
    //         var divs = $(".wrapper > div");
    //         for (let i = 0; i < divs.length; i += 2) {
    //             divs.slice(i, i + 2).wrapAll("<section class='pages'></section>");
    //         }
    //     }
    // });
});