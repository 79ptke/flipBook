window.addEventListener('load', function() {
    function paging() {
        //const wrapper = document.querySelector('.wrapper');
        const fronts = document.querySelectorAll('.front');
        
        fronts.forEach(function(front) { 
            // pages 생성
            const $pages = document.createElement('div');
            $pages.classList.add('pages');
            // back 생성
            const $back = document.createElement('div');
            $back.classList.add('back');
            $back.classList.add('card');
            // prev 버튼 생성
            const $prev = document.createElement('div');
            $prev.classList.add('prev');
            $prev.classList.add('btn');
            // next 버튼 생성
            const $next = document.createElement('div');
            $next.classList.add('next');
            $next.classList.add('btn');
            // bookmark 생성
            front.innerHTML +=  `<div class="bookmark"></div>`;
            
            $pages.innerHTML = front.outerHTML;
            front.parentNode.insertBefore($pages, front); // front 페이지 pages로 감싸기
            front.remove(); //기존에 있던 front 페이지 삭제
            $pages.appendChild($back);
            $pages.appendChild($prev);
            $pages.appendChild($next); 
            // console.log(front.appendChild($bookmark));
            // front.appendChild($bookmark);    
        });
        // 첫번째 페이지에 current 클래스 추가
        document.querySelector('.pages').classList.add('current');

        // pages에 id 추가
        const page = document.querySelectorAll('.pages');
        page.forEach(function(el,idx) {
            el.setAttribute("id","p"+idx);

            // nav 안 li 생성
            const navLi = `
                        <li class='menuLi' data-page='p` +idx+`'>`+el.firstChild.getAttribute('title')+`</li>
                        `
            document.querySelector("nav ul").insertAdjacentHTML("beforeend", navLi);
        });

        // 메뉴 & 북마크 클릭
        document.addEventListener('click',function(e) {
            if(e.target && e.target.className === 'menuLi' || e.target && e.target.className === 'bookLi') {
                const datapage = e.target.getAttribute('data-page');
                page.forEach(function(p) {
                    p.classList.remove('flipped','current','flip_right','flip_left');

                    console.log(datapage);
                    console.log(p.getAttribute('id'));

                    if(datapage == p.getAttribute('id')) {
                        p.classList.add("current");
                        p.previousElementSibling.classList.add('flipped');
                    }
                });
            }
        });

        // 북마크
        document.addEventListener('click',function(e){
            if(e.target && e.target.className === 'bookmark' || e.target && e.target.className === 'bookmark on'){
                e.target.classList.toggle('on');
                let bookOn = e.target.parentElement.title;
                let bookId = e.target.parentElement.parentElement.id;

                const bookLi = document.createElement('li');
                bookLi.classList.add('bookLi');
                bookLi.setAttribute("data-page",bookId);
                bookLi.textContent = bookOn;

                if(e.target.classList.contains('on')) {
                    if(bookLi) {
                        console.log(bookLi);
                        document.querySelector('nav ul').appendChild(bookLi);
                    } 
                } else {
                    const liBooks = document.querySelectorAll('.bookLi');
                    liBooks.forEach(function(liBook) {
                        console.log(liBook.getAttribute("data-page"));
                        if (liBook.getAttribute("data-page") == bookId) {
                            liBook.remove();
                        }
                    });
                }
            }
        });
        
        //prev 버튼 클릭
        document.addEventListener('click',function(e){
            if(e.target && e.target.className === 'prev btn'){
                if(document.querySelector('.pages').classList.contains('current')) {
                    alert('첫 페이지 입니다.');
                } else {
                    document.querySelector(".current").previousElementSibling.classList.add('current','flip_right');
                    document.querySelector(".current").classList.remove('flipped');
                    document.querySelectorAll('.current')[1].classList.remove('current');
                }
            }
        });
         //next 버튼 클릭
        document.addEventListener('click',function(e){
            if(e.target && e.target.className === 'next btn'){
                let i = document.querySelectorAll('.pages').length - 1;
                if(document.querySelectorAll('.pages')[i].classList.contains('current')) {
                    alert('마지막 페이지 입니다.');
                } else {
                    document.querySelector(".current").classList.remove("flip_right");
                    document.querySelector(".current").classList.add("flip_left");
                    setTimeout(function() {
                        document.querySelector(".current").classList.replace("flip_left", "flipped");
                        document.querySelector(".current").nextElementSibling.classList.add('current');
                        document.querySelector(".current").classList.remove('current');
                    },1500);
                }
            }
        });

        //
    }

    paging();
});

