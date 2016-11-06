
function colorsGrid(selector, opts) {
    
    //insert each color element into container
    var selectorsArray = null,
        selectorLength = selector.length ? selector.length : 0,
        root = document.body || document.documentElement,
        
        // if selector is DOM list ? get it's parent
        selectorContainer = selectorLength ? selector.parentNode : selector,
        sl = null,
        
        opts = arguments[1],
        
        colorObjLength = opts.gridItems ? Object.keys(opts.gridItems).length : 0,
        activePattern = opts.defaultPattern ?  opts.defaultPattern : 'hex',
        
        // set default booleans
        autoAppend = isNotNull(opts.autoAppend) ? opts.autoAppend : true,
        autoBackgroundColor = isNotNull(opts.autoBackgroundColor) ? opts.autoBackgroundColor : true,
        stickyNav = isNotNull(opts.stickyNav) ? opts.stickyNav : true,
        stickWithBottom = isNotNull(opts.stickWithBottom) ? opts.stickWithBottom : true,
        overlayState = isNotNull(opts.overlayState) ? opts.overlayState : true,
        overlayCenter = isNotNull(opts.overlayCenter) ? opts.overlayCenter : true,
        overlayMiddle = isNotNull(opts.overlayMiddle) ? opts.overlayMiddle : true,
        copiedMessage = isNotNull(opts.copiedMessage) ? opts.copiedMessage : true,
        inlineStyle = isNotNull(opts.inlineStyle) ? opts.inlineStyle : true,
        overlayTransform = 'translate3d(0,0,1px);',
        overlayTop = '0;',
        overlayLeft = '0;',
        overlayAlignProps = '',
        overlayStyle = '',
        overlayHoverStyle = '',
        overlayvalueBox = '',
        overlayvalueBoxHoverStyle = '',
        copiedMsgStyle = '',
        navItemsStyle = '',
        navItemActiveStyle = '',
        stickyNavStyle = '',
        stickyNavHoverStyle = '',
        selector;
    
    function isNotNull(value) {
        return value != null || undefined;
    }
    
    /*
     * add items to container if selector is container
     * or it's children length less than gridItems Object length
    */
    // if selector is a DOM list (not container) clone it's HTML
    var selectorHTML = selectorLength ? selector[0].outerHTML : '<div class="color-holder"></div>',
        reminingItems = colorObjLength - selectorLength;
    
    if (autoAppend) {
        // if selector is not container
        if (selectorLength && selectorContainer.nodeName != 'BODY') {
            // if gridItems length > selectors length
            // append the rest
            if (reminingItems > 0) {
                for (var aai = 0, rIl = reminingItems; aai < rIl; aai++ ) {
                    selectorContainer.insertAdjacentHTML('beforeend', selectorHTML);
                }
            }
        } else {
            // if there is no items in container 
            for (var aai = 0, rIl = reminingItems; aai < rIl; aai++ ) {
                selectorContainer.insertAdjacentHTML('beforeend', selectorHTML);
            }
        }
    }
    
    selectorsArray = selectorLength ? [].slice.call(selector) : [].slice.call(selector.getElementsByClassName('color-holder'));
    selectorContainer = selectorsArray[0].parentNode;
    sl = selectorsArray.length;
    
    // put items hex color in opject if type of color === string
    // to insert rgb/rgba with it
    for (var index in opts.gridItems) {
        // continue if item value is an object 
        if (typeof opts.gridItems[index] === 'object') {
            continue;
        } else {
            // put items value in object with hex key
            opts.gridItems[index] = {hex: opts.gridItems[index]};
        }
    }

    function hextoRGB (pattern) {
        if (/\s*#/.test(pattern)) {
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
    }
    function rgbToRgba(val) {
        var rgba = val.replace(/rgb/i, 'rgba').replace(/\)/, ',1)');
        return rgba;
    }

    
    /**
     * convert hex to rgb and add it to gridItems object
     * convert rgb to rgba and add it to gridItems object
     * set color pattern data with value for each element
    */
    
    for (var i in opts.gridItems) {
        selector = selectorsArray[i];
        // add rgb from stored hex and rgba from rgb to each grid item index
        var oGI = opts.gridItems[i];
        oGI.rgb = hextoRGB(oGI.hex);
        oGI.rgba = rgbToRgba(oGI.rgb);
        
        // set hex color
        selector.setAttribute('data-hex-color', oGI.hex);
        // set rgb color
        selector.setAttribute('data-rgb-color', oGI.rgb);
        // ser rgba color
        selector.setAttribute('data-rgba-color', oGI.rgba);
    }
    
    
    // insert each element in colorGrid-tems container
    // to hold color and it's overlay
    // get default width/height/margin of each element to clone it to it's new container
    
    for ( var el = 0; el < sl; el++) {
        var cge = selectorsArray[el],
            cgeW = cge.clientWidth + 'px',
            cgeH = cge.clientHeight + 'px',
            cgeMTop = window.getComputedStyle(cge, 'null').marginTop,
            cgeMRight = window.getComputedStyle(cge, 'null').marginRight,
            cgeMBottom = window.getComputedStyle(cge, 'null').marginBottom,
            cgeMLeft = window.getComputedStyle(cge, 'null').marginLeft;

        cge.style.width = cgeW;
        cge.style.height = cgeH;
        cge.style.margin = '0';
        
        if (autoBackgroundColor) {
            cge.style.backgroundColor = opts.gridItems[el].hex;
        }

        cge.insertAdjacentHTML('beforebegin', '<div class="colorsGrid-item"></div>');
        var cgi = selectorContainer.getElementsByClassName('colorsGrid-item')[el];

        cgi.appendChild(cge);

        cgi.style.width = cgeW;
        cgi.style.height = cgeH;
        cgi.style.marginTop = cgeMTop;
        cgi.style.marginRight = cgeMRight;
        cgi.style.marginBottom = cgeMBottom;
        cgi.style.marginLeft = cgeMLeft;
    }
    

    /* Navigation for color patterns
    -----------------------------------
      * create nav html and prepend it to navContainer
      * change color pattern when click on navigation item
    --------------------------------------------------------- */ 

    if (opts.navContainer) {
        function createNav() {
            /* 
             * navigation holder
             * if not defined nav items will be disabled
             * @type {DOM element}
            */
            var navContainer = opts.navContainer,
                navOuterHTML = '<div class="color-navigation"><ul><li data-color-pattern="hex" class="active-pattern">hex</li> <li data-color-pattern="rgb">rgb</li> <li data-color-pattern="rgba">rgba</li> </ul></div>';
            navContainer.insertAdjacentHTML('afterbegin', navOuterHTML);
        }
        createNav();
        
        var colorNavCont = document.getElementsByClassName('color-navigation')[0],
            colorNav = colorNavCont.getElementsByTagName('ul')[0],
            navItems = colorNav.getElementsByTagName('li'), 
            cil = navItems.length;

        // navigation items default style
        var nisp = {
            width: opts.navItemsWidth ? opts.navItemsWidth : '170px',
            height: opts.navItemsHeight ? opts.navItemsHeight : '40px',
            bgColor: opts.navItemsBackgroundColor ? opts.navItemsBackgroundColor : '#ffffff',
            fontSize: opts.navItemsFontSize ? opts.navItemsFontSize : '1em',
            color: opts.navItemsColor ? opts.navItemsColor : '#151515',
            boxShadow: opts.navItemsBoxShadow ? opts.navItemsBoxShadow : '0 0 1px 0 rgba(15,15,15,1)',
            borderRadius: opts.navItemsBorderRadius ? opts.navItemsBorderRadius : '0',
            transition: opts.navItemsTransition ? opts.navItemsTransition : 'all 0s ease'
        };

        //navigation items default style
        navItemsStyle = 'width:' + nisp.width
                        + ';height:' + nisp.height
                        + ';line-height:' + nisp.height
                        + ';background-color:' + nisp.bgColor 
                        + ';font-size:' + nisp.fontSize
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
        
        // navigation active item style
        var niasp = {
            bgColor: opts.navItemsActiveBackgroundColor ? opts.navItemsActiveBackgroundColor : '#ffffff',
            color: opts.navItemsActiveColor ? opts.navItemsActiveColor : '#0bbcd6',
            boxShadow: opts.navItemsActiveBoxShadow ? opts.navItemsActiveBoxShadow : '0 0 1px 1px #0bbcd6',
            borderRadius: opts.navItemsActiveBorderRadius ? opts.navItemsActiveBorderRadius : nisp.borderRadius
        };
        // navigation active item style
        navItemActiveStyle = ';background-color:' + niasp.bgColor 
                            + ';color:' + niasp.color 
                            + ';box-shadow:' + niasp.boxShadow 
                            + ';border-radius:' + niasp.borderRadius + ';';

        // remove active class from items on each item click
        function removeActiveClass() {
            var e = 0, l = cil;
            for (; e < l; e++) {
                navItems[e].classList.remove('active-pattern');
            }
        }

        /*
         * get active color pattern from clicked item
         * set active class to clicked item
        */
        for(var nits = 0; nits < cil; nits++ ) {
            navItems[nits].addEventListener('click', function () {
                activePattern = this.getAttribute('data-color-pattern');
                removeActiveClass();
                this.classList.add('active-pattern');
            });
        }

        /*------------------------------------------
         * stickyNav
         * add sticky class when scrolTop passes ul
         * sticky default style
         * sticky hover style
        ------------------------------------------*/

        if (stickyNav) {

            var navOT = colorNavCont.offsetTop,
                navH = colorNavCont.clientHeight;
                // container bottom threshold to make nav stick at it
                // if scroll top greater than container offset bottom
            
            window.addEventListener('resize', function () {
                navOT = opts.navContainer.getBoundingClientRect().top;
            });
            
            if (stickWithBottom) {
                window.addEventListener('scroll', function(e) {
                    var ch = selectorContainer.offsetHeight - 70,
                        sc = window.pageYOffset;

                    if (sc >= navOT && sc < ch ) {
                        colorNav.classList.add('sticky-nav');
                        colorNav.style.top = '';
                    } else if (sc >= ch) {
                        colorNav.style.top = '-'+ nsp.height;
                    } else {
                        colorNav.classList.remove('sticky-nav');
                        colorNav.style.top = '';
                    }
                });
            } else {
                window.addEventListener('scroll', function(e) {
                    if (window.pageYOffset >= navOT) {
                        colorNav.classList.add('sticky-nav');
                    } else {
                        colorNav.classList.remove('sticky-nav');
                    }
                });
            }
            
            // stickyNav style 
            var stnsp = {
                backgroundColor: opts.stickyNavBackgroundColor ? opts.stickyNavBackgroundColor : 'rgba(0,0,0,0)',
                boxShadow: opts.stickyNavBoxShadow ? opts.stickyNavBoxShadow : '0 0 0 0 rgba(0,0,0,0)',
                transition: opts.stickyNavTransition ? opts.stickyNavTransition : 'all 0s ease'
            };
            stickyNavStyle = ';background-color:' + stnsp.backgroundColor
                           + ';box-shadow:' + stnsp.boxShadow +';'
                           + ';transition:' + stnsp.transition;
            
            // stickyNav hover style 
            var stnHsp = {
                backgroundColor: opts.stickyNavHoverBackgroundColor ? opts.stickyNavHoverBackgroundColor : stnsp.backgroundColor,
                boxShadow: opts.stickyNavHoverBoxShadow ? opts.stickyNavHoverBoxShadow : stnsp.boxShadow
            };
            stickyNavHoverStyle = ';background-color:' + stnHsp.backgroundColor + ';'
                                + ';box-shadow:' + stnHsp.boxShadow +';';
        }
    }
    
    /* ---------------------------
       Colors grid overlay
    --------------------------- */

    if (overlayState) {
        // insert overlay after each selectorsArray
        for (var co = 0, col = selectorsArray.length; co < col; co++) {
            if ( /colorsGrid\-overlay/i.test(selectorsArray[co].innerHTML) != true) {
                selectorsArray[co].insertAdjacentHTML('afterend', '<div class="colorsGrid-overlay"><span class="copy-state">copied!</span><span>copy</span></div>');
            }
        }

        var colorsGridOverlay = selectorContainer.getElementsByClassName('colorsGrid-overlay'),
            cOlArray = [].slice.call(colorsGridOverlay),
            selectorIndex;
        
        // center overlay horizontally
        if (overlayCenter) {
            overlayTransform = overlayTransform.replace(/\(0/, '(-50%');
            overlayLeft = '50%;';
        }
        
        // center overlay vertically
        if (overlayMiddle) {
            overlayTransform = overlayTransform.replace(/,0/, ',-50%');
            overlayTop = '50%;';
        }
        
        // overlay centering style
        overlayAlignProps = 'top:'+ overlayTop + 'left:' + overlayLeft + 'transform:' + overlayTransform;

        // overlay default style
        var oLP = {
            width: opts.overlayWidth ? opts.overlayWidth : '100%',
            height: opts.overlayHeight ? opts.overlayHeight : '100%',
            bgColor: opts.overlayBackgroundColor ? opts.overlayBackgroundColor : 'transparent',
            opacity: opts.overlayOpacity ? opts.overlayOpacity : '0',
            cursor: opts.overlayCursor ? opts.overlayCursor : 'pointer',
            transition: opts.overlayTransition ? opts.overlayTransition : 'all .4s ease'
        };
        // overlay default style
        overlayStyle = 'width:' + oLP.width
                        + ';height:' + oLP.height
                        + ';background-color:'+ oLP.bgColor 
                        + ';opacity:' + oLP.opacity
                        + ';cursor:' + oLP.cursor
                        + ';transition:'+ oLP.transition +';';
        
        // overlay hover style
        var oLHP = {
            bgColor: opts.overlayHoverBackgroundColor ? opts.overlayHoverBackgroundColor : oLP.bgColor,
            transition: opts.overlayHoverTransition ? opts.overlayHoverTransition : oLP.transition,
        };
        // overlay hover style
        overlayHoverStyle = 'background-color:'+ oLHP.bgColor 
                            + ';transition:'+ oLHP.transition +';';

        // overlay color value default style
        var oLTxtP = {
            width: opts.valueBoxWidth ? opts.valueBoxWidth : '70%',
            height: opts.valueBoxHeight ? opts.valueBoxHeight : '45px',
            bgColor: opts.valueBoxBackgroundColor ? opts.valueBoxBackgroundColor : 'rgba(0,0,0,.3)',
            fontSize: opts.valueBoxFontSize ? opts.valueBoxFontSize : '1.5em',
            color: opts.valueBoxColor ? opts.valueBoxColor : 'rgba(255,255,255,.9)',
            boxShadow: opts.valueBoxBoxShadow ? opts.valueBoxBoxShadow : '0 0 0 0 rgba(0,0,0,0)',
            borderRadius: opts.valueBoxBorderRadius ? opts.valueBoxBorderRadius : '0',
            transition: opts.valueBoxTransition ? opts.valueBoxTransition : 'all .4s ease',
        };
        // overlay color value default style
        overlayvalueBox = 'width:' + oLTxtP.width
                            + ';height:' + oLTxtP.height
                            + ';line-height:' + oLTxtP.height
                            + ';background-color:' + oLTxtP.bgColor 
                            + ';font-size:' + oLTxtP.fontSize
                            + ';color:' + oLTxtP.color 
                            + ';box-shadow:' + oLTxtP.boxShadow 
                            + ';border-radius:' + oLTxtP.borderRadius
                            + ';transition:' + oLTxtP.transition + ';';

        // overlay color value hover style
        var oLHTxtP = {
            bgColor: opts.valueBoxHoverbackgroundColor ? opts.valueBoxHoverbackgroundColor : oLTxtP.bgColor,
            color: opts.valueBoxHovercolor ? opts.valueBoxHovercolor : oLTxtP.color,
            boxShadow: opts.valueBoxHoverboxShadow ? opts.boxShadow : oLTxtP.boxShadow,
            borderRadius: opts.valueBoxHoverBorderRadius ? opts.valueBoxHoverBorderRadius : oLTxtP.borderRadius,
            transition: opts.valueBoxHovertransition ? opts.valueBoxHovertransition : oLTxtP.transition,
        };
        // overlay color value hover style
        overlayvalueBoxHoverStyle = 'background-color:' + oLHTxtP.bgColor 
                                + ';color:' + oLHTxtP.color 
                                + ';box-shadow:' + oLHTxtP.boxShadow 
                                + ';border-radius:' + oLHTxtP.borderRadius
                                + ';transition:' + oLHTxtP.transition + ';';

        //set overlay valueBox value ( setted from opts.defaultPattern )
        for (var olt = 0, oltl = colorsGridOverlay.length; olt < oltl; olt++) {
            colorsGridOverlay[olt].getElementsByTagName('span')[1].textContent =
                    selectorsArray[olt].getAttribute('data-'+activePattern+'-color');
        }

        if (opts.navContainer) {
            //change overlay valueBox value when click on nav item
            for (var ni = 0, nil = navItems.length; ni < nil; ni++) {
                navItems[ni].addEventListener('click', function () {
                    for (var nit = 0, nitl = colorsGridOverlay.length; nit < nitl; nit++) {
                        colorsGridOverlay[nit].getElementsByTagName('span')[1].textContent =
                                selectorsArray[nit].getAttribute('data-'+activePattern+'-color');
                    }
                });
            }
        }

        // copied message default style/copied animation
        if (copiedMessage) {
            copiedMsgStyle = '.copy-state{opacity:0;z-index:-1;}.copy-state.copied{index:1;opacity:1;}.copy-state.copied+span{index:-1;opacity:0;}';
        } else {
            copiedMsgStyle = '.copy-state{opacity:0;z-index:-1;}';
        }
    }

    // add copied class to .copy-state when click on grid items/overlay
    function addCopiedClassTo(clickedElem) {
        if (copiedMessage) {
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

    if (overlayState) {
        // copy color when click on overlay
        for (var oli = 0; oli < sl; oli++) {
            cOlArray[oli].addEventListener('click', function () {
                var ths = this;
                selectorIndex = cOlArray.indexOf(ths);
                t.value = selectorsArray[selectorIndex].getAttribute('data-'+activePattern+'-color');
                attachCopy();
                addCopiedClassTo(this);
            });
        }
    }
    // copy color when click on element
    for (var eli = 0; eli < sl; eli++) {
        selectorsArray[eli].addEventListener('click', function () {
            var ths = this;
            t.value = ths.getAttribute('data-'+activePattern+'-color');
            attachCopy();
            addCopiedClassTo(this);
        });
    }
    
    // append default style
    if (inlineStyle) {
        (function() {
            var defaultStyle = "<style type='text/css'>.colorsGrid-item{display:inline-block;position:relative;}.color-navigation{position:relative;"+navContStyle+"margin:0;text-align:center;}.color-navigation ul{width:100%;height:inherit;margin:0;position:absolute;top:0%;}.color-navigation ul.sticky-nav{z-index:99999;margin:0;position:fixed;top:0;left:0;"+stickyNavStyle+"}.color-navigation ul.sticky-nav:hover{"+stickyNavHoverStyle+"}.color-navigation li{display:inline-block;"+navItemsStyle+"text-transform:uppercase;cursor:pointer;}.color-navigation li:nth-of-type(2){margin-left:15px;margin-right:15px;}.color-navigation li.active-pattern{"+navItemActiveStyle+"}.colorsGrid-overlay{position:absolute;text-align:center;"+overlayAlignProps+overlayStyle+"}.colorsGrid-item:hover .colorsGrid-overlay{opacity:1;"+overlayHoverStyle+"}.colorsGrid-overlay span{display:inline-block;"+overlayvalueBox+"position:absolute;top:50%; left:50%;transform:translateZ(1px)translate(-50%,-50%);-webkit-transform:translate(-50%,-50%)translateZ(1px);text-align:center;}.colorsGrid-overlay span:hover{"+overlayvalueBoxHoverStyle+"}"+copiedMsgStyle+"</style>";
            document.head.insertAdjacentHTML('beforeend', defaultStyle);
        }());
    }

    /*---------------------
          debug mode
    ---------------------*/
    if (opts.debug_mode) {
        var dm = 0;
        for (; dm < sl; dm++) {
            selectorsArray[dm].addEventListener('click', function () {
                var i = selectorsArray.indexOf(this);
                console.log(' i =' + i + ', \n selector HTML = ' + selectorsArray[0].outerHTML);
            });
        }

        if (overlayState) {
            var dmol = 0;
            for (; dmol < sl; dmol++) {
                cOlArray[dmol].addEventListener('click', function () {
                    var i = cOlArray.indexOf(this);
                    console.log(' Element index = ' + i 
                                + ', \n Element HTML = ' + selectorsArray[i].outerHTML);
                });
            }
        }
    }
}
