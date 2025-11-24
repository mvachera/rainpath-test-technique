import type { Case } from '../types/case.types';

interface CaseGraphProps {
  caseData: Case;
}

export const CaseGraph = ({ caseData }: CaseGraphProps) => {
  return (
    <div className="p-5 bg-gray-100 rounded-lg">
      <div className="text-center mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800">Dossier: {caseData.id}</h2>
      </div>

      <div className="flex gap-16 justify-center flex-wrap">
        {caseData.prelevements.map((prelevement) => (
          <div key={prelevement.id} className="flex flex-col items-center min-w-[250px]">
            <div className="bg-blue-500 text-white px-8 py-5 rounded-xl text-center shadow-md min-w-[200px]">
              <h3 className="text-base font-semibold mb-2">Prélèvement</h3>
              <p className="text-sm opacity-90">{prelevement.id}</p>
            </div>
            <div className="text-4xl text-gray-500 my-3">↓</div>

            <div className="flex gap-12 flex-wrap justify-center items-start">
              {prelevement.blocs.map((bloc) => (
                <div key={bloc.id} className="flex flex-col items-center">
                  <div className="bg-green-500 text-white px-6 py-4 rounded-lg text-center shadow-md min-w-[150px]">
                    <h4 className="text-sm font-semibold mb-1">Bloc</h4>
                    <p className="text-xs opacity-90">{bloc.id}</p>
                  </div>
                  <div className="text-3xl text-gray-500 my-2">↓</div>

                  <div className="flex flex-col gap-2">
                    {bloc.lames.map((lame) => (
                      <div key={lame.id} className="bg-white border-2 border-purple-500 rounded-lg px-4 py-3 min-w-[120px] shadow hover:-translate-y-1 transition-transform">
                        <div className="text-xs text-gray-500 mb-1">Lame {lame.id}</div>
                        <div className="text-base font-semibold text-purple-600">{lame.coloration.replace(/_/g, ' ')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};