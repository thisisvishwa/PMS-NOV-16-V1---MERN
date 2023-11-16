```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UsersManagementPage from './components/UsersManagementPage';
import PasswordsManagementPage from './components/PasswordsManagementPage';
import MFASettingsPage from './components/MFASettingsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/users" component={UsersManagementPage} />
        <Route path="/passwords" component={PasswordsManagementPage} />
        <Route path="/mfa" component={MFASettingsPage} />
      </Switch>
    </Router>
  );
}

export default App;
```