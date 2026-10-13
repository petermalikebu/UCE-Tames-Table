import { Subject, UniversityClassSlot, StudySlot, WeekCurriculum, UserProfile } from '../types';

export const USER_PROFILE: UserProfile = {
  name: 'Peter Malikebu Jr',
  regNumber: 'UCE/1/143/26',
  program: 'University Certificate in Education (UCE)',
  primaryEmail: 'petermalikeujr@gmail.com',
  secondaryEmail: 'petermalikebu0@gmail.com',
  whatsappPhone: '+265986272736',
  targetExamWeeks: 6,
  // 6 weeks from today (approx 42 days)
  examTargetDate: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000).toISOString(),
};

export const SUBJECTS: Subject[] = [
  {
    id: 'edf-522',
    code: 'EDF 522',
    name: 'Curriculum Theory',
    description: 'Foundations, design models, dissemination, stakeholder engagement, implementation barriers, and evaluation models (CIPP).',
    creditUnits: 3,
    color: 'from-cyan-500 to-blue-600',
    accentBorder: 'border-cyan-500/40',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    examWeight: 'High (Core Foundation)',
    iconName: 'BookOpen',
    keyTopics: [
      'Definitions & Foundations (Philosophical, Sociological, Psychological)',
      "Classical Models (Tyler's Rationale, Hilda Taba's Inductive, Wheeler's Cyclic)",
      "Curriculum Design (Subject-centered, Learner-centered, Problem-centered)",
      'Curriculum Development Process & Needs Assessment',
      'Dissemination vs. Implementation Strategies',
      "Evaluation Frameworks (Stufflebeam's CIPP, Scriven's Goal-free)"
    ],
    recommendedStrategy: 'Active diagramming of Tyler vs Wheeler models, drafting comparative essays, and contextualizing reforms to Malawian and African schooling.'
  },
  {
    id: 'edf-521',
    code: 'EDF 521',
    name: 'Testing and Measurements',
    description: 'Principles of educational measurement, item construction, Bloom’s taxonomy, psychometrics (validity & reliability), and score interpretation.',
    creditUnits: 3,
    color: 'from-amber-500 to-orange-600',
    accentBorder: 'border-amber-500/40',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    examWeight: 'High (Quantitative & Analytic)',
    iconName: 'CheckSquare',
    keyTopics: [
      'Concepts of Testing, Measurement, Assessment & Evaluation',
      'Bloom’s Revised Taxonomy & Table of Specifications (Test Blueprint)',
      'Item Construction (Objective vs Essay Rubrics)',
      'Item Analysis: Difficulty Index (p) & Discrimination Index (D)',
      'Reliability: Test-Retest, Split-Half, Kuder-Richardson & Cronbach’s Alpha',
      'Validity: Content, Construct, Criterion (Concurrent & Predictive)',
      'Grading, Standard Scores (Z-score, T-score, Stanines) & Bell Curve'
    ],
    recommendedStrategy: 'Master calculation formulas for p-values, discrimination index D, standard deviations, and practice drafting balanced 50-item blueprints.'
  },
  {
    id: 'sce-502',
    code: 'SCE 502',
    name: 'Introduction to Science Education',
    description: 'Nature of science, scientific inquiry, constructivist epistemology, conceptual change, and pedagogical content knowledge (PCK).',
    creditUnits: 3,
    color: 'from-emerald-500 to-teal-600',
    accentBorder: 'border-emerald-500/40',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    examWeight: 'High (Methodology)',
    iconName: 'Atom',
    keyTopics: [
      'Nature of Science (NOS): Empirical, Tentative, Creative & Cultural',
      'Inquiry-Based Learning & 5E Instructional Model (Engage-Explore-Explain-Elaborate-Evaluate)',
      'Constructivist Learning Theories (Piaget, Vygotsky, Rosalind Driver)',
      'Student Misconceptions & Posner’s Conceptual Change Model',
      'Pedagogical Content Knowledge (PCK) in Science Classrooms',
      'Indigenous Knowledge Systems (IKS) & STSE Integration',
      'Gender Equity & Inclusive STEM Instruction in Secondary Schools'
    ],
    recommendedStrategy: 'Formulate 5E lesson plan scripts, analyze typical physics/chemistry/biology student misconceptions, and integrate IKS cultural examples.'
  },
  {
    id: 'edf-532',
    code: 'EDF 532',
    name: 'Philosophy of Education',
    description: 'Metaphysics, epistemology, axiology, classical schools of thought (Idealism, Realism, Pragmatism), critical pedagogy, and African philosophy.',
    creditUnits: 3,
    color: 'from-purple-500 to-indigo-600',
    accentBorder: 'border-purple-500/40',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    examWeight: 'High (Critical Thought & Essays)',
    iconName: 'Compass',
    keyTopics: [
      'Branches of Philosophy: Metaphysics, Epistemology, Axiology & Logic',
      'Classical Schools: Idealism (Plato), Realism (Aristotle)',
      'Modern Schools: Pragmatism (John Dewey), Existentialism (Sartre)',
      'Educational Theories: Perennialism, Essentialism, Progressivism, Reconstructionism',
      'African Philosophy of Education: Ubuntu/Unhu & Nyerere’s Education for Self-Reliance',
      'Critical Pedagogy: Paulo Freire’s Pedagogy of the Oppressed vs Banking Education'
    ],
    recommendedStrategy: 'Structure structured philosophical argument templates: compare the aims, curriculum, teacher role, and student role across Idealism vs Pragmatism.'
  },
  {
    id: 'edf-512',
    code: 'EDF 512',
    name: 'Educational Psychology',
    description: 'Cognitive developmental stages, psychosocial milestones, learning theories (behavioral, cognitive, social), motivation, and individual differences.',
    creditUnits: 3,
    color: 'from-rose-500 to-pink-600',
    accentBorder: 'border-rose-500/40',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    examWeight: 'High (Core Psychology)',
    iconName: 'Brain',
    keyTopics: [
      'Cognitive Development: Piaget’s Stages & Vygotsky’s ZPD / Scaffolding',
      'Psychosocial & Moral Growth: Erikson’s 8 Crises & Kohlberg’s Moral Levels',
      'Behavioral Learning: Classical (Pavlov) & Operant Conditioning (Skinner)',
      'Social Cognitive Theory: Bandura’s Observational Learning & Self-Efficacy',
      'Cognitive Information Processing: Working Memory, Cognitive Load & Schema',
      'Motivation Theories: Maslow’s Hierarchy, Self-Determination, Weiner’s Attribution',
      'Exceptional Learners, Inclusive Teaching & Behavior Modification'
    ],
    recommendedStrategy: 'Apply psychological theories to authentic secondary school classroom scenarios (e.g., handling demotivated teens, cognitive overload in math/science).'
  },
  {
    id: 'sce-501',
    code: 'SCE 501',
    name: 'Laboratory Practice and Management',
    description: 'Science laboratory design, chemical hazards, safety regulations, apparatus calibration, inventory accounting, and emergency first aid.',
    creditUnits: 3,
    color: 'from-sky-400 to-cyan-700',
    accentBorder: 'border-sky-400/40',
    glowColor: 'rgba(14, 165, 233, 0.4)',
    examWeight: 'High (Practical & Safety)',
    iconName: 'FlaskConical',
    keyTopics: [
      'School Science Laboratory Design, Layout & Preparation Rooms',
      'Hazard Pictograms (GHS), Chemical Storage Compatibility & SDS / MSDS',
      'Handling Dangerous Reagents (Acids, Alkalies, Flammables, Heavy Metals)',
      'Apparatus Maintenance, Care & Calibration (Microscopes, Analytical Balances)',
      'Standard Solution Preparation (Molarity, Normality, Dilution Calculations)',
      'Emergency Protocols: Chemical Burns, Eye Flushes, Fire Extinguishers, First Aid',
      'Inventory Control, Stock Ledgers, Requisitions & Budgeting for Practicals',
      'Low-Cost Equipment Improvisation in Resource-Limited Schools'
    ],
    recommendedStrategy: 'Memorize GHS safety symbols, step-by-step chemical burn first aid protocols, molar dilution mathematics, and safe storage segregation matrices.'
  }
];

