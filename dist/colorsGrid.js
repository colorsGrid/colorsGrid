function colorGrid (selector, options) {
        
    /**
     * For boolean value
    */
    function isNotNull(value) {
        return value != null || undefined;
    }

    /**
     * set default value if value null
     * for string value
    */
    function defIfNull(val, def) {
        return val ? val : def;
    }

    /**
     * Convert hex to rgb
    */
    function hexToRGB(pattern) {
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
                r = Math.max( ( (getIndex(r1)+1) * (getIndex(r2)+1) - 1) , 0);
                g = Math.max( ( (getIndex(g1)+1) * (getIndex(g2)+1) - 1) , 0);
                b = Math.max( ( (getIndex(b1)+1) * (getIndex(b2)+1) - 1) , 0);
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

    /**
     * Convert rgb to rgba
    */
    function rgbToRgba(val) {
        var rgba = val.replace(/rgb/i, 'rgba').replace(/\)/, ',1)');
        return rgba;
    }

    /**
     * loop through array
    */
    function forEach(elem, callBack) {
        var el = elem, len = el.length,
            i = 0;
        if (typeof el != 'number') {
            if (len === 1) {
                callBack.call(el[0], i, el[0]);
            } else {
                for ( ; i < len ; i++ ) {
                    callBack.call(el[i], i, el[i]);
                }
            }
        } else {
            for ( ; i < el ; i++ ) {
                callBack.call(null, i);
            }
        }
    }

    /**
     * loop through object
    */
    function forIn(obj, callBack) {
        for (var key in obj) {
            callBack.call(obj[key], key, obj[key]);
        }
    }

    /**
     * convert object key/value to css property if value not null
    */
    function toCss(key, value) {
        var p = '', css = '';
        if (value) {
            if (/[A-Z]+/g.test(key)) {
                p = key.replace(/[A-Z]/g, function (e) { 
                      return '-' + e.toLowerCase(); 
                });
                css = p + ": " + value + ";";
            } else {
                css = key + ": " + value + ";";
            }
        }
        return css;
    }

    function getComputedStyle(elem, property) {
        return window.getComputedStyle(elem, null)[property]
    }

    /**
     * put hex value in object with it's key if value === string
     * set rgb/rgba to option.gridItems Object 
    */
    forIn(options.gridItems, function(k, v) {
        var itemValue = options.gridItems;
        if (typeof v === 'string') {
            itemValue[k] = { hex: itemValue[k] };
            itemValue[k].rgb = hexToRGB( itemValue[k].hex );
            itemValue[k].rgba = rgbToRgba( itemValue[k].rgb );
        } else {
            itemValue[k].rgb = hexToRGB( itemValue[k].hex );
            itemValue[k].rgba = rgbToRgba( itemValue[k].rgb );
        }
    });
    console.log(options.gridItems)

    /**
     * booleans defaults values
    */  
    var inlineStyle = isNotNull(options.inlineStyle) ? options.inlineStyle : true,
        /* @grid items */
        autoAppend = isNotNull(options.autoAppend) ? options.autoAppend : true,
        /* @navigation*/
        navState = isNotNull(options.navState) ? options.navState : true,
        autoBackgroundColor = isNotNull(options.autoBackgroundColor) ? options.autoBackgroundColor : true,
        stickyNavState = isNotNull(options.stickyNav) ? options.stickyNav : true,
        stickWithBottom = isNotNull(options.stickWithBottom) ? options.stickWithBottom : true,
        /*@overlay*/
        overlayState = isNotNull(options.overlayState) ? options.overlayState : true,
        overlayCenter = isNotNull(options.overlayCenter) ? options.overlayCenter : true,
        overlayMiddle = isNotNull(options.overlayMiddle) ? options.overlayMiddle : true,
        copiedMessageState = isNotNull(options.copiedMsgState) ? options.copiedMsgState : true,

        doc = document.body || document.documentElement,

        grid_container = selector.length ? selector[0].parentNode : selector,

        gridItemHTML = "<div class='colorsGrid-item'></div>",
        gridItemList,
        gridItem,

        overlayHTML = "<div class='overlay'><span class='copy-state'>copied!</span><span></span></div>",
        /**
         * style strings
        */
        activePattern = "hex",
        navStyle = '',
        navItemsStyle = '',
        navItemActiveStyle = '',
        stickyNavStyle = '',
        stickyNavHoverStyle = '',

        overlayStyle = '',
        colorValueBoxStyle = '',
        copiedMsgDuration,

        // copied message default style/copied animation
        navigation,
        navUL,
        navLI;

    /* 
    ============================
        plugin Style 
    ============================
    */

    /**
     * @nav outer
    */
    var nav = {
        outer_html: '<div class="color-navigation"><ul><li data-color-pattern="hex" class="active-pattern">hex</li> <li data-color-pattern="rgb">rgb</li> <li data-color-pattern="rgba">rgba</li> </ul></div>',
        style: {
            width: defIfNull(options.navWidth, '100%'),
            height: defIfNull(options.navHeight, '50px'),
            transition: defIfNull(options.navTransition, 'all 0.4s ease'),
            paddingBottom: '40px'
        }
    };

    forIn(nav.style, function(key, value) {
        navStyle += toCss(key, value);
    });

    /**
     * @nav items default style 
    */
    // get items height from nav 
    // to make space at the bottom of nav;
    var navItemHeight = nav.style.height.replace(/\d+/g, (e)=> {
        return +e - 10;
    });

    var navItems = {
        style: {
            width: defIfNull(options.navItemsWidth, '170px'),
            lineHeight: defIfNull(options.navItemsHeight, navItemHeight),
            backgroundColor: "#ffffff",
            marginTop: '5px',
            transition: defIfNull(options.transition, 'all .4s ease-in-out'),
        },
        activeElement_style: {
            backgroundColor: defIfNull(options.navItemsActiveBackgroundColor, '#17c37b'),
            color: defIfNull(options.color, '#f1f1f1'),
            boxShadow: defIfNull(options.navItemsActiveBoxShadow, '0 0 0 #ffffff'),
            borderRadius: defIfNull(options.navItemsActiveBorderRadius, '0'),
        }
    };
    forIn(navItems.style, function(key, value) {
        navItemsStyle += toCss(key, value);
    });

    forIn(navItems.activeElement_style, function(key, value) {
        navItemActiveStyle += toCss(key, value);
    });

    /**
     * @stickynav style 
    */
    var stickyNav = {
        style: {
            backgroundColor: defIfNull(options.stickyNavBackgroundColor, ''),
            boxShadow: defIfNull(options.stickyNavBoxShadow, ''),
            transition: defIfNull(options.stickyNavTransition, 'all 0.4s ease'),
        },
        hover_style: {
            backgroundColor: defIfNull(options.stickyNavHoverBackgroundColor, ''),
            boxShadow: defIfNull(options.stickyNavHoverBoxShadow, '')
        }
    };

    forIn(stickyNav.style, function(key, value) {
        stickyNavStyle += toCss(key, value);
    });

    forIn(stickyNav.hover_style, function (key, value) {
        stickyNavHoverStyle += toCss(key, value);
    });

    /**
     * @overlay style
    */
    var overlay = {
        backgroundColor: defIfNull(options.overlayBackgroundColor, 'rgba(0,0,0,.4)'),
        transition: defIfNull(options.overlayTransition, 'all 0.4s ease'),
    };

    forIn(overlay, function(key, value) {
        overlayStyle += toCss(key, value)
    })

    /**
     * @colorValueBox style
    */
    var colorValueBox = {
        width: '150px',
        height: '40px',
        backgroundColor: defIfNull(options.copiedMsgBackgroundColor, 'rgba(0,0,0,.7)'),
        color: defIfNull(options.copiedMsgColor, 'rgba(255,255,255,.8)'),
        boxShadow: defIfNull(options.copiedMsgBorder, '0 0 10px rgba(255,255,255,.8)'),
        transition: defIfNull(options.copiedMsgTransition, 'all 0.4s ease'),
    };

    colorValueBox.lineHeight = colorValueBox.height;

    forIn(colorValueBox, function (key, value) {
        colorValueBoxStyle += toCss(key, value);
    });

    if (copiedMessageState) {
        copiedMsgStyle = '.copy-state{opacity:0;z-index:-1;} span.copy-state.copied{z-index:1;opacity:1;}.copy-state.copied+span{index:-1;opacity:0;}';

        var colorValueBoxTransition = colorValueBox.transition.replace(/\s{1,}/, ' ');
        // get duration of colorValueBox transition to remove copied class on transition end
        copiedMsgDuration = +colorValueBoxTransition.split(' ')[1].replace(/s+/, '') * 2000;
    } else {
        copiedMsgStyle = '.copy-state{opacity:0;z-index:-1;}';
    }

    /* Grid items
     =========================================================
     * add color-holder class to selectors
     * equalize color holders with options.gridItems 
        (append color holders if selectors length less than options.gridItems length)
     * clone color holders dimensions to colorsGrid-item
     * append color holder to colorsGrid-item
     ==========================================================
    */
    var colorHolderHTML = '<div class="color-holder"></div>';

    /**
     * add color-holder class to selector if not container 
    */ 
    if (selector.length) {
        // add color-holder class
        forEach(selector, function (i,e) {
            e.classList.add('color-holder');
        });
    } else {
        //append div with color-holder class to container
        selector.insertAdjacentHTML('beforeend', colorHolderHTML);
    }

    /**
     * append color-holder if selectors length less than options.gridItems length
    */ 
    var selectorsLength = doc.getElementsByClassName('color-holder').length,
        gridItemsObjectLength = Object.keys(options.gridItems||{}).length;

    if (selectorsLength < gridItemsObjectLength) {
        // get items number to append
        var reminingItems = gridItemsObjectLength - selectorsLength;
        // append remining items to container
        forEach(reminingItems, function () {
            grid_container.insertAdjacentHTML('beforeend', colorHolderHTML)
        });
    }

    /**
     * store color holder document list into array
     * get dimensions
    */
    var colorHolderList = [].slice.call(doc.getElementsByClassName('color-holder')),
        colorHolderWidth = colorHolderList[0].clientWidth + 'px',
        colorHolderHeight = colorHolderList[0].clientHeight + 'px',
        cHM = {
            top: getComputedStyle(colorHolderList[0], 'margin-top'),
            left: getComputedStyle(colorHolderList[0], 'margin-left'),
            bottom: getComputedStyle(colorHolderList[0], 'margin-bottom'),
            right: getComputedStyle(colorHolderList[0], 'margin-right')
        };

    /**
     * append colorHolder to colorsGrid-item
     * append overlay to colorsGrid-item
    */
    forEach(colorHolderList, function(i,e) {
        grid_container.insertAdjacentHTML('beforeend', gridItemHTML);
        gridItem = doc.getElementsByClassName('colorsGrid-item')[i];

        gridItem.setAttribute('data-hex-value', options.gridItems[i].hex);
        gridItem.setAttribute('data-rgb-value', options.gridItems[i].rgb);
        gridItem.setAttribute('data-rgba-value', options.gridItems[i].rgba);

        gridItem.style.width = colorHolderWidth;
        gridItem.style.height = colorHolderHeight;
        gridItem.style.margin = cHM.top +' '+ cHM.right +' '+ cHM.right +' '+ cHM.left;

        // make color dimensions relative to continer
        colorHolderList[i].style.width = '100%';
        colorHolderList[i].style.height = '100%';
        colorHolderList[i].style.margin = 'auto';
        colorHolderList[i].style.backgroundColor = options.gridItems[i].hex;

        gridItem.appendChild(colorHolderList[i]);
        gridItem.insertAdjacentHTML('beforeend', overlayHTML)
    });

    /** 
     * colorsGrid-item
     * copy color when click on it
     * get overlay text value from it's active color pattern
    */
    gridItemList = [].slice.call(doc.getElementsByClassName('colorsGrid-item'));


    /* Navigation
     ======================================================================
     * prepend nav to gridItems container
     * make nav relative to container height when scrolling
        (stick it at the bottom of container if scrollTop > container.height)
     =======================================================================
    */
    if (navState) {
        console.log(navHeight)
        // prepend nav.outer_html to grid container
        grid_container.insertAdjacentHTML('afterbegin', nav.outer_html);

        navigation = doc.getElementsByClassName('color-navigation')[0],
        navUL = navigation.getElementsByTagName('ul')[0];
        navLI = navigation.getElementsByTagName('li');

        if (stickyNavState) {
            var navOffsetTop = navigation.offsetTop,
                navHeight = parseInt(nav.style.height.match(/\d+/)[0]) + 10,
                navSlideOutLength = (navHeight * -1) + 'px',
                containerHeight = grid_container.clientHeight - navHeight,
                scrollTop = window.screenTop;

            window.addEventListener('scroll', function() {
                scrollTop = window.pageYOffset;
                if (scrollTop >= navOffsetTop && scrollTop < containerHeight ) {
                    navUL.classList.add('sticky');
                    navUL.style.top = '';
                } else if (scrollTop >= containerHeight) {
                    navUL.style.top = navSlideOutLength;
                } else {
                    navUL.classList.remove('sticky');
                    navUL.style.top = '';
                }
            });
        }
    }

    /* Click event functions 
    ===========================
    */

    /**
     * textarea to hold clicked item color value for coping
    */
    var textarea = document.createElement('textarea');
    textarea.setAttribute('id', 'copy-holder');
    textarea.style.position = 'fixed';
    textarea.style.left = '0px';
    textarea.style.top = '0px';
    textarea.style.zIndex = '0';
    textarea.tabIndex = '-1';
    doc.appendChild(textarea);
    var copyHolder = document.getElementById('copy-holder');

    /**
     * colorsGrid-item
    */
    forEach(gridItemList, function (i, gridItem) {
        var ths = this,
            copyState = ths.getElementsByClassName('copy-state')[0];
        // clone this active color pattern value to second span (vcolor value holder)
        ths.getElementsByTagName('span')[1].textContent = ths.getAttribute('data-'+ activePattern +'-value');

        ths.addEventListener('click', function() {
            copyHolder.value = ths.getAttribute('data-'+ activePattern +'-value');
            copyHolder.select();
            document.execCommand('copy');
            copyState.classList.add('copied');
            window.setTimeout(()=>{ copyState.classList.remove('copied') }, copiedMsgDuration);

        });
    });

    /**
     * navigation
    */
    forEach(navLI, function (i, li) {
        li.addEventListener('click', function () {
            forEach(navLI, function (i, li) {
                li.classList.remove('active-pattern');
            });
            activePattern = this.getAttribute('data-color-pattern');
            this.classList.add('active-pattern');
        });
    });
    console.log(colorValueBoxStyle)
    if (inlineStyle) {
        (function() {
            var defaultStyle = "<style type='text/css'>.colorsGrid-item{position:relative;display:inline-block;position:relative;}.color-navigation{position:relative;width: 100%;"+navStyle+"margin:0;text-align:center;}.color-navigation ul{width:100%;height:inherit;margin:0;position:absolute;top:0%;}.color-navigation ul.sticky{z-index:99999;margin:0;position:fixed;top:0;left:0;"+stickyNavStyle+"}.color-navigation ul.sticky-nav:hover{"+stickyNavHoverStyle+"}.color-navigation li{display:inline-block;"+navItemsStyle+"text-transform:uppercase;cursor:pointer;}.color-navigation li:nth-of-type(2){margin-left:15px;margin-right:15px;}.color-navigation li.active-pattern{"+navItemActiveStyle+"}.colorsGrid-item .overlay{position:absolute;top:0;width:100%;height:100%;"+overlayStyle+"text-align:center;opacity: 0;}.colorsGrid-item:hover .overlay{opacity:1;}.colorsGrid-item .overlay span{display:block;"+colorValueBoxStyle+"position:absolute;top:50%;left:50%;transform:translateZ(1px)translate(-50%,-50%);text-align:center;}"+copiedMsgStyle+"</style>";
            document.head.insertAdjacentHTML('beforeend', defaultStyle);
        }());
    }
};
