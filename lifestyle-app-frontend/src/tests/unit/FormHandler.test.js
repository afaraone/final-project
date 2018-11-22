import React from 'react';
import { shallow, mount } from '../../setupTests';

import { FormHandler, FormButton } from '../../FormHandler'
import TimedToDoForm from '../../TimedToDoForm'
import ToDoForm from '../../todoform'

let mockPostToDo = jest.fn()


describe('FormHandler', () => {
  let comp
  let spyToggleForm

  beforeEach(() => {
    comp = mount(<FormHandler postToDo={mockPostToDo} />)
  })

  describe('before button clicked', () => {
    it('renders FormButton', () => {
      expect(comp.containsMatchingElement(<FormButton/>)).toEqual(true)
    })

    it('Formbutton hidebutton calls spy', () => {
      spyToggleForm = spyOn(comp.instance(), 'toggleForm')
      comp.find(FormButton).prop('toggleForm')()
      expect(spyToggleForm).toHaveBeenCalled()
    })
  })

  describe('after button clicked', () => {
    beforeEach(() => {
      comp.find(FormButton).find('button').simulate('click')
      spyToggleForm = spyOn(comp.instance(), 'toggleForm')
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
      comp.find(TimedToDoForm).prop('toggleForm')()
      expect(spyToggleForm).toHaveBeenCalled()
    })

    it('ToDoForm hidebutton fn calls spy', () => {
      comp.find(ToDoForm).prop('toggleForm')()
      expect(spyToggleForm).toHaveBeenCalled()
    })
  })
})


let mockToggleForm = jest.fn()

describe('FormButton', () => {
  let comp

  beforeEach(() => {
    comp = mount(<FormButton toggleForm={mockToggleForm} />)
  })

  it('calls mockHideButton when clicked', () => {
    comp.find('button').simulate('click')
    expect(mockToggleForm).toHaveBeenCalled()
  })
})
