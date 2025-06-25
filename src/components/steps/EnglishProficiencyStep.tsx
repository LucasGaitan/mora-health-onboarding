import { StepWrapper } from '../StepWrapper';
import { useOnboardingStore } from '../../store/onboardingStore';

export const EnglishProficiencyStep: React.FC = () => {
  const { data, updateEnglishProficiency, nextStep, previousStep } = useOnboardingStore();
  const englishData = data.englishProficiency;

  const isValid = englishData.speakingLevel && englishData.listeningLevel && 
    englishData.readingLevel && englishData.writingLevel && englishData.willingToTakeTest !== undefined;

  const proficiencyLevels = [
    { value: 'basico', label: 'Básico - Puedo comunicarme en situaciones sencillas' },
    { value: 'intermedio', label: 'Intermedio - Puedo mantener conversaciones cotidianas' },
    { value: 'avanzado', label: 'Avanzado - Puedo comunicarme con fluidez en la mayoría de situaciones' },
    { value: 'nativo', label: 'Nativo o Casi Nativo - Dominio completo del idioma' }
  ];

  return (
    <StepWrapper
      title="Nivel de Inglés"
      subtitle="El inglés médico es fundamental para brindar atención de calidad en Estados Unidos"
      onNext={nextStep}
      onPrevious={previousStep}
      canGoNext={!!isValid}
    >
      <div className="space-y-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-blue-900 mb-2">Entrenamiento especializado incluido</h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                Ser honesta en tu autoevaluación nos ayudará a diseñar el mejor plan de entrenamiento 
                para ti. Mora Health te apoyará en mejorar tu inglés médico específicamente para el 
                entorno hospitalario estadounidense.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Hablar (Speaking) *
            </label>
            <div className="space-y-3">
              {proficiencyLevels.map((level) => (
                <label key={level.value} className="flex items-start cursor-pointer group">
                  <input
                    type="radio"
                    name="speaking"
                    value={level.value}
                    checked={englishData.speakingLevel === level.value}
                    onChange={(e) => updateEnglishProficiency({ speakingLevel: e.target.value })}
                    className="mr-3 mt-1 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 leading-relaxed">
                    {level.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Escuchar (Listening) *
            </label>
            <div className="space-y-3">
              {proficiencyLevels.map((level) => (
                <label key={level.value} className="flex items-start cursor-pointer group">
                  <input
                    type="radio"
                    name="listening"
                    value={level.value}
                    checked={englishData.listeningLevel === level.value}
                    onChange={(e) => updateEnglishProficiency({ listeningLevel: e.target.value })}
                    className="mr-3 mt-1 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 leading-relaxed">
                    {level.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Leer (Reading) *
            </label>
            <div className="space-y-3">
              {proficiencyLevels.map((level) => (
                <label key={level.value} className="flex items-start cursor-pointer group">
                  <input
                    type="radio"
                    name="reading"
                    value={level.value}
                    checked={englishData.readingLevel === level.value}
                    onChange={(e) => updateEnglishProficiency({ readingLevel: e.target.value })}
                    className="mr-3 mt-1 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 leading-relaxed">
                    {level.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Escribir (Writing) *
            </label>
            <div className="space-y-3">
              {proficiencyLevels.map((level) => (
                <label key={level.value} className="flex items-start cursor-pointer group">
                  <input
                    type="radio"
                    name="writing"
                    value={level.value}
                    checked={englishData.writingLevel === level.value}
                    onChange={(e) => updateEnglishProficiency({ writingLevel: e.target.value })}
                    className="mr-3 mt-1 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 leading-relaxed">
                    {level.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Certificaciones de inglés</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <label className="flex items-center mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={englishData.hasIELTS}
                  onChange={(e) => updateEnglishProficiency({ hasIELTS: e.target.checked })}
                  className="mr-3 text-purple-600 focus:ring-purple-500 rounded"
                />
                <span className="font-semibold text-gray-900">Tengo certificación IELTS</span>
              </label>
              {englishData.hasIELTS && (
                <input
                  type="text"
                  value={englishData.ieltsScore}
                  onChange={(e) => updateEnglishProficiency({ ieltsScore: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Puntuación IELTS (ej: 7.0)"
                />
              )}
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <label className="flex items-center mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={englishData.hasTOEFL}
                  onChange={(e) => updateEnglishProficiency({ hasTOEFL: e.target.checked })}
                  className="mr-3 text-purple-600 focus:ring-purple-500 rounded"
                />
                <span className="font-semibold text-gray-900">Tengo certificación TOEFL</span>
              </label>
              {englishData.hasTOEFL && (
                <input
                  type="text"
                  value={englishData.toeflScore}
                  onChange={(e) => updateEnglishProficiency({ toeflScore: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Puntuación TOEFL (ej: 85)"
                />
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            ¿Estás dispuesta a tomar un examen de inglés si es necesario? *
          </label>
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="willingToTakeTest"
                checked={englishData.willingToTakeTest === true}
                onChange={() => updateEnglishProficiency({ willingToTakeTest: true })}
                className="mr-3 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-700 group-hover:text-gray-900">
                Sí, estoy dispuesta a tomar un examen de inglés
              </span>
            </label>
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="willingToTakeTest"
                checked={englishData.willingToTakeTest === false}
                onChange={() => updateEnglishProficiency({ willingToTakeTest: false })}
                className="mr-3 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-700 group-hover:text-gray-900">
                Prefiero no tomar exámenes adicionales por ahora
              </span>
            </label>
          </div>
        </div>
      </div>
    </StepWrapper>
  );
};