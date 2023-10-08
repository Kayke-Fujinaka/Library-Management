import { customString } from './zodCustom';

export const passwordValidation = customString('senha')
  .min(8, 'A senha deve ter no mínimo 8 caracteres.')
  .max(32, 'A senha deve ter no máximo 32 caracteres.')
  .refine(
    (password) => /[A-Z]/.test(password),
    'A senha deve conter pelo menos uma letra maiúscula.',
  )
  .refine(
    (password) => /[a-z]/.test(password),
    'A senha deve conter pelo menos uma letra minúscula.',
  )
  .refine(
    (password) => /[0-9]/.test(password),
    'A senha deve conter pelo menos um número.',
  )
  .refine(
    (password) => /[!@#$%^&*]/.test(password),
    'A senha deve conter pelo menos um caractere especial.',
  );
