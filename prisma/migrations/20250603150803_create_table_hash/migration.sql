-- CreateTable
CREATE TABLE "hash_user" (
    "hash" VARCHAR(6) NOT NULL,
    "user_id" VARCHAR(36),
    "url_original" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hash_user_pkey" PRIMARY KEY ("hash")
);

-- CreateTable
CREATE TABLE "hashes" (
    "hash" VARCHAR(6) NOT NULL,
    "available" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hashes_pkey" PRIMARY KEY ("hash")
);
