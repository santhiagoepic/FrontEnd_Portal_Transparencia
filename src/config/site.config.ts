export const siteConfig = {
  title: "Portal da Transparência",
  municipality: "São Miguel do Tocantins",
  state: "TO",
  cnpj: "01.612.392/0001-49",
  address: "Rua Afonso Pena, s/n - Centro, São Miguel do Tocantins - TO, CEP 77925-000",
  horarioAtendimento: "Segunda a Sexta-feira, das 07:30 às 13:30",
  telefone: "(63) 3447-1122",
  email: "transparencia@saomigueldotocantins.to.gov.br",
  description: "Portal oficial de acesso à informação pública municipal e transparência ativa da Prefeitura Municipal de São Miguel do Tocantins - TO.",
  ouvidor: "Dr. Carlos Eduardo Lima - Ouvidoria Geral",
  prefeito: "Alberto Moreira",
  gestao: "2025 - 2028",
  leiAcessoInfo: "Lei Federal nº 12.527/2011 (LAI)",
  leiRespFiscal: "Lei Complementar nº 101/2000 (LRF)",
  radarAtricon: "Nível Ouro de Transparência Pública (ATRICON / TCE-TO)",
};

export const apiConfig = {
  baseUrl: (import.meta as any).env?.VITE_API_URL ?? "http://localhost:8000/api/v1",
  useMocks: ((import.meta as any).env?.VITE_USE_MOCKS ?? "true") === "true",
  timeoutMs: 8000,
  endpoints: {
    receitas: "/receitas/",
    despesas: "/despesas/",
    licitacoes: "/licitacoes/",
    contratos: "/contratos/",
    servidores: "/servidores/",
    documentos: "/documentos/",
    obras: "/obras/",
    institucional: "/institucional/",
  },
};
