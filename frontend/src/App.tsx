import { useState, useEffect } from 'react';
import type { Case, CreateCaseDto } from './types/case.types';
import { casesApi } from './services/api';
import { CaseGraph } from './components/CaseGraph';
import { CaseForm } from './components/CaseForm';

function App() {
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'form' | 'view'>('form');

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      const data = await casesApi.getAllCases();
      setCases(data);
      if (data.length > 0 && !selectedCase) {
        setSelectedCase(data[0]);
      }
    } catch (error) {
      console.error('Error loading cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCase = async (data: CreateCaseDto) => {
    const newCase = await casesApi.createCase(data);
    await loadCases();
    setSelectedCase(newCase);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="text-white text-2xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-5">
      <header className="text-center text-white mb-8">
        <h1 className="text-4xl font-bold mb-2">🔬 Gestion de Dossiers - Anatomopathologie</h1>
        <p className="text-lg opacity-95">Visualisation et création de dossiers hiérarchiques</p>
      </header>

      <div className="flex gap-3 justify-center mb-8">
        <button
          className={`px-6 py-3 rounded-lg font-semibold shadow transition ${
            activeTab === 'form' ? 'bg-purple-600 text-white' : 'bg-white text-gray-800 hover:shadow-lg'
          }`}
          onClick={() => setActiveTab('form')}
        >
          📝 Créer un dossier
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-semibold shadow transition ${
            activeTab === 'view' ? 'bg-purple-600 text-white' : 'bg-white text-gray-800 hover:shadow-lg'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={() => setActiveTab('view')}
          disabled={cases.length === 0}
        >
          📊 Visualiser ({cases.length})
        </button>
      </div>

      <main className="max-w-7xl mx-auto">
        {activeTab === 'form' && (
          <div className="animate-fadeIn">
            <CaseForm onSubmit={handleCreateCase} />
          </div>
        )}

        {activeTab === 'view' && (
          <div className="animate-fadeIn">
            {cases.length === 0 ? (
              <div className="bg-white p-16 rounded-xl shadow-lg text-center max-w-lg mx-auto">
                <p className="text-xl text-gray-600 mb-6">Aucun dossier créé pour le moment.</p>
                <button onClick={() => setActiveTab('form')} className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold">
                  Créer un premier dossier
                </button>
              </div>
            ) : (
              <>
                <div className="bg-white p-5 rounded-lg shadow mb-6 flex items-center gap-4 max-w-2xl mx-auto">
                  <label className="font-semibold text-gray-800 whitespace-nowrap">Sélectionner un dossier:</label>
                  <select
                    value={selectedCase?.id?.toString() || ''}
                    onChange={(e) => {
                      const caseItem = cases.find((c) => c.id === Number(e.target.value));
                      setSelectedCase(caseItem || null);
                    }}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
                  >
                    {cases.map((c) => (
                      <option key={c.id} value={c.id}>
                        Dossier {c.id}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCase && <CaseGraph caseData={selectedCase} />}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;