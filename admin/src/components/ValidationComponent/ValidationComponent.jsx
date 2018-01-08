import React, { Component } from 'react';
import { compose, mapProps, withState } from 'recompose'
const R = require('ramda');

const makePredicate = ([predFn, e]) => a => {
  console.log(e)
  console.log(a)
  console.log(predFn)
  console.log("MAKE PREDICATE_________")
  return predFn(a) ? null : e
}
const makePredicates = validations => R.map((item) => makePredicate(item), validations)

const runPredicates = ([k,l]) => R.map((predFn) => predFn(k) , makePredicates(l))
const validate = (data) => R.map(item => runPredicates(item),data)
const makeValidationObject = R.mergeWithKey((k, l, r) => {
  console.log(k)
  console.log(l)
  console.log(r)
  return [l, r]
})
const getErrors = R.compose(validate, makeValidationObject)

var ErrorComponent = (props) => {
  const errors = R.map(item=>{
    if(item != null){
      return (<p>{item}</p>);
    }
  },props)
  return (<div>
    {errors}
  </div>)
}

var checkAvailable = (props) => {
  const error = props.filter( item => item != null)
  return error.length == 0
}

export const HocValidate = (initialState, validationRules) => compose(
  withState('state', 'updateState', R.assoc('errors', {}, initialState)),
  mapProps(({ updateState, state, ...rest }) => ({
    onChange: (event, state) => { 
      console.log(state);
      console.log("-------------------");
      var name = event.target.name;
      var value = event.target.value;
      updateState(state => {
        var newState = R.assocPath(['form', name], value, state)
        console.log(newState)
        console.log("-------------------");
        const errorsCheck = getErrors(R.prop('form', newState), validationRules)
        const errors = R.map(ErrorComponent, errorsCheck)
        const new2 = R.map(checkAvailable, errorsCheck)
        const isAvailable = Object.values(new2).filter(item=>item !== true).length === 0
        newState = R.assoc('isAvailable', isAvailable, newState)
        return R.assoc('errors', errors, newState)
      });
    },
    onSelectMultiple: (value, name) => {
      updateState(state => {
        var newState = R.assocPath(['form', name], value, state)
        const errorsCheck = getErrors(R.prop('form', newState), validationRules)
        const errors = R.map(ErrorComponent, errorsCheck)
        const new2 = R.map(checkAvailable, errorsCheck)
        const isAvailable = Object.values(new2).filter(item=>item !== true).length === 0
        newState = R.assoc('isAvailable', isAvailable, newState)
        return R.assoc('errors', errors, newState)
        return newState
      });
    },
    initState: (initializeState) => {
      console.log("__________ INIT STATE ________________")
      console.log(initializeState)
      console.log(state)
      console.log("_____________________________________")
      updateState(state => {
        var newState = R.assoc('form',initializeState, state)
        return newState
      });
    },
    isAvailable: state.isAvailable,
    errors: state.errors,
    form: state.form,
    ...rest,
  }))
)