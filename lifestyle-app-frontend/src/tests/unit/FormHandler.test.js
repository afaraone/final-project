import React from 'react';
import { shallow, mount } from '../../setupTests';

import { FormHandler, FormButton } from '../../FormHandler'
import TimedToDoForm from '../../TimedToDoForm'
import ToDoForm from '../../todoform'

let mockPostToDo = jest.fn()


describe('FormHandler', () => {
  let comp
  let spyHideButton
  let spyShowButton

  beforeEach(() => {
    comp = mount(<FormHandler postToDo={mockPostToDo} />)
  })

  describe('before button clicked', () => {
    it('renders FormButton', () => {
      expect(comp.containsMatchingElement(<FormButton/>)).toEqual(true)
    })

    it('Formbutton hidebutton calls spy', () => {
      spyHideButton = spyOn(comp.instance(), 'hideButton')
      comp.find(FormButton).prop('hideButton')()
      expect(spyHideButton).toHaveBeenCalled()
    })
  })

  describe('after button clicked', () => {
    beforeEach(() => {
      comp.find(FormButton).find('button').simulate('click')
      spyShowButton = spyOn(comp.instance(), 'showButton')
    })

    it('renders TimedtoDo and ToDoForm', () => {
      expect(comp.containsMatchingElement(<ToDoForm/>)).toEqual(true)
      expect(comp.containsMatchingElement(<TimedToDoForm/>)).toEqual(true)
    })

    it('TimedToDoForm addClicked function calls mockPostToDo', () => {
      comp.find(TimedToDoForm).prop('addClicked')()
      expect(mockPostToDo).toHaveBeenCalled()
    })

    it('ToDoForm addClicked function calls mockPostToDo', () => {
      comp.find(ToDoForm).prop('addClicked')()
      expect(mockPostToDo).toHaveBeenCalled()
    })

    it('TimedToDoForm hidebutton fn calls spy', () => {
      comp.find(TimedToDoForm).prop('showButton')()
      expect(spyShowButton).toHaveBeenCalled()
    })

    it('ToDoForm hidebutton fn calls spy', () => {
      comp.find(ToDoForm).prop('showButton')()
      expect(spyShowButton).toHaveBeenCalled()
    })
  })
})


let mockHideButton = jest.fn()

describe('FormButton', () => {
  let comp

  beforeEach(() => {
    comp = mount(<FormButton hideButton={mockHideButton} />)
  })

  it('calls mockHideButton when clicked', () => {
    comp.find('button').simulate('click')
    expect(mockHideButton).toHaveBeenCalled()
  })
})
