import { StepWrapper } from '../StepWrapper';
import { useOnboardingStore } from '../../store/onboardingStore';
import { Plus, X } from 'lucide-react';

export const NCLEXStatusStep: React.FC = () => {
  const { data, updateNCLEXStatus, nextStep, previousStep } = useOnboardingStore();
  const nclexData = data.nclexStatus;

  const isValid = nclexData.hasTakenNCLEX !== undefined && nclexData.planToTake && 
    nclexData.studyTimeframe && nclexData.needsSupport !== undefined;

  const studyMaterialOptions = [
    'UWorld',
    'Kaplan',
    'ATI',
    'Hurst Review',
    'NCSBN Learning Extension',
    'Saunders Comprehensive Review',
    'Mark Klimek Lectures',
    'BoardVitals',
    'Archer Review',
    'Simple Nursing'
  ];

  const toggleStudyMaterial = (material: string) => {
    if (nclexData.studyMaterials.includes(material)) {
      updateNCLEXStatus({ 
        studyMaterials: nclexData.studyMaterials.filter(m => m !== material) 
      });
    } else {
      updateNCLEXStatus({ 
        studyMaterials: [...nclexData.studyMaterials, material] 
      });
    }
  };

  return (
    <StepWrapper
      title="Estado del NCLEX-RN"
      subtitle="El NCLEX-RN es el examen requerido para ejercer como enfermera en Estados Unidos"
      onNext={nextStep}
      onPrevious={previousStep}
      canGoNext={!!isValid}
    >
      <div className="space-y-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>Información importante:</strong> El NCLEX-RN es un examen computarizado que evalúa 
            tus conocimientos de enfermería según los estándares estadounidenses. Mora Health te apoyará 
            en todo el proceso de preparación y registro.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ¿Has tomado el examen NCLEX-RN anteriormente? *
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="hasTakenNCLEX"
                checked={nclexData.hasTakenNCLEX === true}
                onChange={() => updateNCLEXStatus({ hasTakenNCLEX: true })}
                className="mr-2 text-blue-600"
              />
              Sí, he tomado el NCLEX-RN
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="hasTakenNCLEX"
                checked={nclexData.hasTakenNCLEX === false}
                onChange={() => updateNCLEXStatus({ hasTakenNCLEX: false })}
                className="mr-2 text-blue-600"
              />
              No, nunca he tomado el NCLEX-RN
            </label>
          </div>
        </div>

        {nclexData.hasTakenNCLEX && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resultado del examen
            </label>
            <select
              value={nclexData.nclexResult}
              onChange={(e) => updateNCLEXStatus({ nclexResult: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Selecciona el resultado</option>
              <option value="aprobado">Aprobado</option>
              <option value="no-aprobado">No aprobado</option>
              <option value="pendiente">Resultado pendiente</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ¿Cuáles son tus planes respecto al NCLEX-RN? *
          </label>
          <select
            value={nclexData.planToTake}
            onChange={(e) => updateNCLEXStatus({ planToTake: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Selecciona tu plan</option>
            <option value="tomar-pronto">Quiero tomarlo lo antes posible</option>
            <option value="estudiar-3-meses">Necesito 3 meses de preparación</option>
            <option value="estudiar-6-meses">Necesito 6 meses de preparación</option>
            <option value="estudiar-mas-6-meses">Necesito más de 6 meses de preparación</option>
            <option value="ya-aprobado">Ya lo aprobé</option>
            <option value="retomar">Necesito retomarlo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ¿En qué timeframe planeas estudiar/presentar el examen? *
          </label>
          <select
            value={nclexData.studyTimeframe}
            onChange={(e) => updateNCLEXStatus({ studyTimeframe: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Selecciona timeframe</option>
            <option value="1-3-meses">1-3 meses</option>
            <option value="3-6-meses">3-6 meses</option>
            <option value="6-12-meses">6-12 meses</option>
            <option value="mas-12-meses">Más de 12 meses</option>
            <option value="ya-completado">Ya completado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ¿Te gustaría recibir apoyo y recursos de Mora Health para prepararte? *
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="needsSupport"
                checked={nclexData.needsSupport === true}
                onChange={() => updateNCLEXStatus({ needsSupport: true })}
                className="mr-2 text-blue-600"
              />
              Sí, me gustaría recibir apoyo de Mora Health
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="needsSupport"
                checked={nclexData.needsSupport === false}
                onChange={() => updateNCLEXStatus({ needsSupport: false })}
                className="mr-2 text-blue-600"
              />
              No, prefiero prepararme por mi cuenta
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ¿Qué materiales de estudio has usado o planeas usar? (opcional)
          </label>
          
          {nclexData.studyMaterials.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {nclexData.studyMaterials.map((material, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                >
                  {material}
                  <button
                    onClick={() => toggleStudyMaterial(material)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {studyMaterialOptions
              .filter(material => !nclexData.studyMaterials.includes(material))
              .map((material, index) => (
                <button
                  key={index}
                  onClick={() => toggleStudyMaterial(material)}
                  className="flex items-center justify-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  {material}
                </button>
              ))}
          </div>
        </div>
      </div>
    </StepWrapper>
  );
};