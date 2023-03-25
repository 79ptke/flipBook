$(document).ready(function() {
    // 반응형
    if(window.innerWidth > 768) {
        $("#flipBook").addClass("pc").removeClass("mobile");
        pc();
    } else {
        $("#flipBook").removeClass("pc").addClass("mobile"); 
        mobile();
    }
    $(".pages").removeClass("current");
    $(".pages:first-child").addClass("current");
    $(".front").each(function(idx,item) {
        $(item).attr('data-item','page'+idx);
    });
    //북마크 추가
    $(".front").append("<div class='bookmark'></div>");
    // prev 버튼 클릭
    $(document).on("click", ".prev", function() {
        if($(".pages:first-child").hasClass("current")) {
            alert('첫 페이지 입니다.');
        } else {
            $(".prev,.next").fadeOut();
            $(".current")
                    .removeClass('current')
                    //.addClass('flipped')
                    .prev('.pages')
                    .addClass('current flip_right')
                    .removeClass('flipped')
                    .siblings();
            setTimeout(function() {
                $(".prev,.next").fadeIn();
            },100);
        }
        $('video').trigger('pause');
    });
    // next 버튼 클릭
    $(document).on("click", ".next", function() {
        if($(".pages:last-child").hasClass("current")) {
            alert('마지막 페이지 입니다.');
        } else {
            $(".prev,.next").fadeOut();
            $(".pages.current").removeClass('flip_right').addClass('flip_left');
            setTimeout(function() {
                $(".current")
                    .removeClass('current flip_left')
                    .addClass('flipped')
                    .next('.pages')
                    .addClass('current')
                    .siblings();
            },500);
            setTimeout(function() {
                $(".prev,.next").fadeIn();
            },100);
        }
        $('video').trigger('pause');
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


    
    var dragItems = $('.imgDrag .drag');
    var dropItems = $('.imgDrag').find('.drop');

    // 퍼즐 전체 함수
    function puzzle() {
        dragItems.each(function() {
            var thisDrag = $(this);
            thisDrag[0].addEventListener('dragstart', dragStart);
            thisDrag[0].addEventListener('drag', drag);
            thisDrag[0].addEventListener('dragend', dragEnd);
        });

        dropItems.each(function() {
            var thisDrop = $(this);
            thisDrop[0].addEventListener('dragenter', dragEnter);
            thisDrop[0].addEventListener('dragover', dragOver);
            thisDrop[0].addEventListener('dragleave', dragLeave);
            thisDrop[0].addEventListener('drop', drop);
        });
    }
    puzzle();

    var dragCon;

    // 드래그 시작
    function dragStart(event) {
        var drag = event.target;
        dragCon = event.target;

        event.dataTransfer.effectAllowed = 'copy';

        var imgSrc = $(dragCon).prop('src');
        var imgHTML = $(dragCon).prop('outerHTML');

        try {
            event.dataTransfer.setData('text/uri-list', imgSrc);
            event.dataTransfer.setData('text/html', imgHTML);
        } catch (e) {
            event.dataTransfer.setData('text', imgSrc);
        }

        $(drag).addClass('drag_active');
    }

    // 드래그 된게 해당 영역에 들어갈 때 호출
    function dragEnter(event) {
        var drop = this;

        event.dataTransfer.dropEffect = 'copy';
        $(drop).addClass('drop_active');

        event.preventDefault();
        event.stopPropagation();
    }

    // 드래그 시 해당 영역 위에 있는 동안 계속해서 호출
    function dragOver(event) {
        var drop = this;

        event.dataTransfer.dropEffect = 'copy';

        $(drop).addClass('drop_active');

        event.preventDefault();
        event.stopPropagation();
    }

    // 드래그 된게 해당 영역 내부에서 떠날때 호출
    function dragLeave(event) {
        var drop = this;
        $(drop).removeClass('drop_active');
    }

    // 드래그 될때 호출
    function drag(event) {
        // 지우면 드래그 안됨
    }

    // 드래그 해제 시 호출
    function dragEnd(event) {
        var drag = this;
        $(drag).removeClass('drag_active');
    }

    // 드래그 드롭 했을때
    function drop(event) {
        var drop = this;

        if($(drop).hasClass("drop")) {
            var dataList, dataHTML, dataText;
    
            try {
                dataList = event.dataTransfer.getData('text/uri-list');
                dataHTML = event.dataTransfer.getData('text/html');
            } catch (e) {
                dataText = event.dataTransfer.getData('text');
            }

            if (dataHTML) {
                $(drop).empty();
                $(drop).prepend(dataHTML); // 드래그한 요소의 html 복사 후 넣기
                var drag = $(drop).find('.drag');
            } else {
                $(drop).empty();
                $(drop).prepend($(dragCon).clone());
                var drag = $(drop).find('.drag');
            }

            puzzleChk(drop, drag);
            puzzleComplete();

            event.preventDefault();
            event.stopPropagation();
            // 퍼즐이 맞게 잘 들어갔으면 그 이후 추가 드롭 막기
            if($(drop).hasClass("correct")) {
                $(drop).removeClass("drop").addClass("correctAnswer");
            }
        }
    }

    // 해당 퍼즐 위치가 맞는지 확인
    function puzzleChk(drop, drag) {
        var imageValue = $(drag).attr('data-value');
        var dropValue = $(drop).attr('data-value');

        if (imageValue == dropValue) {
            $(drop).removeClass('incorrect').addClass('correct');
            $(drag).attr('draggable', 'false');

            $(dragCon).hide();
        } else {
            $(drop).removeClass('correct').addClass('incorrect');
            //incorrect라면 해당 퍼즐 삭제
            if($(drop).hasClass('incorrect')) {
                $(drop).find("img").remove();
                $(".popupArea").fadeIn();
                setTimeout(function() {
                    $(".popupArea").fadeOut();
                },3000);
            }
        }
    }

    // 퍼즐 완성 확인
    function puzzleComplete() {
        var correctItems = dropItems.filter('.correct');
        if (correctItems.length == dropItems.length) {
            $('.messageArea').empty();
            $('.messageArea').append('<h3>퍼즐을 완성했습니다!</h3>');
        } else {
            $('.messageArea').empty();
        }
    }

    // 다시 풀기 버튼 클릭 시
    $('.resetBtn').on('click', function() {
        $('.imgDrag').find('.correctAnswer').children('img').remove();
        $('.imgDrag').find('.correctAnswer').removeClass('correct incorrect drop_active correctAnswer').addClass('drop');
        $('.messageArea').empty();
        $('.imgDrag .drag').show();
    });

    // 팝업 X 버튼 클릭 시   
    $(".popupArea .popupWrap .popup .x_btn").click(function() {
        $(".popupArea").fadeOut();
    });
    
});

// pc 사이즈
function pc() {
    $("#flipBook").addClass("pc").removeClass("mobile");
    var index = $(".pages.current").find('.front').attr('data-item'); 
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
    //$(".pages:first-child").addClass("current");
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

    // 반응형시 current페이지 표시
    if(String(index).replace('page','')%2 === 0) {
        $(".front[data-item='"+index+"']").parent('.pages').addClass('current');
        $(".front[data-item='"+index+"']").parent('.pages').prevAll().addClass('flipped');
    } else {
        $(".front[data-item='"+index+"']").parent('.pages').next().addClass('current');
        $(".front[data-item='"+index+"']").parent('.pages').addClass('flipped');
    }
}
// 모바일 사이즈
function mobile() {
    $("#flipBook").removeClass("pc").addClass("mobile"); 
    //var index = $('.pages.current').index();
    var index = $(".pages.current").find('.front').attr('data-item'); 
    $(".front").removeClass("back");
    $(".front").unwrap(".pages"); // 기존에 있는 pages 없애기
    $(".btn").remove(); // 버튼 삭제
    if($(".pages .back").length < 1) {
        $(".front").wrap("<section class='pages'></section>");
        $(".front").after("<div class='back card blank'></div>");
        $(".wrapper > .blank").remove();
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
    // 반응형시 current페이지 표시
    if(String(index).replace('page','')%2 === 0) {
        $(".front[data-item='"+index+"']").parent('.pages').addClass('current');
        $(".front[data-item='"+index+"']").parent('.pages').prev().addClass('flipped');
    } else {
        $(".front[data-item='"+index+"']").parent('.pages').next().addClass('current');
        $(".front[data-item='"+index+"']").parent('.pages').addClass('flipped');
    }
}

// 북마크 반응형 시 변경
function bookmark() {
    $(".bookLi").attr('data-page','');
    $(".front").each(function() {
        let pageTitle = $(this).attr('title');
        let pagesTitle = $(this).parent('.pages').attr('id');
        let evenPage = $(this).is("div:nth-child(even)");
        let oddPage = $(this).is("div:nth-child(odd)");

        $(".bookLi").not('.bookmarkTitle').each(function() {
            let bookText  = $(this).text();
            if(
                bookText===pageTitle 
                && evenPage
                && window.innerWidth > 768
            ) {
                $(this).attr('data-page', 'p' + (Number(pagesTitle.replace('p','')) + 1));
            } else if (
                bookText===pageTitle 
                && oddPage
                && window.innerWidth > 768
                || bookText===pageTitle 
                && window.innerWidth <= 768
            ) {
                $(this).attr('data-page', pagesTitle);
            }
        });
    });
}

// 반응형
$(window).on('resize', function(){
    if (window.innerWidth >= 768) {
        pc();
        bookmark();
    } 
    else {
        mobile();
        bookmark();
    }
});