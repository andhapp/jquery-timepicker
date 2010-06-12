/* jQuery timepicker
 * Replaces a single text input with a set of pulldowns to select hour, minute, and am/pm
 *
 * 
 * Original copyright (c) 2007 Jason Huck/Core Five Creative (http://www.corefive.com/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * 
 * Improved by Anuj Dutta (@andhapp) by adding specs and refactoring the code to remove duplication and improve code standards
 * 
 * Re-released as Version 0.1
 *
 */

;(function($){	
	$.fn.timepicker = function(opts) {
		
		function changeTypeToHidden(object) {
			object.type = "hidden";
		};
		
		function createDOMElementFor(type, object, options) {
			var result = '';
			var elemId = object.id;
			var sourceArray;
			
			if (type == "hrs12") {
				sourceArray = options.hrs12.split(",");
				result += '<select id="h_' + elemId + '" class="h timepicker">';				
			} else if (type == "hrs24") {
				sourceArray = options.hrs24.split(",");
				result += '<select id="h_' + elemId + '" class="h timepicker">';								
			} else if (type == "mins"){
				sourceArray = options.mins.split(",");
				result += '<select id="m_' + elemId + '" class="m timepicker">';				
			}	else if (type == "ap"){
				sourceArray = options.ap.split(",");
				result += '<select id="p_' + elemId + '" class="m timepicker">';				
			}
			
			//#TODO: Some bug somewhere. Adds an extra Array element to the end.
			sourceArray.pop();
				
			for(elem in sourceArray) {
				var value = sourceArray[elem];
				result += '<option value="' + value + '"';
				result += '>' + value + '</option>';
			}
			result += '</select>';
			
			// Get the parent element where the input box is and then just append the select boxes in it.
			var parentElement = $(object).parents(0);
			$(parentElement).append(result);
		};
		
		// To pick the values selected and insert it into the input ox.
		function setUpSelectBoxChange(clock12) {
			$('select.timepicker').change(function() {
				var final_value = ""
				var id_substr = this.id.substr(2); // get the common part in the id i.e. select_time for instance is the id of the input box used
				var hr = $('#h_' + id_substr).val();
				var min = $('#m_' + id_substr).val();
				if (clock12) {
					var time_of_day = $('#p_' + id_substr).val();
					final_value = hr + ':' + min + time_of_day;
				} else {
					final_value = hr + ':' + min;
				}
				
				$('#' + id_substr).val(final_value);
			});
		}	
			
		return this.each(function() {
			
			var options = $.extend({}, $.timepicker.defaults, $.timepicker, opts);
			
			changeTypeToHidden(this);
			
			if (options.clock12) {
				createDOMElementFor("hrs12", this, options);
				createDOMElementFor("ap", this, options);
			} else {
				createDOMElementFor("hrs24", this, options);
			}
			
			createDOMElementFor("mins", this, options);
			setUpSelectBoxChange(options.clock12);
			
		});
				
	};
	
	// Deault Options
	$.timepicker = {
		defaults: {
			ap: 		"am,pm",
			mins: 	"00,15,30,45",
			hrs12: 	"01,02,03,04,05,06,07,08,09,10,11,12",
			hrs24: 	"00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23",
		},
		clock12: true
	}
	    
})(jQuery);