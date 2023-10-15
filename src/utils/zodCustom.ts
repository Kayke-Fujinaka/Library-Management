import { z } from 'zod';

type Gender = 'male' | 'female';

function getArticle(gender: Gender): string {
  return gender === 'male' ? 'O' : 'A';
}

export function customString(
  fieldName: string,
  gender: Gender = 'male',
  nonEmpty: boolean = true,
) {
  const article = getArticle(gender);

  let field = z.string({
    invalid_type_error: `${article} ${fieldName} deve ser uma string.`,
  });

  if (nonEmpty) {
    field = field.nonempty(`${article} ${fieldName} não pode estar vazio.`);
  }

  return field;
}

export function customNumber(fieldName: string, gender: Gender = 'male') {
  const article = getArticle(gender);

  return z.number({
    invalid_type_error: `${article} ${fieldName} deve ser um número.`,
  });
}

export function customUUID(
  fieldName: string,
  gender: Gender = 'male',
  message?: string,
) {
  const article = getArticle(gender);

  return customString(fieldName, gender).refine(
    (id) => {
      const uuidRegex =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
      return uuidRegex.test(id);
    },
    {
      message: message || `${article} ${fieldName} deve ser um UUID.`,
    },
  );
}
