// <![CDATA[
		
	describe('On binding input type "text" to timepicker', {
		
		before_each: function() {
			$('input#select_time').timepicker();
		},
		
		'Should change the input box to type hidden': function() {
			value = $('input#select_time').attr('type');
			
			expect(value).should_be("hidden");
		},
		
		'Should insert select box for hour': function() {
			value = $('select#h_select_time').is(":visible");
			num_options_in_hr_select = $('#h_select_time').children().length;
			
			expect(value).should_be(true);
			expect(num_options_in_hr_select).should_be(12);
		},
		
		'Should insert select box for minutes': function() {
			value = $('#m_select_time').is(":visible");
			
			expect(value).should_be(true);			
		},
		
		'Should insert select box for am & pm by default': function() {
			value = $('#p_select_time').is(":visible");
			
			expect(value).should_be(true);			
		},
		
		after_each: function() {
			$("select[id$='_select_time']").each(function() {
				$(this).remove();
			});
		}				
	})
	
	describe('On passing options to timepickr', {
		
		'Should not insert select box for am & pm if 12-hr clock == false': function() {
			$('input#select_time').timepicker({clock12:false});
			num_options_in_hr_select = $('#h_select_time').children().length;
			value = $('#p_select_time').is(":visible");
			
			expect(value).should_be(false);
			expect(num_options_in_hr_select).should_be(24);
		},
		
		after_each: function() {
			$("select[id$='_select_time']").each(function() {
				$(this).remove();
			});
		}				
		
	})
	
	describe('On selecting values from the select boxes with am/pm', {
		
		// NOTE: Using after_each here works in a weird fashion. Therefore, calling it explicitly after this example.
		'Should retreive values from select boxes and insert into the hidden input box': function() {
			$('input#select_time').timepicker();
			$('#h_select_time').attr("value", "09");
			$('#m_select_time').attr("value", "15");
			$('#ap_select_time').attr("value", "am");
			
			$('#h_select_time').trigger("change");
			$('#m_select_time').trigger("change");
			$('#ap_select_time').trigger("change");
			value = $('input#select_time').attr("value");
			
			expect(value).should_be("09:15am");						
		},
		
		after_each: function() {
			$("select[id$='_select_time']").each(function() {
				$(this).remove();
			});
		}				
		
	})	
	
	describe('On selecting values from the select boxes without am/pm', {
		
		// NOTE: Using after_each here works in a weird fashion. Therefore, calling it explicitly after this example.
		'Should retreive values from select boxes and insert into the hidden input box without am/pm': function() {
			$('input#select_time').timepicker({clock12:false});
			$('#h_select_time').attr("value", "21");
			$('#m_select_time').attr("value", "15");
			
			$('#h_select_time').trigger("change");
			$('#m_select_time').trigger("change");
			value = $('input#select_time').attr("value");
			
			expect(value).should_be("21:15");
		}, 
		
		after_each: function() {
			$("select[id$='_select_time']").each(function() {
				$(this).remove();
			});
		}				
		
	})	
	
					
// ]]>