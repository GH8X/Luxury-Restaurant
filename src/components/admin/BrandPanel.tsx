import { AdminSection, TextAreaField, TextField } from "@/components/admin/AdminKit";
import { useSite } from "@/lib/store";

export function BrandPanel() {
  const { content, setContent } = useSite();
  const { brand, contact } = content;

  const patchBrand = (changes: Partial<typeof brand>) =>
    setContent({ ...content, brand: { ...brand, ...changes } });

  const patchContact = (changes: Partial<typeof contact>) =>
    setContent({ ...content, contact: { ...contact, ...changes } });

  return (
    <div className="space-y-6">
      <AdminSection
        title="Restaurant identity"
        description="Used in the navigation, footer, page titles and confirmation messages."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Restaurant name" value={brand.name} onChange={(name) => patchBrand({ name })} />
          <TextField
            label="Navigation wordmark"
            value={brand.wordmark}
            onChange={(wordmark) => patchBrand({ wordmark })}
          />
          <TextField label="Tagline" value={brand.tagline} onChange={(tagline) => patchBrand({ tagline })} />
          <TextField
            label="Award line"
            value={brand.michelin}
            onChange={(michelin) => patchBrand({ michelin })}
          />
        </div>
      </AdminSection>

      <AdminSection
        title="Contact details"
        description="Phone and WhatsApp numbers power the call buttons and the WhatsApp reservation link."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Phone" value={contact.phone} onChange={(phone) => patchContact({ phone })} />
          <TextField
            label="WhatsApp number"
            hint="with country code"
            value={contact.whatsapp}
            onChange={(whatsapp) => patchContact({ whatsapp })}
          />
          <TextField label="Email" value={contact.email} onChange={(email) => patchContact({ email })} />
          <TextField label="Street address" value={contact.address} onChange={(address) => patchContact({ address })} />
          <TextField label="City & postcode" value={contact.city} onChange={(city) => patchContact({ city })} />
          <TextField
            label="Instagram URL"
            value={contact.instagram}
            onChange={(instagram) => patchContact({ instagram })}
          />
          <TextField
            label="Facebook URL"
            value={contact.facebook}
            onChange={(facebook) => patchContact({ facebook })}
          />
        </div>

        <div className="mt-5">
          <TextAreaField
            label="Map search query"
            rows={2}
            hint="used for the embedded map"
            value={contact.mapQuery}
            onChange={(mapQuery) => patchContact({ mapQuery })}
          />
        </div>
      </AdminSection>

      <AdminSection
        title="Location & dress code"
        description="Shown beside the map on the homepage and the contact page."
      >
        <div className="space-y-5">
          <TextField
            label="Kicker"
            value={content.location.kicker}
            onChange={(kicker) => setContent({ ...content, location: { ...content.location, kicker } })}
          />
          <TextField
            label="Title"
            value={content.location.title}
            onChange={(title) => setContent({ ...content, location: { ...content.location, title } })}
          />
          <TextAreaField
            label="Description"
            rows={3}
            value={content.location.description}
            onChange={(description) =>
              setContent({ ...content, location: { ...content.location, description } })
            }
          />
          <TextField
            label="Dress code"
            value={content.location.dressCode}
            onChange={(dressCode) =>
              setContent({ ...content, location: { ...content.location, dressCode } })
            }
          />
          <TextField
            label="Parking & transport"
            value={content.location.parking}
            onChange={(parking) =>
              setContent({ ...content, location: { ...content.location, parking } })
            }
          />
        </div>
      </AdminSection>

      <AdminSection
        title="Tasting menu"
        description="The chef's-choice panel shown on the menu page and the homepage."
      >
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Title"
              value={content.menuPage.tastingMenuTitle}
              onChange={(tastingMenuTitle) =>
                setContent({ ...content, menuPage: { ...content.menuPage, tastingMenuTitle } })
              }
            />
            <TextField
              label="Price (€)"
              type="number"
              value={content.menuPage.tastingMenuPrice}
              onChange={(value) =>
                setContent({
                  ...content,
                  menuPage: { ...content.menuPage, tastingMenuPrice: Number(value) || 0 },
                })
              }
            />
          </div>
          <TextAreaField
            label="Description"
            rows={3}
            value={content.menuPage.tastingMenuDescription}
            onChange={(tastingMenuDescription) =>
              setContent({ ...content, menuPage: { ...content.menuPage, tastingMenuDescription } })
            }
          />
        </div>
      </AdminSection>
    </div>
  );
}
