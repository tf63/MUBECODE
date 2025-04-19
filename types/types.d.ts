type Theme = 'default' | 'dracula' | 'sunset' | 'dim'
type Language = 'typescript' | 'go' | 'python' | 'ruby'

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
