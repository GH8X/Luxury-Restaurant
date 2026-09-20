import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { AdminSection, EmptyState } from "@/components/admin/AdminKit";
import { Button } from "@/components/ui/button";
import { Input, Label, NativeSelect } from "@/components/ui/field";
import { SmartImage } from "@/components/media/SmartImage";
import type { GalleryImage } from "@/data/content";
import { useSite } from "@/lib/store";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80";

export function GalleryPanel() {
  const { content, setContent, newId } = useSite();
  const images = content.galleryImages;

  const setImages = (next: GalleryImage[]) => setContent({ ...content, galleryImages: next });

  const patch = (id: string, changes: Partial<GalleryImage>) =>
    setImages(images.map((image) => (image.id === id ? { ...image, ...changes } : image)));

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    const next = [...images];
    [next[index], next[target]] = [next[target], next[index]];
    setImages(next);
  };

  const add = () => {
    setImages([
      ...images,
      {
        id: newId("img"),
        image: DEFAULT_IMAGE,
        caption: "New photograph",
        ratio: "square",
      },
    ]);
  };

  return (
    <AdminSection
      title="Gallery"
      description="Reorder the grid, rewrite captions and swap photographs. The first three images also lead the homepage gallery."
      actions={
        <Button size="sm" onClick={add}>
          <Plus className="size-3.5" />
          Add image
        </Button>
      }
    >
      {images.length === 0 ? (
        <EmptyState title="The gallery is empty" body="Add your first photograph to get started." />
      ) : (
        <div className="space-y-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="grid gap-4 border border-white/[0.08] bg-white/[0.02] p-4 sm:grid-cols-[8rem_1fr_auto]"
            >
              <SmartImage
                src={image.image}
                alt={image.caption}
                ratio="square"
                className="border border-white/[0.08]"
              />

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={image.image}
                    onChange={(e) => patch(image.id, { image: e.target.value })}
                    className="text-[0.75rem]"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-[1fr_9rem]">
                  <div className="space-y-2">
                    <Label>Caption</Label>
                    <Input
                      value={image.caption}
                      onChange={(e) => patch(image.id, { caption: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Shape</Label>
                    <NativeSelect
                      value={image.ratio}
                      onChange={(e) =>
                        patch(image.id, { ratio: e.target.value as GalleryImage["ratio"] })
                      }
                    >
                      <option value="square">Square</option>
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                    </NativeSelect>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 sm:flex-col">
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Move up"
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                >
                  <ArrowUp className="size-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Move down"
                  disabled={index === images.length - 1}
                  onClick={() => move(index, 1)}
                >
                  <ArrowDown className="size-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Remove image"
                  className="hover:text-wine-400"
                  onClick={() => setImages(images.filter((i) => i.id !== image.id))}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 border-t border-white/[0.07] pt-6 text-[0.72rem] leading-relaxed text-cream-muted/70">
        Tip: keep captions short — they are rendered in small caps over each tile.
      </p>
    </AdminSection>
  );
}
