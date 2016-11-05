
### ColorsGrid (Beta version)
  > V 1.0
  
### Description
Colors Grid is a lite javascript plugin will make you able to easily store your favorite colors/switch between patterns and copy it with one click.

## Features
 * Switch between color patterns (hex/rgb/rgba)
 * Copy stored color with one click
 * Sticky nav
 * Debug mode
 
## Installation
  1. #### Setup JavaScript
  Include colorsGrid js file
  ```html
  <script src="colorsGrid.js"></script>
  ```

  2. #### Setup HTML
  Make a container with unique attribute to hold grid items
  ```html
  <div id="container">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  ```

  3. #### Call Colors Grid plugin
  Select the container id and it's items to apply plugin on them
  ```javascript
  colorsGrid(document.getElementById('container').getElementsByTagName('div') , { options });
  ```
  
##Options
 Options   |  Type  |  Default value  |  Description
---------- | ------ | --------------- | -------------
gridItems  | Object |      null       | This allows you to add a color for specified element by setting element index as key and it's hex color as a value. you can get element index by enabling debug_mode. Example: gridItems:{1: '#0ff'}.
autoBackgroundColor | Boolean | true | To give items background color based on it's color at gridItems object.
defaultPattern | String | hex | default color pattern which will be showed/copied.
navContainer | Dom Element | null | Container to prepend navigation hex/rgb/rgba switcher to it. if not setted, navigation will be disabled.
navWidth | String | 100%  | Naviation width
navHeight | String | 70px  | Naviation height
stickyNav | Boolean | true | To make navigation fixed when scrollTop equal or greater than navigation offset top.
stickyNavBackgroundColor | String | rgba(0,0,0,0) | StickyNav background color
stickyNavBoxShadow  |  String  |  0 0 0 0 rgba(0,0,0,0) | StickyNav box shadow
stickyNavTransition |  String  | all 0s ease  |  StickyNav transition
stickyNavHoverBackgroundColor | String | stickyNavBackgroundColor| StickyNav hover background color 
stickyNavHoverBoxShadow | String | stickyNavBoxShadow | StickyNav hover box shadow
navItemsWidth | String | 170px | Navigation li width
navItemsHeight | String | 40px | Navigation li height
navItemsBackgroundColor | String | #ffffff | Navigation li background color
navItemsBoxShadow | String | 0 0 1px \#151515 | Navigation li box shadow
navItemsColor | String | \#151515 | Navigation li color
navItemsBorderRadius | String | 0 | Navigation li border radius
navItemsFontSize | String | 1em | Navigation li font-size
navItemsTransition | String | all 0s ease | Navigation li transition
navItemsActiveBackgroundColor | String | navItemsActiveBackgroundColor | Navigation li active state backround color
navItemsActiveColor | String | #0bbcd6 | Navigation li active state color
navItemsActiveBoxShadow | String | #0bbcd6 | Navigation li active state box shadow
navItemsActiveBorderRadius | String | navItemsBorderRadius | Navigation li active state border radius
overlayState | Boolean | true | grid item overlay
overlayCenter | Boolean | true | To center overlay horizontally if it's width smaller than grid item width
overlayMiddle | Boolean | true | To center overlay vertically if it's height smaller than grid item height
overlayWidth | String | 100% | overlay width
overlayHeight | String | 100% | overlay height
overlayBackgroundColor | String | transparent | Overlay background color
overlayOpacity | String | 0 | To fade in overlay when hover on grid item
overlayCursor | String | pointer | Overlay cursor
overlayTransition | String | overlayTransition | Overlay default state transition
overlayHoverBackgroundColor | String | overlayBackgroundColor | Overlay hover background color
overlayHoverTransition | String | overlayTransition | Overlay hover state transition
valueBoxWidth | String | 70% | color value box width
valueBoxHeight | String | 45px | color value box height
valueBoxBackgroundColor | String | rgba(0,0,0,.3) | color value box background color
valueBoxColor | String | rgba(255,255,255,.9) | color value box color
valueBoxFontSize | String | 1.5em | color value box font size
valueBoxBoxShadow | String | 0 0 0 0 rgba(0,0,0,0) | color value box box shadow
valueBoxBorderRadius | String | 0 | color value box border radius
valueBoxTransition | String | all .4s ease | color value box transition
valueBoxHoverbackgroundColor | String | valueBoxBackgroundColor | color value box hover background color
valueBoxHovercolor | String | valueBoxColor | color value box hover color
valueBoxHoverboxShadow | String | valueBoxBoxShadow | color value box hover box shadow
valueBoxHoverBorderRadius | String | valueBoxBorderRadius | color value box hover border radius
valueBoxHovertransition | String | valueBoxTransition | color value box hover transition
valueBoxTransition | String | all .4s ease | color value box default transition
copiedMessage | Boolean | true | To show *copied!* message when click on overlay
debug_mode | Boolean | null | To get Element index/outerHTML at console log when click on item/overlay

  
