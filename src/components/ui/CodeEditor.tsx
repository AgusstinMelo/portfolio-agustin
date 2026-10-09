import { useState } from 'react'
import { WindowFrame } from './WindowFrame'

type EditorTab = 'profile.ts' | 'now.md'

const profileLines = [
  <><span className="syntax-keyword">type</span> <span className="syntax-type">Developer</span> = {'{'}</>,
  <>  role: <span className="syntax-type">string</span>;</>,
  <>  interests: <span className="syntax-type">string</span>[];</>,
  <>  projects: <span className="syntax-type">string</span>[];</>,
  <>  currently: <span className="syntax-type">string</span>;</>,
  <>{'};'}</>,
  <></>,
  <><span className="syntax-keyword">const</span> <span className="syntax-variable">agustin</span>: <span className="syntax-type">Developer</span> = {'{'}</>,
  <>  role: <span className="syntax-string">'Software Developer'</span>,</>,
  <>  interests: [</>,
  <>    <span className="syntax-string">'Web Development'</span>,</>,
  <>    <span className="syntax-string">'Gaming'</span>,</>,
  <>    <span className="syntax-string">'Technology'</span>,</>,
  <>  ],</>,
  <>  projects: [<span className="syntax-string">'Rift Deck'</span>, <span className="syntax-string">'MyFinteem'</span>],</>,
  <>  currently: <span className="syntax-string">'Building new things'</span>,</>,
  <>{'};'}</>,
]

const nowLines = [
  <><span className="syntax-comment"># En este momento</span></>,
  <></>,
  <>Construyendo productos digitales</>,
  <>con atención a la lógica, la interfaz</>,
  <>y la experiencia de uso.</>,
  <></>,
  <><span className="syntax-comment">// aprender · iterar · resolver</span></>,
]

export function CodeEditor() {
  const [activeTab, setActiveTab] = useState<EditorTab>('profile.ts')
  const lines = activeTab === 'profile.ts' ? profileLines : nowLines

  return (
    <WindowFrame title="workspace" path="~/portfolio/src" className="code-editor">
      <div className="code-editor__body">
        <aside className="code-editor__rail" aria-hidden="true">
          <span className="rail-icon rail-icon--active">◇</span><span>⌕</span><span>⑂</span><span>□</span>
        </aside>
        <div className="code-editor__main">
          <div className="editor-tabs" role="tablist" aria-label="Archivos del editor">
            {(['profile.ts', 'now.md'] as EditorTab[]).map((tab) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                className={activeTab === tab ? 'editor-tab editor-tab--active' : 'editor-tab'}
                onClick={() => setActiveTab(tab)}
                key={tab}
              >
                <span className={tab.endsWith('.ts') ? 'file-icon file-icon--ts' : 'file-icon file-icon--md'}>{tab.endsWith('.ts') ? 'TS' : 'M'}</span>
                {tab}
              </button>
            ))}
          </div>
          <div className="breadcrumbs"><span>src</span><b>›</b><span>{activeTab}</span></div>
          <pre className="code-lines" aria-live="polite">
            <code>
              {lines.map((line, index) => (
                <span className="code-line" key={`${activeTab}-${index}`}>
                  <span className="line-number" aria-hidden="true">{index + 1}</span>
                  <span className="line-code">{line}</span>
                </span>
              ))}
            </code>
          </pre>
          <div className="editor-status" aria-label="Estado del editor">
            <span>⑂ main*</span><span className="editor-status__spacer" /><span>Ln {activeTab === 'profile.ts' ? '17' : '7'}, Col 1</span><span>UTF-8</span><span>{activeTab === 'profile.ts' ? 'TypeScript' : 'Markdown'}</span>
          </div>
        </div>
      </div>
    </WindowFrame>
  )
}
