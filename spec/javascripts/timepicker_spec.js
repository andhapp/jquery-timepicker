require('/javascripts/jquery.js')
require('/javascripts/jquery.timepicker.js')

function createAndAppendElement(id, parent) {
  selectTimeInput = $('<input>', {id: id})
  parent.append(selectTimeInput)
  return selectTimeInput;
}

function hour_select_element() {
  return $('#h_' + id)
}

function minute_select_element() {
  return $('#m_' + id)
}

function am_pm_select_element() {
  return $('#p_' + id)
}

describe('Binding input type text timepicker function', function() {
  beforeEach(function() {
    test = $('#test')
    id = 'selectTime'
  })
  describe('with default options', function() {
    beforeEach(function() {
      selectTimeInput = createAndAppendElement(id, test)

      selectTimeInput.timepicker()
      hour_select = hour_select_element()
      minute_select = minute_select_element()
      am_pm_select = am_pm_select_element()
    })
    it('should change make input box hidden', function() {
      expect(selectTimeInput.attr('type')).toEqual('hidden')
    })
    it('should insert select box for hour', function() {
      num_children = hour_select.children('option').length

      expect(hour_select.is(":visible")).toEqual(true)
      expect(num_children).toEqual(12)
    })
    it('should insert select box for minutes', function() {
      num_children = minute_select.children('option').length

      expect(minute_select.is(":visible")).toEqual(true)
      expect(num_children).toEqual(4) //00, 15, 30, 45
    })
    it('should insert select box for am/pm', function() {
      num_children = am_pm_select.children('option').length

      expect(am_pm_select.is(":visible")).toEqual(true)
      expect(num_children).toEqual(2)
    })
    it('should insert values selected into the input box', function() {
      hour_select.attr("value", "09").trigger("change");
      minute_select.attr("value", "15").trigger("change");
      am_pm_select.attr("value", "am").trigger("change")
			
      expect(selectTimeInput.attr("value")).toEqual('09:15am')
    })
  })
  describe('with user options', function() {
    describe('clock12:false', function() {
      beforeEach(function() {
        id = id + 'UserOptions'
        selectTimeInputUserOptions = createAndAppendElement(id, test)

        selectTimeInputUserOptions.timepicker({clock12:false})
        hour_select = hour_select_element()
        minute_select = minute_select_element()
        am_pm_select = am_pm_select_element()
      })
      it('should not insert select box for am/pm', function() {
        expect(am_pm_select.is(":visible")).toEqual(false)
      })
      it('should insert hour select box with 24 values for a 24-hour clock', function() {
        num_children = hour_select.children('option').length

        expect(hour_select.is(":visible")).toEqual(true)
        expect(num_children).toEqual(24)
      })
      it('should insert values selected into the input box', function() {
        hour_select.attr("value", "21").trigger("change");
        minute_select.attr("value", "15").trigger("change");

        expect(selectTimeInputUserOptions.attr("value")).toEqual('21:15')
      })
    })
  })
})
