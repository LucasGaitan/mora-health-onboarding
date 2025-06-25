# Mora Health - Onboarding de Enfermeras 🏥

Una aplicación web moderna para optimizar el proceso de onboarding de enfermeras mexicanas que desean trabajar en Estados Unidos. Desarrollada como propuesta para mejorar la experiencia de postulación y recolección de datos en Mora Health.

## 🎯 Propósito del Proyecto

Este proyecto fue desarrollado para demostrar una solución completa al proceso de onboarding de enfermeras, permitiendo que las candidatas completen toda la información necesaria desde el inicio, ahorrando tiempo al equipo de Mora Health y mejorando significativamente la experiencia del usuario.

## 🌟 Características Principales

### ✨ Experiencia de Usuario
- **Diseño Responsivo**: Optimizado para desktop, tablet y móvil
- **Interfaz Intuitiva**: Flujo paso a paso con indicadores de progreso
- **Guardado Automático**: Los datos se guardan automáticamente y de forma persistente en localStorage mediante Zustand
- **Navegación Flexible**: Posibilidad de navegar entre pasos completados
- **Validación en Tiempo Real**: Feedback inmediato sobre campos requeridos

### 📋 Pasos del Onboarding

1. **Información Personal**
   - Datos básicos (nombre, email, teléfono)
   - Fecha de nacimiento con selector de calendario
   - Nacionalidad y ubicación actual

2. **Información Profesional**
   - Título de enfermería y año de graduación
   - Institución educativa y licencia profesional
   - Especializaciones y años de experiencia

3. **Experiencia Laboral**
   - Hospital actual y posición
   - Fechas de inicio y fin
   - Responsabilidades y áreas clínicas

4. **Nivel de Inglés**
   - Autoevaluación en 4 habilidades (speaking, listening, reading, writing)
   - Certificaciones IELTS/TOEFL existentes
   - Disposición para realizar exámenes

5. **Preferencias en EE.UU.**
   - Estados preferidos de trabajo
   - Tipos de hospitales y configuraciones de trabajo
   - Preferencias de turnos y expectativas salariales

6. **Estado NCLEX-RN**
   - Historial del examen NCLEX
   - Planes de estudio y timeframe
   - Materiales de estudio preferidos

7. **Resumen y Envío**
   - Revisión completa de toda la información
   - Confirmación final antes del envío

### 🎨 Sistema de Diseño

- **Colores**: Paleta coherente con la marca Mora Health (#6366F1)
- **Componentes**: Sistema modular de componentes reutilizables

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Calendar**: React Calendar
- **Storage**: Persistencia de datos mediante Zustand y localStorage

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── steps/                    # Componentes de cada paso
│   │   ├── PersonalInfoStep.tsx
│   │   ├── ProfessionalInfoStep.tsx
│   │   ├── WorkExperienceStep.tsx
│   │   ├── EnglishProficiencyStep.tsx
│   │   ├── USPreferencesStep.tsx
│   │   ├── NCLEXStatusStep.tsx
│   │   └── SummaryStep.tsx
│   ├── ui/                       # Componentes UI reutilizables
│   │   ├── FormField.tsx
│   │   ├── FormSection.tsx
│   │   ├── DatePicker.tsx
│   │   └── MultiSelect.tsx
│   ├── StepWrapper.tsx           # Wrapper común para pasos
│   ├── StepIndicator.tsx         # Indicador de progreso
│   ├── ProcessSection.tsx        # Sección de proceso
│   └── SuccessModal.tsx          # Modal de éxito
├── store/
│   └── onboardingStore.ts        # Store global de Zustand para el onboarding
├── types/
│   └── onboarding.ts            # Definiciones de tipos TypeScript
├── App.tsx                      # Componente principal
└── index.css                   # Estilos globales y sistema de diseño
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/LucasGaitan/mora-health-onboarding.git
cd mora-health-onboarding
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Construir para producción**
```bash
npm run build
```

5. **Previsualizar build de producción**
```bash
npm run preview
```

## 🌐 Demo en Vivo

- **Aplicación**: [https://mora-health-onboarding.vercel.app/](https://mora-health-onboarding.vercel.app/)
- **Repositorio**: [https://github.com/LucasGaitan/mora-health-onboarding](https://github.com/LucasGaitan/mora-health-onboarding)

## 🎯 Beneficios para Mora Health

1. **Eficiencia Operativa**: Reduce el tiempo del equipo en recolección de datos
2. **Mejor Experiencia**: Candidatas completan información a su ritmo
3. **Datos Estructurados**: Información organizada y validada desde el inicio
4. **Escalabilidad**: Proceso automatizado que puede manejar más candidatas
5. **Insights**: Datos estructurados permiten mejor análisis y seguimiento

## 🔮 Posibles Mejoras Futuras

- **Backend Integration**: API para guardar datos en base de datos
- **Autenticación**: Sistema de login para candidatas
- **Notificaciones**: Emails automáticos de confirmación y seguimiento
- **Documentos**: Upload de documentos (CV, certificados, etc.)

## 👨‍💻 Autor

**Lucas Gaitán**
- LinkedIn: [https://www.linkedin.com/in/lucas-gaitan/](https://www.linkedin.com/in/lucas-gaitan/)
- Email: [lucasgaitan@gmail.com](mailto:lucasgaitan9112@gmail.com)

## 📄 Licencia

Este proyecto fue desarrollado como demostración técnica para Mora Health. Todos los derechos reservados.

---