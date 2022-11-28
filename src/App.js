// react imports
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

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
  const { authIsReady, user, isAdmin } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path={'/'}>
            {!user && <Redirect to="/login"/>}
            {user && <Home />}
          </Route>
          <Route path={'/login'}>
            {user && <Redirect to="/"/>}
            {!user && <Login />}
          </Route>
          <Route path={'/signup'}>
            {user && <Redirect to="/"/>}
            {!user && <Signup />}
          </Route>
          <Route path={'/create'}>
            {(!user || !isAdmin) && <Redirect to="/"/>}
            {user && <AdminCreate />}
          </Route>
          <Route path={'/addstudent'}>
            {(!user || !isAdmin) && <Redirect to="/"/>}
            {user && <AddStudent />}
          </Route>
          <Route path='/posts/:titleLink'>
            {!user && <Redirect to="/login"/>}
            {user && <ViewPost />}
          </Route>
          <Route path={'*'} component={Error}/>
        </Switch>
      </BrowserRouter>
      )}
    </div>
  );
}

export default App
