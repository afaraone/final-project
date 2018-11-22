import React, { Component } from 'react';
import { shallow, mount } from '../../setupTests';
import ToDoForm from '../../todoform'

let mockShowButton = jest.fn()
let mockAddClicked = jest.fn()

describe('SimpleToDoForm', () => {
  let comp
  beforeEach(() => {
    comp = mount(<ToDoForm showButton={mockShowButton} addClicked={mockAddClicked} />)
  })

  describe('input', () => {
    it('state.title changes when letters inputted in textbox', () => {
      comp.find('#simple-title-text-box').simulate('change', {target: {value: 'a'}})
      expect(comp.state('title')).toEqual('a')
    })

    it('state.body changes when letters inputted in textbox', () => {
      comp.find('#simple-body-text-box').simulate('change', {target: {value: 'a'}})
      expect(comp.state('body')).toEqual('a')
    })
  })

  describe('click submit', () => {
    beforeEach(() => {
      comp.find('#simple-title-text-box').simulate('change', {target: {value: 'hello'}})
      comp.find('#simple-body-text-box').simulate('change', {target: {value: 'goodbye'}})
      comp.find('#simple-submit').simulate('click')
    })

    it('resets state', () => {
      expect(comp.state('title')).toEqual('')
      expect(comp.state('body')).toEqual('')
    })

    it('calls mockShowButton', () => {
      expect(mockShowButton).toHaveBeenCalled()
    })

    it('calls mockAddClicked', () => {
      expect(mockAddClicked).toHaveBeenCalled()
    })
  })
})
