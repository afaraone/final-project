import React from 'react';
import { shallow, mount } from '../../setupTests';

import { TimedToDo } from '../../ToDo'
var yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);


let onTimeProp = { title: 'mockTitle', body: 'mockBody', url: 'mockUrl', complete: false, start_time: yesterday, end_time: tomorrow }
let overdueProp = { title: 'mockTitle', body: 'mockBody', url: 'mockUrl', complete: false, start_time: yesterday, end_time: yesterday}
let mockDeleteClicked = jest.fn()
let mockCompleteClicked = jest.fn()

describe('When complete is true', () => {
  let comp
  describe('picture rendering', () => {
    it('renders a corpse to signify overdue ToDo', () => {
      comp = mount(<TimedToDo data={overdueProp} />)
      expect(comp.containsMatchingElement(<img src="dead.png"/>)).toEqual(true)
    })

    it('renders sprout if not complete', () => {
      comp = mount(<TimedToDo data={onTimeProp} />)
      expect(comp.containsMatchingElement(<img src="sprout.png"/>)).toEqual(true)
    })

    // it('renders flower if complete', () => {
    //   comp = mount(<TimedToDo data={onTimeProp} />)
    //   comp.find('.grid-item').simulate('click')
    //   comp.find('.complete-button').simulate('click')
    //   expect(comp.containsMatchingElement(<img src="pink_flower.png"/>)).toEqual(true)
    // })
  })
})
