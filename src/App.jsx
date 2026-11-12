import { Routes, Route, Link } from 'react-router-dom'
import CrinklyDemo from './styles/CrinklyDemo.jsx'
import InkyDemo from './styles/InkyDemo.jsx'
import MatlackCanvas from './styles/MatlackCanvas.jsx'
import MatlackReviewGrid from './styles/MatlackReviewGrid.tsx'
import PaperCanvasPanel from './styles/PaperCanvasPanel.jsx'

const PAGES = [
  { to: '/matlack', label: 'Matlack letter-synthesis canvas' },
  { to: '/review?letter=f', label: 'Review grid (letter f)' },
  { href: '/matlack-preview.html', label: 'Draft font preview' },
  { href: '/matlack-joins.html', label: 'Join rules dashboard (dev server only)' },
  { href: '/matlack-bigrams.html', label: 'Bigram coverage dashboard (dev server only)' },
  { to: '/paper', label: 'Paper/ink canvas (snap.sh target, vestigial)' },
  { to: '/crinkly', label: 'Crinkly paper demo (vestigial)' },
  { to: '/inky', label: 'Inky demo (vestigial)' },
]

function Home() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640, margin: '48px auto', padding: '0 16px' }}>
      <h1>Matlack</h1>
      <p>Handwriting synthesis research based on Timothy Matlack&apos;s hand in the 1823 Stone facsimile of the Declaration of Independence.</p>
      <ul>
        {PAGES.map(p => (
          <li key={p.to ?? p.href}>
            {p.to ? <Link to={p.to}>{p.label}</Link> : <a href={p.href}>{p.label}</a>}
          </li>
        ))}
      </ul>
    </main>
  )
}

// PaperCanvasPanel used to live inside the Dossier app at "/". snap.sh
// broadcasts draw commands to every open PaperCanvasPanel, so this page
// must be open for snap.sh to draw anything.
function PaperPage() {
  return (
    <div style={{ padding: 24 }}>
      <PaperCanvasPanel width={860} height={220} />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/paper" element={<PaperPage />} />
      <Route path="/crinkly" element={<CrinklyDemo />} />
      <Route path="/inky" element={<InkyDemo />} />
      <Route path="/matlack" element={<MatlackCanvas />} />
      <Route path="/review" element={<MatlackReviewGrid />} />
    </Routes>
  )
}
