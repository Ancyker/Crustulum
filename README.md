# Crustulum
Crustulum is a *cheating* add-on for [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/). It enables a variety of features to help those wishing to make aspects of the game easier. Some features provided are also done by other tools or the built in debug menus, however, this add-on simplifies some of those and does not award the "Cheated cookies taste awful" achievement.

I created this add-on because it became tiresome pasting in a few snippets of code every time I reloaded the page. It's mostly for personal use but I am (obviously) sharing it anyway. No warranty of any kind is offered. I added features to this that I do not use so some things may not all be fully tested.

I highly recommend not using all of the features provided as it will pretty much ruin the game if you do. You should just use it to skip parts you find tedious or improve your CpS a little bit. I personally only use the auto clicks regularly. I only use some of the actions on occasion.

## Features

### Basics
* Remembers settings.
* Self-serve. Nothing is forced on you. No options are enabled by default.
* Compatible with [Cookie Monster](https://github.com/Aktanusa/CookieMonster), recommended to load Crustulum last.
* Tested only on Chrome.

### Automation
The following automation options are available. All options can be toggled on and off at will and default to being off when you first load the add-on.
* **Auto Click Big Cookie**
  * Clicks the big cookie for you.
* **Auto Click Golden Cookies**
  * Clicks any golden cookies for you.
* **Auto Click Reindeer**
  * Clicks on reindeer for you
* **Auto Click News**
  * Clicks on the news ticker for you.
* **Block Wrath Cookies**
  * Prevents wrath cookies from spawning.
* **Infinite Cookies**
  * Causes your cookies to constantly regenerate.
* **Infinite Magic**
  * Causes your Grimoire magic to recharge almost instantly
* **Miracle Spell™**
  * Grimoire spells will never fail.
* **Make Plants Immortal**
  * Makes it so plants never wither. Does not affect weeds or fungi.
* **Never Weed™**
  * Makes it so weeds never spawn on their own. You can still plant them and they still may spread.
* **Infinite Swaps**
  * Causes your Pantheon swaps to regenerate almost instantly.
* **Pantheon 'R Us**
  * All Pantheon gods except for Cyclius will be active in slot one.
* **Power Of The Gods**
  * All Pantheon gods will behave as if they are in slot 1 regardless of which slot they are in.

### Actions
A variety of actions are also available. These are once off actions and have no lasting effects.

* **Spawn a Golden Cookie**
  * Spawns a golden cookie.
* **Spawn a Frenzy Cookie**
  * Spawns a golden cookie that will cause a frenzy.
* **Spawn a Dragonflight Cookie**
  * Spawns a golden cookie that will cause a dragonflight.
* **Refill Magic**
  * Refill all of your Grimoire's magic.
* **Refill Swaps**
  * Refill all of your Pantheon's swaps'
* **Give Cookies**
  * Gives you the most cookies you can have without getting the cheated cookies achievement.
* **Give Sugar Lump**
  * Gives you a sugar lump.
* **Unlock Plant Seeds**
  * Unlocks all the plant seeds for your Garden. Does not unlock weeds or fungi.
* **Unlock Weed and Fungi Seeds**
  * Unlocks all the weed and fungus seeds for the Garden.
* **Lock All Seeds**
  * Locks all the seeds for the Garden except for the starting seed.
* **Remove Cheat Achievement**
  * Remove 'Cheated cookies taste awful' achievement in case you got it before using this add-on.

## How To Use
To use the add-on simply run the following in the developer console:
```javascript
(function () {Game.LoadMod('https://cdn.jsdelivr.net/gh/Ancyker/Crustulum/Crustulum.js')}());
```
Or you can use this bookmarklet:
```javascript
javascript:(function () {Game.LoadMod('https://cdn.jsdelivr.net/gh/Ancyker/Crustulum/Crustulum.js')}());
```

Note: jsDelivr is a third party service. Use at your own risk.

## Authors & Copyright Stuff
I wrote all the code myself, though the original Cookie Clicker code was obviously used in some places. I also looked at Cookie Monster for reference on how to make buttons appear in the menu.
