'use client'
import { Label } from '@/components/ui/label'
import React from 'react'
import { UploadDropzone } from '../lib/uploadthing'

const FileUpload = () => {
  return (
    <div className="flex flex-col gap-3">
    <Label>Images</Label>
    <UploadDropzone 
  endpoint="imageUploader" 
  onClientUploadComplete={(res) => {
    console.log("Full upload response:", res);
    alert("Upload successful");
  }}
  onUploadError={(error: unknown) => {
    let errorMessage = 'An unknown error occurred';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = (error as { message: string }).message;
    }
    
    console.error("Full upload error:", error);
    alert(`Upload failed: ${errorMessage}`);
  }}
/>
</div>
  )
}

export default FileUpload