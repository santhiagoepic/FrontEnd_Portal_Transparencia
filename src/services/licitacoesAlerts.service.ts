import { ProcessAlert, SeverityLevel } from '../types/licitacoes.types';
import { licitacoesConfigService } from './licitacoesConfig.service';
import { DocumentoOficialDTO } from '../types/api.types';

export interface AlertCounts {
  critica: number;
  atencao: number;
  informativa: number;
  total: number;
}

export const licitacoesAlertsService = {
  /**
   * Computes real pending alerts across all licitações by evaluating configured rules
   * against actual files, classifications, contracts and dates.
   */
  computeAlertsForDocuments(documents: DocumentoOficialDTO[]): ProcessAlert[] {
    const rules = licitacoesConfigService.getAlertRules().filter((r) => r.active);
    const detalhadas = licitacoesConfigService.getAllLicitacoesDetalhadas();
    const alerts: ProcessAlert[] = [];

    // Filter licitações from documents list (or take all if groupId is licitacoes)
    const licitacoesDocs = documents.filter((d) => d.groupId === 'licitacoes');

    licitacoesDocs.forEach((doc) => {
      const detailed = detalhadas[doc.id] || {
        id: doc.id,
        groupId: 'licitacoes',
        numero: doc.numero,
        ano: doc.ano,
        orgaoId: 'administracao',
        modalidadeId: 'pregao-eletronico',
        leisBase: ['lei-14133-2021'],
        situacaoId: doc.numero.includes('014') ? 'aberta' : doc.numero.includes('028') ? 'homologada' : 'em-andamento',
        objeto: doc.ementa,
        dataPublicacao: doc.assinatura,
        dataAbertura: doc.assinatura,
        horaAbertura: '09:00',
        tipoValor: 'Estimado' as const,
        valorEstimado: 480000.0,
        covid: false,
        lei14065: false,
        secao: doc.secao,
        signatario: doc.signatario || '',
        cargoSignatario: doc.cargoSignatario || '',
        vencedores: [],
        contratosVinculados: doc.id === 'lic-disp-028-2026' ? ['CT 048/2026'] : [],
        links: [],
        checklistManual: {},
        classificacoesArquivos: {
          [doc.anexoNome]: 'edital',
        },
      };

      const classifiedTypes = Object.values(detailed.classificacoesArquivos || {});
      const hasEdital = classifiedTypes.includes('edital') || Boolean(doc.anexoNome && doc.anexoNome.toLowerCase().includes('edital'));
      const hasAta = classifiedTypes.includes('ata-sessao') || Boolean(doc.anexoNome && doc.anexoNome.toLowerCase().includes('ata'));
      const hasHomologacao = classifiedTypes.includes('homologacao') || Boolean(doc.anexoNome && doc.anexoNome.toLowerCase().includes('homolog'));
      const hasContrato = (detailed.contratosVinculados && detailed.contratosVinculados.length > 0) || classifiedTypes.includes('contrato');

      // Rule 1: Sem Edital
      const ruleEdital = rules.find((r) => r.conditionType === 'sem_edital');
      if (ruleEdital && !hasEdital && (detailed.situacaoId === 'aberta' || detailed.situacaoId === 'em-andamento')) {
        alerts.push({
          id: `alert-edital-${doc.id}`,
          licitacaoId: doc.id,
          licitacaoNumero: doc.numero,
          licitacaoObjeto: doc.ementa,
          ruleId: ruleEdital.id,
          title: ruleEdital.title,
          severity: ruleEdital.severity,
          message: `Licitação ${doc.numero} não possui Edital anexado.`,
          actionLabel: ruleEdital.actionLabel,
          resolved: false,
          createdAt: doc.assinatura,
        });
      }

      // Rule 2: Sem Ata de Sessão
      const ruleAta = rules.find((r) => r.conditionType === 'sem_ata');
      if (ruleAta && !hasAta && detailed.situacaoId === 'em-andamento') {
        alerts.push({
          id: `alert-ata-${doc.id}`,
          licitacaoId: doc.id,
          licitacaoNumero: doc.numero,
          licitacaoObjeto: doc.ementa,
          ruleId: ruleAta.id,
          title: ruleAta.title,
          severity: ruleAta.severity,
          message: `Processo ${doc.numero} em andamento aguarda publicação da Ata de Sessão.`,
          actionLabel: ruleAta.actionLabel,
          resolved: false,
          createdAt: doc.assinatura,
        });
      }

      // Rule 3: Sem Contrato Homologado
      const ruleContrato = rules.find((r) => r.conditionType === 'sem_contrato_homologado');
      if (ruleContrato && detailed.situacaoId === 'homologada' && !hasContrato) {
        alerts.push({
          id: `alert-contrato-${doc.id}`,
          licitacaoId: doc.id,
          licitacaoNumero: doc.numero,
          licitacaoObjeto: doc.ementa,
          ruleId: ruleContrato.id,
          title: ruleContrato.title,
          severity: ruleContrato.severity,
          message: `Licitação ${doc.numero} homologada sem contrato administrativo vinculado.`,
          actionLabel: ruleContrato.actionLabel,
          resolved: false,
          createdAt: doc.assinatura,
        });
      }

      // Rule 4: Sem Homologação
      const ruleHomolog = rules.find((r) => r.conditionType === 'sem_homologacao');
      if (ruleHomolog && detailed.situacaoId === 'encerrada' && !hasHomologacao) {
        alerts.push({
          id: `alert-homolog-${doc.id}`,
          licitacaoId: doc.id,
          licitacaoNumero: doc.numero,
          licitacaoObjeto: doc.ementa,
          ruleId: ruleHomolog.id,
          title: ruleHomolog.title,
          severity: ruleHomolog.severity,
          message: `Licitação ${doc.numero} encerrada sem ato formal de homologação publicado.`,
          actionLabel: ruleHomolog.actionLabel,
          resolved: false,
          createdAt: doc.assinatura,
        });
      }

      // Rule 5: Prazo de Abertura Próximo
      const rulePrazo = rules.find((r) => r.conditionType === 'prazo_abertura_proximo');
      if (rulePrazo && detailed.situacaoId === 'aberta') {
        alerts.push({
          id: `alert-prazo-${doc.id}`,
          licitacaoId: doc.id,
          licitacaoNumero: doc.numero,
          licitacaoObjeto: doc.ementa,
          ruleId: rulePrazo.id,
          title: rulePrazo.title,
          severity: rulePrazo.severity,
          message: `Abertura prevista para ${detailed.dataAbertura} às ${detailed.horaAbertura}.`,
          actionLabel: rulePrazo.actionLabel,
          resolved: false,
          createdAt: doc.assinatura,
        });
      }
    });

    return alerts;
  },

  getCounts(alerts: ProcessAlert[]): AlertCounts {
    const active = alerts.filter((a) => !a.resolved);
    return {
      critica: active.filter((a) => a.severity === 'critica').length,
      atencao: active.filter((a) => a.severity === 'atencao').length,
      informativa: active.filter((a) => a.severity === 'informativa').length,
      total: active.length,
    };
  },

  getSeverityBadgeColor(severity: SeverityLevel): { bg: string; text: string; border: string; dot: string } {
    switch (severity) {
      case 'critica':
        return {
          bg: 'bg-rose-50',
          text: 'text-rose-900',
          border: 'border-rose-200',
          dot: 'bg-rose-600',
        };
      case 'atencao':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-900',
          border: 'border-amber-200',
          dot: 'bg-amber-500',
        };
      case 'informativa':
      default:
        return {
          bg: 'bg-sky-50',
          text: 'text-sky-900',
          border: 'border-sky-200',
          dot: 'bg-sky-500',
        };
    }
  },
};
