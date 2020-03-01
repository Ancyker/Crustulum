# Crustulum Plugins
These plugins extend the features of Crustulum. I may make a feature request that I don't want in the main code as a plugin. I also may accept user submitted plugins. Most plugins must be loaded before Crustulum is loaded to work correctly.

## Available Plugins
* **example**
  * This plugin was created as an example of how to make a plugin. It adds a button that adds 10 sugar lumps when clicked.
* **perfectIdling**
  * Adds a button to toggle the 'Perfect idling' upgrade which makes cookies generate while the game is closed.

## How To Use
To use a plugin simply run the following in the developer console (make sure to update the name):
```javascript
(function () {Game.LoadMod('https://cdn.jsdelivr.net/gh/Ancyker/Crustulum/Plugins/name.CrustulumPlugin.js')}());
```
Or you can use this bookmarklet:
```javascript
javascript:(function () {Game.LoadMod('https://cdn.jsdelivr.net/gh/Ancyker/Crustulum/Plugins/name.CrustulumPlugin.js')}());
```
