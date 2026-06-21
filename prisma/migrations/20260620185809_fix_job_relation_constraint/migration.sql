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
    "jobTitle" TEXT,
    "department" TEXT,
    "location" TEXT,
    "employmentType" TEXT,
    "salaryRange" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Applicant_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Applicant" ("coverLetter", "createdAt", "cvUrl", "department", "email", "employmentType", "fullName", "id", "jobId", "jobTitle", "location", "notes", "phone", "position", "salaryRange", "status", "updatedAt") SELECT "coverLetter", "createdAt", "cvUrl", "department", "email", "employmentType", "fullName", "id", "jobId", "jobTitle", "location", "notes", "phone", "position", "salaryRange", "status", "updatedAt" FROM "Applicant";
DROP TABLE "Applicant";
ALTER TABLE "new_Applicant" RENAME TO "Applicant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
