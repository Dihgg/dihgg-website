// Minimal mock for astro:content so Jest can resolve the module.
// Only the types/exports used in source files need to be represented here.

export type CollectionEntry<T extends string> = {
  id: string;
  slug: string;
  collection: T;
  data: Record<string, unknown>;
  render: () => Promise<{ Content: unknown }>;
};

export async function getCollection<T extends string>(
  _collection: T,
  _filter?: (entry: CollectionEntry<T>) => boolean
): Promise<CollectionEntry<T>[]> {
  return [];
}
