window.onload = function(){

    //let divs = document.querySelectorAll(".wrapper > div");

    function wrapPages() {
        let frontP = document.querySelector('.front');
        var pages = document.createElement('section');
        pages.classList.add('pages');
        
        pages.innerHTML = frontP.outerHTML;

        // frontP.forEach(function(front) {
        //     front.parentNode.insertBefore(pages, frontP);
        //     front.remove();
        // });
        frontP.parentNode.insertBefore(pages, frontP);
        frontP.remove();
    }
    wrapPages();
}





// console.log(frontP);
// frontP.forEach(function(front) {
//     console.log(front);
//     front.insertAdjacentHTML("afterbegin","<div class='back card'></div>");
//     console.log(front.insertAdjacentHTML("aftereend","<div class='back card'></div>"));
// });
//frontP.insertAdjacentHTML("<div class='back card'></div>");
//frontP.append("<div class='bookmark'></div>")

// for (let i = 0; i < divs.length; i += 2) {
//     divs.slice(i, i + 2).wrapAll("<section class='pages'></section>");
// }

//document.querySelector('.page').classList.add("current");

