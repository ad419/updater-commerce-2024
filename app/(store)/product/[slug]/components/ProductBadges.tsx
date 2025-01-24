interface ProductBadgesProps {
  status?: string;
  featured?: boolean;
  collections?: string[];
}

export function ProductBadges({
  status,
  featured,
  collections,
}: ProductBadgesProps) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {status && (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium
          ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </span>
      )}
      {featured && (
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
          Featured
        </span>
      )}
      {collections?.map((collection) => (
        <span
          key={collection}
          className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
        >
          {collection}
        </span>
      ))}
    </div>
  );
}
