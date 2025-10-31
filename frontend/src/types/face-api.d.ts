/**
 * Type definitions for face-api.js
 * Provides proper TypeScript support for face-api.js library
 */

declare module 'face-api.js' {
  export interface Point {
    x: number;
    y: number;
  }

  export interface FaceDetection {
    score: number;
    box: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }

  export interface FaceLandmarks5 {
    positions: Point[];
  }

  export interface FaceLandmarks68 {
    positions: Point[];
  }

  export interface FaceMatch {
    label: string;
    distance: number;
  }

  export interface WithFaceDetection<T> {
    detection: FaceDetection;
    image: T;
  }

  export interface WithFaceLandmarks<TSource, TLandmarks> extends WithFaceDetection<TSource> {
    landmarks: TLandmarks;
  }

  export interface WithFaceDescriptor<T> extends WithFaceLandmarks<T, FaceLandmarks68> {
    descriptor: Float32Array;
  }

  export interface TinyFaceDetectorOptions {
    inputSize: number;
    scoreThreshold: number;
  }

  export class TinyFaceDetector {
    static load(weightsUrl: string): Promise<TinyFaceDetector>;
    locateFaces(input: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, options: TinyFaceDetectorOptions): Promise<FaceDetection[]>;
  }

  export class FaceLandmark68Net {
    static load(weightsUrl: string): Promise<FaceLandmark68Net>;
    detectLandmarks(input: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, faceDetection: FaceDetection): Promise<FaceLandmarks68>;
  }

  export class FaceRecognitionNet {
    static load(weightsUrl: string): Promise<FaceRecognitionNet>;
    computeFaceDescriptor(input: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, faceDetection: FaceDetection): Promise<Float32Array>;
  }

  export class FaceExpressionNet {
    static load(weightsUrl: string): Promise<FaceExpressionNet>;
    predictExpressions(input: WithFaceDescriptor<HTMLImageElement | HTMLCanvasElement | HTMLVideoElement>): Promise<{ [key: string]: number }>;
  }

  export class FaceMatcher {
    constructor(referenceDescriptors: Float32Array[] | WithFaceDescriptor<{}>[], distanceThreshold?: number);
    findBestMatch(queryDescriptor: Float32Array | WithFaceDescriptor<{}>): FaceMatch;
  }

  export namespace nets {
    export const tinyFaceDetector: TinyFaceDetector;
    export const faceLandmark68Net: FaceLandmark68Net;
    export const faceRecognitionNet: FaceRecognitionNet;
    export const faceExpressionNet: FaceExpressionNet;
  }

  export function detectSingleFace(
    img: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    detectionOptions?: TinyFaceDetectorOptions
  ): Promise<WithFaceDescriptor<{}> | undefined>;

  export function detectAllFaces(
    img: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    detectionOptions?: TinyFaceDetectorOptions
  ): Promise<WithFaceDescriptor<{}>[]>;

  export function withFaceLandmarks(
    face: WithFaceDetection<{}>,
    landmarks?: FaceLandmark68Net
  ): Promise<WithFaceLandmarks<WithFaceDetection<{}>, FaceLandmarks68>>;

  export function withFaceDescriptor(
    face: WithFaceLandmarks<WithFaceDetection<{}>, FaceLandmarks68>,
    recognition?: FaceRecognitionNet
  ): Promise<WithFaceDescriptor<{}>>;

  export function drawLandmarks(canvas: HTMLCanvasElement, landmarks: FaceLandmarks68): void;
  export function drawDetection(canvas: HTMLCanvasElement, detection: FaceDetection): void;
  export function matchDescriptors(descriptor1: Float32Array, descriptor2: Float32Array): number;
  export function resizeResults(results: FaceDetection | FaceDetection[], dimensions: { width: number; height: number }): FaceDetection | FaceDetection[];
}