// Official University Class Timetable for UCE/1/143/26 provided in the prompt
export const UNIVERSITY_CLASS_TIMETABLE: UniversityClassSlot[] = [
  // MONDAY
  {
    id: 'mon-p3',
    day: 'Monday',
    period: 3,
    timeRange: '09:30 - 10:30',
    subjectCode: 'EDF 532B',
    subjectName: 'Philosophy of Education',
    venueCode: 'VIR',
    venueName: 'Virtual Lecture Room',
    isVirtual: true,
  },
  {
    id: 'mon-p4',
    day: 'Monday',
    period: 4,
    timeRange: '10:30 - 11:30',
    subjectCode: 'SCE 501',
    subjectName: 'Laboratory Practice and Management',
    venueCode: 'VIR',
    venueName: 'Virtual Lecture Room',
    isVirtual: true,
  },
  {
    id: 'mon-p7',
    day: 'Monday',
    period: 7,
    timeRange: '13:30 - 14:30',
    subjectCode: 'EDF 521B',
    subjectName: 'Testing and Measurements',
    venueCode: 'VIR',
    venueName: 'Virtual Lecture Room',
    isVirtual: true,
  },

  // TUESDAY
  {
    id: 'tue-p9',
    day: 'Tuesday',
    period: 9,
    timeRange: '16:00 - 17:00',
    subjectCode: 'EDF 512A',
    subjectName: 'Educational Psychology',
    venueCode: 'VIR',
    venueName: 'Virtual Lecture Room',
    isVirtual: true,
  },

  // WEDNESDAY
  {
    id: 'wed-p8',
    day: 'Wednesday',
    period: 8,
    timeRange: '15:00 - 16:00',
    subjectCode: 'EDF 522B',
    subjectName: 'Curriculum Theory',
    venueCode: 'VIR',
    venueName: 'Virtual Lecture Room',
    isVirtual: true,
  },
  {
    id: 'wed-p10',
    day: 'Wednesday',
    period: 10,
    timeRange: '17:00 - 18:00',
    subjectCode: 'SCE 502',
    subjectName: 'Introduction to Science Education',
    venueCode: 'LT1',
    venueName: 'Lecture Theatre 1',
    isVirtual: false,
  },

  // THURSDAY
  {
    id: 'thu-p3',
    day: 'Thursday',
    period: 3,
    timeRange: '09:30 - 10:30',
    subjectCode: 'EDF 512A',
    subjectName: 'Educational Psychology',
    venueCode: 'VIR',
    venueName: 'Virtual Lecture Room',
    isVirtual: true,
  },
  {
    id: 'thu-p7',
    day: 'Thursday',
    period: 7,
    timeRange: '13:30 - 14:30',
    subjectCode: 'SCE 502',
    subjectName: 'Introduction to Science Education',
    venueCode: 'AV2',
    venueName: 'Audio Visual Room 2',
    isVirtual: false,
  },
  {
    id: 'thu-p10',
    day: 'Thursday',
    period: 10,
    timeRange: '17:00 - 18:00',
    subjectCode: 'EDF 532B',
    subjectName: 'Philosophy of Education',
    venueCode: 'VIR',
    venueName: 'Virtual Lecture Room',
    isVirtual: true,
  },

  // FRIDAY
  {
    id: 'fri-p2',
    day: 'Friday',
    period: 2,
    timeRange: '08:30 - 09:30',
    subjectCode: 'EDF 512A',
    subjectName: 'Educational Psychology',
    venueCode: 'VIR',
    venueName: 'Virtual Lecture Room',
    isVirtual: true,
  },
  {
    id: 'fri-p6',
    day: 'Friday',
    period: 6,
    timeRange: '12:30 - 13:30',
    subjectCode: 'SCE 501',
    subjectName: 'Laboratory Practice and Management',
    venueCode: 'B',
    venueName: 'Biology Laboratory',
    isVirtual: false,
  },
  {
    id: 'fri-p8',
    day: 'Friday',
    period: 8,
    timeRange: '15:00 - 16:00',
    subjectCode: 'SCE 501',
    subjectName: 'Laboratory Practice and Management',
    venueCode: 'ESC',
    venueName: 'Education Science Complex',
    isVirtual: false,
  },
  {
    id: 'fri-p9',
    day: 'Friday',
    period: 9,
    timeRange: '16:00 - 17:00',
    subjectCode: 'EDF 521B',
    subjectName: 'Testing and Measurements',
    venueCode: 'VIR',
    venueName: 'Virtual Lecture Room',
    isVirtual: true,
  },
  {
    id: 'fri-p11',
    day: 'Friday',
    period: 11,
    timeRange: '17:30 - 18:30',
    subjectCode: 'EDF 522B',
    subjectName: 'Curriculum Theory',
    venueCode: 'VIR',
    venueName: 'Virtual Lecture Room',
    isVirtual: true,
  },
];

