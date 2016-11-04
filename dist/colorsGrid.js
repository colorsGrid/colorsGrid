
function colorsGrid(selector, {}) {

    //insert each color element into container
    var arg = arguments,
        colorsGridArray = [].slice.call(arg[0]),
        sl = selector.length,
        opts = arg[1],
        root = document.body || document.documentElement,
        activePattern = opts.defaultPattern,
        overlayTransform = 'translate3d(0,0,1px);',
        overlayTop = '0;',
        overlayLeft = '0;',
        overlayAlignProps = '',
        overlayStyle = '',
        overlayHoverStyle = '',
        overlayTextBox = '',
        overlayTextBoxHoverStyle = '',
        copiedMsgStyle = '',

        navItemsStyle = '',
        navItemActiveStyle = '',
        stickyNavStyle = '',
        stickyNavHoverStyle = '';


    // insert each element in container
    // get default width/height/margin of each element to clone it to it's new container

    for ( var el = 0; el < sl; el++) {
        var cge = colorsGridArray[el],
            cgeW = cge.clientWidth + 'px',
            cgeH = cge.clientHeight + 'px';

        var cgeMTop = window.getComputedStyle(cge, 'null').marginTop,
            cgeMRight = window.getComputedStyle(cge, 'null').marginRight,
            cgeMBottom = window.getComputedStyle(cge, 'null').marginBottom,
            cgeMLeft = window.getComputedStyle(cge, 'null').marginLeft;

        cge.style.width = cgeW;
        cge.style.height = cgeH;
        cge.style.margin = '0';

        if (opts.autoBackgroundColor) {
            cge.style.backgroundColor = opts.itemsColor[el].hex;
        }

        cge.insertAdjacentHTML('beforebegin', '<div class="colorsGrid-item"></div>');
        var cgi = document.getElementsByClassName('colorsGrid-item')[el];

        cgi.appendChild(cge);

        cgi.style.width = cgeW;
        cgi.style.height = cgeH;
        cgi.style.marginTop = cgeMTop;
        cgi.style.marginRight = cgeMRight;
        cgi.style.marginBottom = cgeMBottom;
        cgi.style.marginLeft = cgeMLeft;
    }



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
     * convert hex to rgb and add it to itemsColor object
     * convert rgb to rgba and add it to itemsColor object
     * set color pattern data with value for each element
    */
    var selector;
    for (var i in opts.itemsColor) {

        // add rgb from stored hex and rgba from rgb to each grid item index
        var oGI = opts.itemsColor[i];
        oGI.rgb = hextoRGB(oGI.hex);
        oGI.rgba = rgbToRgba(oGI.rgb);
        selector = colorsGridArray[i];
        //if selector is defined
        if(selector) { 
            // set hex color
            selector.setAttribute('data-hex-color', oGI.hex);
            // set rgb color
            selector.setAttribute('data-rgb-color', oGI.rgb);
            // ser rgba color
            selector.setAttribute('data-rgba-color', oGI.rgba);
        }
    }


    /* Navigation for color patterns
    -----------------------------------
      * create nav html and prepend it to navContainer
      * change color pattern when click on navigation item
    --------------------------------------------------------- */ 

    if (opts.navContainer != undefined || null) {
        function createNav() {

            /* 
             * navigation holder
             * if not defined nav items will be disabled
             * @type {DOM element}
            */
            var navContainer = opts.navContainer,

                navOuterHTML = '<div id="color-navigation"><ul><li data-color-pattern="hex" class="active-pattern">hex</li> <li data-color-pattern="rgb">rgb</li> <li data-color-pattern="rgba">rgba</li> </ul></div>';

            // prepend navigation html to nav items container
            navContainer.insertAdjacentHTML('afterbegin', navOuterHTML);
        }
        createNav();

        var colorNavCont = document.getElementById('color-navigation'),
            colorNav = colorNavCont.getElementsByTagName('ul')[0],
            navItems = colorNav.getElementsByTagName('li'), 
            cil = navItems.length,
            cilT = cil;

        /*
         * navigation items default style
         * @type {Object}
        */
        var nisp = {
            width: opts.navItemsWidth ? opts.navItemsWidth : '170px',
            height: opts.navItemsHeight ? opts.navItemsHeight : '40px',
            bgColor: opts.navItemsBackgroundColor ? opts.navItemsBackgroundColor : '#ffffff',
            fontSize: opts.navItemsFontSize ? opts.navItemsFontSize : '1em',
            color: opts.navItemsColor ? opts.navItemsColor : '#ff8b8b',
            boxShadow: opts.navItemsBoxShadow ? opts.navItemsBoxShadow : '0 0 1px 1px #ff8b8b',
            borderRadius: opts.navItemsBorderRadius ? opts.navItemsBorderRadius : '0',
            transition: opts.navItemsTransition ? opts.navItemsTransition : 'all .4s ease'
        };

        /*
         * navigation items default style
         * @type {String}
        */
        navItemsStyle = 'width:' + nisp.width
                        + ';height:' + nisp.height
                        + ';line-height:' + nisp.height
                        + ';font-size:' + nisp.fontSize
                        + ';background-color:' + nisp.bgColor 
                        + ';color:' + nisp.color 
                        + ';box-shadow:' + nisp.boxShadow 
                        + ';border-radius:' + nisp.borderRadius
                        + ';transition:' + nisp.transition + ';';


        // colorNav ul width/height
        var nsp = {
            width: opts.navWidth ? opts.navWidth : '100%',
            height: opts.navHeight ? opts.navHeight : nisp.height
        };

        var navContStyle = 'width:' + nsp.width
                         + ';height:'+ nsp.height 
                         + ';line-height:' + nsp.height +';';
        /*
         * navigation active item style
         * @type {Object}
        */
        var niasp = {
            bgColor: opts.navItemsActiveBackgroundColor ? opts.navItemsActiveBackgroundColor : '#f1f1f1',
            color: opts.navItemsActiveColor ? opts.navItemsActiveColor : '#ff8b8b',
            boxShadow: opts.navItemsActiveBoxShadow ? opts.navItemsActiveBoxShadow : '0 0 1px 1px #ff8b8b',
            borderRadius: opts.navItemsActiveBorderRadius ? opts.navItemsActiveBorderRadius : nisp.borderRadius
        };

        /*
         * navigation active item style
         * @type {String}
        */
        navItemActiveStyle = ';background-color:' + nisp.bgColor 
                            + ';color:' + nisp.color 
                            + ';box-shadow:' + nisp.boxShadow 
                            + ';border-radius:' + nisp.borderRadius + ';';

        // remove active class from items on each item click
        function removeActiveClass() {
            var e = 0, 
                l = cilT;
            for (; e < l; e++) {
                navItems[e].classList.remove('active-pattern');
            }
        }

        /*
         * get active color pattern from clicked item
         * set active class to clicked item
        */
        while(--cil > -1) {
            navItems[cil].addEventListener('click', function () {
                activePattern = this.getAttribute('data-color-pattern');
                removeActiveClass();
                this.classList.add('active-pattern');
            });
        }


        /*
         * stickyNav
         * add sticky class when scrolTop passes ul
         * sticky default style
         * sticky hover style
        */

        if (opts.stickyNav) {

            var navOT = opts.navContainer.getBoundingClientRect().top;

            window.addEventListener('resize', function () {
                navOT = opts.navContainer.getBoundingClientRect().top;
            });

            // sticky nav if scrollTop equal to or greater than ul offsetTop
            window.addEventListener('scroll', function(e) {
                if (window.pageYOffset >= navOT) {
                    colorNav.classList.add('sticky-nav');
                } else {
                    colorNav.classList.remove('sticky-nav');
                }
            });

            var stnsp = {
                backgroundColor: opts.stickyNavBackgroundColor ? opts.stickyNavBackgroundColor : 'rgba(0,0,0,0)',
                boxShadow: opts.stickyNavBoxShadow ? opts.stickyNavBoxShadow : '0 0 0 0 rgba(0,0,0,0)',
                transition: opts.stickyNavTransition ? opts.stickyNavTransition : 'all 0s ease'
            };
            stickyNavStyle = ';background-color:' + stnsp.backgroundColor
                           + ';box-shadow:' + stnsp.boxShadow +';'
                           + ';transition:' + stnsp.transition;


            var stnHsp = {
                backgroundColor: opts.stickyNavHoverBackgroundColor ? opts.stickyNavHoverBackgroundColor : 'rgba(0,0,0,0)',
                boxShadow: opts.stickyNavHoverBoxShadow ? opts.stickyNavHoverBoxShadow : '0 0 0 0 rgba(0,0,0,0)'
            };
            stickyNavHoverStyle = ';background-color:' + stnHsp.backgroundColor + ';'
                                + ';box-shadow:' + stnHsp.boxShadow +';';
        }
    }
    /* ---------------------------
       Colors grid overlay
    --------------------------- */

    if (opts.overlayState) {
        // insert overlay after each colorsGridArray
        for (var co = 0, col = colorsGridArray.length; co < col; co++) {
            colorsGridArray[co].insertAdjacentHTML('afterend', '<div class="colorsGrid-overlay"><span class="copy-state">copied!</span><span>copy</span></div>');
        }

        var colorsGridOverlay = document.getElementsByClassName('colorsGrid-overlay'),
            cOlArray = [].slice.call(colorsGridOverlay),
            selectorIndex;

        // center overlay horizontally
        if (opts.overlayCenter) {
            overlayTransform = overlayTransform.replace(/\(0/, '(-50%');
            overlayLeft = '50%;';
        }

        // center overlay vertically
        if (opts.overlayMiddle) {
            overlayTransform = overlayTransform.replace(/,0/, ',-50%');
            overlayTop = '50%;';
        }

        /*
         * overlay centering style
         * @type {String}
        */
        overlayAlignProps = 'top:'+ overlayTop + 'left:' + overlayLeft + 'transform:' + overlayTransform;

        /*
         * overlay default style
         * @type {Object}
        */
        var oLP = {
            width: opts.overlayWidth ? opts.overlayWidth : '100%',
            height: opts.overlayHeight ? opts.overlayHeight : '100%',
            bgColor: opts.overlayBackgroundColor ? opts.overlayBackgroundColor : 'transparent',
            opacity: opts.overlayOpacity ? opts.overlayOpacity : '0',
            cursor: opts.overlayCursor ? opts.overlayCursor : 'pointer',
            transition: opts.overlayTransition ? opts.overlayTransition : 'all .7s ease'
        };
        /*
         * overlay default style
         * @type {String}
        */
        overlayStyle = 'width:' + oLP.width
                        + ';height:' + oLP.height
                        + ';background-color:'+ oLP.bgColor 
                        + ';opacity:' + oLP.opacity
                        + ';cursor:' + oLP.cursor
                        + ';transition:'+ oLP.transition +';';
        /*
         * overlay hover style
         * @type {Object}
        */
        var oLHP = {
            bgColor: opts.overlayHoverBackgroundColor ? opts.overlayHoverBackgroundColor : oLP.bgColor,
            transition: opts.overlayHoverTransition ? opts.overlayHoverTransition : oLP.transition,
        };

        /*
         * overlay hover style
         * @type {String}
        */
        overlayHoverStyle = 'background-color:'+ oLHP.bgColor 
                            + ';transition:'+ oLHP.transition +';';

        /*
         * overlay color value default style
         * @type {Object}
        */
        var oLTxtP = {
            width: opts.textBoxWidth ? opts.textBoxWidth : '70%',
            height: opts.textBoxHeight ? opts.textBoxHeight : '45px',
            bgColor: opts.textBoxBackgroundColor ? opts.textBoxBackgroundColor : 'rgba(0,0,0,.3)',
            fontSize: opts.textBoxFontSize ? opts.textBoxFontSize : '24px',
            color: opts.textBoxColor ? opts.textBoxColor : 'rgba(255,255,255,.9)',
            boxShadow: opts.textBoxBoxShadow ? opts.textBoxBoxShadow : '0 0 0 0 rgba(0,0,0,0)',
            borderRadius: opts.textBoxBorderRadius ? opts.textBoxBorderRadius : '0',
            transition: opts.textBoxTransition ? opts.textBoxTransition : 'all .4s ease',
        };
        /*
         * overlay color value default style
         * @type {String}
        */
        overlayTextBox = 'width:' + oLTxtP.width
                            + ';height:' + oLTxtP.height
                            + ';line-height:' + oLTxtP.height
                            + ';background-color:' + oLTxtP.bgColor 
                            + ';font-size:' + oLTxtP.fontSize
                            + ';color:' + oLTxtP.color 
                            + ';box-shadow:' + oLTxtP.boxShadow 
                            + ';border-radius:' + oLTxtP.borderRadius
                            + ';transition:' + oLTxtP.transition + ';';

        /*
         * overlay color value hover style
         * @type {Object}
        */
        var oLHTxtP = {
            bgColor: opts.textBoxHoverbackgroundColor ? opts.textBoxHoverbackgroundColor : oLTxtP.bgColor,
            color: opts.textBoxHovercolor ? opts.textBoxHovercolor : oLTxtP.color,
            boxShadow: opts.textBoxHoverboxShadow ? opts.boxShadow : oLTxtP.boxShadow,
            borderRadius: opts.textBoxHoverBorderRadius ? opts.textBoxHoverBorderRadius : oLTxtP.borderRadius,
            transition: opts.textBoxHovertransition ? opts.textBoxHovertransition : oLTxtP.transition,
        };
        /*
         * overlay color value hover style
         * @type {String}
        */
        overlayTextBoxHoverStyle = 'background-color:' + oLHTxtP.bgColor 
                                + ';color:' + oLHTxtP.color 
                                + ';box-shadow:' + oLHTxtP.boxShadow 
                                + ';border-radius:' + oLHTxtP.borderRadius
                                + ';transition:' + oLHTxtP.transition + ';';


        //set overlay textBox value ( setted from opts.defaultPattern )
        for (var olt = 0, oltl = colorsGridOverlay.length; olt < oltl; olt++) {
            colorsGridOverlay[olt].getElementsByTagName('span')[1].textContent =
                        colorsGridArray[olt].getAttribute('data-'+activePattern+'-color');
        }

        if (opts.navContainer) {
            //change overlay textBox/s value when click on nav item
            for (var ni = 0, nil = navItems.length; ni < nil; ni++) {
                navItems[ni].addEventListener('click', function () {
                    for (var nit = 0, nitl = colorsGridOverlay.length; nit < nitl; nit++) {
                        colorsGridOverlay[nit].getElementsByTagName('span')[1].textContent =
                        colorsGridArray[nit].getAttribute('data-'+activePattern+'-color');
                    }
                });
            }
        }

        // copied message default style/copied animation
        if (opts.copiedMessage) {
            copiedMsgStyle = '.copy-state{opacity:0;z-index:-1;}.copy-state.copied{index:1;opacity:1;}.copy-state.copied+span{index:-1;opacity:0;}';
        }
    }

    // add copied class to .copy-state when click on grid items/overlay
    function addCopiedClassTo(clickedElem) {
        if (opts.copiedMessage) {
            clickedElem.getElementsByTagName('span')[0].classList.add('copied');
            setTimeout(()=>{
                clickedElem.getElementsByTagName('span')[0].classList.remove('copied');
            }, 1000);
        }
    }

    /*--------------------------------
      Copy color when click on element
    --------------------------------*/

    // create text area to hold the color of clicked image to copy it
    var t = document.createElement('textarea');
    t.style.position = 'fixed';
    t.style.zIndex = "-99999";
    t.style.left = "-9999px";
    root.appendChild(t);

    // copy color when click on element
    function attachCopy() {
        t.select();
        document.execCommand('copy');
    }

    // copy color when click on overlay
    for (var oli = 0; oli < sl; oli++) {
        cOlArray[oli].addEventListener('click', function () {
            var ths = this;
            selectorIndex = cOlArray.indexOf(ths);
            t.value = colorsGridArray[selectorIndex].getAttribute('data-'+activePattern+'-color');
            attachCopy();
            addCopiedClassTo(this);
        });
    }

    // copy color when click on frid element
    for (var eli = 0; eli < sl; eli++) {
        colorsGridArray[eli].addEventListener('click', function () {
            var ths = this;
            t.value = ths.getAttribute('data-'+activePattern+'-color');
            attachCopy();
            addCopiedClassTo(this);
        });
    }
    // append default style
    (function() {
        var defaultStyle = "<style type='text/css'>.colorsGrid-item{display:inline-block;position:relative;}#color-navigation{position:relative;"+navContStyle+"margin:0;text-align:center;}#color-navigation ul{width:100%;height:inherit;margin:0;position:absolute;top:0%;}#color-navigation ul.sticky-nav{z-index:99999;margin:0;position:fixed;top:0;left:0;"+stickyNavStyle+"}#color-navigation ul.sticky-nav:hover{"+stickyNavHoverStyle+"}#color-navigation li{display:inline-block;"+navItemsStyle+"text-transform:uppercase;cursor:pointer;}#color-navigation li:nth-of-type(2){margin-left:15px;margin-right:15px;}#color-navigation li:hover{"+navItemActiveStyle+"}#color-navigation li.active-pattern{box-shadow:0 0 2px 1px #0bbcd6;color:#0bbcd6;}.colorsGrid-overlay{position:absolute;text-align:center;"+overlayAlignProps+overlayStyle+"}.colorsGrid-overlay:hover{opacity:1;"+overlayHoverStyle+"}.colorsGrid-overlay span{display:inline-block;"+overlayTextBox+"position:absolute;top:50%; left:50%;transform:translateZ(1px)translate(-50%,-50%);-webkit-transform:translate(-50%,-50%)translateZ(1px);text-align:center;}.colorsGrid-overlay span:hover{"+overlayTextBoxHoverStyle+"}"+copiedMsgStyle+"</style>";
        document.head.insertAdjacentHTML('beforeend', defaultStyle);
    }());

    /*---------------------
          debug mode
    ---------------------*/
    if (opts.debug_mode) {
        var dm = 0;
        for (; dm < sl; dm++) {
            colorsGridArray[dm].addEventListener('click', function () {
                var i = colorsGridArray.indexOf(this);
                console.log(' i =' + i + ', \n selector HTML = ' + colorsGridArray[0].outerHTML);
            });
        }

        if (opts.overlayState) {
            var dmol = 0;
            for (; dmol < sl; dmol++) {
                cOlArray[dmol].addEventListener('click', function () {
                    var i = cOlArray.indexOf(this);
                    console.log(' Element index = ' + i 
                                + ', \n Element HTML = ' + colorsGridArray[i].outerHTML);
                });
            }
        }
    }
}
