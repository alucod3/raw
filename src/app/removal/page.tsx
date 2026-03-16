'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './removal.module.css';

interface ScanResult {
  breaches: Array<{ Name: string; BreachDate: string }>;
  mentions: Array<{ url: string; snippet: string }>;
  input: { name: string; email: string; phone?: string };
}

export default function RemovalPage() {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [letter, setLetter] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('rawScanResult');
    if (raw) setResult(JSON.parse(raw));
    else setResult(DEMO_RESULT);
  }, []);

  const handleGenerate = async (url: string) => {
    if (!result) return;
    setSelectedUrl(url);
    setLetter('');
    setGenerating(true);
    try {
      const res = await fetch('/api/removal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: result.input.name, email: result.input.email, url, country: 'BR' }),
      });
      const data = await res.json();
      setLetter(data.letter || 'Erro ao gerar carta.');
    } catch {
      setLetter('Erro ao gerar carta. Tente novamente.');
    }
    setGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exposures = result ? [
    ...result.mentions.map(m => ({ type: 'Menção', url: m.url, desc: m.snippet })),
    ...result.breaches.map(b => ({ type: 'Vazamento', url: `${b.Name.toLowerCase()}.com`, desc: `Dados expostos em ${b.BreachDate}` })),
  ] : [];

  return (
    <main className={styles.main}>
      <div className="nav-glass" />
      <nav className="nav container">
        <Link href="/" className="logo">RAW</Link>
        <Link href="/dashboard" className="btn btn-ghost" style={{ padding: '10px 20px', fontSize: '0.875rem' }}>
          ← Dashboard
        </Link>
      </nav>

      <div className="container" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        <div style={{ marginBottom: '40px' }}>
          <div className="badge badge-danger" style={{ marginBottom: '16px' }}>⚡ Remoção Automática</div>
          <h1 className="text-3xl font-bold" style={{ marginBottom: '8px' }}>
            Remover suas exposições
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Selecione um site abaixo e a IA gera uma carta LGPD formal para você enviar.
          </p>
        </div>

        <div className={styles.grid}>
          {/* LEFT: EXPOSURE LIST */}
          <div>
            <h2 className="text-sm font-semi" style={{ color: 'var(--text-secondary)', marginBottom: '16px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Exposições detectadas ({exposures.length})
            </h2>
            <div className={styles.exposureList}>
              {exposures.map((exp, i) => (
                <button
                  key={i}
                  id={`exposure-${i}`}
                  className={`card ${styles.exposureItem} ${selectedUrl === exp.url ? styles.exposureActive : ''}`}
                  onClick={() => handleGenerate(exp.url)}
                >
                  <div className={styles.expLeft}>
                    <span className={`badge ${exp.type === 'Vazamento' ? 'badge-danger' : 'badge-warning'}`}>
                      {exp.type}
                    </span>
                    <div className="font-semi mono text-sm" style={{ marginTop: '8px' }}>{exp.url}</div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
                      {exp.desc.substring(0, 80)}...
                    </div>
                  </div>
                  <div className={styles.expArrow}>
                    {selectedUrl === exp.url ? '✓' : '→'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: LETTER */}
          <div>
            <h2 className="text-sm font-semi" style={{ color: 'var(--text-secondary)', marginBottom: '16px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Carta de remoção (LGPD)
            </h2>
            <div className={`card ${styles.letterCard}`}>
              {!letter && !generating && (
                <div className={styles.letterEmpty}>
                  <span style={{ fontSize: '2.5rem' }}>⚖️</span>
                  <p>Selecione uma exposição à esquerda para gerar a carta de remoção.</p>
                </div>
              )}
              {generating && (
                <div className={styles.letterLoading}>
                  <div className={styles.spinner} />
                  <p>Gerando carta LGPD com IA...</p>
                </div>
              )}
              {letter && !generating && (
                <>
                  <div className={styles.letterHeader}>
                    <span className="mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                      pedido_remocao_{selectedUrl.split('.')[0]}.txt
                    </span>
                    <button id="btn-copy-letter" className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={handleCopy}>
                      {copied ? '✓ Copiado!' : '📋 Copiar'}
                    </button>
                  </div>
                  <pre className={styles.letterText}>{letter}</pre>
                  <div className={styles.letterActions}>
                    <a
                      href={`mailto:contato@${selectedUrl}?subject=Pedido+de+Remoção+de+Dados+LGPD&body=${encodeURIComponent(letter)}`}
                      className="btn btn-primary"
                      id="btn-send-email"
                    >
                      📧 Abrir no Email
                    </a>
                    <button onClick={handleCopy} className="btn btn-ghost">
                      {copied ? '✓ Copiado!' : '📋 Copiar carta'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const DEMO_RESULT: ScanResult = {
  input: { name: 'João da Silva', email: 'joao@email.com' },
  breaches: [
    { Name: 'Serasa', BreachDate: '2021-01-19' },
    { Name: 'LinkedIn', BreachDate: '2021-06-22' },
  ],
  mentions: [
    { url: 'www.infobel.com.br/joao-silva', snippet: 'Perfil público com dados de contato visíveis.' },
  ],
};
