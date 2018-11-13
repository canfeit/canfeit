/**
 * @name test.js
 * @file test&example
 */

import test from 'ava'

const { isFilled, isFree, complexType, compact } = require('../canfei')
const arr = [1, 0, '', 8]

test(`compact([1, 0, '', 8])`, async t => {
  t.deepEqual(compact(arr), [1, 8])
})

// Number.isNaN(NaN)
// typeof undefined === 'undefined'
test(`complexType(undefined)`, async t => {
  t.is(complexType(undefined), 'Undefined')
})

// null === null
test(`complexType(null)`, async t => {
  t.is(complexType(null), 'Null')
})

// Array.isArray([])
test(`complexType([])`, async t => {
  t.is(complexType([]), 'Array')
})

// typeof '' === 'string'
test(`complexType('')`, async t => {
  t.is(complexType(''), 'String')
})

// typeof 1 === 'number'
test(`complexType(1)`, async t => {
  t.is(complexType(1), 'Number')
})

// typeof true === 'boolean'
test(`complexType(true)`, async t => {
  t.is(complexType(true), 'Boolean')
})

// typeof function () {} === 'function'
test(`complexType(function () {})`, async t => {
  t.is(complexType(function () { }), 'Function')
})

test(`complexType({})`, async t => {
  t.is(complexType({}), 'Object')
})

test(`complexType(new Date())`, async t => {
  t.is(complexType(new Date()), 'Date')
})

test(`complexType(/./)`, async t => {
  t.is(complexType(/./), 'RegExp')
})

test(`isFree(undefined)`, async t => {
  t.true(isFree(undefined))
})

test(`isFree({})`, async t => {
  t.true(isFree({}))
})

test(`isFree([])`, async t => {
  t.true(isFree([]))
})

test(`isFree(0)`, async t => {
  t.true(isFree(0))
})

test(`isFilled([0,1])`, async t => {
  t.is(isFilled([0, 1]), 2)
})

test(`isFilled({k:1})`, async t => {
  t.true(isFilled({ K: 1 }))
})

test(`isFilled({})`, async t => {
  t.false(isFilled({}))
})
