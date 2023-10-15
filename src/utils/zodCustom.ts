import { z } from 'zod';

type Gender = 'male' | 'female';

export function customString(
  fieldName: string,
  gender: Gender = 'male',
  message?: string,
) {
  const article = gender === 'male' ? 'O' : 'A';
  return z.string({
    invalid_type_error:
      message || `${article} ${fieldName} deve ser uma string.`,
  });
}

export function customNumber(
  fieldName: string,
  gender: Gender = 'male',
  message?: string,
) {
  const article = gender === 'male' ? 'O' : 'A';
  return z.number({
    invalid_type_error:
      message || `${article} ${fieldName} deve ser um número.`,
  });
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
