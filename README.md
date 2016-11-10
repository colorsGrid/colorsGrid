
### ColorsGrid (Beta version)
  > V 1.0
  
### Description
Colors Grid is a lite javascript plugin will make you able to easily store your favorite colors/switch between patterns and copy it with one click.

## Features
 * Copy stored color with one click
 * Sticky nav to navigate between patterns(hex/rgb/rgba)
 * Debug mode
 
## Installation
  1. #### Setup JavaScript
  Include colorsGrid js file
  ```html
  <script src="colorsGrid.js"></script>
  ```
  
  2. #### Setup HTML
    ```html
    <div id="cont"></div>
    ```
    ```javascript
    colorsGrid(document.getElementById('container'), { options });
    ```
    
    Or if there is already items 
    ```html
    <div id="cont">
      <div class="item"></div>
      ...
    </div>
    ```
    ```javascript
    colorsGrid(document.getElementById('container').getElementByClassName('item'), { options });
    ```
  

  
##Options
 Options   |  Type  |  Default value  |  Description
---------- | :------: | :---------------: | -------------
gridItems  | Object |      null       | Store your colors at this object with the index of element.
inlineStyle | Boolean | true | 
navState | Boolean | true | 
stickyNavState | Boolean | true | 
overlayState | Boolean | true | 
copiedMessageState | Boolean | true | 
navWidth | String | 100%
navHeight | String | 50px
navTransition | String | all 0.4s ease
navItemsWidth | String | 170px
navItemsHeight | String | navHeight - 10px
navItemsBackgroundColor | String | #ffffff
navItemsBoxShadow | String | 0 0 0 1px #3b4148
navItemsTransition | String | all .4s ease-in-out
navItemsActiveBackgroundColor | String | #3b4148
navItemsActiveColor | String | #f1f1f1
navItemsActiveBoxShadow | String | null
navItemsActiveBorderRadius | String | null

stickyNavBackgroundColor | String | null
stickyNavBoxShadow | String | null
stickyNavTransition | String | all 0.4s ease

stickyNavHoverBackgroundColor | String | null
stickyNavHoverBoxShadow | String | null

overlayBackgroundColor | String | rgba(0,0,0,.4)
overlayTransition | String | all 0.4s ease

colorBoxBackgroundColor | String | null
colorBoxColor | String | rgba(255,255,255,.8)
colorBoxBorder | String | 0 0 4px 3px rgba(255,255,255,.8)
colorBoxTransition | String | all 0.4s ease

  
