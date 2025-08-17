import { useState, useMemo } from 'react'
import { DataTable } from '@components/DataTable'
import type { Column } from '@components/DataTable'
import { Modal } from '@components/Modal'
import { useFormSanitization } from '@hooks/useSanitization'

interface CorporateDonor {
  id: string
  companyName: string
  sector: 'teknoloji' | 'finans' | 'sağlık' | 'eğitim' | 'imalat' | 'hizmet' | 'diğer'
  contactPerson: string
  title: string
  phone: string
  email: string
  address: string
  taxNumber: string
  website?: string
  totalDonations: number
  lastDonation: string
  donationCount: number
  preferredDonationType: 'nakit' | 'ayni' | 'karma'
  corporateAgreement: boolean
  status: 'aktif' | 'pasif' | 'potansiyel'
  notes?: string
}

const mockCorporateDonors: CorporateDonor[] = [
  {
    id: '1',
    companyName: 'TechCorp A.Ş.',
    sector: 'teknoloji',
    contactPerson: 'Ahmet Yılmaz',
    title: 'Kurumsal İletişim Müdürü',
    phone: '0212 555 0101',
    email: 'ahmet.yilmaz@techcorp.com',
    address: 'Maslak, İstanbul',
    taxNumber: '1234567890',
    website: 'www.techcorp.com',
    totalDonations: 250000,
    lastDonation: '2024-01-15',
    donationCount: 12,
    preferredDonationType: 'nakit',
    corporateAgreement: true,
    status: 'aktif',
    notes: 'Düzenli bağışçı, yıllık anlaşma mevcut'
  },
  {
    id: '2',
    companyName: 'FinanceBank',
    sector: 'finans',
    contactPerson: 'Zeynep Kaya',
    title: 'Sosyal Sorumluluk Uzmanı',
    phone: '0212 555 0202',
    email: 'zeynep.kaya@financebank.com',
    address: 'Levent, İstanbul',
    taxNumber: '0987654321',
    website: 'www.financebank.com',
    totalDonations: 180000,
    lastDonation: '2024-01-10',
    donationCount: 8,
    preferredDonationType: 'karma',
    corporateAgreement: true,
    status: 'aktif',
    notes: 'Ramazan döneminde özel kampanyalar düzenliyor'
  },
  {
    id: '3',
    companyName: 'HealthPlus Ltd.',
    sector: 'sağlık',
    contactPerson: 'Mehmet Özkan',
    title: 'Genel Müdür',
    phone: '0312 555 0303',
    email: 'mehmet.ozkan@healthplus.com',
    address: 'Çankaya, Ankara',
    taxNumber: '1122334455',
    totalDonations: 95000,
    lastDonation: '2023-12-20',
    donationCount: 5,
    preferredDonationType: 'ayni',
    corporateAgreement: false,
    status: 'potansiyel',
    notes: 'Tıbbi malzeme bağışı yapıyor'
  }
]

