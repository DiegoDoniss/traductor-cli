import { Option } from "https://deno.land/x/denomander/mod.ts";

export const from = new Option({
  flags: '-f --from',
  description: 'selecciona un idioma de origen',
  defaultValue: 'en'
})

export const to = new Option({
  flags: '-t --to',
  description: 'selecciona el idioma al cual deseas traducir',
  defaultValue: 'es'
})
