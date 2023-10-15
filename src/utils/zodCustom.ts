import { z } from 'zod';

type Gender = 'male' | 'female';

export function customString(
  fieldName: string,
  gender: Gender = 'male',
  nonEmpty: boolean = true,
) {
  const article = gender === 'male' ? 'O' : 'A';
  let field = z.string({
    invalid_type_error: `${article} ${fieldName} deve ser uma string.`,
  });

  if (nonEmpty) {
    field = field.nonempty(`${article} ${fieldName} não pode estar vazio.`);
  }

  return field;
}

export function customNumber(fieldName: string, gender: Gender = 'male') {
  const article = gender === 'male' ? 'O' : 'A';
  const field = z.number({
    invalid_type_error: `${article} ${fieldName} deve ser um número.`,
  });

  return field;
}

export function customUUID(fieldName: string, message?: string) {
  return customString('UUID').refine(
    (id) => {
      const uuidRegex =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
      return uuidRegex.test(id);
    },
    {
      message: message || `O ${fieldName} deve ser um UUID.`,
    },
  );
}
