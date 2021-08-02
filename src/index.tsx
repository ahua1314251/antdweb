import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { blankRoutes as routes  } from "./config/routes.config.tsx";
import CodeShow from "./pages/CodeShow"

import './index.css';
// import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter,Route,Switch } from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter>
<Switch>
          <Route exact path="/CodeShow.html" component={CodeShow}/>
          <Route path="/" component={App}/>
 </Switch>
    
  </BrowserRouter>
  ,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
