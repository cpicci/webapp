import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import FilterBar from '../FilterBar';
import type { PoleFilter, WorkflowStatusFilter } from '../../types/dashboard';

function ControlledFilterBar() {
  const [pole, setPole] = useState<PoleFilter>('all');
  const [status, setStatus] = useState<WorkflowStatusFilter>('all');

  return (
    <FilterBar
      pole={pole}
      status={status}
      onPoleChange={setPole}
      onStatusChange={setStatus}
    />
  );
}

describe('FilterBar', () => {
  it('renders compact selects with French labels', () => {
    render(<ControlledFilterBar />);

    expect(screen.getByLabelText(/pôle/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/statut/i)).toBeInTheDocument();
    expect(screen.getByText(/source — gsheet opérationnel/i)).toBeInTheDocument();
  });

  it('updates pole select value on change', async () => {
    const user = userEvent.setup();

    render(<ControlledFilterBar />);

    const poleSelect = screen.getByLabelText(/pôle/i) as HTMLSelectElement;
    expect(poleSelect.value).toBe('all');

    await user.selectOptions(poleSelect, 'Travaux');
    expect(poleSelect.value).toBe('Travaux');
  });

  it('updates status select value on change', async () => {
    const user = userEvent.setup();

    render(<ControlledFilterBar />);

    const statusSelect = screen.getByLabelText(/statut/i) as HTMLSelectElement;
    expect(statusSelect.value).toBe('all');

    await user.selectOptions(statusSelect, 'pending');
    expect(statusSelect.value).toBe('pending');
  });

  it('does not render old chip-based filter UI', () => {
    render(<ControlledFilterBar />);

    expect(screen.queryByRole('button', { name: /tous les pôles/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/contexte de travail/i)).not.toBeInTheDocument();
  });
});
