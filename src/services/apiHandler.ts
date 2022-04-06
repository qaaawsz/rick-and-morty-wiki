const API = 'https://rickandmortyapi.com/api/'

export const fetchPaginatedCharacters = async (page: number, search?: string, filterType?: string, filter?: string) => {
    try {
        let url

        if (filterType && filter) url = `character/?page=${page}&${filterType}=${filter}`.toLowerCase()
        else if (search) url = `character/?page=${page}&name=${search}`.toLowerCase()
        else url = `character/?page=${page}`
        const response = await fetch(API + url)
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()

        return data
    } catch (e) {
        console.log(e)
    }
}

export const setTotalCount = async (instanceType: string, setFn: Function) => {
    const response = await fetchInstances(instanceType)
    setFn(response.info.count)
}

export const fetchFirstSeenIn = async (request: string) => {
    try {
        const response = await fetch(request)
        if (!response.ok) throw new Error(response.statusText)
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
