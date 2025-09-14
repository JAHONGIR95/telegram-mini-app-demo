export default function SortButtons({
  data,
  renderItem,
}: {
  data: { label: string; value: string }[];
  renderItem: (item: { label: string; value: string }) => React.ReactNode;
}) {
  return (
    <div className="flex gap-2 flex-wrap">{data.map((item) => renderItem(item))}</div>
  );
}
