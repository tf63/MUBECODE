import hljs from 'highlight.js/lib/core'
import go from 'highlight.js/lib/languages/go'
import python from 'highlight.js/lib/languages/python'
import typescript from 'highlight.js/lib/languages/typescript'
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('go', go)
hljs.registerLanguage('python', python)
// import 'highlight.js/styles/agate.css'
import 'highlight.js/styles/nord.css'
// import 'highlight.js/styles/tokyo-night-dark.css'
// import 'highlight.js/styles/monokai.css'
export default hljs
