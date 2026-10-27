import * as React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'

type Provider = 'CERVED' | 'CRIBIS' | 'CREDITSAFE'

interface FormData {
  companyName: string
  vatNumber: string
  provider: Provider
}

const PROVIDERS = [
  { value: 'CERVED', label: 'Cerved' },
  { value: 'CRIBIS', label: 'Cribis' },
  { value: 'CREDITSAFE', label: 'Credit Safe' },
]

interface CreditCheckFormProps {
  onSubmit: (data: FormData) => Promise<void>
  submitting?: boolean
}

export function CreditCheckForm({
  onSubmit,
  submitting = false,
}: CreditCheckFormProps) {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    vatNumber: '',
    provider: 'CERVED',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const validate = (): boolean => {
    const errors: Record<string, string> = {}
    if (!formData.vatNumber.trim()) {
      errors.vatNumber = 'Partita IVA obbligatoria'
    } else if (formData.vatNumber.length !== 11 || !/^\d+$/.test(formData.vatNumber)) {
      errors.vatNumber = 'Partita IVA deve essere 11 cifre'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    await onSubmit({ ...formData })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="companyName">Ragione sociale (opzionale)</Label>
          <Input
            id="companyName"
            placeholder="Es: Acme Marketing S.r.l."
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="vatNumber">Partita IVA</Label>
          <Input
            id="vatNumber"
            inputMode="numeric"
            maxLength={11}
            placeholder="12345678901"
            value={formData.vatNumber}
            onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
            error={!!formErrors.vatNumber}
          />
          {formErrors.vatNumber && (
            <p className="text-sm text-semantic-rosso">
              {formErrors.vatNumber}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="provider">Fonte dati</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PROVIDERS.map((p) => (
            <button
              key={p.value}
              type="button"
              role="radio"
              aria-checked={formData.provider === p.value}
              onClick={() => setFormData({ ...formData, provider: p.value as Provider })}
              className={`tap-target py-3 rounded-lg border text-sm font-medium transition-colors ${
                formData.provider === p.value
                  ? 'border-verde bg-[rgba(23,178,106,0.1)] text-ink'
                  : 'border-border text-ink/60 hover:border-border/50'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <p className="text-[0.75rem] text-ink/50 leading-relaxed">
          Il CF viene derivato automaticamente dalla partita IVA. Primo check: gratuito, senza carta.
        </p>
      </div>

      <div className="flex gap-4 pt-4 border-t border-border">
        <Button
          type="submit"
          className="flex-1 bg-verde text-ink hover:bg-[#15803d]"
          disabled={submitting}
          size="lg"
        >
          {submitting ? 'Verifica in corso…' : 'Verifica Credito'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setFormData({ companyName: '', vatNumber: '', provider: 'CERVED' })
          }
          disabled={submitting}
        >
          Reset
        </Button>
      </div>
    </form>
  )
}
