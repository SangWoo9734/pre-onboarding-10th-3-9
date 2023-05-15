import './style/App.css';

import Main from './pages/Main';
import { SearchContextProvider } from './context/SearchContext';

const App = () => {
  return (
    <SearchContextProvider>
      <Main />
    </SearchContextProvider>
  );
};

export default App;
