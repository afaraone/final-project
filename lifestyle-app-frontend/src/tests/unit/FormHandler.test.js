import React from 'react';
import { shallow, mount } from '../../setupTests';

import { FormHandler, FormButton } from '../../FormHandler'
import TimedToDoForm from '../../TimedToDoForm'
import ToDoForm from '../../todoform'

let mockPostToDo = jest.fn()

describe('FormHandler', () => {
  let comp

  beforeEach(() => {
    comp = mount(<FormHandler postToDo={mockPostToDo}/>)
  })

  describe('before button clicked', () => {
    it('renders FormButton', () => {
      expect(comp.containsMatchingElement(<FormButton/>)).toEqual(true)
    })
  })
})
