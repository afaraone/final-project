import React from 'react';
import { shallow, mount } from '../../setupTests';

import { TimedToDo } from '../../ToDo'
var yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);


let onTimeProp = { title: 'mockTitle', body: 'mockBody', url: 'mockUrl', complete: false, start_time: yesterday, end_time: tomorrow }
let overdueProp = { title: 'mockTitle', body: 'mockBody', url: 'mockUrl', complete: true, start_time: yesterday, end_time: yesterday}
let mockDeleteClicked = jest.fn()
let mockCompleteClicked = jest.fn()

describe('When complete is true', () => {
  let comp
  beforeEach(() => {
  })

  it('renders a corpse to signify overdue ToDo', () => {
    comp = mount(<TimedToDo data={overdueProp} />)
    expect(comp.containsMatchingElement(<img src="dead.png"/>)).toEqual(true)
  })
})
