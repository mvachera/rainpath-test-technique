import { useState } from 'react';
import type { CreateCaseDto } from '../types/case.types';

interface CaseFormProps {
  onSubmit: (data: CreateCaseDto) => Promise<void>;
}

interface LameForm {
  coloration: string;
}

interface BlocForm {
  lames: LameForm[];
}

interface PrelevementForm {
  blocs: BlocForm[];
}

const COLORATIONS = ['HES', 'PAS', 'IHC', 'TRICHROME', 'ALCIAN_BLUE', 'CONGO_RED', 'MASSON', 'GIEMSA', 'PAS_D'];

export const CaseForm = ({ onSubmit }: CaseFormProps) => {
  const [prelevements, setPrelevements] = useState<PrelevementForm[]>([
    { blocs: [{ lames: [{ coloration: '' }] }] },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const addPrelevement = () => {
    setPrelevements([...prelevements, { blocs: [{ lames: [{ coloration: '' }] }] }]);
  };

  const removePrelevement = (pIndex: number) => {
    setPrelevements(prelevements.filter((_, i) => i !== pIndex));
  };

  const addBloc = (pIndex: number) => {
    const updated = [...prelevements];
    updated[pIndex].blocs.push({ lames: [{ coloration: '' }] });
    setPrelevements(updated);
  };

  const removeBloc = (pIndex: number, bIndex: number) => {
    const updated = [...prelevements];
    updated[pIndex].blocs = updated[pIndex].blocs.filter((_, i) => i !== bIndex);
    setPrelevements(updated);
  };

  const addLame = (pIndex: number, bIndex: number) => {
    const updated = [...prelevements];
    updated[pIndex].blocs[bIndex].lames.push({ coloration: '' });
    setPrelevements(updated);
  };

  const removeLame = (pIndex: number, bIndex: number, lIndex: number) => {
    const updated = [...prelevements];
    updated[pIndex].blocs[bIndex].lames = updated[pIndex].blocs[bIndex].lames.filter((_, i) => i !== lIndex);
    setPrelevements(updated);
  };

  const updateColoration = (pIndex: number, bIndex: number, lIndex: number, value: string) => {
    const updated = [...prelevements];
    updated[pIndex].blocs[bIndex].lames[lIndex].coloration = value;
    setPrelevements(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      await onSubmit({ prelevements });
      setMessage({ type: 'success', text: 'Dossier créé avec succès!' });
      setPrelevements([{ blocs: [{ lames: [{ coloration: '' }] }] }]);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la création du dossier.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Créer un nouveau dossier</h2>

      {message && (
        <div className={`p-3 rounded-lg mb-5 text-center font-medium ${
          message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {message.text}
        </div>
      )}

      {prelevements.map((prelevement, pIndex) => (
        <div key={pIndex} className="bg-blue-50 p-5 rounded-lg mb-5 border-2 border-blue-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-blue-700">Prélèvement {pIndex + 1}</h3>
            {prelevements.length > 1 && (
              <button type="button" onClick={() => removePrelevement(pIndex)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm">
                Supprimer prélèvement
              </button>
            )}
          </div>

          {prelevement.blocs.map((bloc, bIndex) => (
            <div key={bIndex} className="bg-green-50 p-4 rounded-lg mb-4 border-2 border-green-500">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-lg font-semibold text-green-700">Bloc {bIndex + 1}</h4>
                {prelevement.blocs.length > 1 && (
                  <button type="button" onClick={() => removeBloc(pIndex, bIndex)} className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">
                    Supprimer bloc
                  </button>
                )}
              </div>

              {bloc.lames.map((lame, lIndex) => (
                <div key={lIndex} className="flex items-center gap-3 mb-3">
                  <label className="min-w-[80px] font-medium text-gray-700">Lame {lIndex + 1}:</label>
                  <select
                    value={lame.coloration}
                    onChange={(e) => updateColoration(pIndex, bIndex, lIndex, e.target.value)}
                    required
                    className="flex-1 px-3 py-2 border-2 border-gray-300 rounded focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">Sélectionner...</option>
                    {COLORATIONS.map((col) => (
                      <option key={col} value={col}>
                        {col.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                  {bloc.lames.length > 1 && (
                    <button type="button" onClick={() => removeLame(pIndex, bIndex, lIndex)} className="w-7 h-7 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center text-lg">
                      ×
                    </button>
                  )}
                </div>
              ))}

              <button type="button" onClick={() => addLame(pIndex, bIndex)} className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                + Ajouter une lame
              </button>
            </div>
          ))}

          <button type="button" onClick={() => addBloc(pIndex)} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            + Ajouter un bloc
          </button>
        </div>
      ))}

      <button type="button" onClick={addPrelevement} className="w-full mb-5 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
        + Ajouter un prélèvement
      </button>

      <button type="submit" disabled={isSubmitting} className="w-full px-4 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 font-bold text-lg">
        {isSubmitting ? 'Création en cours...' : 'Créer le dossier'}
      </button>
    </form>
  );
};