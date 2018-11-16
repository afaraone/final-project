import React from 'react';
import { shallow, mount } from './enzyme';
import fetchMock from 'fetch-mock'
import ToDoList from '../todolist'

let mockToDos = [{ id: 1, title: 'mockTitle', body: 'mockBody' }]
fetchMock.get('*', JSON.stringify(mockToDos))

describe('ToDoList', () => {
  let comp

  beforeEach(() => {
    comp = shallow(<ToDoList />)
  })

  describe('on Mount', () => {
    it('gets ToDos and sets them to state.list', (done) => {
      expect(comp.state('list')).toEqual(null)
      process.nextTick(() => {
        expect(comp.state('list')).toEqual(mockToDos)
        done()
      })
    });

    it('sets isLoaded to true', (done) => {
      expect(comp.state('isLoaded')).toEqual(false)
      process.nextTick(() => {
        expect(comp.state('isLoaded')).toEqual(true)
        done()
      })
    })
  })
});
