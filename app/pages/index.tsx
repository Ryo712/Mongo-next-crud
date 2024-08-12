// pages/index.tsx
import useSWR from 'swr';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, mutate } = useSWR('/api/items', fetcher);

  const handleSubmit = async (item: { name: string; description: string }) => {
    await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    mutate();
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Items</h1>
      <ItemForm onSubmit={handleSubmit} />
      <ItemList items={data.data} />
    </div>
  );
}
