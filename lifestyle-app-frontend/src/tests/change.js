import React from 'react';
import { shallow } from './enzyme';
import waitUntil from 'async-wait-until';

import ToDoList from '../todolist'

var nock = require('nock')

describe('ToDoList', () => {

  it('creates todo', () => {
    const wrapper = shallow(<ToDoList />);
    console.log(wrapper.debug())
    wrapper.find('input').simulate('change', {
      target: { value: 'hello' }
    })
    wrapper.find('button').simulate('click');
    
  });
//
//   it('has an arrays of toDos',  () => {
//     fetch.mockResponse(JSON.stringify([{ "id": 1,
//        "garden_id": null,
//        "title": "hello",
//        "body": "test",
//        "created_at": "2018-11-13T12:36:33.758Z",
//        "updated_at": "2018-11-13T12:36:33.758Z" }]))
//     const wrapper = shallow(<ToDoList />);
//     waitUntil(() => {
//       wrapper.state !== null
//     })
//     console.log(wrapper.instance())
//     // expect(await wrapper.instance().componentDidMount())
//     // .toBe.fulfilled;
//     // expect(getToDos).toBe.fulfilled
//     // wrapper.find('input').simulate('change', {
//     //   target: { value: 'hello' }
//     // })
//     // wrapper.find('button').simulate('click');
//     // wrapper.find('input').simulate('change', {
//     //   target: { value: 'hello3' }
//     // })
//     // wrapper.find('button').simulate('click');
//     // expect(wrapper.find('.todo').length).toEqual(2)
//   })
});
