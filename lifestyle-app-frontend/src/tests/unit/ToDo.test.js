import React from 'react';
import { shallow, mount } from '../../setupTests';

import { SimpleToDo, TimedToDo } from '../../ToDo'

let mockProps = { title: 'mockTitle', body: 'mockBody', url: 'mockUrl', complete: false }
let mockProps2 = { title: 'mockTitle', body: 'mockBody', url: 'mockUrl', complete: true }

describe('SimpleToDo Unit Test', () => {
  let comp

  describe('when complete is false', () => {
    beforeEach(() => {
      comp = mount(<SimpleToDo data={mockProps} />)
    })
    it('renders title', () => {
      expect(comp.contains(<h1>mockTitle</h1>)).toEqual(true)
    })

    it('renders image sprout', () => {
      expect(comp.contains(<img className="images" src="sprout.png" alt="sprout"/>)).toEqual(true)
    })
  })

  describe('renders a flower', () => {
    beforeEach(() => {
      comp = mount(<SimpleToDo data={mockProps2} />)
    })

    it('renders a flower to signify completed ToDo', () => {
      expect(comp.contains(<img className="images" src="pink_flower.png" alt="pink_flower"/>)).toEqual(true)
    })
  })
})
