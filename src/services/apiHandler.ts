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

export const fetchEpisodes = async () => {
    try {
        const response = await fetch(API + `episode`)
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e)
    }
}
export const fetchSelectedEpisode = async (episode: number) => {
    try {
        const response = await fetch(API + `episode/${episode}`)
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e)
    }
}

export const fetchEpisodeCharacters = async (characters: any[]) => {
    const arrayOfPromises = characters.map((character) => fetch(character))
    const res = []
    for await (let request of arrayOfPromises) {
        const data = await request.json()
        res.push(data)
    }
    return res
}

export const charactersFilterSearch = async (filterType: string, filter: string) => {
    try {
        const request = API + `character/?${filterType}=${filter}`.toLowerCase()
        const response = await fetch(request)
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e)
    }
}

export const fetchLocations = async() => {
    try {
        const response = await fetch(API + 'location')
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e)
    }
}

export const fetchSelectedLocation = async (locationId: number) => {
    try {
        const response = await fetch(API + `location/${locationId}`)
        const data = response.json()
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
