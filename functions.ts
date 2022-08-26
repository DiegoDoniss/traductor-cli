import {configSync} from "https://deno.land/std@0.153.0/dotenv/mod.ts";

export class Translate {
    private readonly headers: { [key: string]: string }
    private readonly base: string

    constructor() {
        const {XRapidAPIKey} = configSync()
        this.base = 'https://microsoft-translator-text.p.rapidapi.com'
        this.headers = {
            'X-RapidAPI-Key': XRapidAPIKey,
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
        }
    }

    async translateText(Text: string, to: string, from: string) {
        const method = 'POST';
        const body = JSON.stringify([{Text}])
        const options = {headers: {...this.headers, 'content-type': 'application/json'}, method, body}
        try {
            const response = await fetch(this.base + `/translate?to%5B0%5D=${to}&api-version=3.0&from=${from}&profanityAction=NoAction&textType=plain`, options)
            const json = await response.json()
            console.table(json[0].translations)
        } catch (error) {
            console.error(error.message)
        }
    }

    async getListOfLanguages() {
        const options = {
            headers: this.headers,
            method: 'GET'
        }
        try {
            const result = await fetch(this.base + '/languages?api-version=3.0', options)
            const json = await result.json()
            console.log(json)
        } catch (er) {
            console.error(er)
        }
    }

    async detect(Text: string) {
        const method = 'POST';
        const body = JSON.stringify([{Text}])
        const options = {headers: {...this.headers, 'content-type': 'application/json'}, method, body}
        try {
            const response = await fetch(this.base + '/Detect?api-version=3.0', options)
            const json = await response.json()
            console.table(json)
        } catch (error) {
            console.error(error.message)
        }
    }
}