/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

import { Provider } from 'react-redux'
import './App.css'
import Checkout from './JS/Checkout'
import { store } from "./store/index";
// import Checkout from './TS/Checkout';

function AppContent() {
    return (
        <div className="App">
            <Checkout />
        </div>
    )
}

const App = ()=>{
    return(
        <Provider store={store}>
        <AppContent/>
    </Provider>
    )
    
}
export default App
