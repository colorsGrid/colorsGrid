
### ColorsGrid
  > V 1.0
  
### Description
Colors Grid is a lite javascript plugin to store your favorite colors and switch between patterns.

## Features
 * Copy stored color with one click
 * Sticky nav to navigate between patterns(hex/rgb/rgba)
 
## Installation 
  codepen example http://codepen.io/El-Oz/pen/gLPGyz
  
  1. #### Setup JavaScript
  Include colorsGrid js file
  ```html
  <script src="colorsGrid.js"></script>
  ```
  
  2. #### Setup HTML
    ```html
    <div id="container"></div>
    ```
    ```javascript
    colorsGrid(document.getElementById('container'), { options });
    ```
    
    Or if there is already items 
    ```html
    <div id="container">
      <div class="item"></div>
      ...
    </div>
    ```
    ```javascript
    colorsGrid(document.getElementById('container').getElementByClassName('item'), { options });
    ```
  

  
##Options
 Options   |  Type  |  Default value  |  Description
---------- | ------ | --------------- | -------------
gridItems  | Object |      null       | Store your colors at this object with the index of element.
inlineStyle | Boolean | true | Enable to style with options, or disable incase of overwriting defaults with external stylesheet.
navState | Boolean | true | Color switcher(hex/rgb/rgba) navigation
stickyNavState | Boolean | true | To stick nav while scrolling
overlayState | Boolean | true | Grid item overlay
copiedMessageState | Boolean | true | Showed when click on overlay
navWidth | String | 100% | Naviagtion container width
navHeight | String | 50px | Naviagtion container height
navTransition | String | all 0.4s ease | Naviagtion container transition
navItemsWidth | String | 170px | Navigation list items width
navItemsHeight | String | navHeight - 10px | Navigation list items height
navItemsBackgroundColor | String | #ffffff | Navigation list items background color
navItemsBoxShadow | String | 0 0 0 1px #3b4148 | Navigation list items box shadow
navItemsTransition | String | all .4s ease-in-out | Navigation list items transition
navItemsActiveBackgroundColor | String | #3b4148 | Navigation active item background color
navItemsActiveColor | String | #f1f1f1 | Navigation active item text color
navItemsActiveBoxShadow | String | null | Navigation active item box shadow
navItemsActiveBorderRadius | String | null | Navigation active item border radius 
stickyNavBackgroundColor | String | null | Background color when navigation become sticky
stickyNavBoxShadow | String | null | Box shdaow when navigation become sticky
stickyNavTransition | String | all 0.4s ease | Transition for sliding BackgroundColor/BoxShadow/sliding out
stickyNavHoverBackgroundColor | String | null | Background color when hover on sticky navigation
stickyNavHoverBoxShadow | String | null | Box shadow when hover on sticky navigation
overlayBackgroundColor | String | rgba(0,0,0,.4) | Showed when hover on grid item
overlayTransition | String | all 0.4s ease | Transition of overlay fading
colorBoxBackgroundColor | String | null | Color value /copied message box background color
colorBoxColor | String | rgba(255,255,255,.8) | Color value /copied message box text color
colorBoxBoxShadow | String | 0 0 4px 3px rgba(255,255,255,.8) | Color value /copied message box box-shadow
colorBoxTransition | String | all 0.4s ease | Color value /copied message box transition
