/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable require-yield */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
import { Buffer } from 'node:buffer';
import { randomBytes as uuid } from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { ShortnerRepository } from 'src/repository/shortnerRepository';

console.time();

const shortnerRepository = new ShortnerRepository();

const LIMIT_HASH: number = Number(process.env.LIMIT_HASH);
const HASH_SIZE: number = Number(process.env.HASH_SIZE); //limit 6^64

let count = 0;
let hash = '';

const controller = new AbortController();

function generateRandomHash(): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-'; // 64 caracter

  const randomBytes = uuid(HASH_SIZE);
  for (let i = 0; i < HASH_SIZE; i++) {
    hash += chars.charAt(randomBytes[i] % chars.length);
  }

  return hash;
}

async function* customReadable(): AsyncGenerator<Buffer> {
  while (count < LIMIT_HASH) {
    yield Buffer.from(generateRandomHash());
    hash = '';
  }
}

async function* customTransform(stream: any): AsyncGenerator<any> {
  for await (const chunk of stream) {
    try {
      const res = await shortnerRepository.createHash(
        chunk.toString(),
        true,
        LIMIT_HASH,
      );

      console.log(res);
      if (!res) yield controller.abort();
      yield chunk.toString() + '\n';

      count++;
      // yield controller.abort(); //simular erro
    } catch (error) {
      console.error('[myCustomTransform] Error ao processar chunk:', error);
      continue;
    }
  }
}

async function* customWritable(stream: any): any {
  for await (const chunk of stream) {
    try {
      const hash = chunk.toString();
      console.log('[writable]', hash, count);
    } catch (error) {
      console.error('[myCustomWritable] Error ao processar chunk:', error);
      continue;
    }
  }
}

(async () => {
  try {
    await pipeline(customReadable, customTransform, customWritable, {
      signal: controller.signal,
    });
    console.log('Pipeline concluído com sucesso! 🔥🔥🔥🚒🚒.');
  } catch (error) {
    console.log('\n[Error] no processo:', error);
  }
})();

console.timeEnd();
