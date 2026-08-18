import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '../components/ProgressBar';
import { useCampaign } from '../context/CampaignContext';
import { Camera, Square, Play, RefreshCw, Send, AlertCircle } from 'lucide-react';

export const VideoRecordPage: React.FC = () => {
  const navigate = useNavigate();
  const { addSubmission } = useCampaign();

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);

  // Initialize Camera
  const startCamera = async () => {
    try {
      setCameraError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.warn('Camera access error or restricted:', err);
      setCameraError(
        'Camera access was denied or is unavailable on this browser. You can still test submission using simulated recording.'
      );
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleStartRecording = () => {
    if (stream) {
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setRecordedBlob(blob);
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
      };

      recorder.start();
      setRecording(true);
      setTimer(0);

      timerIntervalRef.current = window.setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      // Simulated recording for environments without camera
      setRecording(true);
      setTimer(0);
      timerIntervalRef.current = window.setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
  };

  const handleStopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setRecording(false);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else if (!stream) {
      // Create a dummy video blob for simulation
      const dummyBlob = new Blob(['simulated video content'], { type: 'video/webm' });
      setRecordedBlob(dummyBlob);
      setPreviewUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
    }
  };

  const handleReRecord = () => {
    if (previewUrl && stream) {
      URL.revokeObjectURL(previewUrl);
    }
    setRecordedBlob(null);
    setPreviewUrl(null);
    setTimer(0);
    if (!stream) {
      startCamera();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await addSubmission(recordedBlob || undefined);
      stopCamera();
      navigate('/thank-you');
    } catch (err) {
      console.error('Error submitting pledge:', err);
      setIsSubmitting(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="page-wrapper" style={{ backgroundColor: 'var(--bg-offwhite)' }}>
      <ProgressBar currentStep={3} />

      <div className="container" style={{ padding: '20px 24px 60px' }}>
        <div className="modern-card" style={{ maxWidth: '720px', margin: '0 auto', backgroundColor: '#FFFFFF', border: 'none' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#1C2434',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#FFFFFF',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '16px'
             }}>
              03 • RECORD VIDEO
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px', color: '#1C2434' }}>
              Record Your Video Pledge
            </h2>
            <p style={{ color: '#1C2434', fontSize: '15px', fontWeight: 500 }}>
              Share your big idea with the world in a short video (30–60 seconds recommended).
            </p>
          </div>

          {cameraError && (
            <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#991b1b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <AlertCircle size={18} />
              <span>{cameraError}</span>
            </div>
          )}

          {/* Camera View / Preview Container */}
          <div className="video-card" style={{ marginBottom: '24px', background: '#000', borderRadius: '12px' }}>
            <div className="video-aspect">
              {!previewUrl ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {recording && (
                    <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.75)', padding: '6px 12px', borderRadius: '20px', color: 'white', fontSize: '14px', fontWeight: 600 }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} className="pulse-recording"></span>
                      REC {formatTimer(timer)}
                    </div>
                  )}
                  {!stream && !recording && (
                    <div style={{ position: 'absolute', color: '#a1a1aa', textAlign: 'center', padding: '20px' }}>
                      <Camera size={48} style={{ marginBottom: '12px', opacity: 0.5 }} />
                      <p>Camera Preview Unavailable</p>
                    </div>
                  )}
                </>
              ) : (
                <video
                  ref={previewRef}
                  src={previewUrl}
                  controls
                  autoPlay
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          </div>

          {/* Controls Row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {!previewUrl ? (
              !recording ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleStartRecording}
                  style={{ padding: '0 28px' }}
                >
                  <Camera size={20} />
                  Start Recording
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleStopRecording}
                  style={{ padding: '0 28px' }}
                >
                  <Square size={18} />
                  Stop Recording ({formatTimer(timer)})
                </button>
              )
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleReRecord}
                  disabled={isSubmitting}
                >
                  <RefreshCw size={18} />
                  Re-record
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  style={{ padding: '0 32px' }}
                >
                  <Send size={18} />
                  {isSubmitting ? 'Submitting Pledge...' : 'Submit Pledge'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
