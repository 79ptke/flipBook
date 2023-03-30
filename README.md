# DH-Responsive-FlipBook
- 제이쿼리로 만든 반응형 웹북 

# 특징
- 이미지,텍스트,음성,비디오뿐만아니라 3d도 넣을 수 있다.
- 메뉴 기능이 있어 원하는 페이지로 바로 넘어갈 수 있다.
- 원하는 페이지를 북마크 기능으로 표시할 수 있다.
- pc일때는 2페이지, 모바일일때는 1장으로 보인다.

# 코드 설명
```js
    // 반응형
    if(window.innerWidth > 768) {
        $("#flipBook").addClass("pc").removeClass("mobile");
        pc();
    } else {
        $("#flipBook").removeClass("pc").addClass("mobile"); 
        mobile();
    }
```
먼저 현재 브라우저의 크기가 pc버전인지 모바일 버전인지 판단하고,  
사이즈에 맞는 함수를 불러오도록 한다.
```js
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
    // next, prev 버튼 추가
    $(".pages").append(`
        <div class="btn prev" alt="이전버튼"><img src="./src/img/prev.svg" alt="이전 버튼"></div>
        <div class="btn next" alt="다음버튼"><img src="./src/img/next.svg" alt="이전 버튼"></div>
    `);

    // id추가
    $("nav ul li").not('.bookLi,.contentLi').remove(); // 무한으로 생기는 현상 막음
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
```
위에 코드는 pc사이즈일때 실행이 되는 함수와 모바일 사이즈일때 실행이 되는 함수로  
첫 화면이 시작될때랑 화면 사이즈가 리사이즈 될 때 작동한다.
더 자세히 살펴보자면...
```js
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

    // ... 
}
```
여기에서 
```js
$("#flipBook").addClass("pc").removeClass("mobile"); 
```
pc버전의 css가 적용이 되도록 모바일 클래스를 지우고  
pc 클래스를 $("#flipBook")에 추가해준다.
```js
$(".front").unwrap(".pages"); // 기존에 있는 pages 없애기
$(".btn").remove(); // 버튼 삭제
$(".card:nth-child(2n)").addClass("back");
```
화면이 리사이즈 될 때마다 page가 무한으로 생기는 것을 막아주기 위해서  
unwrap을 사용해서 기존에 있는 페이지를 지워주고,  
버튼 역시 지워준다.  
카드 클래스를 가진 div의 짝수번째에 back이라는 클래스를 더해  
2개의 카드를 겹쳐준다. (책이 넘어갈때 한장으로 인식하기 위해서)
```js
    // page 앞 뒷면 wrap
    var divs = $(".wrapper > div");
    for (let i = 0; i < divs.length; i += 2) {
        divs.slice(i, i + 2).wrapAll("<section class='pages'></section>");
    }
```
wrapper안에 있는 front클래스를 가진 div들을 2개씩 pages라는 새로운 div로 감싸준다.  
--> 이렇게 양면 페이지 한 장이 완성된다.
```js
    // id추가
    $("nav ul li").not('.bookLi,.contentLi').remove(); // 무한으로 생기는 현상 막음
    $(".pages").each(function(index) {
        $(this).attr('id', 'p'+index);
        // nav 안 li 생성
        
        $("nav ul").not('#bookmark').append("<li data-page='p" +index+"'>"+$(this).find('.front').attr('title')+"</li>");
        if($(this).children('.front').length === 2) {
            $("nav ul").not('#bookmark').append("<li data-page='p" +(index+1)+"'>"+$(this).find('.front').last().attr('title')+"</li>");
        }
    });
```
이 다음에 각각의 페이지를 구분하기 위해 each문을 사용해서 각각의 페이지마다 id를 순차적으로 부여해준다.  
메뉴 기능을 구현하기 위해서 부여한 id값을 데이터 속성으로 가진 li를 만들어 목차 영역에 넣어준다.  
여기서 front가 짝수번쩨라면 기존 index에  1을 더해준다.
```js
    var index = $(".pages.current").find('.front').attr('data-item'); 

    // ...

    // 반응형시 current페이지 표시
    if(String(index).replace('page','')%2 === 0) {
        $(".front[data-item='"+index+"']").parent('.pages').addClass('current');
        $(".front[data-item='"+index+"']").parent('.pages').prevAll().addClass('flipped');
    } else {
        $(".front[data-item='"+index+"']").parent('.pages').next().addClass('current');
        $(".front[data-item='"+index+"']").parent('.pages').addClass('flipped');
    }
```
위에 코드는 반응형 시 current 클래스가 있는 페이지를 유지하기 위한 코드이다.  
현재 페이지에서의 data-item이라는 속성을 가져와 index라는 변수에 담고,  
짝수 페이지라면 그 페이지의 전 페이지에 flipped이라는 클래스를 더하고,  
홀수 페이지라면 본인이 flipped 클래스를 가지고 그 다음페이지에 current라는 클래스가 오도록 해서  
페이지가 꼬이지 않도록 한다.



