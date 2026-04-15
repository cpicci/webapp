import { describe, expect, it } from 'vitest';

import { buildDashboardViewModel } from './dashboardAdapter';
import { liveDashboardSnapshot } from './liveDashboardSnapshot';

describe('buildDashboardViewModel', () => {
  it('maps the real back-office snapshot into the confirmed V1 dashboard widgets', () => {
    const viewModel = buildDashboardViewModel(liveDashboardSnapshot, {
      pole: 'all',
      status: 'all',
    });

    expect(viewModel.kpiCards.map((card) => card.title)).toEqual([
      'Dossiers ouverts',
      'Relances à traiter',
      'Relances préparées',
      'Priorités du jour',
      'Activité récente',
      'Indicateurs à venir',
    ]);

    expect(viewModel.kpiCards[0]).toMatchObject({
      value: '9',
      status: 'ready',
      formula: "Count of visible dossier rows where status = 'open'",
      source: 'cases',
      ownerWorkflow: 'WF4',
    });

    expect(viewModel.kpiCards[5]).toMatchObject({
      status: 'placeholder',
      source: 'Source à confirmer',
    });

    expect(viewModel.kpiCards[3]).toMatchObject({ value: '9' });
    expect(viewModel.kpiCards[4]).toMatchObject({ value: '6' });
    expect(viewModel.dossiers).toHaveLength(9);
    expect(viewModel.relances).toHaveLength(5);
    expect(viewModel.comptaRows).toHaveLength(5);
    expect(viewModel.actionItems).toHaveLength(9);
    expect(viewModel.recentItems).toHaveLength(6);
  });

  it('maps the real workbook as a CPI/Syndic pilot source for now', () => {
    const viewModel = buildDashboardViewModel(liveDashboardSnapshot, {
      pole: 'all',
      status: 'all',
    });

    expect(viewModel.dossiers[viewModel.dossiers.length - 1]).toMatchObject({
      normalizedAgency: 'CPI',
      normalizedMetier: 'Syndic',
      dataQuality: 'known',
      dataQualityNote: 'Pilot mapping from current back-office workbook',
    });
    expect(viewModel.dossiers[0]).toMatchObject({
      followUpState: 'action-needed',
    });
  });

  it('filters the snapshot by source-driven pole values', () => {
    const viewModel = buildDashboardViewModel(liveDashboardSnapshot, {
      pole: 'Travaux',
      status: 'all',
    });

    expect(viewModel.dossiers).toHaveLength(5);
    expect(viewModel.relances).toHaveLength(1);
    expect(viewModel.kpiCards[0]).toMatchObject({ value: '5' });
    expect(viewModel.kpiCards[1]).toMatchObject({ value: '0' });
    expect(viewModel.kpiCards[2]).toMatchObject({ value: '1' });
    expect(viewModel.kpiCards[3]).toMatchObject({ value: '2' });
    expect(viewModel.kpiCards[4]).toMatchObject({ value: '2' });
  });

  it('does not crash when live rows contain missing string fields', () => {
    const liveLikeSource = {
      ...liveDashboardSnapshot,
      cases: [
        {
          ...liveDashboardSnapshot.cases[0],
          createdAt: undefined,
          pole: undefined,
          lot: undefined,
          priorite: undefined,
          statut: undefined,
        },
      ],
      relance: [
        {
          ...liveDashboardSnapshot.relance[0],
          dateRelance: undefined,
          createdAt: undefined,
          pole: undefined,
          lot: undefined,
          statut: undefined,
        },
      ],
      compta: [
        {
          ...liveDashboardSnapshot.compta[0],
          debit: undefined,
          credit: undefined,
        },
      ],
    };

    expect(() =>
      buildDashboardViewModel(liveLikeSource as unknown as typeof liveDashboardSnapshot, {
        pole: 'all',
        status: 'all',
      }),
    ).not.toThrow();
  });
});
