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
            // prev 버튼 생성
            const $prev = document.createElement('div');
            $prev.classList.add('prev');
            // next 버튼 생성
            const $next = document.createElement('div');
            $next.classList.add('next');

            $pages.innerHTML = front.outerHTML;
            front.parentNode.insertBefore($pages, front); // front 페이지 pages로 감싸기
            front.remove(); //기존에 있던 front 페이지 삭제
            $pages.appendChild($back);
            $pages.appendChild($prev);
            $pages.appendChild($next);    
        });
        // 첫번째 페이지에 current 클래스 추가
        document.querySelector('.pages').classList.add('current');
    }

    paging();
});

