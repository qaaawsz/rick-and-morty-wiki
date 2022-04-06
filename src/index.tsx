import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './css/index.css'
import './css/fonts.css'
import './css/commonStyles.css'
import './css/themes.css'
import ThemeContextWrapper from './context/ThemeContext'

ReactDOM.render(
    <React.StrictMode>
        <ThemeContextWrapper>
            <App/>
        </ThemeContextWrapper>
    </React.StrictMode>,
    document.getElementById('root')
)
