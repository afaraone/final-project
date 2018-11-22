import React, { Component } from 'react';
import { shallow, mount } from '../../setupTests';

import Garden from '../../Garden';
import { SimpleToDo, TimedToDo } from '../../ToDo.js'

let list = [{id: 1, type: "SimpleToDo" },
{id: 2, type: "TimedToDo" },
{id: 3, type: "TimedToDo" }]

let mockUpdate = jest.fn()
let mockDelete = jest.fn()


describe('Garden', () => {
  let comp
  let todos
  beforeEach(() => {
    comp = shallow(<Garden list={list} updateToDo={mockUpdate} deleteToDo={mockDelete} />)
    todos = comp.children()
  })

  it('renders one SimpleTodo', () => {
    expect(todos.find(SimpleToDo).length).toEqual(1)
  })

  it('renders two TimedToDos', () => {
    expect(todos.find(TimedToDo).length).toEqual(2)
  })

  it('sets completeClicked fn prop for child todos', () => {
    expect(todos.find(SimpleToDo).prop('completeClicked')).toBeTruthy
    todos.find(TimedToDo).forEach((childComponent) => { expect(childComponent.prop('completeClicked')).toBeTruthy })
  })

  it('sets deleteClicked fn prop for child todos', () => {
    expect(todos.find(SimpleToDo).prop('deleteClicked')).toBeTruthy
    todos.find(TimedToDo).forEach((childComponent) => { expect(childComponent.prop('deleteClicked')).toBeTruthy })
  })

  it('completeClicked fn prop for child calls prop updateToDo', () => {
    todos.find(SimpleToDo).prop('completeClicked')()
    expect(mockUpdate).toHaveBeenCalled
    todos.find(TimedToDo).forEach((childComponent) => {
      childComponent.prop('completeClicked')()
      expect(mockUpdate).toHaveBeenCalled
    })
  })


  it('deleteClicked fn prop for child calls prop deleteToDo', () => {
    todos.find(SimpleToDo).prop('deleteClicked')()
    expect(mockDelete).toHaveBeenCalled
    todos.find(TimedToDo).forEach((childComponent) => {
      childComponent.prop('deleteClicked')()
      expect(mockDelete).toHaveBeenCalled
    })
  })
})
