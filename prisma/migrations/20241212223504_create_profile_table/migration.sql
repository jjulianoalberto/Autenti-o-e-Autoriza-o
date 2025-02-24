-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "bio" VARCHAR(150),
    "image" VARCHAR(255),
    "birthDate" TIMESTAMP(3),
    "studentId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_studentId_key" ON "profiles"("studentId");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
