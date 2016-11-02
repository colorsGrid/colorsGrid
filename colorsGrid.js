window.onload = function() {
'use strict';

function colorsGrid(selector, {}) {
    var arg = arguments,
        selectors = [].slice.call(arg[0]),
        sl = selector.length,
        dml = sl,
        opts = arg[1],

        overlayTransform = 'translate3d(0,0,1px);',
        overlayTop = '0;',
        overlayLeft = '0;',
        overlayAlignProps = '',
        overLayStyle = '',
        overlaySpanStyle = '',
        overlayHoverStyle = '',
        overlaySpanHoverStyle = '';

    function hextoRGB (pattern) {
        var hexArray = pattern.split(''),
            hexArrayLen = hexArray.length - 1,
            hexPattern = '0123456789abcdef',
            r1 = hexArray[1],
            r2 = hexArray[2],
            g1 = hexArray[3],
            g2 = hexArray[4],
            b1 = hexArray[5],
            b2 = hexArray[6],
            r, g, b;

        function getIndex(p) {return hexPattern.indexOf(p)}
        // if shortcode
        if (hexArrayLen === 3) {
            r = Math.max( ( (getIndex(r1)+1) * (getIndex(r1)+1) - 1) , 0);
            g = Math.max( ( (getIndex(r1)+1) * (getIndex(r1)+1) - 1) , 0);
            b = Math.max( ( (getIndex(r1)+1) * (getIndex(r1)+1) - 1) , 0);
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        }

        if (hexArrayLen === 6) {
            r = (getIndex(r1) * 16) + getIndex(r2);
            g = (getIndex(g1) * 16) + getIndex(g2);
            b = (getIndex(b1) * 16) + getIndex(b2);
            return 'rgb(' + r + ',' + g + ',' + b +  ')';
        }
    }

    function rgbToRgba(val) {
        var rgba = val.replace(/rgb/i, 'rgba').replace(/\)/, ',1)');
        return rgba;
    }

    /**
     * convert hex to rgb and add it to colors object
     * convert rgb to rgba and add it to colors object
     * set color pattern data with value for each element
    */
    var selector;
    for (var i in opts.colors) {

        selector = selectors[i];
        // add rgb from stored hex and rgba from rgb to index object
        opts.colors[i].rgb = hextoRGB(opts.colors[i].hex);
        opts.colors[i].rgba = rgbToRgba(opts.colors[i].rgb);

        //if selector is defined
        if(selector) { 
            // set hex color
            selector.setAttribute('data-hex-color', opts.colors[i].hex);
            // set rgb color
            selector.setAttribute('data-rgb-color', opts.colors[i].rgb);
            // ser rgba color
            selector.setAttribute('data-rgba-color', opts.colors[i].rgba);
        }
    }


    /* Navigation for color patterns
    -----------------------------------
      * create nav html and prepend it to container
      * change color pattern when click on navigation item
    --------------------------------------------------------- */ 

    // create nav HTML and prepend it to container
    function createNav() {
            // navigation holder
        var colorsContainer = opts.container,
            // navigation HTML
            navOuterHTML = '<div id="color-navigation"><ul> <li data-color-pattern="hex" class="active-pattern">hex</li> <li data-color-pattern="rgb">rgb</li> <li data-color-pattern="rgba">rgba</li> </ul></div>';

        // prepend navigation to container
        colorsContainer.insertAdjacentHTML('afterbegin', navOuterHTML);
    }
    createNav();

    var colorNav = document.getElementById('color-navigation'),
        navItems = colorNav.getElementsByTagName('li'), 
        cil = navItems.length,
        cilT = cil,
        activePattern = opts.defaultPattern;
    /*
     * navigation style
    */  
    var navItemsStyle = '',
        navItemActiveStyle = '';

    var nisp = {
        width: opts.navItems.width ? opts.navItems.width : '170px',
        height: opts.navItems.height ? opts.navItems.height : '40px',
        bgColor: opts.navItems.backgroundColor ? opts.navItems.backgroundColor : '#ffffff',
        fontSize: opts.navItems.fontSize ? opts.navItems.fontSize : '1em',
        color: opts.navItems.color ? opts.navItems.color : '#ff8b8b',
        boxShadow: opts.navItems.boxShadow ? opts.navItems.boxShadow : '0 0 1px 1px #ff8b8b',
        borderRadius: opts.navItems.borderRadius ? opts.navItems.borderRadius : '0',
        transition: opts.navItems.transition ? opts.navItems.transition : 'all .4s ease'
    }

    navItemsStyle = 'width:' + nisp.width
                    + ';height:' + nisp.height
                    + ';line-height:' + nisp.height
                    + ';font-size:' + nisp.fontSize
                    + ';background-color:' + nisp.bgColor 
                    + ';color:' + nisp.color 
                    + ';box-shadow:' + nisp.boxShadow 
                    + ';border-radius:' + nisp.borderRadius
                    + ';transition:' + nisp.transition + ';';

    var niasp = {
        bgColor: opts.navItems.active.backgroundColor ? opts.navItems.active.backgroundColor : '#f1f1f1',
        color: opts.navItems.active.color ? opts.navItems.active.color : '#ff8b8b',
        boxShadow: opts.navItems.active.boxShadow ? opts.navItems.active.boxShadow : '0 0 1px 1px #ff8b8b',
        borderRadius: opts.navItems.active.borderRadius ? opts.navItems.active.borderRadius : nisp.borderRadius
    }
    navItemActiveStyle = ';background-color:' + nisp.bgColor 
                        + ';color:' + nisp.color 
                        + ';box-shadow:' + nisp.boxShadow 
                        + ';border-radius:' + nisp.borderRadius + ';';

    /**
     * change color pattern passed on clicked item
     * add active class to clicked item 
    */
    function removeActiveClass() {
        var e = 0, 
            l = cilT;
        for (; e < l; e++) {
            navItems[e].classList.remove('active-pattern');
        }
    }

    // activate clicked pattern/item
    while(--cil > -1) {
        navItems[cil].addEventListener('click', function () {
            activePattern = this.getAttribute('data-color-pattern');
            removeActiveClass();
            this.classList.add('active-pattern');
        });
    }


    /* ---------------------------
       Colors overlay setting
    --------------------------- */
    if (opts.overlay.state) {

        for (var co = 0, col = selectors.length; co < col; co++) {
            // insert overlay after img
            selectors[co].insertAdjacentHTML('afterend', '<div class="colorsGrid-overlay"><span>copy</span></div>');
        }

        var colorsGridOverlay = document.getElementsByClassName('colorsGrid-overlay');

        // horizontal centering
        if (opts.overlay.center) {
            overlayTransform = overlayTransform.replace(/\(0/, '(-50%');
            overlayLeft = '50%;';
        }

        // vertical centering
        if (opts.overlay.middle) {
            overlayTransform = overlayTransform.replace(/,0/, ',-50%');
            overlayTop = '50%;';
        }

        overlayAlignProps = 'top:'+ overlayTop + 'left:' + overlayLeft + 'transform:' + overlayTransform + ';';

        //overlay hover style
        var optsOL = opts.overlay,
            optsOLH = opts.overlayHover;

        // overlay default style
        var oLP = {
            width: optsOL.width ? optsOL.width : '100%',
            height: optsOL.height ? optsOL.height : '100%',
            bgColor: optsOL.backgroundColor ? optsOL.backgroundColor : 'transparent',
            cursor: optsOL.cursor ? optsOL.cursor : 'pointer',
            transition: optsOL.transition ? optsOL.transition : 'all .7s ease'
        };

        overlayStyle = 'width:' + oLP.width
                        + ';height:' + oLP.height
                        + ';cursor:' + oLP.cursor
                        + ';background-color:'+ oLP.bgColor 
                        + ';transition:'+ oLP.transition +';';

        // overlay hover style
        var oLHP = {
            bgColor: optsOLH.backgroundColor ? optsOLH.backgroundColor : oLP.bgColor,
            transition: optsOLH.transition ? optsOLH.transition : oLP.transition,
        };

        overlayHoverStyle = 'background-color:'+ oLHP.bgColor 
                            + ';transition:'+ oLHP.transition +';';


        // overlay span default style
        var oLTxtP = {
            width: optsOL.spanStyle.width ? optsOL.spanStyle.width : '70%',
            height: optsOL.spanStyle.height ? optsOL.spanStyle.height : '45px',
            bgColor: optsOL.spanStyle.backgroundColor ? optsOL.spanStyle.backgroundColor : 'rgba(0,0,0,.3)',
            fontSize: optsOL.spanStyle.fontSize ? optsOL.spanStyle.fontSize : '24px',
            color: optsOL.spanStyle.color ? optsOL.spanStyle.color : 'rgba(255,255,255,.9)',
            boxShadow: optsOL.spanStyle.boxShadow ? optsOL.spanStyle.boxShadow : '0 0 0 0 rgb(0,0,0)',
            borderRadius: optsOL.spanStyle.borderRadius ? optsOL.spanStyle.borderRadius : '0',
            transition: optsOL.spanStyle.transition ? optsOL.spanStyle.transition : 'all .4s ease',
        }

        overlaySpanStyle = 'width:' + oLTxtP.width
                            + ';height:' + oLTxtP.height
                            + ';line-height:' + oLTxtP.height
                            + ';background-color:' + oLTxtP.bgColor 
                            + ';font-size:' + oLTxtP.fontSize
                            + ';color:' + oLTxtP.color 
                            + ';box-shadow:' + oLTxtP.boxShadow 
                            + ';border-radius:' + oLTxtP.borderRadius
                            + ';transition:' + oLTxtP.transition + ';';

        // overlay span hover style
        var oLHTxtP = {
            bgColor: optsOLH.spanStyle.backgroundColor ? optsOLH.spanStyle.backgroundColor : oLTxtP.bgColor,
            color: optsOLH.spanStyle.color ? optsOLH.spanStyle.color : oLTxtP.color,
            boxShadow: optsOLH.spanStyle.boxShadow ? optsOLH.spanStyle.boxShadow : oLTxtP.boxShadow,
            borderRadius: optsOLH.spanStyle.borderRadius ? optsOLH.spanStyle.borderRadius : oLTxtP.borderRadius,
            transition: optsOLH.spanStyle.transition ? optsOLH.spanStyle.transition : oLTxtP.transition,
        }

        overlaySpanHoverStyle = 'background-color:' + oLHTxtP.bgColor 
                                + ';color:' + oLHTxtP.color 
                                + ';box-shadow:' + oLHTxtP.boxShadow 
                                + ';border-radius:' + oLHTxtP.borderRadius
                                + ';transition:' + oLHTxtP.transition + ';';



        for (var olt = 0, oltl = colorsGridOverlay.length; olt < oltl; olt++) {
            colorsGridOverlay[olt].getElementsByTagName('span')[0].textContent =
                selectors[olt].getAttribute('data-'+activePattern+'-color');
        }

        //change spans text when click on nav item
        for (var ni = 0, nil = navItems.length; ni < nil; ni++) {
            navItems[ni].addEventListener('click', function () {
                for (var nit = 0, nitl = colorsGridOverlay.length; nit < nitl; nit++) {
                    colorsGridOverlay[nit].getElementsByTagName('span')[0].textContent =
                    selectors[nit].getAttribute('data-'+activePattern+'-color');
                }
            });
        }

        for (var oli = 0; oli < sl; oli++) {
            imgOlArray[oli].addEventListener('click', function () {
                selectorIndex = imgOlArray.indexOf(this);
                t.value = selectors[selectorIndex].getAttribute('data-'+activePattern+'-color');
                attachCopy();
            });
        }
    }

    /*--------------------------------
      Copy color when click on element
    --------------------------------*/

    // create text area to hold the color of clicked image to copy it
    var docRoot = (document.body || document.documentElement),
        t = document.createElement('textarea');

    docRoot.appendChild(t);

    // copy color when click on element
    function attachCopy() {
        t.select();
        document.execCommand('copy');
        t.value = null;
    }

    for (var eli = 0; eli < sl; eli++) {
        selectors[eli].addEventListener('click', function () {
            t.value = this.getAttribute('data-'+activePattern+'-color');
            attachCopy();
        });
    }

    //trigger click on overlay/span if enabled
    var imgOlArray = [].slice.call(colorsGridOverlay),
        selectorIndex;

    // append default style
    (function() {
        var defaultStyle = "<style type='text/css'>.column-image{position:relative}#content-holder .live-image{cursor:pointer;}div#color-navigation{width:50%;margin:0 auto;text-align:center;padding-top:44px;}div#color-navigation ul{margin:0;display:flex;text-align:center;justify-content:space-around;}div#color-navigation li{display:inline-block;"+navItemsStyle+"text-transform:uppercase;cursor:pointer;}div#color-navigation li:hover{"+navItemActiveStyle+"}div#color-navigation li.active-pattern{box-shadow:0 0 2px 1px #0bbcd6;color:#0bbcd6;}.colorsGrid-overlay{opacity: 0;position:absolute;"+overlayAlignProps+overlayStyle+"}.colorsGrid-overlay:hover{opacity:1;"+overlayHoverStyle+"}.colorsGrid-overlay span{display:block;"+overlaySpanStyle+"position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)translateZ(1px);-webkit-transform:translate(-50%,-50%)translateZ(1px);text-align:center;}.colorsGrid-overlay span:hover{"+overlaySpanHoverStyle+"}</style>";
        document.head.insertAdjacentHTML('beforeend', defaultStyle);
    }());

    /*---------------------
          debug mode
    ---------------------*/
    if (opts.debug_mode) {
        var dm = 0;
        for (; dm < dml; dm++) {
            selectors[dm].addEventListener('click', function () {
                var i = selectors.indexOf(this);
                console.log(' i =' + i + ', \n selector HTML = ' + selectors[0].outerHTML);
            });
        }
    }
}
