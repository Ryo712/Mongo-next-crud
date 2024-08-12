// pages/items/edit/[id].tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EditItem() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/items/${id}`, fetcher);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (data) {
      setName(data.data.name);
      setDescription(data.data.description);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`/api/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });
    router.push(`/items/${id}`);
  };

  if (error) return <div>Failed to load item</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
