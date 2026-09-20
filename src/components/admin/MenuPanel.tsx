import { useMemo, useState } from "react";
import { Copy, Plus, Search, Trash2, Pencil } from "lucide-react";
import {
  AdminSection,
  EmptyState,
  ImageField,
  SelectField,
  SwitchRow,
  TagInput,
  TextAreaField,
  TextField,
} from "@/components/admin/AdminKit";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input, NativeSelect } from "@/components/ui/field";
import type { MenuItem } from "@/data/content";
import { useSite } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

const blankItem = (categoryId: string, id: string): MenuItem => ({
  id,
  categoryId,
  name: "New dish",
  description: "Describe the plate in one or two appetising lines.",
  price: 24,
  image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  featured: false,
  signature: false,
  tags: [],
  available: true,
});

export function MenuPanel() {
  const { content, setContent, newId } = useSite();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const items = content.items;
  const editing = items.find((item) => item.id === editingId) ?? null;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (filter !== "all" && item.categoryId !== filter) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
      );
    });
  }, [items, filter, query]);

  const setItems = (next: MenuItem[]) => setContent({ ...content, items: next });

  const patchItem = (id: string, patch: Partial<MenuItem>) =>
    setItems(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  const addItem = () => {
    const categoryId = filter === "all" ? content.categories[0].id : filter;
    const item = blankItem(categoryId, newId("item"));
    setItems([item, ...items]);
    setEditingId(item.id);
  };

  const duplicateItem = (item: MenuItem) => {
    const copy = { ...item, id: newId("item"), name: `${item.name} (copy)` };
    const index = items.findIndex((i) => i.id === item.id);
    const next = [...items];
    next.splice(index + 1, 0, copy);
    setItems(next);
  };

  const removeItem = (id: string) => setItems(items.filter((item) => item.id !== id));

  const categoryName = (id: string) =>
    content.categories.find((c) => c.id === id)?.name ?? "Uncategorised";

  return (
    <>
      <AdminSection
        title="Menu & pricing"
        description="Edit any dish, change a price, mark something as a signature plate or hide it when the kitchen runs out."
        actions={
          <Button size="sm" onClick={addItem}>
            <Plus className="size-3.5" />
            New dish
          </Button>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-cream-muted/60" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes…"
              className="pl-10"
            />
          </div>
          <NativeSelect
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="sm:w-56"
          >
            <option value="all">All categories</option>
            {content.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </NativeSelect>
        </div>

        <div className="mt-5 space-y-3">
          {visible.length === 0 ? (
            <EmptyState
              title="No dishes match"
              body="Try a different category or search term, or add a new dish to this section."
            />
          ) : (
            visible.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 border border-white/[0.08] bg-white/[0.02] p-4 transition-colors duration-500 hover:border-brass-400/30 sm:flex-row sm:items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-16 w-full shrink-0 border border-white/[0.08] object-cover sm:w-24"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-serif text-lg text-cream">{item.name}</p>
                    {item.signature ? (
                      <span className="border border-brass-400/40 px-2 py-0.5 font-sans text-[0.5rem] uppercase tracking-wide2 text-brass-200">
                        Signature
                      </span>
                    ) : null}
                    {item.featured ? (
                      <span className="border border-white/15 px-2 py-0.5 font-sans text-[0.5rem] uppercase tracking-wide2 text-cream-muted">
                        Featured
                      </span>
                    ) : null}
                    {!item.available ? (
                      <span className="border border-wine-400/45 px-2 py-0.5 font-sans text-[0.5rem] uppercase tracking-wide2 text-wine-400">
                        Hidden
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 line-clamp-1 text-[0.75rem] text-cream-muted">
                    {item.description}
                  </p>
                  <p className="mt-1.5 font-sans text-[0.6rem] uppercase tracking-wide2 text-cream-muted/60">
                    {categoryName(item.categoryId)}
                  </p>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="font-serif text-xl text-brass-300">{formatPrice(item.price)}</span>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" aria-label="Edit dish" onClick={() => setEditingId(item.id)}>
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Duplicate dish"
                      onClick={() => duplicateItem(item)}
                    >
                      <Copy className="size-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Delete dish"
                      className="hover:text-wine-400"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </AdminSection>

      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditingId(null)}>
        <DialogContent className="max-w-2xl">
          {editing ? (
            <>
              <DialogHeader>
                <DialogTitle>Edit dish</DialogTitle>
                <DialogDescription>
                  Changes appear on the menu page and the homepage the moment you save.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5">
                <ImageField
                  label="Dish photograph"
                  value={editing.image}
                  onChange={(image) => patchItem(editing.id, { image })}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField
                    label="Dish name"
                    value={editing.name}
                    onChange={(name) => patchItem(editing.id, { name })}
                  />
                  <TextField
                    label="Price (€)"
                    type="number"
                    value={editing.price}
                    onChange={(value) => patchItem(editing.id, { price: Number(value) || 0 })}
                  />
                </div>

                <TextAreaField
                  label="Description"
                  value={editing.description}
                  rows={3}
                  onChange={(description) => patchItem(editing.id, { description })}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField
                    label="Category"
                    value={editing.categoryId}
                    onChange={(categoryId) => patchItem(editing.id, { categoryId })}
                    options={content.categories.map((category) => ({
                      value: category.id,
                      label: category.name,
                    }))}
                  />
                  <TagInput
                    label="Dietary & house tags"
                    tags={editing.tags}
                    onChange={(tags) => patchItem(editing.id, { tags })}
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <SwitchRow
                    label="Signature"
                    checked={editing.signature}
                    onChange={(signature) => patchItem(editing.id, { signature })}
                  />
                  <SwitchRow
                    label="Featured"
                    checked={editing.featured}
                    onChange={(featured) => patchItem(editing.id, { featured })}
                  />
                  <SwitchRow
                    label="Available"
                    checked={editing.available}
                    onChange={(available) => patchItem(editing.id, { available })}
                  />
                </div>

                <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:justify-between">
                  <Button
                    variant="danger"
                    size="md"
                    onClick={() => {
                      removeItem(editing.id);
                      setEditingId(null);
                    }}
                  >
                    <Trash2 className="size-3.5" />
                    Delete dish
                  </Button>
                  <Button size="md" onClick={() => setEditingId(null)}>
                    Done
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
