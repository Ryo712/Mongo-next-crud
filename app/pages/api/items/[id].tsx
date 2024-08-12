// pages/items/[id].tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ItemDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/items/${id}`, fetcher);

  if (error) return <div>Failed to load item</div>;
  if (!data) return <div>Loading...</div>;

  const handleDelete = async () => {
    await fetch(`/api/items/${id}`, {
      method: 'DELETE',
    });
    router.push('/');
  };

  return (
    <div>
      <h1>{data.data.name}</h1>
      <p>{data.data.description}</p>
      <button onClick={() => router.push(`/items/edit/${id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
