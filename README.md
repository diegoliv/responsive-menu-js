responsiveMenu.js
==================

**responsiveMenu.js** is just a plugin that helps to create menus that are responsive, based on browser width. It's just a helper to avoid DRY (Don't Repeat Yourself), that deals with classes toggling and leaves all the animation and formatting to css.

How to use
----------

First, create a html structure similar to this:

```html
<div id="content" class="canvas">

<!-- (...)Here goes the content (...) -->

</div>

<!-- A button to toggle our menu -->
<a href="#" id="menu-toggle">Menu</a>

<!-- The menu wrapper -->
<div id="menu">
	<ul>
		<li><a href="#">sample link</a></li>
		<li><a href="#">sample link</a></li>
		<li><a href="#">sample link</a>
			<!-- The submenu toggle button -->
			<a href="#" class="submenu-toggle">Open Submenu</a>
			<!-- The submenu wrapper -->
			<ul class="submenu">
				<li><a href="#">sample link</a></li>
				<li><a href="#">sample link</a></li>
				<li><a href="#">sample link</a></li>
			</ul>
		</li>
	</ul>
</div>
```

Then, just call it via javascript:

```javascript
  $('#menu').responsiveMenu($('#menu-toggle'));
```
**Note:** jQuery is required.

Options
-------

The plugin has some options to cusomize. The full instance of the plugin would look like this:

```javascript
  $('#menu').responsiveMenu({
    trigger: $('#menu-toggle'),
    activeClass: 'active',
    submenuTrigger: $('.submenu-toggle'),
    submenu: $('.submenu'),
    submenuActiveClass: 'open',
    breakpoint: 720
    moveCanvas: true,
    canvas: $('.canvas'),
  });

```

The plugin options are:

Option                | Default Value    | Description
----------------------|------------------|----------------------------------------------------------
`trigger`             | none             | Selector for the button or element that will activate the default behavior of the plugin (required)
`activeClass`         | `.active`        | Class name that will be injected on the elements of the main menu when the toggle is activated
`submenuTrigger`      |`$('sub-toggle')` | Selector of the button(s) that activates the second level (if they exist) of the menu
`submenu`             | `$('.submenu')`  | Selector of the wrappers from the second level of the menu
`submenuActiveClass`` | `.open`          | Class name that will be injected on wrappers of the second level of menus when they are activated
`breakpoint`          | `720`            | Maximum width of the screen where the plugin will work. When the screen reach this size, it removes all the injected classes too.
`timeOut`             | `100`            | Time interval (in miliseconds), when the `onResize` function will be executed. The biggest the number, the bigger is the resourse economy, but the slower is the plugin response. 
`moveCanvas`          | `false`          | Option to activate a class toggle on the wrapper of the entire page. Useful for using the **"off canvas"** menu pattern
`canvas`              | `null`           | Selector of the wrapper or the elements that build the main site structure

A note about this plugin
------------------------

This is my *first plugin* AND repo here at GitHub! So, there is a plus for me in this project: start learning using GitHub and participating on this awesome community. I am open to contributions, suggestions, improvements, critics, anything that you have to say about it. Feel free to fork, clone, change it!

Licencing
---------

This projected is licensed under the terms of the MIT license (check LICENCE.txt for more information).