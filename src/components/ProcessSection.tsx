interface ProcessSectionProps {
  onStartJourney: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onStartJourney }: ProcessSectionProps) => {
  const processSteps = [
    {
      number: '01',
      title: 'Habla con Nosotros',
      description: 'Agenda una llamada con nuestro equipo para conocer cómo funciona el proceso. Responderemos tus preguntas y explicaremos cada paso claramente.',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 40 40">
          <g clipPath="url(#clip0_9513_178)">
            <path d="M34.9998 23.3333L29.9998 18.3333H18.3332C17.8911 18.3333 17.4672 18.1577 17.1547 17.8452C16.8421 17.5326 16.6665 17.1087 16.6665 16.6667V6.66667C16.6665 6.22464 16.8421 5.80072 17.1547 5.48816C17.4672 5.17559 17.8911 5 18.3332 5H33.3332C33.7752 5 34.1991 5.17559 34.5117 5.48816C34.8242 5.80072 34.9998 6.22464 34.9998 6.66667V23.3333Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23.3333 25V28.3333C23.3333 28.7753 23.1577 29.1992 22.8452 29.5118C22.5326 29.8244 22.1087 30 21.6667 30H10L5 35V18.3333C5 17.8913 5.17559 17.4673 5.48816 17.1548C5.80072 16.8422 6.22464 16.6666 6.66667 16.6666H10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </svg>
      )
    },
    {
      number: '02',
      title: 'Envía tus Documentos',
      description: 'Te guiamos durante la aplicación y el envío de documentos para que todo se haga correctamente.',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 40 40">
          <path d="M14.8571 6H11.4286C10.5193 6 9.64719 6.36875 9.00421 7.02513C8.36122 7.6815 8 8.57174 8 9.5V30.5C8 31.4283 8.36122 32.3185 9.00421 32.9749C9.64719 33.6313 10.5193 34 11.4286 34H28.5714C29.4807 34 30.3528 33.6313 30.9958 32.9749C31.6388 32.3185 32 31.4283 32 30.5V9.5C32 8.57174 31.6388 7.6815 30.9958 7.02513C30.3528 6.36875 29.4807 6 28.5714 6H25.1429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 6.5C15 5.83696 15.3512 5.20107 15.9763 4.73223C16.6014 4.26339 17.4493 4 18.3333 4H21.6667C22.5507 4 23.3986 4.26339 24.0237 4.73223C24.6488 5.20107 25 5.83696 25 6.5C25 7.16304 24.6488 7.79893 24.0237 8.26777C23.3986 8.73661 22.5507 9 21.6667 9H18.3333C17.4493 9 16.6014 8.73661 15.9763 8.26777C15.3512 7.79893 15 7.16304 15 6.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 21H25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 16H25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 26H25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      number: '03',
      title: 'Mejora tu Inglés',
      description: 'Si necesitas fortalecer tus habilidades en inglés, proporcionamos entrenamiento especializado para ayudarte a aprobar los exámenes requeridos.',
      subtitle: '(Si es Necesario)',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 40 40">
          <path d="M16.8889 30.8889H7.55556C7.143 30.8889 6.74733 30.725 6.45561 30.4333C6.16389 30.1416 6 29.7459 6 29.3333V7.55556C6 7.143 6.16389 6.74733 6.45561 6.45561C6.74733 6.16389 7.143 6 7.55556 6H16.8889C17.714 6 18.5053 6.32778 19.0888 6.91122C19.6722 7.49467 20 8.28599 20 9.11111C20 8.28599 20.3278 7.49467 20.9112 6.91122C21.4947 6.32778 22.286 6 23.1111 6H32.4444C32.857 6 33.2527 6.16389 33.5444 6.45561C33.8361 6.74733 34 7.143 34 7.55556V29.3333C34 29.7459 33.8361 30.1416 33.5444 30.4333C33.2527 30.725 32.857 30.8889 32.4444 30.8889H23.1111C22.286 30.8889 21.4947 31.2167 20.9112 31.8001C20.3278 32.3836 20 33.1749 20 34C20 33.1749 19.6722 32.3836 19.0888 31.8001C18.5053 31.2167 17.714 30.8889 16.8889 30.8889Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 9V34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 13H15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 18H15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M25 13H29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M25 18H29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M25 25H29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      number: '04',
      title: 'Prepárate para el Examen NCLEX',
      description: 'Ofrecemos programas de estudio dirigidos por expertos para ayudarte a aprobar el examen NCLEX y obtener tu licencia de enfermería en EE.UU.',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 40 40">
          <path d="M14.8571 6V36M9.71429 6H28.5714C29.4807 6 30.3528 6.35119 30.9958 6.97631C31.6388 7.60143 32 8.44928 32 9.33333V29.3333C32 30.2174 31.6388 31.0652 30.9958 31.6904C30.3528 32.3155 29.4807 32.6667 28.5714 32.6667H9.71429C9.25963 32.6667 8.82359 32.4911 8.5021 32.1785C8.18061 31.866 8 31.442 8 31V7.66667C8 7.22464 8.18061 6.80072 8.5021 6.48816C8.82359 6.1756 9.25963 6 9.71429 6Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 12H25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 19H25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      number: '05',
      title: 'Obtén tu Visa TN',
      description: 'Nuestros especialistas en inmigración se encargan de tu papeleo de visa, haciendo el proceso sencillo y rápido.',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 40 40">
          <path d="M34 29H6C6 22.7273 8.21044 22.7273 11.8956 22.7273C20 22.7273 13.7778 15.6182 13.7778 12.1953C13.7778 10.5522 14.4333 8.9764 15.6002 7.81456C16.7671 6.65272 18.3498 6 20 6C21.6502 6 23.2329 6.65272 24.3998 7.81456C25.5667 8.9764 26.2222 10.5522 26.2222 12.1953C26.2222 15.6182 20 22.7273 28.1044 22.7273C31.7896 22.7273 34 22.7273 34 29Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 34H31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      number: '06',
      title: 'Conéctate con un Hospital',
      description: 'Te ponemos en contacto con hospitales estadounidenses que coincidan con tus habilidades, experiencia y objetivos profesionales.',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 40 40">
          <path d="M10.6364 8H9.09091C8.27115 8 7.48496 8.32565 6.90531 8.90531C6.32565 9.48496 6 10.2711 6 11.0909V16.5C6 18.7543 6.89553 20.9163 8.48959 22.5104C10.0837 24.1045 12.2457 25 14.5 25C16.7543 25 18.9163 24.1045 20.5104 22.5104C22.1045 20.9163 23 18.7543 23 16.5V11.0909C23 10.2711 22.6744 9.48496 22.0947 8.90531C21.515 8.32565 20.7289 8 19.9091 8H18.3636" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 25C14 26.2257 14.2328 27.106 14.6851 28.2384C15.1374 29.3708 15.8003 30.3997 16.636 31.2663C17.4718 32.133 18.4639 32.8205 19.5558 33.2895C20.6478 33.7586 21.8181 34 23 34C24.1819 34 25.3522 33.7586 26.4442 33.2895C27.5361 32.8205 28.5282 32.133 29.364 31.2663C30.1997 30.3997 30.8626 29.3708 31.3149 28.2384C31.7672 27.106 32 25.8923 32 24.6667V20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 6V9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 6V9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M29 17C29 17.7956 29.3161 18.5587 29.8787 19.1213C30.4413 19.6839 31.2044 20 32 20C32.7956 20 33.5587 19.6839 34.1213 19.1213C34.6839 18.5587 35 17.7956 35 17C35 16.2044 34.6839 15.4413 34.1213 14.8787C33.5587 14.3161 32.7956 14 32 14C31.2044 14 30.4413 14.3161 29.8787 14.8787C29.3161 15.4413 29 16.2044 29 17Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      number: '07',
      title: 'Múdate e Inicia tu Carrera',
      description: 'Te ayudamos con la reubicación, vivienda y adaptación a tu nueva vida para que puedas concentrarte en tu trabajo.',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 40 40">
          <path d="M24.9944 19.6596L32.6142 21.7229C33.0201 21.826 33.4016 22.0096 33.7365 22.263C34.0715 22.5164 34.3532 22.8346 34.5652 23.199C34.7772 23.5635 34.9153 23.9669 34.9715 24.3857C35.0276 24.8046 35.0007 25.2305 34.8923 25.6388C34.7839 26.0471 34.5962 26.4294 34.34 26.7637C34.0839 27.098 33.7644 27.3774 33.4003 27.5858C33.0362 27.7942 32.6347 27.9273 32.2191 27.9775C31.8036 28.0276 31.3823 27.9938 30.9798 27.8779L8.12188 21.6926L6 11.2213L10.5719 12.4577L12.8026 16.3614L17.3745 17.5978L17.1852 6L21.7571 7.23801L24.9944 19.6596Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 34H34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <section className="pt-10 pb-20" style={{ backgroundColor: '#FAF7EA' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Single Card Container */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column - Purple Section */}
            <div className="lg:col-span-5 relative" style={{ backgroundColor: '#5942D8' }}>
              <div className="relative p-8 lg:p-12 text-white overflow-hidden h-full">
                {/* Curved SVG Background */}
               
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Badge */}
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white font-medium text-sm mb-6 w-fit">
                    El proceso
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                    <div className="flex flex-wrap gap-2">
                      <span>Tu</span>
                      <span>camino</span>
                      <span>hacia</span>
                      <span>una</span>
                      <span>carrera</span>
                      <span>de</span>
                      <span>enfermería</span>
                      <span>en</span>
                      <span className="flex items-center gap-2">
                        EE.UU.
                        <img src="/67cdb8bb08e0807c319e26b9_US - United States.svg" alt="Estados Unidos" className="w-8 h-8" />
                      </span>
                    </div>
                  </h2>

                  {/* Description */}
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">
                    En Mora, facilitamos que enfermeras y enfermeros mexicanos inicien una carrera en Estados Unidos. 
                    Nos encargamos de cada paso, desde el papeleo hasta los exámenes y la colocación laboral, 
                    para que puedas concentrarte en tu futuro.
                  </p>

                  {/* We help you with */}
                  <div className="mb-8 flex-grow">
                    <p className="text-lg font-bold text-white mb-4">We help you with</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'DOCUMENTS', 'TRAINING', 'IMPROVE ENGLISH', 'LICENCE', 
                        'EXAM NCLEX', 'VISA TN', 'FIND HOSPITAL', 'MOVING', 
                        'HOUSING SEARCH', 'ADAPTATION'
                      ].map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium uppercase border border-white/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <button 
                      onClick={onStartJourney}
                      className="bg-white text-purple-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg text-lg w-full"
                    >
                      Comienza Tu Viaje
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Process Steps */}
            <div className="lg:col-span-7 p-8 lg:p-12">
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <div key={step.number} className="flex items-start gap-6 group">
                    {/* Icon and Line */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div 
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
                          index === processSteps.length - 1 
                            ? 'group-hover:opacity-90' 
                            : 'bg-indigo-50 group-hover:bg-indigo-100'
                        }`}
                        style={index === processSteps.length - 1 ? { backgroundColor: '#5942D8' } : {}}
                      >
                        <div className={index === processSteps.length - 1 ? 'text-white' : ''}>
                          {index === processSteps.length - 1 ? (
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 40 40">
                              <path d="M24.9944 19.6596L32.6142 21.7229C33.0201 21.826 33.4016 22.0096 33.7365 22.263C34.0715 22.5164 34.3532 22.8346 34.5652 23.199C34.7772 23.5635 34.9153 23.9669 34.9715 24.3857C35.0276 24.8046 35.0007 25.2305 34.8923 25.6388C34.7839 26.0471 34.5962 26.4294 34.34 26.7637C34.0839 27.098 33.7644 27.3774 33.4003 27.5858C33.0362 27.7942 32.6347 27.9273 32.2191 27.9775C31.8036 28.0276 31.3823 27.9938 30.9798 27.8779L8.12188 21.6926L6 11.2213L10.5719 12.4577L12.8026 16.3614L17.3745 17.5978L17.1852 6L21.7571 7.23801L24.9944 19.6596Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M5 34H34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : (
                            step.icon
                          )}
                        </div>
                      </div>
                      {index < processSteps.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-200 mt-4"></div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        <span className="text-indigo-600 mr-2">{step.number}.</span>
                        {step.title}
                        {step.subtitle && (
                          <span className="text-gray-500 font-normal ml-2">{step.subtitle}</span>
                        )}
                      </h3>
                      <p className="text-gray-600 leading-relaxed font-medium">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 