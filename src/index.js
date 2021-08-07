import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar'
import Posts from './components/posts/posts'
import Post from './components/posts/post'
import New from './components/posts/new'
import Login from './components/auth/login'
import Profile from './components/profile/profile'
import Update from './components/profile/update'
import Follows from './components/profile/follows';
import PrivateRoute from './components/common/PrivateRoute';
import { Provider } from 'react-redux'
import store from './store/store'
import './styles/global.css'
import './styles/sidebar.css'
import './styles/posts.css'
import './styles/post.css'
import './styles/profile.css'
import './styles/follow.css'
import './styles/editprof.css'

import reportWebVitals from './reportWebVitals';
import { loadUser } from './actions/auth';


store.dispatch(loadUser())


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="wrapper">
        <Sidebar/>
      </div>
      <div className="display">
        <Switch>
          <PrivateRoute exact path="/" component={Posts}/>
          <PrivateRoute exact path="/newpost" component={New}/>
          <PrivateRoute exact path="/comment/:post_id" component={New}/>
          <Route exact path="/global" component={Posts}/>
          <Route exact path="/post/:post_id" component={Post}/>
          <Route exact path="/profile/:user_id" component={Profile}/>
          <Route exact path="/following/:user_id" component={Follows}/>
          <Route exact path="/followers/:user_id" component={Follows}/>
          <Route exact path="/update_profile" component={Update}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </div>
      <div className="overlay"></div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
