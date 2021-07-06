import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import MarketList from '../components/user/MarketList'
import ToDo from '../components/user/ToDo'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Route path='/itens' component={MarketList} />
        <Route path='/do' component={ToDo} />
        <Redirect from='*' to='/' />  {/* Caso receba alguma URL diferente, ele vai para a pagina home */}    
    </Switch>