// Balanced Master Weekly Study Timetable
// Guarantees: Monday through Saturday covers ALL 6 SUBJECTS EVERY SINGLE DAY!
// Sunday: Dedicated to Synthesis & Weekly Planning (User busy with church during day).
export const MASTER_STUDY_TIMETABLE: StudySlot[] = [
  // === MONDAY === (All 6 Subjects)
  {
    id: 'mon-slot-1',
    day: 'Monday',
    startTime: '02:30',
    endTime: '04:00',
    durationMinutes: 90,
    slotType: 'dawn_1',
    slotLabel: 'Dawn Deep-Focus Block 1',
    subjectId: 'edf-522',
    subjectCode: 'EDF 522',
    subjectName: 'Curriculum Theory',
    focusArea: 'Curriculum Foundations & Classical Models (Tyler & Taba)',
    notes: 'Early morning peak alertness. Draw comparative conceptual maps.'
  },
  {
    id: 'mon-slot-2',
    day: 'Monday',
    startTime: '04:00',
    endTime: '05:30',
    durationMinutes: 90,
    slotType: 'dawn_2',
    slotLabel: 'Dawn Deep-Focus Block 2',
    subjectId: 'edf-521',
    subjectCode: 'EDF 521',
    subjectName: 'Testing and Measurements',
    focusArea: 'Measurement Scales & Bloom’s Taxonomy Item Alignment',
    notes: 'Draft test blueprint table of specifications.'
  },
  {
    id: 'mon-slot-3',
    day: 'Monday',
    startTime: '08:30',
    endTime: '10:30',
    durationMinutes: 120,
    slotType: 'morning',
    slotLabel: 'Morning Mastery Block',
    subjectId: 'sce-502',
    subjectCode: 'SCE 502',
    subjectName: 'Introduction to Science Education',
    focusArea: 'Nature of Science (NOS) & 5E Inquiry Cycle',
    notes: 'Connect inquiry theories with Malawian secondary science syllabus.'
  },
  {
    id: 'mon-slot-4',
    day: 'Monday',
    startTime: '11:00',
    endTime: '13:00',
    durationMinutes: 120,
    slotType: 'midday',
    slotLabel: 'Midday Theoretical Block',
    subjectId: 'edf-532',
    subjectCode: 'EDF 532',
    subjectName: 'Philosophy of Education',
    focusArea: 'Metaphysics, Epistemology & Idealism vs. Realism',
    notes: 'Write essay outlines comparing Plato and Aristotle on schooling.'
  },
  {
    id: 'mon-slot-5',
    day: 'Monday',
    startTime: '13:30',
    endTime: '15:30',
    durationMinutes: 120,
    slotType: 'afternoon',
    slotLabel: 'Afternoon Analysis Block',
    subjectId: 'edf-512',
    subjectCode: 'EDF 512',
    subjectName: 'Educational Psychology',
    focusArea: 'Piaget’s Developmental Stages vs Vygotsky’s ZPD',
    notes: 'Apply scaffolding strategies to secondary learner scenarios.'
  },
  {
    id: 'mon-slot-6',
    day: 'Monday',
    startTime: '20:00',
    endTime: '21:30',
    durationMinutes: 90,
    slotType: 'evening',
    slotLabel: 'Night Active Recall & Consolidation',
    subjectId: 'sce-501',
    subjectCode: 'SCE 501',
    subjectName: 'Laboratory Practice and Management',
    focusArea: 'Lab Hazard Pictograms & Safe Chemical Storage Protocols',
    notes: 'Flashcard drill on GHS safety signs and emergency protocols.'
  },

  // === TUESDAY === (All 6 Subjects)
  {
    id: 'tue-slot-1',
    day: 'Tuesday',
    startTime: '02:30',
    endTime: '04:00',
    durationMinutes: 90,
    slotType: 'dawn_1',
    slotLabel: 'Dawn Deep-Focus Block 1',
    subjectId: 'edf-512',
    subjectCode: 'EDF 512',
    subjectName: 'Educational Psychology',
    focusArea: 'Behavioral Learning: Classical vs Operant Conditioning',
    notes: 'Reinforcement schedules, extinction, and classroom behavior plans.'
  },
  {
    id: 'tue-slot-2',
    day: 'Tuesday',
    startTime: '04:00',
    endTime: '05:30',
    durationMinutes: 90,
    slotType: 'dawn_2',
    slotLabel: 'Dawn Deep-Focus Block 2',
    subjectId: 'sce-501',
    subjectCode: 'SCE 501',
    subjectName: 'Laboratory Practice and Management',
    focusArea: 'Apparatus Maintenance, Microscope Care & Glassware Protocols',
    notes: 'Practice calibration steps and preventive maintenance logs.'
  },
  {
    id: 'tue-slot-3',
    day: 'Tuesday',
    startTime: '08:30',
    endTime: '10:30',
    durationMinutes: 120,
    slotType: 'morning',
    slotLabel: 'Morning Mastery Block',
    subjectId: 'edf-522',
    subjectCode: 'EDF 522',
    subjectName: 'Curriculum Theory',
    focusArea: 'Curriculum Design Models (Subject vs Learner vs Problem)',
    notes: 'Contrast core curriculum designs and national exam integration.'
  },
  {
    id: 'tue-slot-4',
    day: 'Tuesday',
    startTime: '11:00',
    endTime: '13:00',
    durationMinutes: 120,
    slotType: 'midday',
    slotLabel: 'Midday Quantitative Block',
    subjectId: 'edf-521',
    subjectCode: 'EDF 521',
    subjectName: 'Testing and Measurements',
    focusArea: 'Item Analysis: Difficulty Index (p) & Discrimination Index (D)',
    notes: 'Compute sample formulas and distractor effectiveness.'
  },
  {
    id: 'tue-slot-5',
    day: 'Tuesday',
    startTime: '13:30',
    endTime: '15:30',
    durationMinutes: 120,
    slotType: 'afternoon',
    slotLabel: 'Afternoon Analysis Block',
    subjectId: 'sce-502',
    subjectCode: 'SCE 502',
    subjectName: 'Introduction to Science Education',
    focusArea: 'Constructivism & Posner’s Conceptual Change in Science',
    notes: 'Analyze student misconceptions in Newtonian physics and photosynthesis.'
  },
  {
    id: 'tue-slot-6',
    day: 'Tuesday',
    startTime: '20:00',
    endTime: '21:30',
    durationMinutes: 90,
    slotType: 'evening',
    slotLabel: 'Night Active Recall & Consolidation',
    subjectId: 'edf-532',
    subjectCode: 'EDF 532',
    subjectName: 'Philosophy of Education',
    focusArea: 'Pragmatism (John Dewey) & Progressivism in Practice',
    notes: 'Synthesize experiential learning principles with democratic classrooms.'
  },

  // === WEDNESDAY === (All 6 Subjects)
  {
    id: 'wed-slot-1',
    day: 'Wednesday',
    startTime: '02:30',
    endTime: '04:00',
    durationMinutes: 90,
    slotType: 'dawn_1',
    slotLabel: 'Dawn Deep-Focus Block 1',
    subjectId: 'sce-502',
    subjectCode: 'SCE 502',
    subjectName: 'Introduction to Science Education',
    focusArea: 'Pedagogical Content Knowledge (PCK) & STSE Framework',
    notes: 'How to transform disciplinary science content into teachable units.'
  },
  {
    id: 'wed-slot-2',
    day: 'Wednesday',
    startTime: '04:00',
    endTime: '05:30',
    durationMinutes: 90,
    slotType: 'dawn_2',
    slotLabel: 'Dawn Deep-Focus Block 2',
    subjectId: 'edf-532',
    subjectCode: 'EDF 532',
    subjectName: 'Philosophy of Education',
    focusArea: 'Axiology (Ethics/Aesthetics) & Existentialist Education',
    notes: 'Freedom, moral agency, and personal responsibility in student growth.'
  },
  {
    id: 'wed-slot-3',
    day: 'Wednesday',
    startTime: '08:30',
    endTime: '10:30',
    durationMinutes: 120,
    slotType: 'morning',
    slotLabel: 'Morning Mastery Block',
    subjectId: 'edf-512',
    subjectCode: 'EDF 512',
    subjectName: 'Educational Psychology',
    focusArea: 'Social Cognitive Theory: Bandura’s Self-Efficacy & Modeling',
    notes: 'Four sources of self-efficacy and vicarious reinforcement.'
  },
  {
    id: 'wed-slot-4',
    day: 'Wednesday',
    startTime: '11:00',
    endTime: '13:00',
    durationMinutes: 120,
    slotType: 'midday',
    slotLabel: 'Midday Laboratory Block',
    subjectId: 'sce-501',
    subjectCode: 'SCE 501',
    subjectName: 'Laboratory Practice and Management',
    focusArea: 'Standard Solution Prep: Molarity, Normality & Serial Dilutions',
    notes: 'Work out stoichiometry calculations and bench safety rules.'
  },
  {
    id: 'wed-slot-5',
    day: 'Wednesday',
    startTime: '13:30',
    endTime: '15:30',
    durationMinutes: 120,
    slotType: 'afternoon',
    slotLabel: 'Afternoon Analysis Block',
    subjectId: 'edf-522',
    subjectCode: 'EDF 522',
    subjectName: 'Curriculum Theory',
    focusArea: 'Curriculum Implementation: Innovations, Resistance & Change',
    notes: 'Factors determining successful curriculum innovation in Africa.'
  },
  {
    id: 'wed-slot-6',
    day: 'Wednesday',
    startTime: '20:00',
    endTime: '21:30',
    durationMinutes: 90,
    slotType: 'evening',
    slotLabel: 'Night Active Recall & Consolidation',
    subjectId: 'edf-521',
    subjectCode: 'EDF 521',
    subjectName: 'Testing and Measurements',
    focusArea: 'Reliability: Test-Retest, Split-Half & Cronbach Alpha Factors',
    notes: 'Flashcard review of factors affecting reliability coefficients.'
  },

  // === THURSDAY === (All 6 Subjects)
  {
    id: 'thu-slot-1',
    day: 'Thursday',
    startTime: '02:30',
    endTime: '04:00',
    durationMinutes: 90,
    slotType: 'dawn_1',
    slotLabel: 'Dawn Deep-Focus Block 1',
    subjectId: 'edf-521',
    subjectCode: 'EDF 521',
    subjectName: 'Testing and Measurements',
    focusArea: 'Validity: Content, Construct, Criterion (Concurrent/Predictive)',
    notes: 'Master threats to validity and validation strategies.'
  },
  {
    id: 'thu-slot-2',
    day: 'Thursday',
    startTime: '04:00',
    endTime: '05:30',
    durationMinutes: 90,
    slotType: 'dawn_2',
    slotLabel: 'Dawn Deep-Focus Block 2',
    subjectId: 'edf-522',
    subjectCode: 'EDF 522',
    subjectName: 'Curriculum Theory',
    focusArea: "Curriculum Evaluation Models: Stufflebeam's CIPP & Scriven",
    notes: 'Context, Input, Process, Product decision-making functions.'
  },
  {
    id: 'thu-slot-3',
    day: 'Thursday',
    startTime: '08:30',
    endTime: '10:30',
    durationMinutes: 120,
    slotType: 'morning',
    slotLabel: 'Morning Mastery Block',
    subjectId: 'edf-532',
    subjectCode: 'EDF 532',
    subjectName: 'Philosophy of Education',
    focusArea: 'African Philosophy of Education: Ubuntu & Julius Nyerere',
    notes: 'Self-reliance, communal ethics, and decolonizing education.'
  },
  {
    id: 'thu-slot-4',
    day: 'Thursday',
    startTime: '11:00',
    endTime: '13:00',
    durationMinutes: 120,
    slotType: 'midday',
    slotLabel: 'Midday Science Block',
    subjectId: 'sce-502',
    subjectCode: 'SCE 502',
    subjectName: 'Introduction to Science Education',
    focusArea: 'Indigenous Knowledge Systems (IKS) & Inclusive Science Teaching',
    notes: 'Bridging cultural epistemology and western scientific inquiry.'
  },
  {
    id: 'thu-slot-5',
    day: 'Thursday',
    startTime: '13:30',
    endTime: '15:30',
    durationMinutes: 120,
    slotType: 'afternoon',
    slotLabel: 'Afternoon Safety Block',
    subjectId: 'sce-501',
    subjectCode: 'SCE 501',
    subjectName: 'Laboratory Practice and Management',
    focusArea: 'Chemical Spill Response, First Aid & Fire Protocol Drill',
    notes: 'Acid vs alkali eye splash procedure and fire blanket protocol.'
  },
  {
    id: 'thu-slot-6',
    day: 'Thursday',
    startTime: '20:00',
    endTime: '21:30',
    durationMinutes: 90,
    slotType: 'evening',
    slotLabel: 'Night Active Recall & Consolidation',
    subjectId: 'edf-512',
    subjectCode: 'EDF 512',
    subjectName: 'Educational Psychology',
    focusArea: 'Motivation Theories: Maslow, Weiner’s Attribution & Growth Mindset',
    notes: 'How teacher attributions influence adolescent academic motivation.'
  },

  // === FRIDAY === (All 6 Subjects)
  {
    id: 'fri-slot-1',
    day: 'Friday',
    startTime: '02:30',
    endTime: '04:00',
    durationMinutes: 90,
    slotType: 'dawn_1',
    slotLabel: 'Dawn Deep-Focus Block 1',
    subjectId: 'sce-501',
    subjectCode: 'SCE 501',
    subjectName: 'Laboratory Practice and Management',
    focusArea: 'Inventory Control, Requisitions, Stock Ledgers & Budgeting',
    notes: 'Laboratory ledger management and cost-effective equipment order.'
  },
  {
    id: 'fri-slot-2',
    day: 'Friday',
    startTime: '04:00',
    endTime: '05:30',
    durationMinutes: 90,
    slotType: 'dawn_2',
    slotLabel: 'Dawn Deep-Focus Block 2',
    subjectId: 'edf-512',
    subjectCode: 'EDF 512',
    subjectName: 'Educational Psychology',
    focusArea: 'Information Processing Theory: Cognitive Load & Memory Systems',
    notes: 'Dual-coding theory, chunking, and combating cognitive overload.'
  },
  {
    id: 'fri-slot-3',
    day: 'Friday',
    startTime: '08:30',
    endTime: '10:30',
    durationMinutes: 120,
    slotType: 'morning',
    slotLabel: 'Morning Mastery Block',
    subjectId: 'edf-521',
    subjectCode: 'EDF 521',
    subjectName: 'Testing and Measurements',
    focusArea: 'Standard Scores: Z-Scores, T-Scores, Stanines & Bell Curve',
    notes: 'Converting raw scores and calculating percentiles on normal curve.'
  },
  {
    id: 'fri-slot-4',
    day: 'Friday',
    startTime: '11:00',
    endTime: '13:00',
    durationMinutes: 120,
    slotType: 'midday',
    slotLabel: 'Midday Curriculum Block',
    subjectId: 'edf-522',
    subjectCode: 'EDF 522',
    subjectName: 'Curriculum Theory',
    focusArea: 'Stakeholder Roles & National Curriculum Policy Development',
    notes: 'Role of teachers, parents, exam bodies, and ministry officials.'
  },
  {
    id: 'fri-slot-5',
    day: 'Friday',
    startTime: '13:30',
    endTime: '15:30',
    durationMinutes: 120,
    slotType: 'afternoon',
    slotLabel: 'Afternoon Philosophy Block',
    subjectId: 'edf-532',
    subjectCode: 'EDF 532',
    subjectName: 'Philosophy of Education',
    focusArea: 'Critical Pedagogy: Paulo Freire’s Pedagogy of the Oppressed',
    notes: 'Banking education vs problem-posing education and dialogue.'
  },
  {
    id: 'fri-slot-6',
    day: 'Friday',
    startTime: '20:00',
    endTime: '21:30',
    durationMinutes: 90,
    slotType: 'evening',
    slotLabel: 'Night Active Recall & Consolidation',
    subjectId: 'sce-502',
    subjectCode: 'SCE 502',
    subjectName: 'Introduction to Science Education',
    focusArea: 'Formative Assessment in Science & Diagnostic Concept Cartoons',
    notes: 'Using concept cartoons to identify science alternative conceptions.'
  },

  // === SATURDAY === (All 6 Subjects)
  {
    id: 'sat-slot-1',
    day: 'Saturday',
    startTime: '02:30',
    endTime: '04:00',
    durationMinutes: 90,
    slotType: 'dawn_1',
    slotLabel: 'Dawn Deep-Focus Block 1',
    subjectId: 'edf-532',
    subjectCode: 'EDF 532',
    subjectName: 'Philosophy of Education',
    focusArea: 'Comprehensive Essay Synthesis: Philosophical Schools Compared',
    notes: 'Draft a full 45-minute timed essay comparing Idealism vs Pragmatism.'
  },
  {
    id: 'sat-slot-2',
    day: 'Saturday',
    startTime: '04:00',
    endTime: '05:30',
    durationMinutes: 90,
    slotType: 'dawn_2',
    slotLabel: 'Dawn Deep-Focus Block 2',
    subjectId: 'sce-502',
    subjectCode: 'SCE 502',
    subjectName: 'Introduction to Science Education',
    focusArea: 'Science Curriculum Inquiry Design & 5E Assessment Rubric',
    notes: 'Design a full 5E lesson plan unit with formative inquiry rubrics.'
  },
  {
    id: 'sat-slot-3',
    day: 'Saturday',
    startTime: '08:30',
    endTime: '10:30',
    durationMinutes: 120,
    slotType: 'morning',
    slotLabel: 'Morning Mastery Block',
    subjectId: 'sce-501',
    subjectCode: 'SCE 501',
    subjectName: 'Laboratory Practice and Management',
    focusArea: 'Improvisation of Science Apparatus & Safe Waste Disposal',
    notes: 'Using local materials to teach titration, optics, and electrochemistry.'
  },
  {
    id: 'sat-slot-4',
    day: 'Saturday',
    startTime: '11:00',
    endTime: '13:00',
    durationMinutes: 120,
    slotType: 'midday',
    slotLabel: 'Midday Psychology Block',
    subjectId: 'edf-512',
    subjectCode: 'EDF 512',
    subjectName: 'Educational Psychology',
    focusArea: 'Inclusive Education: SEN Learners, Giftedness & Classroom Adaptation',
    notes: 'Differentiation strategies for diverse ability classrooms.'
  },
  {
    id: 'sat-slot-5',
    day: 'Saturday',
    startTime: '13:30',
    endTime: '15:30',
    durationMinutes: 120,
    slotType: 'afternoon',
    slotLabel: 'Afternoon Quantitative Block',
    subjectId: 'edf-521',
    subjectCode: 'EDF 521',
    subjectName: 'Testing and Measurements',
    focusArea: 'Past Exam Calculations Sprint: p, D, Variance & Reliability',
    notes: 'Rapid calculations without calculator under strict timed constraints.'
  },
  {
    id: 'sat-slot-6',
    day: 'Saturday',
    startTime: '20:00',
    endTime: '21:30',
    durationMinutes: 90,
    slotType: 'evening',
    slotLabel: 'Night Active Recall & Consolidation',
    subjectId: 'edf-522',
    subjectCode: 'EDF 522',
    subjectName: 'Curriculum Theory',
    focusArea: 'Full Syllabus Rapid Flashcard Drill (All 6 Units Reviewed)',
    notes: 'Rapid recall of curriculum terminology, models, and evaluators.'
  },

  // === SUNDAY === (Weekly Synthesis & Strategy Day - Church in Day)
  {
    id: 'sun-slot-1',
    day: 'Sunday',
    startTime: '03:00',
    endTime: '05:30',
    durationMinutes: 150,
    slotType: 'sunday_synth',
    slotLabel: 'Sunday Dawn Mega-Synthesis Exam Simulation',
    subjectId: 'all-6-subjects',
    subjectCode: 'ALL 6 SUBJECTS',
    subjectName: 'Integrated 6-Subject Weekly Review',
    focusArea: 'Weekly Mock Quiz: 10 High-Yield Questions per Subject (60 Qs total)',
    notes: 'Deep testing before Sunday church service. Pinpoint top 3 weak areas for the coming week.'
  },
  {
    id: 'sun-slot-2',
    day: 'Sunday',
    startTime: '20:00',
    endTime: '21:30',
    durationMinutes: 90,
    slotType: 'sunday_eval',
    slotLabel: 'Sunday Night Milestone Audit & Week-Ahead Planner',
    subjectId: 'strategic-planning',
    subjectCode: 'PLAN & AUDIT',
    subjectName: 'Milestone Progress Audit & Mental Reset',
    focusArea: 'Audit 6-Week Progress Checkboxes, Set Weekly High-Yield Goals',
    notes: 'Prepare notes, charge devices, check calendar notifications, and mental reset.'
  }
];

