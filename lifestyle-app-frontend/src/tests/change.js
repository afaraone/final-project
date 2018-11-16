import React from 'react';
<<<<<<< HEAD
import { shallow, mount } from './enzyme';
import waitUntil from 'async-wait-until';
import sinon from 'sinon'
=======
import { shallow } from './enzyme';

>>>>>>> master
import ToDoList from '../todolist'
import ToDoForm from '../todoform'

describe('ToDoList', () => {

<<<<<<< HEAD
it('renders 1 <ToDoList /> component', () => {
  const component = shallow(<ToDoList />);
  expect(component).toHaveLength(1);
});

it('renders 1 <ToDoList /> component', async () => {
  const component = await mount(<ToDoList />);
  const button = await component.find('button');
  const titleInput = await component.find('.title-input');
  titleInput.simulate('change', {
    target: {value: 'hello'}
  });
  component.find('.body-input').simulate('change', {
    target: {value: 'say hi'}
=======
  it('creates todo', () => {
    const wrapper = shallow(<ToDoList />);
    console.log(wrapper.debug())
    wrapper.find('input').simulate('change', {
      target: { value: 'hello' }
    })
    wrapper.find('button').simulate('click');

>>>>>>> master
  });
  button.simulate('click');
  expect(component.state().list).toHaveLength(1);
});

  // it('calls componentDidMount', async () => {
  //   sinon.spy(ToDoList.prototype, 'componentDidMount');
  //   const wrapper = await mount(<ToDoList />);
  //   expect(ToDoList.prototype.componentDidMount).to.have.property('callCount', 1);
  // });


  // it('creates todo', () => {
  //   const wrapper = mount(<ToDoList />);
  //   wrapper.find('input').simulate('change', {
  //     target: { value: 'hello' }
  //   })
  //   wrapper.find('')
  //   wrapper.find('button').simulate('click');
  //   expect(wrapper.find('.todo').text()).toEqual('hello')
  // });
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
