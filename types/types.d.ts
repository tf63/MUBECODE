type Theme = 'default' | 'dracula' | 'sunset' | 'dim'

type Line = {
    id: string
    line: string
}

type Code = Line[]

type MicroCMSContents = {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    text: string
}
