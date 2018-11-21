import React from 'react';
import { shallow, mount } from '../../setupTests';

import { SimpleToDo, TimedToDo } from '../../ToDo'

let mockProps = {title: 'mockTitle', body: 'mockBody', url: 'mockUrl', complete: false}

describe('SimpleToDo Unit Test', () => {
  let comp
  beforeEach(() => {
    comp = mount(<SimpleToDo data={mockProps} />)
  })

  describe('when complete is false', () => {
    it('renders title', () => {
      expect(comp.contains(<h1>mockTitle</h1>)).toEqual(true)
    })
  })
})
