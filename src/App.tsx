import './App.css'
import GeneralRouter from './routes/root'
import { Provider } from 'react-redux'
import { store } from './store'

function App() {

  return (
    <Provider store={store}>
      <GeneralRouter />
    </Provider>
  )
}

export default App