// 6-Week Milestone Plan covering all 6 subjects step-by-step
export const SIX_WEEK_CURRICULUM: WeekCurriculum[] = [
  {
    weekNumber: 1,
    title: 'Foundations & Architectural Frameworks',
    theme: 'Core Concepts, Foundational Theories & Diagnostic Assessment',
    phase: 'Phase 1: Foundations',
    startDate: 'Week 1',
    targetDeliverables: [
      'Master basic definitions across all 6 courses',
      'Draw structural comparative diagrams for Tyler, Taba, and Wheeler models',
      'Memorize GHS hazard symbols and basic lab emergency procedures',
      'Draft initial 50-item table of specifications for EDF 521'
    ],
    subjects: {
      'edf-522': {
        topics: ['Curriculum definitions and scope', 'Foundational pillars (Philosophical, Sociological, Psychological)', 'Tyler’s Rationale four basic questions'],
        keyQuestions: ['Explain Tyler’s rationale and its modern criticisms.', 'How do philosophical foundations shape Malawian curriculum choices?'],
        completed: false
      },
      'edf-521': {
        topics: ['Distinction between test, measurement, assessment, evaluation', 'Bloom’s revised taxonomy (Cognitive domain levels)', 'Constructing effective objective items'],
        keyQuestions: ['Differentiate norm-referenced vs criterion-referenced assessment.', 'Explain the role of a Table of Specifications.'],
        completed: false
      },
      'sce-502': {
        topics: ['Nature of Science (NOS) fundamental tenets', 'History of school science curriculum', 'Scientific inquiry vs verification labs'],
        keyQuestions: ['Discuss the tentative yet durable nature of scientific theories.', 'How does 5E inquiry enhance student conceptual understanding?'],
        completed: false
      },
      'edf-532': {
        topics: ['Meaning and scope of educational philosophy', 'Metaphysics and Epistemology foundations', 'Platonic Idealism in education'],
        keyQuestions: ['What are the epistemological claims of Idealism regarding truth?', 'How does metaphysics influence the aims of education?'],
        completed: false
      },
      'edf-512': {
        topics: ['Piaget’s 4 stages of cognitive development', 'Assimilation, accommodation, and equilibration', 'Vygotsky’s sociocultural theory and ZPD'],
        keyQuestions: ['Compare Piaget and Vygotsky’s views on language and thought.', 'How can a teacher apply the concept of scaffolding in science lessons?'],
        completed: false
      },
      'sce-501': {
        topics: ['Laboratory design and zoning', 'GHS hazard pictograms and chemical compatibility', 'COSHH regulations and risk assessments'],
        keyQuestions: ['Describe the primary safety features of a secondary school science lab.', 'Explain the protocol for receiving and storing concentrated sulfuric acid.'],
        completed: false
      }
    }
  },
  {
    weekNumber: 2,
    title: 'Theoretical Models & Psychometric Formulations',
    theme: 'Deep Dive into Psychological Mechanisms & Quantitative Item Analysis',
    phase: 'Phase 2: Deep Core',
    startDate: 'Week 2',
    targetDeliverables: [
      'Calculate Item Difficulty index (p) and Item Discrimination index (D) without error',
      'Compare Realism and Pragmatism in secondary curricula',
      'Analyze 5 common student science misconceptions and design Posner interventions',
      'Master standard solution molarity and normality calculations'
    ],
    subjects: {
      'edf-522': {
        topics: ['Hilda Taba’s Grassroots Inductive Model', 'Wheeler’s Cyclic Model', 'Skilbeck’s Situational Analysis Model'],
        keyQuestions: ['Why is Wheeler’s model considered an improvement over Tyler’s linear model?', 'Explain Skilbeck’s situational analysis components.'],
        completed: false
      },
      'edf-521': {
        topics: ['Item difficulty index calculation (p = R / T)', 'Item discrimination index calculation (D = (RU - RL) / (N/2))', 'Distractor plausibility and efficiency analysis'],
        keyQuestions: ['Interpret an item with p = 0.85 and D = -0.15. What should be done to it?', 'How do flawed distractors inflate test reliability falsely?'],
        completed: false
      },
      'sce-502': {
        topics: ['Rosalind Driver’s constructivist research', 'Posner’s Conceptual Change Theory (Dissatisfaction, Intelligibility, Plausibility, Fruitfulness)', 'Diagnostic concept cartoons'],
        keyQuestions: ['Detail the 4 conditions required for conceptual change according to Posner.', 'How can concept cartoons reveal alternate conceptions in electricity?'],
        completed: false
      },
      'edf-532': {
        topics: ['Aristotelian Realism', 'John Dewey’s Pragmatism and Instrumentalism', 'Progressivism vs Perennialism in curricula'],
        keyQuestions: ['How does Dewey’s concept of "experience" reshape traditional teaching?', 'Contrast Perennialist core texts with Progressivist project work.'],
        completed: false
      },
      'edf-512': {
        topics: ['Erik Erikson’s 8 psychosocial crises (Identity vs Role Confusion focus)', 'Lawrence Kohlberg’s stages of moral reasoning', 'Classical conditioning (Pavlov) and school phobias'],
        keyQuestions: ['How can secondary teachers assist adolescents navigating Identity vs Role Confusion?', 'Explain how classical conditioning can cause exam anxiety.'],
        completed: false
      },
      'sce-501': {
        topics: ['Microscope alignment, cleaning, and oil immersion care', 'Standard solution preparation (M1V1 = M2V2)', 'Analytical balances and volumetric glassware calibration'],
        keyQuestions: ['Calculate the mass of NaOH required to prepare 500 mL of 0.25 M standard solution.', 'Explain proper care and troubleshooting for student compound microscopes.'],
        completed: false
      }
    }
  },
  {
    weekNumber: 3,
    title: 'Curriculum Implementation & Critical Philosophy',
    theme: 'Sociological Realities, Assessment Psychometrics & Laboratory Management',
    phase: 'Phase 3: Critical Analysis',
    startDate: 'Week 3',
    targetDeliverables: [
      'Master Reliability coefficients (Test-retest, Split-half, Cronbach Alpha) and factors affecting them',
      'Explain Paulo Freire’s Banking Concept vs Problem-Posing Education',
      'Design an Indigenous Knowledge System (IKS) integrated science lesson',
      'Establish a complete science department stock register and requisition ledger'
    ],
    subjects: {
      'edf-522': {
        topics: ['Curriculum design models (Subject-centered vs Learner-centered vs Core)', 'Curriculum dissemination vs implementation', 'Overcoming teacher resistance to educational change'],
        keyQuestions: ['Why do well-designed curriculum reforms fail at the classroom implementation stage?', 'Compare child-centered and discipline-based curriculum designs.'],
        completed: false
      },
      'edf-521': {
        topics: ['Reliability types: Test-retest, Alternate form, Split-half (Spearman-Brown)', 'Internal consistency (Kuder-Richardson KR-20 & Cronbach’s Alpha)', 'Factors affecting test reliability coefficients'],
        keyQuestions: ['How does test length affect reliability? Use Spearman-Brown prophecy formula.', 'Explain why a test can be reliable without being valid.'],
        completed: false
      },
      'sce-502': {
        topics: ['Pedagogical Content Knowledge (PCK) transformation', 'Indigenous Knowledge Systems (IKS) in African science education', 'STSE (Science-Technology-Society-Environment) issues'],
        keyQuestions: ['How does PCK distinguish an expert science teacher from a pure scientist?', 'Provide 3 concrete strategies for integrating IKS into secondary chemistry or biology.'],
        completed: false
      },
      'edf-532': {
        topics: ['Existentialism in education (Sartre, Buber)', 'Critical Pedagogy: Paulo Freire’s Pedagogy of the Oppressed', 'Banking model of education vs Conscientization'],
        keyQuestions: ['Critique the "Banking Concept" of education in light of modern secondary schooling.', 'What is the role of dialogue in Freire’s problem-posing education?'],
        completed: false
      },
      'edf-512': {
        topics: ['Operant conditioning (Skinner): Schedules of reinforcement and extinction', 'Bandura’s social cognitive theory and reciprocal determinism', 'Self-efficacy beliefs and academic achievement'],
        keyQuestions: ['Compare continuous and intermittent reinforcement schedules in shaping study habits.', 'Discuss Bandura’s four sources of self-efficacy in student success.'],
        completed: false
      },
      'sce-501': {
        topics: ['Chemical spill management (Acid vs Base neutralization protocols)', 'First aid procedures for thermal burns, cuts, and bromine/halogen inhalation', 'Stock registers, inventory ledgers, and bin cards'],
        keyQuestions: ['Outline immediate first aid action for a student whose eyes were splashed with 2M NaOH.', 'Describe the procedure for conducting an annual science lab equipment audit.'],
        completed: false
      }
    }
  },
  {
    weekNumber: 4,
    title: 'Evaluation Frameworks & African Educational Philosophy',
    theme: 'Past Papers, Validity Analysis, Motivation Theory & Safety Drills',
    phase: 'Phase 4: Past Papers',
    startDate: 'Week 4',
    targetDeliverables: [
      'Write full comparative essays on African Educational Philosophy (Ubuntu & Nyerere)',
      'Solve 10 complex validity/reliability past exam question scenarios',
      'Detail Stufflebeam’s CIPP model and Scriven’s evaluation frameworks',
      'Draft low-cost science apparatus improvisation blueprints for secondary schools'
    ],
    subjects: {
      'edf-522': {
        topics: ['Stufflebeam’s CIPP evaluation model (Context, Input, Process, Product)', 'Stakeholder roles (Teachers, communities, examination boards, donor agencies)', 'Curriculum evaluation: Formative vs Summative'],
        keyQuestions: ['How does the CIPP model guide decision-making at each stage of curriculum lifecycle?', 'Analyze the role of external examinations in steering school curriculum.'],
        completed: false
      },
      'edf-521': {
        topics: ['Validity: Content validity and expert judgment panels', 'Construct validity: Convergent and discriminant evidence', 'Criterion-related validity: Concurrent vs Predictive validity'],
        keyQuestions: ['Explain how predictive validity is established for university entrance examinations.', 'Distinguish between construct under-representation and construct-irrelevant variance.'],
        completed: false
      },
      'sce-502': {
        topics: ['Gender disparities and girls’ participation in STEM', 'Inclusive science teaching for special needs learners', 'Laboratory assessment rubrics for practical exams'],
        keyQuestions: ['Discuss systemic barriers to female secondary students pursuing physical sciences and propose remedies.', 'How should science teachers assess process skills versus final outcome in labs?'],
        completed: false
      },
      'edf-532': {
        topics: ['African philosophy of education: Ubuntu/Unhu ethics', 'Julius Nyerere’s "Education for Self-Reliance"', 'Aims of education in national development and social reconstruction'],
        keyQuestions: ['How does Nyerere’s Education for Self-Reliance counter colonial elitism?', 'Examine the pedagogical implications of the Ubuntu aphorism: "I am because we are."'],
        completed: false
      },
      'edf-512': {
        topics: ['Information Processing: Sensory register, working memory, long-term memory', 'Cognitive Load Theory (Intrinsic, Extraneous, Germane)', 'Motivation: Intrinsic vs Extrinsic, Maslow’s hierarchy, Weiner’s Attribution'],
        keyQuestions: ['How can instructional design minimize extraneous cognitive load in complex topics?', 'Explain Weiner’s locus of causality and stability dimensions in student failure.'],
        completed: false
      },
      'sce-501': {
        topics: ['Improvisation of science equipment (DIY balances, indicators from flower petals, pinhole cameras)', 'Disposal of hazardous laboratory waste and environmental compliance', 'Preparation of biological specimens, stain reagents (iodine, methylene blue)'],
        keyQuestions: ['Explain how local hibiscus flowers can be used as acid-base indicators.', 'What are legal and environmental protocols for disposing of heavy metal salts?'],
        completed: false
      }
    }
  },
  {
    weekNumber: 5,
    title: 'High-Yield Synthesis & Timed Mock Simulations',
    theme: 'Score Normalization, Comprehensive Mock Exams & Weak Spot Eradication',
    phase: 'Phase 5: Timed Mocks',
    startDate: 'Week 5',
    targetDeliverables: [
      'Complete 2 full timed 3-hour mock exam papers under strict exam conditions',
      'Calculate Z-Scores, T-Scores, Percentiles and Stanines on the normal curve',
      'Memorize fast-recall cheat sheets for all 6 subjects',
      'Conduct peer / self-scoring against official marking rubrics'
    ],
    subjects: {
      'edf-522': {
        topics: ['Full syllabus synthesis and essay drill', 'Comparative analysis of all 4 curriculum models', 'Contemporary curriculum reforms in developing countries'],
        keyQuestions: ['Timed 45-min essay: "Curriculum is never neutral." Discuss with reference to national ideologies.', 'Evaluate the effectiveness of Outcome-Based Education (OBE) in resource-poor schools.'],
        completed: false
      },
      'edf-521': {
        topics: ['Standard scores: Z-Score (Z = (X - M) / SD) and T-Score (T = 50 + 10Z)', 'Normal distribution curve properties and percentiles', 'Grading systems: Criterion-referenced vs norm-referenced grading'],
        keyQuestions: ['A student scores 72 in EDF 521 (Mean=60, SD=8) and 80 in EDF 512 (Mean=75, SD=10). Which performance was relatively superior? Show working.', 'Discuss the merits and perils of grading on a curve.'],
        completed: false
      },
      'sce-502': {
        topics: ['Inquiry lesson design review (5E model synthesis)', 'Nature of Science exam scenario analysis', 'Critique of traditional science textbooks and practical manuals'],
        keyQuestions: ['Analyze a provided teaching scenario and identify failures in NOS conceptualization.', 'Design an assessment task that measures students’ understanding of empirical evidence.'],
        completed: false
      },
      'edf-532': {
        topics: ['Synthesis of all 4 classical and modern philosophies', 'Critical comparison: Dewey vs Plato on social democracy and schooling', 'Philosophy of assessment and discipline in schools'],
        keyQuestions: ['Synthesize the educational debate between Perennialists (Hutchins) and Progressivists (Dewey).', 'How should a teacher balance student autonomy with authority from an ethical standpoint?'],
        completed: false
      },
      'edf-512': {
        topics: ['Inclusive education and Special Educational Needs (SEN)', 'Dweck’s Growth Mindset vs Fixed Mindset in academic resilience', 'Transfer of learning and metacognitive learning strategies'],
        keyQuestions: ['How can metacognitive prompting improve problem-solving in struggling learners?', 'Describe classroom interventions for students diagnosed with ADHD or dyslexia in mainstream settings.'],
        completed: false
      },
      'sce-501': {
        topics: ['Full lab safety audit drill and emergency simulations', 'Budget planning and equipment requisition defense', 'Comprehensive practical exam station management'],
        keyQuestions: ['Develop a complete annual laboratory procurement plan for a secondary school with 400 science students.', 'Simulate an unannounced ministry health and safety inspection on your laboratory.'],
        completed: false
      }
    }
  },
  {
    weekNumber: 6,
    title: 'Final Mastery, High-Yield Drills & Exam Readiness',
    theme: 'Rapid Recall Flashcards, Formula Drills, Confidence & Peak Performance',
    phase: 'Phase 6: High-Yield Mastery',
    startDate: 'Week 6',
    targetDeliverables: [
      'Zero unreviewed topics across all 6 courses',
      'Daily 20-minute rapid formula & definition flashcard speed runs',
      'Consolidate all lecture notes into 1-page condensed memory sheets',
      'Optimal physical, mental, and spiritual readiness for final distinction'
    ],
    subjects: {
      'edf-522': {
        topics: ['High-yield summary of key theorists and definitions', 'Bullet-point model comparison grids', 'Rapid exam outline drafting'],
        keyQuestions: ['Recall key phrases for Tyler, Taba, Wheeler, Skilbeck, and Stufflebeam in 2 minutes.', 'Final high-probability exam predictions drill.'],
        completed: false
      },
      'edf-521': {
        topics: ['Rapid formula calculations (p, D, Z, T, Spearman-Brown)', 'Bloom’s verb taxonomy identification drill', 'Common traps in test item writing and distractor flaws'],
        keyQuestions: ['Execute all 5 statistical calculations under 5 minutes without notes.', 'Review past examiners’ common penalization points.'],
        completed: false
      },
      'sce-502': {
        topics: ['NOS tenet rapid definitions', '5E cycle phase triggers and student behaviors', 'Key pedagogical terms rapid recall'],
        keyQuestions: ['Summarize 5E model in 5 words per stage.', 'Review top 10 conceptual misconceptions in secondary science.'],
        completed: false
      },
      'edf-532': {
        topics: ['Philosophical matrix: Aim, curriculum, teacher, student by school', 'Freire and Nyerere high-yield quotes and applications', 'Logic and ethical reasoning rapid outlines'],
        keyQuestions: ['Recite the 4 branches of philosophy and their educational questions.', 'Final essay structure review: Introduction, philosophical thesis, counter-arguments, African context, conclusion.'],
        completed: false
      },
      'edf-512': {
        topics: ['Developmental age brackets and stage markers rapid check', 'Learning theories comparison chart', 'Memory models and retrieval practice cues'],
        keyQuestions: ['Match 10 classroom behaviors to their corresponding psychological theorist instantly.', 'Review top motivational intervention strategies.'],
        completed: false
      },
      'sce-501': {
        topics: ['Safety symbol rapid identification speed drill', 'Emergency protocol 1-2-3 action sequences', 'Chemical incompatibility pairs (Oxidizers vs organics, acids vs cyanides)'],
        keyQuestions: ['Name the 3 immediate steps for any chemical spill.', 'Final review of standard solution formulas and safety regulations.'],
        completed: false
      }
    }
  }
];
