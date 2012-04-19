# TimePicker: A simple solution for picking time


## About


**jquery-timepicker** a very simple jquery plugin, originally developed by [Jason Huck](http://www.corefive.com/), and improved by [Anuj Dutta](http://www.andhapp.com/blog) by adding unit tests and improving the overall readability and standard of the code. Code was originally found at [Google's source code repository](http://code.google.com/p/jquery-timepicker). 


## Inspiration

Simple. Scratch my itch. I could not find a good solution then found Jason's plugin (also listed on the jquery plugin site). It was easy to use and I decided to improve the code and add tests to it.


## Usage

Again, simple. It hides an input box and displays three (or two based on supplied options) select boxes, one each for hour, mins and time of day (am or pm). All, you need to do is attach the timepicker function to the input box that will be used for time input.

Example: Your HTML code looks like this:
    
    <div id="timeContainer">
        <input type="text" id="select_time" value="">
    </div>
  
and your javascript code should look like this:
  
    $('input#select_time').timepicker();
  
Please make sure the input box is inside a div since the select boxes are appended to the parent div.

Works with **jquery 1.7.2**.

### Options

1. You can supply the option to display a 24-hr clock and not display time-of-day selection box by using the following javascript:
  
    $('input#select_time').timepicker({clock12:false});

2. You can make the timepicker appear in a popup box by passing in
   inPopup:true. Default is false.
  
    $('input#select_time').timepicker({inPopup:true});


If you get stuck, just look at the tests. There is also an example
index.html file in spec/integration.

## Specs

The plugin is tested using [Evergreen](http://github.com/jnicklas/evergreen), a behaviour driven testing framework for javascript built on top of Jasmine. To run the specs, clone the repository, install required gems and then run the following:

    bundle exec evergreen run    

## Versioning

The code follows seamntic versioning and is at 1.1.0 at the moment.


## Roadmap

* Bug in Safari in parseInt. You have to specify the radix. This might
  be fixed now, as I didn't see it again while testing.
* Add timezones
* Create a gem that can be packged just like jquery-rails (although, it might create bugs since this plugin depends on one version and jquery-rails might depend on completely different)
* Add locale String, only for am/pm strings.

