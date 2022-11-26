// react imports
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// components
import Navbar from './components/navbar/Navbar';
import AddStudent from './pages/add-student/AddStudent';
import AdminCreate from './pages/admin-create/AdminCreate';
import Error from './pages/error/Error';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import ViewPost from './pages/view-post/ViewPost';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path={'/'} component={Home}/>
          <Route exact path={'/home'} component={Home}/>
          <Route path={'/login'} component={Login}/>
          <Route path={'/signup'} component={Signup}/>
          <Route path={'/create'} component={AdminCreate}/>
          <Route path={'/addstudent'} component={AddStudent}/>
          <Route path='/posts/:titleLink' component={ViewPost}/>
          <Route path={'*'} component={Error}/>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App
