-- CreateTable
CREATE TABLE "Table" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "guests" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Table_userId_key" ON "Table"("userId");

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
