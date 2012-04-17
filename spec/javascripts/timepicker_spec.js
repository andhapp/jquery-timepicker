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
      parentContainer = selectTimeInput.parent(0)

      hour_select = hour_select_element()
      minute_select = minute_select_element()
      am_pm_select = am_pm_select_element()
    })
    it('should make input box hidden', function() {
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
    it('should insert the hour, minutes and am/pm in input box parent container', function() {
      expect(hour_select.parent(0).attr('id')).toEqual('test')
      expect(minute_select.parent(0).attr('id')).toEqual('test')
      expect(am_pm_select.parent(0).attr('id')).toEqual('test')
    })
  })
  describe('with user options', function() {
    describe('inPopup:true', function() {
      beforeEach(function() {
        id = id + 'UserOptionsPopup'
        selectTimeInputUserOptionsPopup = createAndAppendElement(id, test)

        selectTimeInputUserOptionsPopup.timepicker({inPopup:true})
        parentContainer = hour_select_element().parent(0)
      })
      it('should be hidden by default', function() {
        expect(parentContainer.is(":visible")).toEqual(false)
      })
      it('should be positioned absolute by default', function() {
        expect(parentContainer.css('position')).toEqual('absolute')
      })
      it('should be positioned just below the input box', function() {
        expected_top = selectTimeInputUserOptionsPopup.offset().top +
                       selectTimeInputUserOptionsPopup.outerHeight() + 'px'

        expected_left = selectTimeInputUserOptionsPopup.offset().left + 'px'

        expect(parentContainer.css('top')).toEqual(expected_top)
        expect(parentContainer.css('left')).toEqual(expected_left)
      })
      it('should have class=timepicker and id=timepicker', function() {
        expect(parentContainer.attr('id')).toEqual('timepicker')
        expect(parentContainer.attr('class')).toEqual('timepicker')
      })
      it('should insert the hour, minutes and am/pm in input box parent container', function() {
        num_children = parentContainer.children('select').length

        expect(num_children).toEqual(3)
      })
      it('should show the timepicker container on input box focus', function() {
        selectTimeInputUserOptionsPopup.trigger("focus")

        expect(parentContainer.is(":visible")).toEqual(true)
      })
      it('should hide the timepicker container when user clicks outside of input box or the timepicker container', function() {
        runs(function() {
          selectTimeInputUserOptionsPopup.trigger("focus")
        })

        waits(500)

        runs(function(){
          test.trigger("click")
          expect(parentContainer.is(":visible")).toEqual(false)
        })
      })
      it('should not hide the timepicker container when user clicks in timepicker container', function() {
        runs(function() {
          selectTimeInputUserOptionsPopup.trigger("focus")
        })

        waits(500)

        runs(function(){
          parentContainer.trigger("click")
          expect(parentContainer.is(":visible")).toEqual(true)
        })
      })
      it('should not hide the timepicker container when user clicks in input box', function() {
        runs(function() {
          selectTimeInputUserOptionsPopup.trigger("focus")
        })

        waits(500)

        runs(function(){
          selectTimeInputUserOptionsPopup.trigger("focus")
          expect(parentContainer.is(":visible")).toEqual(true)
        })
      })
      it('should not hide the timepicker container when user selects time values', function() {
        runs(function() {
          selectTimeInputUserOptionsPopup.trigger("focus")
        })

        waits(500)

        runs(function(){
          hour_select_element().trigger("change")
       })

        waits(100)

        runs(function(){
          expect(parentContainer.is(":visible")).toEqual(true)
        })
      })

    })
    describe('clock12:false', function() {
      beforeEach(function() {
        id = id + 'UserOptionsClock'
        selectTimeInputUserOptionsClock = createAndAppendElement(id, test)

        selectTimeInputUserOptionsClock.timepicker({clock12:false})
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

        expect(selectTimeInputUserOptionsClock.attr("value")).toEqual('21:15')
      })
    })
  })
})
