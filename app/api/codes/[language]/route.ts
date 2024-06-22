/* eslint-disable no-useless-escape */
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

import { client } from '@/lib/microcms'

type MicroCMSContents = {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    text: string
}

const extractCodeFromText = (text: string): Code => {
    const lines = text.split('\n')
    return lines.map((line) => ({ id: uuidv4(), line }))
}

export const GET = async (req: Request, { params }: { params: { language: string } }) => {
    try {
        if (params.language == null) {
            return new NextResponse('Bad Request', { status: 400 })
        }

        const res = await client.getList<MicroCMSContents>({
            endpoint: 'codes',
            queries: { limit: 30, filters: `language[contains]${params.language}` },
        })

        const contents = res.contents

        const codes = contents.map((content) => extractCodeFromText(content.text))

        return NextResponse.json({ codes })
    } catch (error) {
        console.log('CODE_GET', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
