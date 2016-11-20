
window.onload = function () {
	'use strict';
    
    /* Navigation setting */
    var doc = document.getElementById('doc'),
        setup = document.getElementById('setup'),
        targetNav = [doc, setup], 
        tnl = targetNav.length;
    
    function scrollTo( targetTop ) {
        // ease-in
        var int = 1,
            
        scrollInt = window.setInterval(function () {
            int += .05;
            if (window.pageYOffset >= targetTop) {
                window.clearInterval(scrollInt);
                int = 1;
            }
            window.scrollBy(0, int);
        }, 1);
    }
    
    while(--tnl >= 0) {
        targetNav[tnl].addEventListener('click', function () {
	    e.preventDefault();
            var target = this.id,
                targetTop = document.getElementsByClassName(target)[0].offsetTop;
            scrollTo(targetTop);
        });
    }
    
    /* Table fixed th */
    var table = document.getElementById('doc-table'),
        tableHeight,
        tableTop = table.offsetTop,
        tableBottom,
        
        thead = table.getElementsByTagName('thead')[0],
        theadHeight = thead.clientHeight,
        theadCols = thead.getElementsByTagName('th'), 
        thl = theadCols.length, th;
    
    
    while(--thl >= 0) {
        th = theadCols[thl];
        th.style.width = th.offsetWidth + 'px';
    }
    
    thead.classList.add('absolute-thead');
    table.style.paddingTop = theadHeight + 'px';
    
    tableHeight = table.clientHeight;
    tableBottom = tableHeight + tableTop;
    
    if (window.pageYOffset >= tableTop && (window.pageYOffset + theadHeight) < tableBottom) {
        thead.classList.add('fixed-thead');
        thead.style.transform = '';
    }
    
    window.addEventListener('scroll', function () {
        var thScrollTop = window.pageYOffset + theadHeight;
        if (window.pageYOffset >= tableTop && thScrollTop < tableBottom) {
            thead.classList.add('fixed-thead');
            thead.style.transform = '';
        } else if (thScrollTop >= tableBottom) {
            thead.style.transform = 'translateY(-70px)';
        } else {
            thead.classList.remove('fixed-thead');
            thead.style.transform = '';
        }
    });
};
