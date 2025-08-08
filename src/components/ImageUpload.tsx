"use client";
import {
  Dropzone,
  DropZoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneTrigger,
  useDropzone,
} from "@/components/ui/dropzone";
import { CloudUploadIcon, Trash2Icon } from "lucide-react";
import { useRef, useState } from "react";

const ImageUpload = () => {
  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        status: "success",
        result: URL.createObjectURL(file),
      };
    },
    validation: {
      accept: {
        "image/*": [".png", ".jpg", ".jpeg"],
      },
      maxSize: 10 * 1024 * 1024,
      maxFiles: 1,
    },
  });

  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [captions, setCaptions] = useState<any[]>([]);
  const captionsRef = useRef<HTMLDivElement>(null);

  // Handler to upload image to FastAPI
  const handleUploadToAPI = async (file: File, id: string) => {
    setUploadingId(id);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8001/upload_image/", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const result = await response.json();
      setCaptions(result); // Store captions JSON
      setTimeout(() => {
        captionsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Scroll to captions section
    } catch (error) {
      alert("Failed to upload image.");
    } finally {
      setUploadingId(null);
    }
  };

  const handleCopy = (caption: string) => {
    navigator.clipboard.writeText(caption);
  };

  return (
    <div className="not-prose flex flex-col gap-4">
      <Dropzone {...dropzone}>
        <div>
          <div className="flex justify-between">
            <DropzoneDescription>
              Please select up to 10 images
            </DropzoneDescription>
            <DropzoneMessage />
          </div>
          <DropZoneArea>
            <DropzoneTrigger className="flex flex-col items-center gap-4 bg-transparent p-10 text-center text-sm">
              <CloudUploadIcon className="size-8" />
              <div>
                <p className="font-semibold">Upload listing images</p>
                <p className="text-sm text-muted-foreground">
                  Click here or drag and drop to upload
                </p>
              </div>
            </DropzoneTrigger>
          </DropZoneArea>
        </div>

        <DropzoneFileList className="grid grid-cols-3 gap-3 p-0">
          {dropzone.fileStatuses.map((file) => (
            <DropzoneFileListItem
              className="overflow-hidden rounded-md bg-secondary p-0 shadow-sm"
              key={file.id}
              file={file}
            >
              {file.status === "pending" && (
                <div className="aspect-video animate-pulse bg-black/20" />
              )}
              {file.status === "success" && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={file.result}
                  alt={`uploaded-${file.fileName}`}
                  className="aspect-video object-cover"
                />
              )}
              <div className="flex items-center justify-between p-2 pl-4">
                <div className="min-w-0">
                  <p className="truncate text-sm">{file.fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-primary text-white px-2 py-1 rounded hover:bg-primary/80 disabled:opacity-50"
                    disabled={uploadingId === file.id}
                    onClick={() => handleUploadToAPI(file.file, file.id)}
                  >
                    {uploadingId === file.id ? "Uploading..." : "Upload to API"}
                  </button>
                  <DropzoneRemoveFile
                    variant="ghost"
                    className="shrink-0 hover:outline"
                  >
                    <Trash2Icon className="size-4" />
                  </DropzoneRemoveFile>
                </div>
              </div>
            </DropzoneFileListItem>
          ))}
        </DropzoneFileList>
      </Dropzone>

      {/* Captions Section */}
      {captions.length > 0 && (
        <div ref={captionsRef} className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Generated Captions</h2>
          <div className="flex flex-col gap-6">
            {captions.map((item, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-semibold mb-2">{item.style}</h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {item.captions.map((caption: string, cIdx: number) => (
                    <div
                      key={cIdx}
                      className="relative bg-muted rounded-lg p-4 flex items-center"
                    >
                      <span className="flex-1 text-sm">{caption}</span>
                      <button
                        className="ml-2 p-2 rounded-full hover:bg-primary/10 transition"
                        onClick={() => handleCopy(caption)}
                        title="Copy caption"
                      >
                        {/* Copy icon (SVG) */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16h8a2 2 0 002-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2zm0 0v2a2 2 0 002 2h6a2 2 0 002-2v-2"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;