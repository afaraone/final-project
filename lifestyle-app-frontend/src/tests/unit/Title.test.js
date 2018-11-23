import React, { Component } from 'react';
import Title from '../../Title'
import { shallow, mount } from '../../setupTests';

describe('Title', () => {
  it('renders title', () => {
    let comp = mount(<Title />)
    expect(comp.text()).toEqual('Grow')
  })
})
