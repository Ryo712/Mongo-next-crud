// components/ItemList.tsx
import Link from 'next/link';

interface Item {
  _id: string;
  name: string;
}

interface ItemListProps {
  items: Item[];
}

export default function ItemList({ items }: ItemListProps) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item._id}>
          <Link href={`/items/${item._id}`}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
