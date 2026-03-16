'use client';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* NAV */}
      <div className="nav-glass" />
      <nav className="nav container">
        <span className="logo">RAW</span>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link href="/scan" className="btn btn-ghost" style={{ padding: '10px 22px', fontSize: '0.9rem' }}>
            Scan Grátis
          </Link>
          <Link href="/scan" className="btn btn-primary" style={{ padding: '10px 22px', fontSize: '0.9rem' }}>
            Começar →
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="badge badge-danger animate-fade-up" style={{ marginBottom: '24px' }}>
            <span>⚠</span> Seus dados estão expostos agora
          </div>

          <h1 className={`${styles.heroTitle} animate-fade-up del-1`}>
            <span className="grad-r">Revenge</span><br />
            <span className="grad-g">Against the</span><br />
            <span style={{ color: 'var(--text-primary)' }}>Web.</span>
          </h1>
          <p className={`${styles.heroSub} animate-fade-up del-2`}>
            Descubra onde seus dados estão expostos na internet.<br />
            Deixe a IA remover tudo por você — com base na <strong>LGPD</strong>.
          </p>
          <div className={`${styles.heroCta} animate-fade-up del-3`}>
            <Link href="/scan" id="cta-scan-main" className="btn btn-primary btn-lg">
              🔍 Scan Grátis — 60 segundos
            </Link>
            <Link href="#how" className="btn btn-ghost btn-lg">
              Como funciona
            </Link>
          </div>

          {/* STATS */}
          <div className={`${styles.statsRow} animate-fade-up del-4`}>
            <div className={styles.statItem}>
              <span className={`${styles.statNum} grad-r`}>8.4B+</span>
              <span className={styles.statLabel}>registros vazados globalmente</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={`${styles.statNum} grad-g`}>94%</span>
              <span className={styles.statLabel}>dos brasileiros têm dados expostos</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={`${styles.statNum}`} style={{ color: 'var(--accent-p)' }}>LGPD</span>
              <span className={styles.statLabel}>garante seu direito de remoção</span>
            </div>
          </div>
        </div>

        {/* BG GLOW */}
        <div className={styles.heroBgGlow1} />
        <div className={styles.heroBgGlow2} />
        <div className={styles.heroGrid} />
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how" style={{ background: 'var(--bg-1)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="badge badge-info" style={{ marginBottom: '16px' }}>Como funciona</div>
            <h2 className="text-4xl font-bold">
              Do scan à remoção em <span className="grad-r">3 passos</span>
            </h2>
          </div>
          <div className="grid-3">
            {STEPS.map((s, i) => (
              <div key={i} className="card" style={{ padding: '32px', position: 'relative' }}>
                <div className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</div>
                <div className={styles.stepIcon}>{s.icon}</div>
                <h3 className="text-xl font-semi" style={{ marginBottom: '12px' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="badge badge-danger" style={{ marginBottom: '16px' }}>O que detectamos</div>
            <h2 className="text-4xl font-bold">
              Exposição <span className="grad-full">em todos os fronts</span>
            </h2>
          </div>
          <div className={styles.featureGrid}>
            {FEATURES.map((f, i) => (
              <div key={i} className={`card ${styles.featureCard}`}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <div>
                  <div className="font-semi" style={{ marginBottom: '4px' }}>{f.title}</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="section" style={{ background: 'var(--bg-1)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <div className="badge badge-warning" style={{ marginBottom: '16px' }}>Dashboard</div>
              <h2 className="text-4xl font-bold" style={{ marginBottom: '20px' }}>
                Veja exatamente onde <span className="grad-r">você está exposto</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.8' }}>
                Um relatório visual com seu <strong>Privacy Risk Score</strong>, lista de
                vazamentos, data brokers que possuem seus dados e menções públicas — tudo em um lugar.
              </p>
              <Link href="/scan" className="btn btn-primary">
                Ver meu relatório →
              </Link>
            </div>
            <div className={styles.dashPreview}>
              <div className={styles.dashCard}>
                <div className={styles.dashHeader}>
                  <span className="mono text-sm" style={{ color: 'var(--text-secondary)' }}>privacy_score.json</span>
                  <span className="badge badge-danger">Alto Risco</span>
                </div>
                <div className={styles.dashScore}>
                  <span className={`${styles.scoreNum} grad-r`}>72</span>
                  <span className={styles.scoreSub}>/ 100</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                  {DASH_ITEMS.map((d, i) => (
                    <div key={i} className={styles.dashRow}>
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{d.label}</span>
                      <div className={styles.dashBadge}>
                        <span className={`badge ${d.cls}`}>{d.value}</span>
                        <div className={styles.dashBar}>
                          <div className={styles.dashFill} style={{ width: d.pct, background: d.color }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section" id="pricing">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="badge badge-success" style={{ marginBottom: '16px' }}>Planos</div>
            <h2 className="text-4xl font-bold">
              Simples e <span className="grad-g">transparente</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <div className="card" style={{ padding: '40px 32px' }}>
              <div className="badge badge-info" style={{ marginBottom: '20px' }}>Grátis</div>
              <div className={styles.priceNum}>R$0</div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>Scan completo, sem cartão</p>
              <ul className={styles.priceList}>
                <li>✓ Scan de vazamentos (HIBP)</li>
                <li>✓ Busca em data brokers</li>
                <li>✓ Privacy Risk Score</li>
                <li>✓ Relatório básico</li>
              </ul>
              <Link href="/scan" id="cta-free" className="btn btn-ghost" style={{ width: '100%', marginTop: '28px' }}>
                Começar grátis
              </Link>
            </div>
            <div className="card" style={{ padding: '40px 32px', border: '1px solid rgba(255,45,85,0.4)', background: 'rgba(255,45,85,0.04)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                <span className="badge badge-danger">Popular</span>
              </div>
              <div className="badge badge-danger" style={{ marginBottom: '20px' }}>Remoção</div>
              <div className={styles.priceNum}><span className="grad-r">R$29</span></div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>Por sessão de remoção</p>
              <ul className={styles.priceList}>
                <li>✓ Tudo do plano grátis</li>
                <li>✓ Pedidos de remoção via IA</li>
                <li>✓ Cartas LGPD personalizadas</li>
                <li>✓ Relatório detalhado com IA</li>
                <li>✓ Suporte prioritário</li>
              </ul>
              <Link href="/scan" id="cta-paid" className="btn btn-primary" style={{ width: '100%', marginTop: '28px' }}>
                Remover meus dados →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={styles.ctaSection}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="text-5xl font-black" style={{ marginBottom: '16px' }}>
            Seus dados valem.<br /><span className="grad-r">Proteja-os agora.</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.1rem' }}>
            Scan 100% gratuito. Sem cartão de crédito.
          </p>
          <Link href="/scan" id="cta-bottom" className="btn btn-primary btn-lg">
            🔍 Fazer meu scan grátis
          </Link>
        </div>
        <div className={styles.ctaGlow} />
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '40px 24px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <span className="logo">RAW</span>
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © 2026 RAW · Revenge Against the Web · LGPD Compliance Tool
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/scan" className="text-sm" style={{ color: 'var(--text-secondary)' }}>Scan</Link>
            <a href="#pricing" className="text-sm" style={{ color: 'var(--text-secondary)' }}>Preços</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

const STEPS = [
  {
    icon: '🔍',
    title: 'Scan OSINT Gratuito',
    desc: 'Insira seu nome, email e telefone. Nossa IA varre bases de dados públicas, data brokers e registros de vazamentos em segundos.',
  },
  {
    icon: '🧠',
    title: 'Relatório com IA',
    desc: 'Receba um Privacy Risk Score e um relatório gerado por inteligência artificial explicando onde e como seus dados estão expostos.',
  },
  {
    icon: '⚡',
    title: 'Remoção Automatizada',
    desc: 'A IA gera pedidos formais de remoção citando a LGPD e os envia para cada site onde seus dados foram encontrados.',
  },
];

const FEATURES = [
  { icon: '💥', title: 'Breaches & Vazamentos', desc: 'Verifica milhares de bases de dados vazadas públicas.' },
  { icon: '🕵️', title: 'Data Brokers', desc: 'Detecta sites que vendem ou exibem seus dados pessoais.' },
  { icon: '🌐', title: 'Menções na Web', desc: 'Identifica páginas que mencionam seu nome ou contatos.' },
  { icon: '📱', title: 'Telefone & CPF', desc: 'Verifica exposição de dados sensíveis em fóruns e dark web.' },
  { icon: '⚖️', title: 'LGPD Compliance', desc: 'Pedidos de remoção formais baseados na legislação brasileira.' },
  { icon: '🤖', title: 'IA Generativa', desc: 'GPT-4 gera cartas personalizadas para cada exposição detectada.' },
];

const DASH_ITEMS = [
  { label: 'Email', value: '3 breaches', cls: 'badge-danger', pct: '75%', color: 'var(--accent-r)' },
  { label: 'Telefone', value: '2 sites', cls: 'badge-warning', pct: '50%', color: 'var(--danger-mid)' },
  { label: 'Nome público', value: '5 menções', cls: 'badge-warning', pct: '60%', color: 'var(--danger-mid)' },
];
