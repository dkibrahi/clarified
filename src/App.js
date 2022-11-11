// react imports
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CreatePost from './components/create-post/CreatePost';

// components
import Navbar from './components/navbar/Navbar';
import SinglePost from './components/single-post/SinglePost';
import AddStudent from './pages/add-student/AddStudent';
import Error from './pages/error/Error';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
// import Signup from './pages/signup/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path={'/'} component={Login}/>
          <Route path={'/login'} component={Login}/>
          <Route exact path={'/home'} component={Home}/>
          <Route path={'/create'} component={CreatePost}/>
          <Route path={'/addstudent'} component={AddStudent}/>
          <Route path='/posts/:id' component={SinglePost}/>
          <Route path={'*'} component={Error}/>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App
