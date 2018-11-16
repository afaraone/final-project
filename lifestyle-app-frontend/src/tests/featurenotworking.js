// import React from 'react';
// import { shallow, mount } from './enzyme';
// import waitUntil from 'async-wait-until';
// import sinon from 'sinon'
// import nock from 'nock'
// import puppeteer from 'puppeteer'
//
//
// describe('Feature Test', () => {
//   let page
//   let browser
//
//   beforeAll(async () => {
//     browser = await puppeteer.launch()
//     page = await browser.newPage()
//     nock('http://localhost:3000/api')
//     .get('/to_dos')
//     .reply(200, JSON.stringify([{title: 'test', body: 'woop', complete: false}]))
//
//   });
//
//   test('renders page', async () => {
//     await page.goto('localhost:3001');
//     const peep = await page.$(".garden-div grid-container split right")
//     console.log(page)
//   })
//
//   afterAll(() => {
//     browser.close()
//   })
// })
