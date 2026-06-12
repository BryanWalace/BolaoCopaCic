import { useState } from 'react'
import {
  collection, addDoc, doc, updateDoc, serverTimestamp
} from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { Profile } from '../../types'
import toast from 'react-hot-toast'

interface Props {
  profile?: Profile
  onClose: () => void
}

const AVATAR_COLORS = [
  '#B22234', '#002868', '#006847', '#FFD700',
  '#7C3AED', '#0891B2', '#059669', '#D97706',
  '#DB2777', '#EA580C',
]

export default function ProfileModal({ profile, onClose }: Props) {
  const [name, setName] = useState(profile?.name ?? '')
  const [color, setColor] = useState(profile?.color ?? AVATAR_COLORS[0])
  const [saving, setSaving] = useState(false)

  const isEditing = !!profile

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setSaving(true)
    try {
      if (isEditing) {
        await updateDoc(doc(db, 'profiles', profile.id), { name: name.trim(), color })
        toast.success('Perfil atualizado ✓')
      } else {
        await addDoc(collection(db, 'profiles'), {
          name: name.trim(),
          color,
          createdAt: serverTimestamp(),
        })
        toast.success('Perfil criado ✓')
      }
      onClose()
    } catch (err) {
      console.error(err)
      toast.error('Erro ao salvar perfil')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-card-dark border border-border-dim rounded-2xl w-full max-w-sm p-6 animate-slide-up shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-white tracking-wide">
            {isEditing ? 'EDITAR PERFIL' : 'NOVO PERFIL'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-card-hover transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar preview */}
          <div className="flex justify-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold border-2 transition-all duration-200"
              style={{ backgroundColor: color + '33', borderColor: color }}
            >
              {name.charAt(0).toUpperCase() || '?'}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-1.5 font-medium">Nome</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Seu nome no bolão"
              maxLength={24}
              className="w-full bg-bg-dark border border-border-dim rounded-lg px-3 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm text-gray-400 mb-2 font-medium">Cor do avatar</label>
            <div className="grid grid-cols-5 gap-2">
              {AVATAR_COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-150 hover:scale-110 active:scale-95 ${
                    color === c ? 'border-white scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!name.trim() || saving}
            className="w-full btn-primary py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Criar perfil'}
          </button>
        </form>
      </div>
    </div>
  )
}
