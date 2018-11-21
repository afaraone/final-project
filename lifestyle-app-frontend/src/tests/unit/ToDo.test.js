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
      expect(comp.containsMatchingElement(<img src="sprout.png" />)).toEqual(true)
    })
  })

  describe('When complete is true', () => {
    beforeEach(() => {
      comp = mount(<SimpleToDo data={mockProps2} />)
    })

    it('renders a flower to signify completed ToDo', () => {
      expect(comp.containsMatchingElement(<img src="pink_flower.png"/>)).toEqual(true)
    })
  })

  describe('When clicked on, renders body', () => {
    beforeEach(() => {
      comp = mount(<SimpleToDo data={mockProps} />)
      comp.find('.grid-item').simulate('click')
    })
    it('Renders body', () => {
      expect(comp.contains(<h2>mockBody</h2>)).toEqual(true)
    })
    it('Renders delete button', () => {
      expect(comp.containsMatchingElement(<button>Delete</button>)).toEqual(true)
    })
  })
})
