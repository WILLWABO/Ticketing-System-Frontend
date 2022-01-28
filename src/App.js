import './App.css';

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'

import Home from './components/layouts/home'
import Login from './components/layouts/login'
import Register from './components/layouts/register'

import AdminRoutes from './components/admin/routes'
import TechnicienRoutes from './components/technicien/routes'
import UserRoutes from './components/user/routes'
import NotFound from './components/layouts/404'
import Unauthorized from './components/layouts/401'

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/unauthorized" component={Unauthorized} />
				
				<Route path="/admin" render={() => <AdminRoutes/>} />
				<Route path="/user" render={() => <UserRoutes/>} />
				<Route path="/technicien" render={() => <TechnicienRoutes/>} />
				<Route path="/page-not-found" component={NotFound} />
				
				<Route render={() => <Redirect to="/page-not-found" />} />
				
			</Switch>
		</BrowserRouter>
	);
}

export default App;
