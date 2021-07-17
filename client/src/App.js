import ApiProvider from './contexts/ApiContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// custom components
import Header from './components/Header'
import Home from './components/Home'
import JobDetails from './components/JobDetails'
import PageNotFound from './components/PageNotFound'

export default function App() {
  return (
    <>
      <ApiProvider>
        	<Router>
            <Header />
        		<Switch>
        			<Route path="/" exact component={Home} />
        			<Route path="/job-details/:_id" component={JobDetails} />
        			<Route default component={PageNotFound} />
        		</Switch>
        	</Router>
      </ApiProvider>
    </>
  );
}

