import { createClient } from 'microcms-js-sdk'

export const client = createClient({
    serviceDomain: process.env.MICROCMS_API_DOMAIN ?? '',
    apiKey: process.env.MICROCMS_API_KEY ?? '',
})

export const dummyCode = `{
    "contents": [
        {
            "id": "sample1",
            "createdAt": "2024-06-18T04:35:23.980Z",
            "updatedAt": "2024-06-18T04:35:23.980Z",
            "publishedAt": "2024-06-18T04:35:23.980Z",
            "revisedAt": "2024-06-18T04:35:23.980Z",
            "text": "aaaaaaaaaa\\n    bbbbbbbbbbb"
        },
        {
            "id": "sample1",
            "createdAt": "2024-06-18T04:35:23.980Z",
            "updatedAt": "2024-06-18T04:35:23.980Z",
            "publishedAt": "2024-06-18T04:35:23.980Z",
            "revisedAt": "2024-06-18T04:35:23.980Z",
            "text": "import a\\n    import b"
        }
    ],
    "totalCount": 2,
    "offset": 0,
    "limit": 10
}`
