
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
 1. #### Setup JavScript
 Import plugin file before body closing tag
    ```html
    <script src="colorsGrid.js"></script>
    ```
    
 2. #### Setup HTML
 Make a container with unique attribute and items to hold colors
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
