// components/ItemForm.tsx
import { useState } from 'react';

interface ItemFormProps {
  onSubmit: (item: { name: string; description: string }) => void;
}

export default function ItemForm({ onSubmit }: ItemFormProps) {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
}
