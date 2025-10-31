// backend/src/routes/asr.ts
import { Router, Request, Response } from 'express';
import multer from 'multer';
import { asyncHandler } from '../middleware/errorHandler.js';
import { asrService } from '../services/asrService.js';
import { asrQueue } from '../queues/index.js';

// Configure multer for audio uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/webm'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only audio files are allowed.'));
    }
  }
});

const router = Router();

router.post('/transcribe', upload.single('audio'), asyncHandler(async (req: Request, res: Response) => {
  // Check if file is provided
  const audioFile = req.file;
  
  if (!audioFile) {
    return res.status(400).json({
      success: false,
      error: 'Audio file is required'
    });
  }

  const audioBuffer = audioFile.buffer;
  const contentType = audioFile.mimetype;
  
  const result = await asrService.transcribeAudio({
    audioFile: audioBuffer,
    contentType
  });

  // Optionally queue for further processing
  await asrQueue.add('process-transcript', {
    transcript: result.transcript,
    confidence: result.confidence,
    language: result.language
  });

  res.json({
    success: true,
    ...result
  });
}));

router.get('/transcribe/:jobId', asyncHandler(async (req: Request, res: Response) => {
  const { jobId } = req.params;
  
  // In a real implementation, retrieve result from queue/job storage
  res.json({
    success: true,
    jobId,
    status: 'completed',
    transcript: 'This is a mock transcript of the audio content.',
    confidence: 0.95,
    language: 'en'
  });
}));

router.get('/languages', asyncHandler(async (req: Request, res: Response) => {
  const languages = await asrService.getSupportedLanguages();
  const status = await asrService.getServiceStatus();

  res.json({
    success: true,
    languages,
    service: status
  });
}));

export default router;
