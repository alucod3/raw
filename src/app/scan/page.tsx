'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './scan.module.css';

export default function ScanPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [phase, setPhase] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError('Nome e email são obrigatórios.');
      return;
    }
    setError('');
    setLoading(true);

    const phases = [
      '🔍 Verificando vazamentos de email...',
      '🌐 Buscando menções públicas...',
      '🕵️ Analisando data brokers...',
      '🤖 Gerando relatório com IA...',
    ];
    let i = 0;
    setPhase(phases[0]);
    const interval = setInterval(() => {
      i++;
      if (i < phases.length) setPhase(phases[i]);
    }, 1800);

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      clearInterval(interval);
      if (!res.ok) throw new Error('Erro no scan');
      const data = await res.json();
      // store result in sessionStorage for dashboard
      sessionStorage.setItem('rawScanResult', JSON.stringify({ ...data, input: form }));
      router.push('/dashboard');
    } catch {
      clearInterval(interval);
      setError('Erro ao processar. Tente novamente.');
      setLoading(false);
      setPhase('');
    }
  };

  return (
    <main className={styles.main}>
      {/* NAV */}
      <div className="nav-glass" />
      <nav className="nav container">
        <Link href="/" className="logo">RAW</Link>
      </nav>

      <div className={styles.wrap}>
        <div className={styles.card}>
          {!loading ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <div className="badge badge-danger" style={{ marginBottom: '16px' }}>Scan Gratuito</div>
                <h1 className="text-3xl font-bold" style={{ marginBottom: '12px' }}>
                  Descubra sua exposição
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Levamos menos de 60 segundos. Sem cartão de crédito.
                </p>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Nome completo *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="João da Silva"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="joao@email.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Telefone <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(opcional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="form-input"
                    placeholder="+55 11 99999-9999"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </div>

                {error && (
                  <div className={styles.error}>{error}</div>
                )}

                <button
                  id="btn-start-scan"
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginTop: '8px' }}
                >
                  🔍 Iniciar Scan Gratuito
                </button>

                <p className={styles.privacy}>
                  🔒 Seus dados são usados apenas para o scan e nunca são compartilhados.
                  Seguimos a <strong>LGPD</strong>.
                </p>
              </form>
            </>
          ) : (
            <div className={styles.scanning}>
              <div className={styles.radarWrap}>
                <div className={styles.radar}>
                  <div className={styles.radarRing} />
                  <div className={styles.radarRing} style={{ animationDelay: '-0.5s', opacity: 0.6 }} />
                  <div className={styles.radarRing} style={{ animationDelay: '-1s', opacity: 0.3 }} />
                  <div className={styles.radarDot} />
                  <div className={styles.radarSweep} />
                </div>
              </div>
              <h2 className="text-2xl font-bold" style={{ textAlign: 'center' }}>Scanning...</h2>
              <p className={styles.phaseText}>{phase}</p>
              <div className={styles.scanLog}>
                <span className="mono text-sm" style={{ color: 'var(--accent-r)' }}>▶</span>
                <span className="mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {form.email}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.bgGlow} />
    </main>
  );
}
