-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Applicant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "coverLetter" TEXT NOT NULL,
    "cvUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'New',
    "notes" TEXT,
    "jobId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Applicant_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Applicant" ("coverLetter", "createdAt", "cvUrl", "email", "fullName", "id", "jobId", "notes", "phone", "position", "status", "updatedAt") SELECT "coverLetter", "createdAt", "cvUrl", "email", "fullName", "id", "jobId", "notes", "phone", "position", "status", "updatedAt" FROM "Applicant";
DROP TABLE "Applicant";
ALTER TABLE "new_Applicant" RENAME TO "Applicant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
