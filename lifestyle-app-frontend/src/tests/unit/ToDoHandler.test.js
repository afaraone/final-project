import React, { Component } from 'react';
import { shallow, mount } from '../../setupTests';
import ToDoHandler from '../../ToDoHandler'
import FormHandler from '../../FormHandler'
import Garden from '../../Garden'
import Title from '../../Title'

let mockToDos = [{title: "mockTitle", body: "mockBody"}, {title: "mockTitle", body: "mockBody"}]
let userDetails = {name: "mockName", email: "mockEmail"}
let session = "mockSesssion"

describe('ToDoHandler', () => {
  let comp
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => mockToDos)
    comp = shallow(<ToDoHandler userDetails={userDetails} session={session} />)
  })

  it('loads all todos to list', () => {
    expect(comp.state('list')).toEqual(mockToDos)
    expect(comp.state('isLoaded')).toEqual(true)
  })

  describe('rendering', () => {
    it('renders FormHandler Title and Garden', () => {
      expect(comp.containsMatchingElement(FormHandler))
      expect(comp.containsMatchingElement(Title))
      expect(comp.containsMatchingElement(Garden))
    })
  })

  describe('callbacks', () => {
    it('Gardens deleteToDo calls DeleteToDo', () => {
      let mockDelete = spyOn(comp.instance(), 'deleteToDo')
      comp.find(Garden).prop('deleteToDo')()
      expect(mockDelete).toHaveBeenCalled()
    })

    it('Gardens updateToDo calls updateToDo', () => {
      let mockUpdate = spyOn(comp.instance(), 'updateToDo')
      comp.find(Garden).prop('updateToDo')()
      expect(mockUpdate).toHaveBeenCalled()
    })
  })

  describe('updateToDo', () => {
    it('calls fetch', () => {
      comp.instance().updateToDo('test')
      expect(fetch).toHaveBeenCalled()
    })
  })

  describe('deleteToDo', () => {
    it('calls fetch', () => {
      comp.instance().deleteToDo('test')
      expect(fetch).toHaveBeenCalled()
    })
  })

  describe('postToDo', () => {
    it('calls fetch', () => {
      comp.instance().postToDo('test')
      expect(fetch).toHaveBeenCalled()
    })
  })

  describe('postToCalendar', () => {
    it('calls fetch', () => {
      comp.instance().postToCalendar('test')
      expect(fetch).toHaveBeenCalled()
    })
  })
})
