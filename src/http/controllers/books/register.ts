import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeRegisterBookUseCase } from '@/use-cases/_factories_';
import { customNumber, customString } from '@/utils/zodCustom';

export async function registerBook(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    title: customString('título').max(200, 'O título é muito longo.'),
    author: customString('autor').max(100, 'O nome do autor é muito longo.'),
    publisher: customString('editora', 'female').max(
      100,
      'A editora é muito longo.',
    ),
    release_year: customNumber('ano de lançamento')
      .min(1450, 'O ano de lançamento é muito antigo.')
      .max(
        new Date().getFullYear(),
        'O ano de lançamento não pode ser no futuro.',
      ),
    price: customNumber('preço')
      .min(0, 'O preço não pode ser negativo.')
      .max(10000, 'O preço é muito alto.')
      .refine(
        (price) => (price * 100) % 1 === 0,
        'O preço deve ter no máximo duas casas decimais.',
      ),
    description: customString('descrição', 'female').max(
      2000,
      'A descrição é muito longa.',
    ),
    page_count: customNumber('número de páginas')
      .min(1, 'O número de páginas deve ser pelo menos 1.')
      .max(5000, 'O número de páginas é muito alto.'),
    cover_image: customString('capa do livro', 'female').optional(),
    language: customString('idioma'),
    genre: customString('gênero'),
  });

  const {
    title,
    author,
    publisher,
    release_year,
    price,
    description,
    page_count,
    cover_image,
    language,
    genre,
  } = registerBodySchema.parse(request.body);

  const useCase = makeRegisterBookUseCase();

  await useCase.execute({
    title,
    author,
    publisher,
    release_year,
    price,
    description,
    page_count,
    cover_image,
    language,
    genre,
  });

  return reply.status(201).send();
}
