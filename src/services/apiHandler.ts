const API = 'https://rickandmortyapi.com/api/'

export const fetchCharacters = async (pageNumber: number) => {
    try {
        const response = await fetch(API + `character/?page=${pageNumber}`)
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e)
    }
}

export const fetchFirstSeenIn = async (request: string) => {
    try {
        const response = await fetch(request)
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e)
    }
}

export const searchByName = async (name: string) => {
    try {
        const response = await fetch(API + `character/?name=${name}`)
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e)
    }
}


/*
const errorsHandler = (response: any) => {
    if (!response.ok) throw Error(response.statusText)
    return response
}
 */
