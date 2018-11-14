import React from 'react';
import { shallow } from './enzyme';

import ToDoList from '../todolist'

var nock = require('nock')

describe('ToDoList', () => {

  beforeEach(() => {
    var getToDos = nock('http://localhost:3000')
    .get('/to_dos/')
    .reply(200,
      [{ "id": 1,
         "garden_id": null,
         "title": "hello",
         "body": "test",
         "created_at": "2018-11-13T12:36:33.758Z",
         "updated_at": "2018-11-13T12:36:33.758Z" }]
    )
  })

  it('creates todo', () => {
    const wrapper = shallow(<ToDoList />);
    console.log(wrapper.debug())
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
