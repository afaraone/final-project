import React, { Component } from 'react';
import { shallow, mount } from '../../setupTests';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

import User from '../../user'

describe('User', () => {
  let comp

  beforeEach(() => {
    comp = mount(<User />)
  })

  describe('when not logged in', () => {
    it('renders Login comp', () => {
      expect(comp.containsMatchingElement(GoogleLogin)).toEqual(true)
    })
  })

  describe('Authlogin', () => {
    it('sets post response to userDetails, and arg to session', () => {
      let mockFetch = spyOn(global, 'fetch')
      comp.instance().authLogin({profileObj: {}, accessToken: "mockAccessToken"})
      expect(mockFetch).toHaveBeenCalled()
    })
  })
})
