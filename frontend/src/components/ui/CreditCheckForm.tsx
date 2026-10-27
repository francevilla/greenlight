import * as React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/Select'

type Provider = 'CERVED' | 'CRIBIS' | 'CREDITSAFE'

interface FormData {
  companyName: string
  vatNumber: string
  taxCode: string
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
    taxCode: '',
    provider: 'CERVED',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const validate = (): boolean => {
    const errors: Record<string, string> = {}
    if (!formData.companyName.trim()) {
      errors.companyName = 'Ragione sociale obbligatoria'
    }
    if (!formData.vatNumber.trim()) {
      errors.vatNumber = 'Partita IVA obbligatoria'
    } else if (formData.vatNumber.length !== 11 || !/^\d+$/.test(formData.vatNumber)) {
      errors.vatNumber = 'Partita IVA deve essere 11 cifre'
    }
    if (!formData.taxCode.trim()) {
      errors.taxCode = 'Codice fiscale obbligatorio'
    } else if (formData.taxCode.length !== 16) {
      errors.taxCode = 'Codice fiscale deve essere 16 caratteri'
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
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="companyName">Ragione sociale</Label>
          <Input
            id="companyName"
            placeholder="Es: Acme Marketing S.r.l."
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            error={!!formErrors.companyName}
          />
          {formErrors.companyName && (
            <p className="text-sm text-semantic-rosso">
              {formErrors.companyName}
            </p>
          )}
        </div>
        <div className="space-y-2">
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
        <div className="space-y-2">
          <Label htmlFor="taxCode">Codice fiscale</Label>
          <Input
            id="taxCode"
            maxLength={16}
            placeholder="RSSMRA80A01H501Z"
            value={formData.taxCode}
            onChange={(e) => setFormData({ ...formData, taxCode: e.target.value.toUpperCase() })}
            error={!!formErrors.taxCode}
          />
          {formErrors.taxCode && (
            <p className="text-sm text-semantic-rosso">
              {formErrors.taxCode}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="provider">Fonte dati</Label>
        <Select
          value={formData.provider}
          onValueChange={(v) => setFormData({ ...formData, provider: v as Provider })}
        >
          <SelectTrigger id="provider">
            <SelectValue placeholder="Seleziona fonte" />
          </SelectTrigger>
          <SelectContent>
            {PROVIDERS.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4 pt-4 border-t border-border">
        <Button
          type="submit"
          className="flex-1"
          disabled={submitting}
          size="lg"
        >
          {submitting ? 'Verifica in corso…' : 'Verifica Credito'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setFormData({ companyName: '', vatNumber: '', taxCode: '', provider: 'CERVED' })
          }
          disabled={submitting}
        >
          Reset
        </Button>
      </div>
    </form>
  )
}
