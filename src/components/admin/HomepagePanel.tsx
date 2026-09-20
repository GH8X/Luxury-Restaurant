import { Plus, Trash2 } from "lucide-react";
import {
  AdminSection,
  ImageField,
  TextAreaField,
  TextField,
} from "@/components/admin/AdminKit";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";
import { useSite } from "@/lib/store";

export function HomepagePanel() {
  const { content, setContent, newId } = useSite();
  const { hero, signature, featured, chef, story, reservationCta, testimonials, testimonialsList } =
    content;

  const patchHero = (changes: Partial<typeof hero>) =>
    setContent({ ...content, hero: { ...hero, ...changes } });

  const patchChef = (changes: Partial<typeof chef>) =>
    setContent({ ...content, chef: { ...chef, ...changes } });

  const patchStory = (changes: Partial<typeof story>) =>
    setContent({ ...content, story: { ...story, ...changes } });

  return (
    <div className="space-y-6">
      {/* HERO */}
      <AdminSection
        title="Homepage hero"
        description="The first screen guests see. Keep the headline short — it renders very large."
      >
        <div className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Kicker"
              value={hero.kicker}
              onChange={(kicker) => patchHero({ kicker })}
            />
            <TextField
              label="Headline"
              value={hero.title}
              onChange={(title) => patchHero({ title })}
            />
          </div>

          <TextAreaField
            label="Subtitle"
            rows={2}
            value={hero.subtitle}
            onChange={(subtitle) => patchHero({ subtitle })}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Primary button"
              value={hero.primaryCta}
              onChange={(primaryCta) => patchHero({ primaryCta })}
            />
            <TextField
              label="Secondary button"
              value={hero.secondaryCta}
              onChange={(secondaryCta) => patchHero({ secondaryCta })}
            />
          </div>

          <ImageField
            label="Hero photograph"
            value={hero.image}
            onChange={(image) => patchHero({ image })}
            ratio="landscape"
          />

          <div>
            <Label>Hero badges</Label>
            <div className="mt-3 space-y-3">
              {hero.stats.map((stat, i) => (
                <div key={i} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                  <Input
                    value={stat.label}
                    placeholder="Label"
                    onChange={(e) => {
                      const stats = [...hero.stats];
                      stats[i] = { ...stat, label: e.target.value };
                      patchHero({ stats });
                    }}
                  />
                  <Input
                    value={stat.value}
                    placeholder="Value"
                    onChange={(e) => {
                      const stats = [...hero.stats];
                      stats[i] = { ...stat, value: e.target.value };
                      patchHero({ stats });
                    }}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Remove badge"
                    className="hover:text-wine-400"
                    onClick={() => patchHero({ stats: hero.stats.filter((_, j) => j !== i) })}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => patchHero({ stats: [...hero.stats, { label: "New badge", value: "—" }] })}
              >
                <Plus className="size-3.5" />
                Add badge
              </Button>
            </div>
          </div>
        </div>
      </AdminSection>

      {/* SECTION HEADINGS */}
      <AdminSection
        title="Section headings"
        description="Rewrite the copy above each homepage section."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <TextField
              label="Signature — kicker"
              value={signature.kicker}
              onChange={(kicker) =>
                setContent({ ...content, signature: { ...signature, kicker } })
              }
            />
            <TextField
              label="Signature — title"
              value={signature.title}
              onChange={(title) => setContent({ ...content, signature: { ...signature, title } })}
            />
            <TextAreaField
              label="Signature — subtitle"
              rows={3}
              value={signature.subtitle}
              onChange={(subtitle) =>
                setContent({ ...content, signature: { ...signature, subtitle } })
              }
            />
          </div>

          <div className="space-y-4">
            <TextField
              label="Featured menu — kicker"
              value={featured.kicker}
              onChange={(kicker) => setContent({ ...content, featured: { ...featured, kicker } })}
            />
            <TextField
              label="Featured menu — title"
              value={featured.title}
              onChange={(title) => setContent({ ...content, featured: { ...featured, title } })}
            />
            <TextAreaField
              label="Featured menu — subtitle"
              rows={3}
              value={featured.subtitle}
              onChange={(subtitle) => setContent({ ...content, featured: { ...featured, subtitle } })}
            />
          </div>
        </div>
      </AdminSection>

      {/* CHEF */}
      <AdminSection title="Chef introduction" description="Shown as a two-column feature on the homepage.">
        <div className="space-y-6">
          <ImageField
            label="Chef portrait"
            ratio="portrait"
            value={chef.image}
            onChange={(image) => patchChef({ image })}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField label="Kicker" value={chef.kicker} onChange={(kicker) => patchChef({ kicker })} />
            <TextField label="Name" value={chef.name} onChange={(name) => patchChef({ name })} />
            <TextField label="Role" value={chef.role} onChange={(role) => patchChef({ role })} />
            <TextField label="Heading" value={chef.title} onChange={(title) => patchChef({ title })} />
          </div>
          <TextAreaField
            label="Pull quote"
            rows={2}
            value={chef.quote}
            onChange={(quote) => patchChef({ quote })}
          />
          <TextAreaField
            label="Biography"
            rows={4}
            value={chef.bio}
            onChange={(bio) => patchChef({ bio })}
          />
          <div>
            <Label>Accolades</Label>
            <div className="mt-3 space-y-3">
              {chef.accolades.map((accolade, i) => (
                <div key={i} className="flex gap-3">
                  <Input
                    value={accolade}
                    onChange={(e) => {
                      const accolades = [...chef.accolades];
                      accolades[i] = e.target.value;
                      patchChef({ accolades });
                    }}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Remove accolade"
                    className="hover:text-wine-400"
                    onClick={() =>
                      patchChef({ accolades: chef.accolades.filter((_, j) => j !== i) })
                    }
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => patchChef({ accolades: [...chef.accolades, "New accolade"] })}
              >
                <Plus className="size-3.5" />
                Add accolade
              </Button>
            </div>
          </div>
        </div>
      </AdminSection>

      {/* STORY */}
      <AdminSection title="Restaurant story" description="The homepage story block, which also feeds the footer.">
        <div className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField label="Kicker" value={story.kicker} onChange={(kicker) => patchStory({ kicker })} />
            <TextField label="Since" value={story.since} onChange={(since) => patchStory({ since })} />
          </div>
          <TextField label="Title" value={story.title} onChange={(title) => patchStory({ title })} />
          <ImageField
            label="Story photograph"
            value={story.image}
            onChange={(image) => patchStory({ image })}
          />

          <div>
            <Label>Paragraphs</Label>
            <div className="mt-3 space-y-3">
              {story.paragraphs.map((paragraph, i) => (
                <div key={i} className="flex gap-3">
                  <textarea
                    value={paragraph}
                    rows={4}
                    onChange={(e) => {
                      const paragraphs = [...story.paragraphs];
                      paragraphs[i] = e.target.value;
                      patchStory({ paragraphs });
                    }}
                    className="w-full resize-y border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-cream focus:border-brass-400/70 focus:outline-none"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Remove paragraph"
                    className="hover:text-wine-400"
                    onClick={() => patchStory({ paragraphs: story.paragraphs.filter((_, j) => j !== i) })}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => patchStory({ paragraphs: [...story.paragraphs, "New paragraph."] })}
              >
                <Plus className="size-3.5" />
                Add paragraph
              </Button>
            </div>
          </div>
        </div>
      </AdminSection>

      {/* TESTIMONIALS */}
      <AdminSection
        title="Guest reviews"
        description="Shown in the homepage carousel. Paste real reviews here before you present the site."
        actions={
          <Button
            size="sm"
            onClick={() =>
              setContent({
                ...content,
                testimonialsList: [
                  ...testimonialsList,
                  {
                    id: newId("review"),
                    quote: "A new review from a recent guest.",
                    author: "Guest name",
                    role: "Table for two",
                    rating: 5,
                  },
                ],
              })
            }
          >
            <Plus className="size-3.5" />
            Add review
          </Button>
        }
      >
        <TextField
          label="Carousel title"
          value={testimonials.title}
          onChange={(title) => setContent({ ...content, testimonials: { ...testimonials, title } })}
          className="mb-6 max-w-md"
        />

        <div className="space-y-4">
          {testimonialsList.map((review) => (
            <div key={review.id} className="space-y-4 border border-white/[0.08] bg-white/[0.02] p-4">
              <div className="flex items-start justify-between gap-4">
                <Label>Review</Label>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Remove review"
                  className="hover:text-wine-400"
                  onClick={() =>
                    setContent({
                      ...content,
                      testimonialsList: testimonialsList.filter((r) => r.id !== review.id),
                    })
                  }
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>

              <textarea
                value={review.quote}
                rows={3}
                onChange={(e) =>
                  setContent({
                    ...content,
                    testimonialsList: testimonialsList.map((r) =>
                      r.id === review.id ? { ...r, quote: e.target.value } : r,
                    ),
                  })
                }
                className="w-full resize-y border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-cream focus:border-brass-400/70 focus:outline-none"
              />

              <div className="grid gap-4 sm:grid-cols-[1fr_1fr_6rem]">
                <TextField
                  label="Author"
                  value={review.author}
                  onChange={(author) =>
                    setContent({
                      ...content,
                      testimonialsList: testimonialsList.map((r) =>
                        r.id === review.id ? { ...r, author } : r,
                      ),
                    })
                  }
                />
                <TextField
                  label="Role / source"
                  value={review.role}
                  onChange={(role) =>
                    setContent({
                      ...content,
                      testimonialsList: testimonialsList.map((r) =>
                        r.id === review.id ? { ...r, role } : r,
                      ),
                    })
                  }
                />
                <TextField
                  label="Stars"
                  type="number"
                  value={review.rating}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      testimonialsList: testimonialsList.map((r) =>
                        r.id === review.id
                          ? { ...r, rating: Math.min(5, Math.max(1, Number(value) || 5)) }
                          : r,
                      ),
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </AdminSection>

      {/* CTA */}
      <AdminSection title="Reservation call-to-action" description="The closing block on the homepage.">
        <div className="space-y-5">
          <TextField
            label="Title"
            value={reservationCta.title}
            onChange={(title) => setContent({ ...content, reservationCta: { ...reservationCta, title } })}
          />
          <TextAreaField
            label="Subtitle"
            rows={3}
            value={reservationCta.subtitle}
            onChange={(subtitle) =>
              setContent({ ...content, reservationCta: { ...reservationCta, subtitle } })
            }
          />
          <TextField
            label="Small print"
            value={reservationCta.note}
            onChange={(note) => setContent({ ...content, reservationCta: { ...reservationCta, note } })}
          />
        </div>
      </AdminSection>
    </div>
  );
}
