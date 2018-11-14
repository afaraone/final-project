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
    expect(wrapper.find('.todo').text()).toEqual('hello')
  });

  it('has an arrays of toDos', () => {
    const wrapper = shallow(<ToDoList />);
    wrapper.find('input').simulate('change', {
      target: { value: 'hello' }
    })
    wrapper.find('button').simulate('click');
    wrapper.find('input').simulate('change', {
      target: { value: 'hello3' }
    })
    wrapper.find('button').simulate('click');
    expect(wrapper.find('.todo').length).toEqual(2)
  })
});
