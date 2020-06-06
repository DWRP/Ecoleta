import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Pages/Home'
import Bases from './Pages/Bases'
import End from './Pages/End'

const Routes = () => {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/bases" component={Bases}/>
            <Route path="/end" component={End}/>
        </Switch>
    </BrowserRouter>
  )
}

export default Routes;
