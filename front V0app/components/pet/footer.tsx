import { Heart } from "lucide-react"

const links = {
  Adopt: ["Browse Pets", "Dog Breeds", "Cat Breeds", "Other Animals"],
  Resources: ["Pet Care Tips", "Training Guides", "Vet Partners", "FAQ"],
  Organization: ["About Us", "Our Mission", "Volunteer", "Careers"],
  Connect: ["Contact Us", "Instagram", "Facebook", "Newsletter"],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Heart
                  className="h-3.5 w-3.5 text-primary-foreground"
                  fill="currentColor"
                />
              </div>
              <span className="text-lg font-bold text-card-foreground">
                FurEver Home
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Connecting loving families with pets in need since 2013.
            </p>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold text-card-foreground">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            2026 FurEver Home. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
