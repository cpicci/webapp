type EmptyStateProps = {
  title: string;
  body: string;
};

export default function EmptyState({ title, body }: EmptyStateProps) {
  return (
    <article className="card empty-state">
      <p className="card-title">{title}</p>
      <strong className="card-value">Coming soon</strong>
      <p className="card-note">{body}</p>
    </article>
  );
}
