
### ColorsGrid
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
## Options
   Property  |  Type  |  Default value  |  Description
  ---------- | ------ | --------------- | -------------
  gridItems  | Object |     Empty       | This allows you to add a color for specified element by setting element index as key and it's hex color as a value. you can get element index by enabling debug_mode. Example: gridItems:{1: '#0ff'}.
 
