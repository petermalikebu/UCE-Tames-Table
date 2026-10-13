import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini Client if key exists
let genAI: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenAI();
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI:', err);
  }
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    student: 'Peter Malikebu Jr',
    regNumber: 'UCE/1/143/26',
    system: 'ChronosStudy v6.0',
    timestamp: new Date().toISOString(),
  });
});

// AI Topic Revision & Exam Prep endpoint
app.post('/api/generate-ai-guide', async (req: Request, res: Response) => {
  const { subjectCode, subjectName, mode, topicOrQuestion } = req.body;

  const prompt = `You are a distinguished University Certificate in Education (UCE) Senior Lecturer and Exam Chief Examiner.
You are tutoring student Peter Malikebu Jr (Reg: UCE/1/143/26) who has 6 weeks remaining before final examinations in:
Course: ${subjectCode} - ${subjectName}

Request Mode: ${mode}
User Topic / Prompt: ${topicOrQuestion || 'Comprehensive High-Yield Overview'}

Guidelines for your response:
1. Provide authoritative, academic, well-structured content directly relevant to University Certificate in Education / Bachelor of Education syllabi.
2. If the course is EDF 522 (Curriculum Theory), focus on foundations, Tyler's Rationale, Wheeler's cyclic model, Hilda Taba, Skilbeck, curriculum design models, and Stufflebeam's CIPP evaluation.
3. If the course is EDF 521 (Testing and Measurements), include exact formulas and step-by-step calculations for Item Difficulty (p = R/T), Item Discrimination Index (D = (RU - RL) / (N/2)), Distractor efficiency, Reliability (Spearman-Brown, Cronbach Alpha), and Standard Scores (Z-score = (X-M)/SD, T-score = 50 + 10Z).
4. If the course is SCE 502 (Intro to Science Education), focus on Nature of Science (NOS), 5E Inquiry model, Posner's Conceptual Change conditions, Constructivism (Piaget, Vygotsky, Driver), and PCK.
5. If the course is EDF 532 (Philosophy of Education), contrast Idealism (Plato), Realism (Aristotle), Pragmatism (John Dewey), African Educational Philosophy (Ubuntu/Unhu, Julius Nyerere's Education for Self-Reliance), and Paulo Freire's Critical Pedagogy.
6. If the course is EDF 512 (Educational Psychology), focus on Piaget, Vygotsky's ZPD & scaffolding, Erikson's 8 stages, Pavlov & Skinner conditioning, Bandura's self-efficacy, Cognitive Load Theory, and Weiner's Attribution theory.
7. If the course is SCE 501 (Laboratory Practice & Management), provide clear protocols for chemical storage compatibility, GHS hazard pictograms, molar dilution calculations (M1V1=M2V2), and immediate acid/alkali burn first aid.
8. Format cleanly with markdown bolding, clear numbered lists, and exam tips.`;

  if (genAI) {
    try {
      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || 'Unable to generate response.';
      return res.json({ markdown: text });
    } catch (apiErr) {
      console.error('Gemini API call error:', apiErr);
      // Fallback response
    }
  }

  // Graceful fallback response when API key is not yet set or model call fails
  res.json({
    markdown: `### High-Yield Exam Master Notes: ${subjectCode} (${subjectName})

**Topic Focus:** ${topicOrQuestion || 'Core Curricular Principles'}

1. **Foundational Concept Summary:**
   - In ${subjectCode}, examiners prioritize deep conceptual clarity, practical secondary school applications, and balanced critiques of classical models.
   - Always structure essay answers with an introduction defining terms, comparative paragraphs, practical classroom integration, and a reasoned conclusion.

2. **Core Examiner Focus Points:**
   - Define all operational terms with academic precision.
   - Cite seminal scholars (e.g. Tyler, Dewey, Piaget, Vygotsky, Posner, Freire, Nyerere).
   - Relate pedagogical theories to real secondary classroom challenges and resource constraints.

3. **Recommended Immediate Action:**
   - Review your lecture handouts for ${subjectCode}.
   - Practice drawing diagrams and computing required mathematical psychometrics from memory.`,
  });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Development mode: Mount Vite middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve dist static files
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 ChronosStudy Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
