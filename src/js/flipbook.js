$(document).ready(function() {
    // 반응형
    if(window.innerWidth > 768) {
        $("#flipBook").addClass("pc").removeClass("mobile");
        pc();
    } else {
        $("#flipBook").removeClass("pc").addClass("mobile"); 
        mobile();
    }
    
    //북마크 추가
    $(".front").append("<div class='bookmark'></div>");
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
        if(!$(this).hasClass('bookmarkTitle')) {

            let dataPage = $(this).attr('data-page');

            $(".pages").removeClass('current').removeClass('flipped').removeClass('flip_right').removeClass('flip_left');
    
            $("#"+dataPage).addClass('current');
            $("#"+dataPage).prev('.pages').addClass('flipped');
        }

    });
    // 북마크 버튼 클릭
    $(document).on("click", ".bookmark", function() {
        $(this).toggleClass('on');
        let bookOn = $(this).parent('.front').attr('title');
        let bookId = $(this).closest('.pages').attr('id');
        // pc 
        if($(this).hasClass('on')
            && window.innerWidth > 768
            && $(".bookLi[data-page='"+bookId+"']").length < 2 
            && $(this).parent('.front').is("div:nth-child(even)")      
        ) {
             $("nav #bookmark").append("<li class='bookLi even' data-page='p" + (Number(bookId.replace('p','')) + 1)+"'>"+bookOn+"<span></span></li>");
        } else if (
            $(this).hasClass('on')
            && window.innerWidth > 768
            && $(".bookLi[data-page='"+bookId+"']").length < 2 
            && $(this).parent('.front').is("div:nth-child(odd)")
            || $(this).hasClass('on')
            && window.innerWidth <= 768
        ) {
            $("nav #bookmark").append("<li class='bookLi' data-page='" +bookId+"'>"+bookOn+"<span></span></li>");
        } else if (
            $(this).hasClass('on') === false
            && window.innerWidth > 768
            && $(".bookLi[data-page='"+bookId+"']").length < 2 
            && $(this).parent('.front').is("div:nth-child(even)") 
        ) {
            $(".bookLi.even[data-page='p" + (Number(bookId.replace('p','')) + 1)+"']").remove();
        } else if (
            $(this).hasClass('on') === false
            && window.innerWidth > 768
            && $(".bookLi[data-page='"+bookId+"']").length < 2 
            && $(this).parent('.front').is("div:nth-child(odd)") 
            || (this).hasClass('on') === false
            && window.innerWidth <= 768 
        ) {
            $(".bookLi[data-page='"+bookId+"']").remove();
        }
    });
    $(document).on("click", ".bookLi span", function() {
        let xBtn = $(this).parent('.bookLi').attr('data-page');

        $(this).parent('.bookLi').remove();
        $(".pages[id='"+xBtn+"']").find('.bookmark').removeClass('on');

    });

    // 햄버거 메뉴
    $(".menu").click(function() {
        $("nav").addClass("on");
        $(".bg").addClass("show");
    });
    $("nav .x_btn").click(function() {
        $("nav").removeClass("on");
        $(".bg").removeClass("show");
    });
});

// 반응형
$(window).on('resize', function(){
    if (window.innerWidth >= 768) {
        pc();
        bookmarkPc();
    } 
    else {
        mobile();
    }
});

// pc 사이즈
function pc() {
    $("#flipBook").addClass("pc").removeClass("mobile");

    $(".front").unwrap(".pages"); // 기존에 있는 pages 없애기
    $(".btn").remove(); // 버튼 삭제
    $(".blank").remove();
    $(".card:nth-child(2n)").addClass("back");

    // page 앞 뒷면 wrap
    var divs = $(".wrapper > div");
    for (let i = 0; i < divs.length; i += 2) {
        divs.slice(i, i + 2).wrapAll("<section class='pages'></section>");
    }
    // 첫번째 페이지에 current 클래스 추가
    $(".pages:first-child").addClass("current");
    // next, prev 버튼 추가
    $(".pages").append(`
        <div class="btn prev" alt="이전버튼">&lt;</div>
        <div class="btn next" alt="다음버튼">&gt;</div>
    `);

    // id추가
    $("nav ul li").not('.bookLi').remove(); // 무한으로 생기는 현상 막음
    $(".pages").each(function(index) {
        $(this).attr('id', 'p'+index);
        // nav 안 li 생성
        
        $("nav ul").not('#bookmark').append("<li data-page='p" +index+"'>"+$(this).find('.front').attr('title')+"</li>");
        if($(this).children('.front').length === 2) {
            $("nav ul").not('#bookmark').append("<li data-page='p" +(index+1)+"'>"+$(this).find('.front').last().attr('title')+"</li>");
        }
        
    });
}
// 모바일 사이즈
function mobile() {
    $("#flipBook").removeClass("pc").addClass("mobile"); 
    $(".front").removeClass("back");
    $(".front").unwrap(".pages"); // 기존에 있는 pages 없애기
    $(".btn").remove(); // 버튼 삭제
    if($(".pages .back").length < 1) {
        $(".front").wrap("<section class='pages'></section>");
        $(".front").after("<div class='back card blank'></div>");
        $(".wrapper > .blank").remove();
        // 첫번째 페이지에 current 클래스 추가
        $(".pages:first-child").addClass("current");
        // next, prev 버튼 추가
        $(".pages").append(`
            <div class="btn prev" alt="이전버튼">&lt;</div>
            <div class="btn next" alt="다음버튼">&gt;</div>
        `);
        // id추가
        $("nav ul li").not('.bookLi').remove(); // 무한으로 생기는 현상 막음
        $(".pages").each(function(index) {
            $(this).attr('id', 'p'+index);
            // nav 안 li 생성
            $("nav ul").not('#bookmark').append("<li data-page='p" +index+"'>"+$(this).find('.front').attr('title')+"</li>")
        });
    }
}

function bookmarkPc() {
    // let pageId;
    let pageTitle = $(".front").attr('title');
    let bookText  = $(".bookLi").not('li.bookmarkTitle').text();
    // console.log(pageTitle);
    // console.log(bookText);
    // if (pageTitle == bookText) {
    //     console.log('dd');
    // }


    $(".bookLi").attr('data-page','');
    $(".bookLi").not('.bookmarkTitle').each(function() {
        //console.log($(this));
        console.log($('.front:contains("'+$(this).not('li.bookmarkTitle').text()+'")'));
        if(bookText == pageTitle) {
            $(this).attr('data-page','멍멍');
        }
    });
}