import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async () => {
      // Detailed logging for middleware
      try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        
        console.log("User authentication:", {
          userExists: !!user,
          userEmail: user?.email
        });
 
        if (!user || user.email !== 'rezosologa@gmail.com') {
          console.error("Unauthorized upload attempt");
          throw new UploadThingError("Unauthorized");
        }
 
        return { userId: user.id };
      } catch (error: unknown) {
        // Type-safe error handling
        const errorMessage = error instanceof Error 
          ? error.message 
          : String(error);

        console.error("Middleware error:", errorMessage);
        throw new UploadThingError(`Middleware failed: ${errorMessage}`);
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Comprehensive error handling and logging
      try {
        console.log("Upload complete - Full metadata:", metadata);
        console.log("Uploaded file details:", {
          url: file.url,
          name: file.name,
          size: file.size,
          key: file.key
        });

        // Ensure you're returning a simple, serializable object
        return { 
          uploadedBy: metadata.userId, 
          fileUrl: file.url,
          fileName: file.name
        };
      } catch (error: unknown) {
        // Type-safe error handling
        const errorMessage = error instanceof Error 
          ? error.message 
          : String(error);

        // Detailed error logging
        console.error("Upload completion error:", {
          message: errorMessage,
          // Only add stack if it's an Error instance
          ...(error instanceof Error && { stack: error.stack }),
          metadata,
          file
        });

        // Throw a clear error that can be caught client-side
        throw new UploadThingError(`Upload processing failed: ${errorMessage}`);
      }
    }),

    bannerImageRoute: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      // Detailed logging for middleware
      try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        
        console.log("User authentication:", {
          userExists: !!user,
          userEmail: user?.email
        });
 
        if (!user || user.email !== 'rezosologa@gmail.com') {
          console.error("Unauthorized upload attempt");
          throw new UploadThingError("Unauthorized");
        }
 
        return { userId: user.id };
      } catch (error: unknown) {
        // Type-safe error handling
        const errorMessage = error instanceof Error 
          ? error.message 
          : String(error);

        console.error("Middleware error:", errorMessage);
        throw new UploadThingError(`Middleware failed: ${errorMessage}`);
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Comprehensive error handling and logging
      try {
        console.log("Upload complete - Full metadata:", metadata);
        console.log("Uploaded file details:", {
          url: file.url,
          name: file.name,
          size: file.size,
          key: file.key
        });

        // Ensure you're returning a simple, serializable object
        return { 
          uploadedBy: metadata.userId, 
          fileUrl: file.url,
          fileName: file.name
        };
      } catch (error: unknown) {
        // Type-safe error handling
        const errorMessage = error instanceof Error 
          ? error.message 
          : String(error);

        // Detailed error logging
        console.error("Upload completion error:", {
          message: errorMessage,
          // Only add stack if it's an Error instance
          ...(error instanceof Error && { stack: error.stack }),
          metadata,
          file
        });

        // Throw a clear error that can be caught client-side
        throw new UploadThingError(`Upload processing failed: ${errorMessage}`);
      }
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;