export default function Corporate() {
  const [corporateDonors, setCorporateDonors] = useState<CorporateDonor[]>(mockCorporateDonors)
  const [query, setQuery] = useState('')
  const [sectorFilter, setSectorFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDonor, setEditingDonor] = useState<CorporateDonor | null>(null)
  const [formData, setFormData] = useState({
    companyName: '',
    sector: 'teknoloji' as CorporateDonor['sector'],
    contactPerson: '',
    title: '',
    phone: '',
    email: '',
    address: '',
    taxNumber: '',
    website: '',
    preferredDonationType: 'nakit' as CorporateDonor['preferredDonationType'],
    corporateAgreement: false,
    notes: ''
  })

  const filteredDonors = useMemo(() => {
    return corporateDonors.filter(donor => {
      const matchesQuery = JSON.stringify(donor).toLowerCase().includes(query.toLowerCase())
      const matchesSector = !sectorFilter || donor.sector === sectorFilter
      const matchesStatus = !statusFilter || donor.status === statusFilter
      return matchesQuery && matchesSector && matchesStatus
    })
  }, [corporateDonors, query, sectorFilter, statusFilter])

  const columns: Column<CorporateDonor>[] = [
    { key: 'companyName', header: 'Şirket Adı' },
    {
      key: 'sector',
      header: 'Sektör',
      render: (_, row: CorporateDonor) => (
        <span className={`px-2 py-1 rounded text-xs ${
          row.sector === 'teknoloji' ? 'bg-blue-100 text-blue-800' :
          row.sector === 'finans' ? 'bg-green-100 text-green-800' :
          row.sector === 'sağlık' ? 'bg-red-100 text-red-800' :
          row.sector === 'eğitim' ? 'bg-purple-100 text-purple-800' :
          row.sector === 'imalat' ? 'bg-orange-100 text-orange-800' :
          row.sector === 'hizmet' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {row.sector}
        </span>
      )
    },
    { key: 'contactPerson', header: 'İletişim Kişisi' },
    { key: 'title', header: 'Ünvan' },
    { key: 'phone', header: 'Telefon' },
    { key: 'email', header: 'E-posta' },
    {
      key: 'totalDonations',
      header: 'Toplam Bağış',
      render: (_, row: CorporateDonor) => `${row.totalDonations.toLocaleString('tr-TR')} ₺`
    },
    {
      key: 'donationCount',
      header: 'Bağış Sayısı',
      render: (_, row: CorporateDonor) => row.donationCount.toString()
    },
    {
      key: 'corporateAgreement',
      header: 'Anlaşma',
      render: (_, row: CorporateDonor) => (
        <span className={`px-2 py-1 rounded text-xs ${
          row.corporateAgreement ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {row.corporateAgreement ? 'Var' : 'Yok'}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Durum',
      render: (_, row: CorporateDonor) => (
        <span className={`px-2 py-1 rounded text-xs ${
          row.status === 'aktif' ? 'bg-green-100 text-green-800' :
          row.status === 'pasif' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      key: 'id',
      header: 'İşlemler',
      render: (_, donor: CorporateDonor) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(donor)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Düzenle
          </button>
          <button
            onClick={() => handleDelete(donor.id)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Sil
          </button>
        </div>
      )
    }
  ]

  const handleEdit = (donor: CorporateDonor) => {
    setEditingDonor(donor)
    setFormData({
      companyName: donor.companyName,
      sector: donor.sector,
      contactPerson: donor.contactPerson,
      title: donor.title,
      phone: donor.phone,
      email: donor.email,
      address: donor.address,
      taxNumber: donor.taxNumber,
      website: donor.website || '',
      preferredDonationType: donor.preferredDonationType,
      corporateAgreement: donor.corporateAgreement,
      notes: donor.notes || ''
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Bu kurumsal bağışçıyı silmek istediğinizden emin misiniz?')) {
      setCorporateDonors(corporateDonors.filter(donor => donor.id !== id))
    }
  }

  const { sanitizeFormField, createSanitizedChangeHandler } = useFormSanitization()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Sanitize form data before submission
    const sanitizedFormData = {
      companyName: sanitizeFormField(formData.companyName, 'text'),
      sector: formData.sector,
      contactPerson: sanitizeFormField(formData.contactPerson, 'text'),
      title: sanitizeFormField(formData.title, 'text'),
      phone: sanitizeFormField(formData.phone, 'phone'),
      email: sanitizeFormField(formData.email, 'email'),
      address: sanitizeFormField(formData.address, 'text'),
      taxNumber: sanitizeFormField(formData.taxNumber, 'text'),
      website: sanitizeFormField(formData.website, 'text'),
      preferredDonationType: formData.preferredDonationType,
      corporateAgreement: formData.corporateAgreement,
      notes: sanitizeFormField(formData.notes, 'text')
    }
    
    if (editingDonor) {
      // Güncelleme
      setCorporateDonors(corporateDonors.map(donor => 
        donor.id === editingDonor.id 
          ? { 
              ...donor, 
              ...sanitizedFormData,
              website: sanitizedFormData.website || undefined,
              notes: sanitizedFormData.notes || undefined
            }
          : donor
      ))
    } else {
      // Yeni ekleme
      const newDonor: CorporateDonor = {
        id: Date.now().toString(),
        ...sanitizedFormData,
        website: sanitizedFormData.website || undefined,
        notes: sanitizedFormData.notes || undefined,
        totalDonations: 0,
        lastDonation: '-',
        donationCount: 0,
        status: 'potansiyel'
      }
      setCorporateDonors([...corporateDonors, newDonor])
    }
    
    setIsModalOpen(false)
    setEditingDonor(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      companyName: '',
      sector: 'teknoloji',
      contactPerson: '',
      title: '',
      phone: '',
      email: '',
      address: '',
      taxNumber: '',
      website: '',
      preferredDonationType: 'nakit',
      corporateAgreement: false,
      notes: ''
    })
  }

  const openAddModal = () => {
    setEditingDonor(null)
    resetForm()
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Kurumsal Bağışçılar</h2>
          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Yeni Kurumsal Bağışçı Ekle
          </button>
        </div>

        {/* Arama ve Filtreler */}
        <div className="flex items-center gap-4 mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Şirket adı, kişi, telefon veya e-posta ile ara..."
          />
          <select 
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Tüm Sektörler</option>
            <option value="teknoloji">Teknoloji</option>
            <option value="finans">Finans</option>
            <option value="sağlık">Sağlık</option>
            <option value="eğitim">Eğitim</option>
            <option value="imalat">İmalat</option>
            <option value="hizmet">Hizmet</option>
            <option value="diğer">Diğer</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Tüm Durumlar</option>
            <option value="aktif">Aktif</option>
            <option value="pasif">Pasif</option>
            <option value="potansiyel">Potansiyel</option>
          </select>
        </div>

        <DataTable columns={columns} data={filteredDonors} />
      </div>

      {/* Kurumsal Bağışçı Ekleme/Düzenleme Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDonor ? 'Kurumsal Bağışçı Düzenle' : 'Yeni Kurumsal Bağışçı Ekle'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Şirket Adı</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={createSanitizedChangeHandler(
                  (value) => setFormData({...formData, companyName: value}),
                  'text'
                )}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Sektör</label>
              <select
                value={formData.sector}
                onChange={(e) => setFormData({...formData, sector: e.target.value as CorporateDonor['sector']})}
                className="w-full border rounded px-3 py-2"
              >
                <option value="teknoloji">Teknoloji</option>
                <option value="finans">Finans</option>
                <option value="sağlık">Sağlık</option>
                <option value="eğitim">Eğitim</option>
                <option value="imalat">İmalat</option>
                <option value="hizmet">Hizmet</option>
                <option value="diğer">Diğer</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">İletişim Kişisi</label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={createSanitizedChangeHandler(
                  (value) => setFormData({...formData, contactPerson: value}),
                  'text'
                )}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Ünvan</label>
              <input
                type="text"
                value={formData.title}
                onChange={createSanitizedChangeHandler(
                  (value) => setFormData({...formData, title: value}),
                  'text'
                )}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Telefon</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={createSanitizedChangeHandler(
                  (value) => setFormData({...formData, phone: value}),
                  'phone'
                )}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">E-posta</label>
              <input
                type="email"
                value={formData.email}
                onChange={createSanitizedChangeHandler(
                  (value) => setFormData({...formData, email: value}),
                  'email'
                )}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Adres</label>
            <textarea
              value={formData.address}
              onChange={createSanitizedChangeHandler(
                (value) => setFormData({...formData, address: value}),
                'text'
              )}
              className="w-full border rounded px-3 py-2"
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Vergi Numarası</label>
              <input
                type="text"
                value={formData.taxNumber}
                onChange={createSanitizedChangeHandler(
                  (value) => setFormData({...formData, taxNumber: value}),
                  'text'
                )}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={createSanitizedChangeHandler(
                  (value) => setFormData({...formData, website: value}),
                  'text'
                )}
                className="w-full border rounded px-3 py-2"
                placeholder="https://"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tercih Edilen Bağış Türü</label>
            <select
              value={formData.preferredDonationType}
              onChange={(e) => setFormData({...formData, preferredDonationType: e.target.value as CorporateDonor['preferredDonationType']})}
              className="w-full border rounded px-3 py-2"
            >
              <option value="nakit">Nakit</option>
              <option value="ayni">Ayni</option>
              <option value="karma">Karma</option>
            </select>
          </div>
          
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.corporateAgreement}
                onChange={(e) => setFormData({...formData, corporateAgreement: e.target.checked})}
                className="rounded"
              />
              <span className="text-sm font-medium">Kurumsal Anlaşma Mevcut</span>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Notlar</label>
            <textarea
              value={formData.notes}
              onChange={createSanitizedChangeHandler(
                (value) => setFormData({...formData, notes: value}),
                'text'
              )}
              className="w-full border rounded px-3 py-2"
              rows={3}
              placeholder="Kurumsal bağışçı hakkında notlar..."
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingDonor ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}