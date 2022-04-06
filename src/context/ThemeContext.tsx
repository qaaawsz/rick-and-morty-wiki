import {createContext, useState} from 'react'

export const themes = {
    dark: 'dark',
    light: 'light',
}

export const ThemeContext = createContext({
    theme: themes.dark,
    changeTheme: (theme: any) => {
    },
})

const ThemeContextWrapper = (props: any) => {
    const [theme, setTheme] = useState(themes.light)

    const changeTheme = (theme: any) => {
        setTheme(theme)
    }

    return (
        <ThemeContext.Provider value={{theme: theme, changeTheme: changeTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextWrapper
