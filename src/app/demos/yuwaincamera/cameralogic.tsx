export interface CaptureConfig {
  x: number;          // Percentage 0-100
  y: number;          // Percentage 0-100
  size: number;       // Base size in pixels
  rotation: number;   // Degrees
  aspectRatio: 'portrait' | 'landscape' | 'square';
  isFront: boolean;
}

export const processAndCapture = async (
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  stickerImg: HTMLImageElement | null,
  config: CaptureConfig
): Promise<string | null> => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // FIX: Match the phone's high-density display (Retina/OLED)
  const dpr = window.devicePixelRatio || 2;
  const nativeW = video.videoWidth;
  const nativeH = video.videoHeight;

  let drawW = nativeW;
  let drawH = nativeH;

  // Calculate high-res crop
  if (config.aspectRatio === 'portrait') {
    drawW = nativeH * (9 / 16);
  } else if (config.aspectRatio === 'landscape') {
    drawH = nativeW * (9 / 16);
  } else if (config.aspectRatio === 'square') {
    const size = Math.min(nativeW, nativeH);
    drawW = size;
    drawH = size;
  }

  // Set canvas size to super-sampled dimensions for "Clean" output
  canvas.width = drawW * dpr;
  canvas.height = drawH * dpr;
  ctx.scale(dpr, dpr);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const offsetX = (nativeW - drawW) / 2;
  const offsetY = (nativeH - drawH) / 2;

  // Draw Camera Frame
  ctx.save();
  if (config.isFront) {
    ctx.translate(drawW, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(video, offsetX, offsetY, drawW, drawH, 0, 0, drawW, drawH);
  ctx.restore();

  // Draw Mascot with sub-pixel sharpness
  if (stickerImg) {
    const xPx = (config.x / 100) * drawW;
    const yPx = (config.y / 100) * drawH;

    // Scale sticker relative to the preview's visual width
    const previewWidth = video.clientWidth;
    const resolutionScale = drawW / previewWidth;
    
    const finalStickerW = config.size * resolutionScale;
    const finalStickerH = (stickerImg.naturalHeight / stickerImg.naturalWidth) * finalStickerW;

    ctx.save();
    ctx.translate(xPx, yPx);
    ctx.rotate((config.rotation * Math.PI) / 180);
    
    ctx.drawImage(
      stickerImg, 
      -finalStickerW / 2, 
      -finalStickerH / 2, 
      finalStickerW, 
      finalStickerH
    );
    ctx.restore();
  }

  // Use PNG for lossless quality to keep lines sharp like the preview
  return canvas.toDataURL('image/png');
};