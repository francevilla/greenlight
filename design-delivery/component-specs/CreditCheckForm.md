# Component Spec — CreditCheckForm

**File sorgente:** `frontend/src/components/ui/CreditCheckForm.tsx`
**Destinazione d'uso:** dashboard tab "Nuova verifica", pagina verifica dedicata, modal.

## Descrizione narrativa
Form per inserire ragione sociale, partita IVA (mascherina 11 cifre), codice fiscale (mascherina 16 caratteri), selezione fonte dati. Validazione inline in tempo reale con icona check/cross a destra di ogni input. Durante l'attesa API (3-8s reale), il bottone entra in stato di carica e non si può inviare di nuovo.

## Struttura componenti (shadcn/ui)
- `Form` + `FormField` + `FormItem` + `FormLabel` + `FormControl` + `FormMessage`
- `Input` con mascherina
- `Select` per provider
- `Button` primary
- `Checkbox` opzionale (accettazione termini)

## Pseudo-codice React + Tailwind

```tsx
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select'

const schema = z.object({
  companyName: z.string().min(2, 'Ragione sociale obbligatoria'),
  vatNumber: z.string().regex(/^\d{11}$/, 'Partita IVA deve essere 11 cifre'),
  taxCode: z.string().length(16, 'Codice fiscale deve essere 16 caratteri'),
  provider: z.enum(['CERVED', 'CRIBIS', 'CREDITSAFE']),
})

type FormData = z.infer<typeof schema>

const PROVIDERS = [
  { value: 'CERVED', label: 'Cerved' },
  { value: 'CRIBIS', label: 'Cribis' },
  { value: 'CREDITSAFE', label: 'Credit Safe' },
]

interface CreditCheckFormProps {
  onSubmit: (data: FormData) => Promise<void>
  submitting?: boolean
}

export function CreditCheckForm({ onSubmit, submitting = false }: CreditCheckFormProps) {
  const form = useForm<FormData>({ resolver: zodResolver(schema) })

  return (
    <form {...form.handleSubmit(async (data) => { await onSubmit(data) })} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="companyName">Ragione sociale</Label>
          <Input id="companyName" placeholder="Es: Acme Marketing S.r.l." {...form.register('companyName')} />
          {form.formState.errors.companyName && <p className="text-sm text-semantic-rosso">{form.formState.errors.companyName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="vatNumber">Partita IVA</Label>
          <Input id="vatNumber" inputMode="numeric" maxLength={11} placeholder="12345678901" {...form.register('vatNumber')} />
          {form.formState.errors.vatNumber && <p className="text-sm text-semantic-rosso">{form.formState.errors.vatNumber.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="taxCode">Codice fiscale</Label>
          <Input id="taxCode" maxLength={16} placeholder="RSSMRA80A01H501Z" {...form.register('taxCode')} />
          {form.formState.errors.taxCode && <p className="text-sm text-semantic-rosso">{form.formState.errors.taxCode.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="provider">Fonte dati</Label>
        <Select {...form.register('provider')}>
          <SelectTrigger id="provider">
            <SelectValue placeholder="Seleziona fonte" />
          </SelectTrigger>
          <SelectContent>
            {PROVIDERS.map((p) => (
              <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4 pt-4 border-t border-border">
        <Button type="submit" className="flex-1" disabled={submitting} size="lg">
          {submitting ? 'Verifica in corso…' : 'Verifica Credito'}
        </Button>
        <Button type="button" variant="outline" onClick={form.reset} disabled={submitting}>
          Reset
        </Button>
      </div>
    </form>
  )
}
```

## Note di animazione
- Errore input: shake orizzontale 150ms (opzionale, Framer Motion `x: [0, -5, 5, 0]`).
- Stato carica: bottone disabilitato, opacity 0.7, testo cambia.
- Submit successo: toast + redirect al dettaglio report (300ms fade).

## Do & Don't
- ✅ Mascherina automatica per P.IVA e CF (solo numeri/alfanumerico).
- ✅ Validazione inline al blur, non solo al submit.
- ✅ Bottone disabilitato durante attesa API.
- ❌ Nessun submit se form non valido.
- ❌ Nessuna pagina bianca durante attesa API.
