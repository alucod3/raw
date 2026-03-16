'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './dashboard.module.css';

interface ScanResult {
  breaches: Array<{ Name: string; BreachDate: string; DataClasses: string[]; Description: string }>;
  mentions: Array<{ url: string; snippet: string }>;
  risk_score: number;
  ai_report: string;
  input: { name: string; email: string; phone?: string };
}

function RiskGauge({ score }: { score: number }) {
  const radius = 80;
  const circumference = Math.PI * radius;
  const pct = score / 100;
  const dashOffset = circumference * (1 - pct);
  const color = score >= 70 ? 'var(--danger-high)' : score >= 40 ? 'var(--danger-mid)' : 'var(--danger-low)';
  const label = score >= 70 ? 'Alto Risco' : score >= 40 ? 'Médio Risco' : 'Baixo Risco';
  const badgeCls = score >= 70 ? 'badge-danger' : score >= 40 ? 'badge-warning' : 'badge-success';

  return (
    <div className={styles.gaugeWrap}>
      <svg viewBox="0 0 200 110" className={styles.gaugeSvg}>
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" strokeLinecap="round"
        />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1.5s ease, stroke 0.5s', filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className={styles.gaugeCenter}>
        <span className={styles.gaugeScore} style={{ color }}>{score}</span>
        <span className={styles.gaugeSub}>/ 100</span>
        <span className={`badge ${badgeCls}`} style={{ marginTop: '8px' }}>{label}</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [tab, setTab] = useState<'breaches' | 'mentions'>('breaches');

  useEffect(() => {
    const raw = sessionStorage.getItem('rawScanResult');
    if (raw) {
      setResult(JSON.parse(raw));
    } else {
      // demo data if no scan ran
      setResult(DEMO_RESULT);
    }
  }, []);

  if (!result) return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className={styles.spinner} />
    </main>
  );

  const { breaches, mentions, risk_score, ai_report, input } = result;

  return (
    <main className={styles.main}>
      <div className="nav-glass" />
      <nav className="nav container">
        <Link href="/" className="logo">RAW</Link>
        <Link href="/scan" className="btn btn-ghost" style={{ padding: '10px 20px', fontSize: '0.875rem' }}>
          Novo Scan
        </Link>
      </nav>

      <div className="container" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        {/* HEADER */}
        <div className={styles.header}>
          <div>
            <div className="badge badge-danger" style={{ marginBottom: '12px' }}>Relatório de Privacidade</div>
            <h1 className="text-3xl font-bold" style={{ marginBottom: '4px' }}>
              Olá, {input.name.split(' ')[0]} 👋
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Scan para <span className="mono" style={{ color: 'var(--accent-g)' }}>{input.email}</span>
            </p>
          </div>
          <Link href="/removal" className="btn btn-primary">
            ⚡ Remover exposições — R$29
          </Link>
        </div>

        {/* TOP ROW */}
        <div className={styles.topRow}>
          {/* GAUGE */}
          <div className={`card ${styles.gaugeCard}`}>
            <h2 className="text-lg font-semi" style={{ marginBottom: '4px' }}>Privacy Risk Score</h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Baseado em {breaches.length} vazamentos e {mentions.length} menções encontradas
            </p>
            <RiskGauge score={risk_score} />
          </div>

          {/* SUMMARY CARDS */}
          <div className={styles.summaryGrid}>
            <div className={`card ${styles.sumCard}`}>
              <span className={styles.sumIcon}>💥</span>
              <div className={`${styles.sumNum} grad-r`}>{breaches.length}</div>
              <div className={styles.sumLabel}>Vazamentos</div>
            </div>
            <div className={`card ${styles.sumCard}`}>
              <span className={styles.sumIcon}>🌐</span>
              <div className={`${styles.sumNum} grad-g`}>{mentions.length}</div>
              <div className={styles.sumLabel}>Menções</div>
            </div>
            <div className={`card ${styles.sumCard}`}>
              <span className={styles.sumIcon}>🕵️</span>
              <div className={styles.sumNum} style={{ color: 'var(--accent-p)' }}>
                {input.phone ? '2' : '0'}
              </div>
              <div className={styles.sumLabel}>Data Brokers</div>
            </div>
            <div className={`card ${styles.sumCard}`}>
              <span className={styles.sumIcon}>⚖️</span>
              <div className={styles.sumNum} style={{ color: 'var(--danger-mid)' }}>LGPD</div>
              <div className={styles.sumLabel}>Elegível</div>
            </div>
          </div>
        </div>

        {/* AI REPORT */}
        {ai_report && (
          <div className={`card ${styles.aiReport}`}>
            <div className={styles.aiReportHeader}>
              <span>🤖 Análise da IA</span>
              <span className="badge badge-info">GPT-4o</span>
            </div>
            <div className={styles.aiReportBody}>
              {ai_report.split('\n').map((line, i) => (
                <p key={i} style={{ marginBottom: line ? '8px' : '0' }}>{line}</p>
              ))}
            </div>
          </div>
        )}

        {/* TABS */}
        <div className={styles.tabs}>
          <button
            id="tab-breaches"
            className={`${styles.tab} ${tab === 'breaches' ? styles.tabActive : ''}`}
            onClick={() => setTab('breaches')}
          >
            💥 Vazamentos ({breaches.length})
          </button>
          <button
            id="tab-mentions"
            className={`${styles.tab} ${tab === 'mentions' ? styles.tabActive : ''}`}
            onClick={() => setTab('mentions')}
          >
            🌐 Menções ({mentions.length})
          </button>
        </div>

        {/* BREACHES */}
        {tab === 'breaches' && (
          <div className={styles.list}>
            {breaches.length === 0 ? (
              <div className={`card ${styles.empty}`}>
                <span style={{ fontSize: '2rem' }}>✅</span>
                <p>Nenhum vazamento encontrado para este email. Ótimo!</p>
              </div>
            ) : breaches.map((b, i) => (
              <div key={i} className={`card ${styles.breachCard}`}>
                <div className={styles.breachLeft}>
                  <div className="font-semi">{b.Name}</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Vazado em: <span className="mono">{b.BreachDate}</span>
                  </div>
                  <div className={styles.tags}>
                    {b.DataClasses?.slice(0, 4).map((d, j) => (
                      <span key={j} className="badge badge-danger" style={{ fontSize: '0.65rem' }}>{d}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.breachRight}>
                  <span className="badge badge-danger">Exposto</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MENTIONS */}
        {tab === 'mentions' && (
          <div className={styles.list}>
            {mentions.length === 0 ? (
              <div className={`card ${styles.empty}`}>
                <span style={{ fontSize: '2rem' }}>✅</span>
                <p>Nenhuma menção pública encontrada.</p>
              </div>
            ) : mentions.map((m, i) => (
              <div key={i} className={`card ${styles.mentionCard}`}>
                <div className={styles.mentionUrl}>
                  <span className="mono text-sm" style={{ color: 'var(--accent-g)' }}>{m.url}</span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{m.snippet}</p>
              </div>
            ))}
          </div>
        )}

        {/* PAYWALL BANNER */}
        <div className={styles.paywallBanner}>
          <div className={styles.paywallLeft}>
            <h3 className="text-xl font-bold">Remova suas exposições automaticamente</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '6px' }}>
              A IA gera pedidos formais de remoção com base na <strong>LGPD</strong> e envia para cada site.
            </p>
          </div>
          <Link href="/removal" id="cta-remove" className="btn btn-primary btn-lg">
            ⚡ Começar remoção — R$29
          </Link>
        </div>
      </div>
    </main>
  );
}

const DEMO_RESULT: ScanResult = {
  input: { name: 'João da Silva', email: 'joao@email.com', phone: '+5511999999999' },
  risk_score: 72,
  breaches: [
    {
      Name: 'LinkedIn',
      BreachDate: '2021-06-22',
      DataClasses: ['Email', 'Nome', 'Número de telefone', 'Localização'],
      Description: 'Em 2021, dados de 700 milhões de usuários foram expostos e vendidos online.',
    },
    {
      Name: 'Canva',
      BreachDate: '2019-05-24',
      DataClasses: ['Email', 'Senha (hash)', 'Nome de usuário'],
      Description: 'O site de design gráfico Canva sofreu um vazamento em 2019.',
    },
    {
      Name: 'Serasa',
      BreachDate: '2021-01-19',
      DataClasses: ['CPF', 'Nome', 'Email', 'Telefone', 'Score'],
      Description: 'Megavazamento de 220 milhões de registros de brasileiros.',
    },
  ],
  mentions: [
    { url: 'www.meuperfil.com/joao-silva', snippet: 'João da Silva · joao@email.com · São Paulo, SP — Perfil público indexado.' },
    { url: 'forum.techmundo.com.br', snippet: 'Post de joao@email.com em "Melhores smartphones de 2022" — fórum público.' },
  ],
  ai_report: `Resumo de risco: SEU NÍVEL DE RISCO É ALTO (72/100).

Seus dados foram expostos em 3 vazamentos significativos, incluindo o megavazamento da Serasa em 2021 que expôs CPF, nome, email, telefone e score de crédito de 220 milhões de brasileiros.

Locais onde seus dados aparecem:
• LinkedIn (2021): Seu nome, email e telefone foram incluídos no vazamento de 700M usuários.
• Canva (2019): Seu email e senha (em hash) foram expostos.
• Serasa (2021): Seus dados financeiros mais sensíveis estão em circulação.

Recomendações:
1. Solicite remoção imediata de perfis públicos indexados.
2. Troque senhas dos serviços afetados.
3. Ative autenticação em dois fatores em todos os serviços críticos.
4. Utilize a LGPD para exigir remoção formal dos seus dados nestes sites.`,
};
