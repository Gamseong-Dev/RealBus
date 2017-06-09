import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';
import './index.css';




const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      {/* <MuiThemeProvider>
        <Provider store={store}> */}
          <Component/>
        {/* </Provider>
      </MuiThemeProvider> */}
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  });
}


// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
