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

export const fetchCharactersBySearch = async (page: number, search: string) => {
    try {
        const response = await fetch(API + `character/?page=${page}&name=${search}`)
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e)
    }
}

export const fetchCharactersByFilters = async (page: number, filterType: string, filter: string) => {
    try {
        const request = API + `character/?page=${page}&${filterType}=${filter}`.toLowerCase()
        const response = await fetch(request)
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

export const fetchInstanceCharacters = async (characters: any[]) => {
    const arrayOfPromises = characters.map((character) => fetch(character))
    const res = []
    for await (let request of arrayOfPromises) {
        const data = await request.json()
        res.push(data)
    }
    return res
}

export const fetchInstances = async (instanceType: string) => {
    try {
        const response = await fetch(API + instanceType)
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e)
    }
}

export const fetchSelectedInstance = async (instance: number, instanceType: string) => {
    const requestUrl = instanceType === 'episodes' ? `episode/${instance}` : `location/${instance}`
    try {
        const response = await fetch(API + requestUrl)
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e)
    }
}
