TimePicker: A simple solution for picking time
==============================================

About
-----

**jquery-timepicker** a very simple jquery plugin, originally developed by [Jason Huck](http://www.corefive.com/), and improved by [Anuj Dutta](http://www.andhapp.com/blog) by adding unit tests and improving the overall readability and standard of the code. Code was originally found at [Google's source code repository](http://code.google.com/p/jquery-timepicker. 


Inspiration
-----------
Simple. Scratch my itch. I could not find a good solution then found Jason's plugin (also listed on the jquery plugin site). It was easy to use and I decided to improve the code and add tests to it.


Usage
-----
Again, simple. It hides an input box and displays three (or two based on supplied options) select boxes, one each for hour, mins and time of day (am or pm). All, you need to do is attach the timepicker function to the input box that will be used for time input.

Example: Your HTML code looks like this:

  <div id="timeContainer">
    <input type="text" id="select_time" value="">
  </div>
  
then in your javascript file do the following:

  $('input#select_time').timepicker();
  
Please make sure the input box is inside a div.

Works with **jquery 1.4.2**.

You can supply the option to display a 24-hr clock and no time-of-day selection box by using the following javascript:

  $('input#select_time').timepicker({clock12:false});

If you get stuck, just look at the tests. 

Specs
-----
The plugin is tested using [JSSpec](http://jania.pe.kr/aw/moin.cgi/JSSpec), a behaviour driven testing framework for javascript. To run the tests, please download the code and just open index.html file in your browser. All the test reside in test/unit directory.

Roadmap
-------
* Ensure the current time is selected on landing.
* Test for fence post errors with time.
* Fix a weird bug with the select boxes. It gets an extra element in the end.
* Convert time to one standard. For example: either 24-hr clock or 12-hr clock as it would make it easier to handle the values at a later stage.
* Further improve the code.

