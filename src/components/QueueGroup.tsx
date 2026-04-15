import type { FollowUpItem } from '../types/dashboard';
import QueueItem from './QueueItem';

type Props = {
  title: string;
  badgeVariant?: 'urgent' | 'drafted' | 'default';
  items: FollowUpItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function QueueGroup({ title, badgeVariant = 'default', items, selectedId, onSelect }: Props) {
  if (items.length === 0) return null;

  const badgeCss = badgeVariant === 'urgent'
    ? 'group-badge urgent'
    : badgeVariant === 'drafted'
      ? 'group-badge drafted'
      : 'group-badge';

  return (
    <div className="queue-group">
      <h3 className="group-header">
        <span className={badgeCss}>{items.length}</span>
        <span className="group-title">{title}</span>
      </h3>
      <ul className="queue-list" role="listbox" aria-label={title}>
        {items.map((item) => (
          <QueueItem
            key={item.id}
            item={item}
            isSelected={selectedId === item.id}
            onSelect={() => onSelect(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}
