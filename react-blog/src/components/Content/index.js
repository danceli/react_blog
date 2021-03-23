import React from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import routerList from '@/config/routerList.js'

import './index.css'
class Content extends React.Component {
  render() {
    // console.log(this.props)
    return (
      <section id="section">
        <Switch>
            {routerList.map(route => (<Route key={route.path} path={route.path} component={route.component}></Route>))}
            <Redirect exact from="/" to="/home" />
        </Switch>
      </section>
    )
  }
}

export default withRouter(Content);