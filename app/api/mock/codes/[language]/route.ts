/* eslint-disable no-useless-escape */
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const dummyCode = `{
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
            "id": "sample2",
            "createdAt": "2024-06-18T04:35:23.980Z",
            "updatedAt": "2024-06-18T04:35:23.980Z",
            "publishedAt": "2024-06-18T04:35:23.980Z",
            "revisedAt": "2024-06-18T04:35:23.980Z",
            "text": "import a\\n    import b"
        },
        {
            "id": "sample3",
            "createdAt": "2024-06-18T04:35:23.980Z",
            "updatedAt": "2024-06-18T04:35:23.980Z",
            "publishedAt": "2024-06-18T04:35:23.980Z",
            "revisedAt": "2024-06-18T04:35:23.980Z",
            "text": "import aaaaaaaaaa aaaaaaa aaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaa aaaaaaaaaaaaaaaaaaa\\n    import b"
        }
    ],
    "totalCount": 2,
    "offset": 0,
    "limit": 10
}`

const extractCodeFromText = (text: string): Code => {
    const lines = text.split('\n')
    return lines.map((line) => ({ id: uuidv4(), line }))
}

export const GET = (req: Request, { params }: { params: { language: string } }) => {
    try {
        if (params.language == null) {
            return new NextResponse('Bad Request', { status: 400 })
        }

        const res = JSON.parse(dummyCode) as { contents: MicroCMSContents[] }

        const contents = res.contents

        const codes = contents.map((content) => extractCodeFromText(content.text))

        return NextResponse.json({ codes })
    } catch (error) {
        console.log('CODE_GET', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
