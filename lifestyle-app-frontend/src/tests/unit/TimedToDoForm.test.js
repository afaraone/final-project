import React, { Component } from 'react';
import { shallow, mount } from '../../setupTests';
import TimedToDoForm from '../../TimedToDoForm'

let mockToggleForm = jest.fn()
let mockAddClicked = jest.fn()

describe('timedTimedToDoForm', () => {
  let comp
  beforeEach(() => {
    comp = mount(<TimedToDoForm toggleForm={mockToggleForm} addClicked={mockAddClicked} />)
  })

  describe('input', () => {
    it('state.title changes when letters inputted in textbox', () => {
      comp.find('#timed-title-text-box').simulate('change', {target: {value: 'a'}})
      expect(comp.state('title')).toEqual('a')
    })

    it('state.body changes when letters inputted in textbox', () => {
      comp.find('#timed-body-text-box').simulate('change', {target: {value: 'a'}})
      expect(comp.state('body')).toEqual('a')
    })

    it('state.duration changes when intergers inputted in textbox', () => {
      comp.find('#timed-duration-text-box').simulate('change', {target: {value: '5'}})
      expect(comp.state('duration')).toEqual('5')
    })
  })

  describe('click submit', () => {
    beforeEach(() => {
      comp.find('#timed-title-text-box').simulate('change', {target: {value: 'hello'}})
      comp.find('#timed-body-text-box').simulate('change', {target: {value: 'goodbye'}})
      comp.find('#timed-submit').simulate('click')
    })

    it('resets state', () => {
      expect(comp.state('title')).toEqual('')
      expect(comp.state('body')).toEqual('')
      expect(comp.state('start_time')).toEqual('')
      expect(comp.state('duration')).toEqual('')
    })

    it('calls mockToggleForm', () => {
      expect(mockToggleForm).toHaveBeenCalled()
    })

    it('calls mockAddClicked', () => {
      expect(mockAddClicked).toHaveBeenCalled()
    })
  })
})
