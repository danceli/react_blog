import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '@/views/Layout'
// import Route from '@/components/PrivateRoute'
export default () => {
  return (
    <Router>
      <Switch>
          <Route path="/" component={Layout}></Route>
      </Switch>
    </Router>
  )
}