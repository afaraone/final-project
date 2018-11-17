import React from 'react';
import { shallow, mount } from '../../setupTests';
import fetchMock from 'fetch-mock'

import ToDoForm from '../../todoform'
import Garden from '../../garden'
import ToDo from '../../todo'
import ToDoList from '../../todolist'
import {mockToDosJson} from '../helpers/mockedJson'

describe('ToDoList Unit Test', () => {
  let comp

  beforeAll(() => {
    let mockGet = fetchMock.get('/api/to_dos/', JSON.stringify(mockToDosJson))
  })

  beforeEach(() => {
    comp = shallow(<ToDoList />)
  })

  describe('before fetch', () => {
    it('state isLoaded is set to false', () => {
      expect(comp.state('isLoaded')).toEqual(false)
    })

    it('state list is set to null', () => {
      expect(comp.state('list')).toEqual(null)
    })

    it('renders Loading screen', () => {
      expect(comp.text()).toEqual('Loading')
    })
  })

  describe('after fetch', () => {
    it('gets ToDos and sets them to state.list', (done) => {
      expect(comp.state('list')).toEqual(null)
      process.nextTick(() => {
        expect(comp.state('list')).toEqual(mockToDosJson)
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

    it('renders one ToDoForm', (done) => {
      process.nextTick(() => {
        expect(comp.find(ToDoForm)).toHaveLength(1)
        done()
      })
    })

    it('addClicked fn passed as prop to ToDoForm', (done) => {
      process.nextTick(() => {
        let formProps = comp.find(ToDoForm).props()
        expect(formProps).toHaveProperty('addClicked')
        done()
      })
    })

    it('renders 2 ToDos', (done) => {
      process.nextTick(() => {
        expect(comp.find(ToDo)).toHaveLength(2)
        done()
      })
    })

    it('ToDo data props set to API data', (done) => {
      process.nextTick(() => {
        let toDoOne = comp.find(ToDo).at(0)
        let toDoTwo = comp.find(ToDo).at(1)
        expect(toDoOne.props().data).toEqual(comp.state('list')[0])
        expect(toDoTwo.props().data).toEqual(comp.state('list')[1])
        done()
      })
    })

    it('renders a Garden comp', (done) => {
      process.nextTick(() => {
        expect(comp.find(Garden)).toHaveLength(1)
        done()
      })
    })

    it('passes list as props for Garden', (done) => {
      process.nextTick(() => {
        let gardenProps = comp.find(Garden).props()
        expect(gardenProps.list).toEqual(comp.state('list'))
        done()
      })
    })
  })
});
