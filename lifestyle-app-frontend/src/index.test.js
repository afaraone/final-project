import React from 'react';
import { shallow } from './enzyme';

import ToDoList from './todolist'

describe('ToDoList', () => {

  it('creates todo', () => {
    const wrapper = shallow(<ToDoList />);
    wrapper.find('input').simulate('change', {
      target: { value: 'hello' }
    })
    wrapper.find('button').simulate('click');
    // Expect the wrapper object to be defined
    expect(wrapper.find('.todo').text()).toEqual('hello')
  });

});
