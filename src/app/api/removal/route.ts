import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, url, country = 'BR' } = await req.json();

    if (!name || !email || !url) {
      return NextResponse.json({ error: 'name, email e url são obrigatórios' }, { status: 400 });
    }

    const letter = await generateRemovalLetter(name, email, url, country);
    return NextResponse.json({ letter });
  } catch (err) {
    console.error('Removal error:', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

async function generateRemovalLetter(name: string, email: string, url: string, country: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return getMockLetter(name, email, url, country);

  try {
    const prompt = `Você é um especialista em privacidade digital e legislação de proteção de dados.

Escreva um pedido formal de remoção de dados pessoais para um site.

Dados:
- Nome do titular: ${name}
- Email: ${email}
- URL onde os dados aparecem: ${url}
- País: ${country === 'BR' ? 'Brasil' : country}

Requisitos da carta:
- Tom educado e profissional
- Citar a LGPD (Lei nº 13.709/2018) artigos relevantes (especialmente Arts. 18 e 19)
- Solicitar remoção completa dos dados em até 15 dias úteis
- Pedir confirmação formal por e-mail
- Incluir data e assinatura ao final

Formate como uma carta formal em português.`;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 600,
        temperature: 0.6,
      }),
    });

    if (!res.ok) return getMockLetter(name, email, url, country);
    const data = await res.json();
    return data.choices[0].message.content;
  } catch {
    return getMockLetter(name, email, url, country);
  }
}

function getMockLetter(name: string, email: string, url: string, _country: string): string {
  const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  return `Ao Responsável pelo Site / Encarregado de Proteção de Dados (DPO)
Site: ${url}

Assunto: Pedido Formal de Remoção de Dados Pessoais — LGPD (Lei nº 13.709/2018)

Sao Paulo, ${today}

Prezados,

Eu, ${name}, titular dos dados pessoais disponibilizados no endereço ${url}, venho por meio deste, de forma educada e formal, solicitar a remoção imediata e completa de todos os meus dados pessoais de seu sistema, banco de dados, páginas web e qualquer outro meio de armazenamento ou divulgação.

Fundamento minha solicitação nos seguintes dispositivos legais:

• Art. 18, IV, da Lei nº 13.709/2018 (LGPD): o titular tem direito à anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei.
• Art. 19 da LGPD: o controlador deverá comunicar a realização da medida ao titular em prazo de até 15 (quinze) dias úteis.

Dados a serem removidos:
- Nome completo: ${name}
- Email: ${email}
- Quaisquer outros dados associados ao meu perfil ou histórico na plataforma

Solicito que a remoção seja realizada no prazo máximo de 15 (quinze) dias úteis a contar do recebimento desta comunicação, e que me seja enviada confirmação formal para o email ${email}.

O não atendimento desta solicitação poderá ensejar denúncia à Autoridade Nacional de Proteção de Dados (ANPD) e às autoridades competentes.

Atenciosamente,

${name}
${email}
Data: ${today}`;
}
